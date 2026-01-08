import apiClient from '../api/axios';

export const createProfessorRequest = async (message) => {
  const response = await apiClient.post('/api/professor-requests', { message });
  return response.data;
};

export const listProfessorRequests = async () => {
  const response = await apiClient.get('/api/professor-requests');
  return response.data;
};

export const approveProfessorRequest = async (requestId) => {
  const response = await apiClient.post(`/api/professor-requests/${requestId}/approve`);
  return response.data;
};

export const rejectProfessorRequest = async (requestId) => {
  const response = await apiClient.post(`/api/professor-requests/${requestId}/reject`);
  return response.data;
};
