import apiClient from '../api/axios';
import { SecureTokenStorage, SecureStorage } from '../utils/secureAuth';

export const login = async ({ email, password }) => {
  const response = await apiClient.post('/api/auth/login', { email, password });
  const data = response.data;

  SecureTokenStorage.setTokens({
    accessToken: data.token.access_token,
    refreshToken: data.token.refresh_token,
  });

  SecureStorage.setUser(data.user);
  SecureStorage.setCollege(data.college);

  return data;
};

export const registerUser = async ({ name, email, password, collegeCode }) => {
  const response = await apiClient.post('/api/auth/register', {
    name,
    email,
    password,
    collegeCode,
  });

  const data = response.data;

  SecureTokenStorage.setTokens({
    accessToken: data.token.access_token,
    refreshToken: data.token.refresh_token,
  });

  SecureStorage.setUser(data.user);
  SecureStorage.setCollege(data.college);

  return data;
};

export const registerCollege = async (payload) => {
  const response = await apiClient.post('/api/auth/register-college', payload);
  const data = response.data;

  SecureTokenStorage.setTokens({
    accessToken: data.token.access_token,
    refreshToken: data.token.refresh_token,
  });

  SecureStorage.setUser(data.user);
  SecureStorage.setCollege(data.college);

  return data;
};

export const fetchMe = async () => {
  const response = await apiClient.get('/api/auth/me');
  const data = response.data;

  if (data?.user) {
    SecureStorage.setUser(data.user);
  }

  return data.user;
};

export const updateProfile = async (updates) => {
  const response = await apiClient.put('/api/users/me', updates);
  const data = response.data;

  SecureStorage.setUser(data);
  return data;
};

export const refreshTokens = async () => {
  const refreshToken = SecureTokenStorage.getRefreshToken();
  if (!refreshToken) throw new Error('Missing refresh token');

  const response = await apiClient.post('/api/auth/refresh', {
    refresh_token: refreshToken,
  });

  const data = response.data;

  SecureTokenStorage.setTokens({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  });

  return data;
};

export const logout = async () => {
  try {
    await apiClient.post('/api/auth/logout');
  } finally {
    SecureTokenStorage.clearTokens();
    SecureStorage.clearUser();
    SecureStorage.clearCollege();
  }
};

export const fetchCollegeByCode = async (code) => {
  const response = await apiClient.get(
    `/api/colleges/${encodeURIComponent(code)}`
  );
  return response.data;
};

/* ============================= */
/* FORGOT / RESET PASSWORD APIs */
/* ============================= */

export const forgotPassword = async ({ email }) => {
  const response = await apiClient.post('/api/auth/forgot-password', {
    email,
  });
  return response.data;
};

export const verifyOtp = async ({ email, otp }) => {
  const response = await apiClient.post('/api/auth/verify-otp', {
    email,
    otp,
  });
  return response.data;
};

export const resetPassword = async ({
  email,
  reset_token,
  new_password,
}) => {
  const response = await apiClient.post('/api/auth/reset-password', {
    email,
    reset_token,
    new_password,
  });
  return response.data;
};
