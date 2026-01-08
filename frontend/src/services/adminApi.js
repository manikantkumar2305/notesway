import apiClient from '../api/axios';

export const fetchAdminUsers = async () => {
  const response = await apiClient.get('/api/admin/users');
  return response.data;
};

export const fetchFacultyUsers = async () => {
  const response = await apiClient.get('/api/users/faculty');
  return response.data;
};

export const fetchCollegeUsers = async () => {
  const response = await apiClient.get('/api/users/college');
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await apiClient.delete(`/api/users/${userId}`);
  return response.data;
};

export const promoteUser = async (userId) => {
  const response = await apiClient.post(`/api/admin/users/${userId}/promote`);
  return response.data;
};

export const fetchAdminStats = async () => {
  const response = await apiClient.get('/api/admin/stats');
  return response.data;
};

export const fetchStorageStats = async () => {
  const response = await apiClient.get('/api/admin/storage');
  return response.data;
};
