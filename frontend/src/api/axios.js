import axios from 'axios';
import { SecureTokenStorage, SecureStorage, secureLogout } from '../utils/secureAuth';

const apiBaseURL = process.env.REACT_APP_BACKEND_URL;

if (!apiBaseURL) {
  throw new Error('API base URL is not configured. Set REACT_APP_BACKEND_URL.');
}

const apiClient = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  refreshQueue = [];
};

const refreshAccessToken = async () => {
  const refreshToken = SecureTokenStorage.getRefreshToken();
  if (!refreshToken) {
    throw new Error('Missing refresh token');
  }

  const response = await axios.post(`${apiBaseURL}/api/auth/refresh`, {
    refresh_token: refreshToken,
  });

  return response.data;
};

apiClient.interceptors.request.use((config) => {
  const token = SecureTokenStorage.getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    const status = error?.response?.status;

    const isAuthEndpoint = typeof originalRequest.url === 'string' && originalRequest.url.includes('/api/auth/');

    if (status !== 401 || originalRequest._retry || isAuthEndpoint) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${token}`;
          originalRequest._retry = true;
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const tokenResponse = await refreshAccessToken();
      SecureTokenStorage.setTokens({
        accessToken: tokenResponse.access_token,
        refreshToken: tokenResponse.refresh_token,
      });

      processQueue(null, tokenResponse.access_token);

      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${tokenResponse.access_token}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      await secureLogout();
      SecureTokenStorage.clearTokens();
      SecureStorage.clearUser();
      SecureStorage.clearCollege();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export { apiBaseURL };
export default apiClient;
