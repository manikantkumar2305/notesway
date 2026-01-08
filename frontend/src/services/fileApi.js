import apiClient from '../api/axios';

/* ======================================================
   1️⃣ PRESIGNED UPLOAD
====================================================== */

export const presignUpload = async ({ filename, mimeType, size }) => {
  const response = await apiClient.post('/api/files/presign', {
    filename,
    mimeType,
    size,
  });
  return response.data;
};

/* ======================================================
   2️⃣ DIRECT S3 UPLOAD (RAW PUT)
====================================================== */

export const uploadToPresignedUrl = async ({ uploadUrl, file, mimeType }) => {
  const contentType =
    mimeType?.trim().toLowerCase() || 'application/octet-stream';

  const response = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': contentType,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('S3 upload failed:', response.status, text);
    throw new Error('S3 upload failed');
  }
};

/* ======================================================
   3️⃣ CREATE DB RECORD
====================================================== */

export const createFileRecord = async (payload) => {
  const response = await apiClient.post('/api/files', payload);
  return response.data;
};

/* ======================================================
   READ / LIST
====================================================== */

export const listFiles = async ({ skip = 0, limit = 20 } = {}) => {
  const response = await apiClient.get('/api/files', {
    params: { skip, limit },
  });
  return response.data;
};

/* ======================================================
   🔥 SAFE SEARCH (FLAT PARAMS ONLY)
====================================================== */

export const searchFiles = async ({
  q,
  subject,
  uploader,
  limit = 100,
} = {}) => {
  const response = await apiClient.get('/api/files/search', {
    params: {
      q: q || undefined,
      subject: subject || undefined,
      uploader: uploader || undefined,
      limit,
    },
  });

  return response.data;
};

/* ======================================================
   FILE OPERATIONS
====================================================== */

export const fetchFile = async (fileId) => {
  const response = await apiClient.get(`/api/files/${fileId}`);
  return response.data;
};

export const downloadFileUrl = async (fileId) => {
  const response = await apiClient.get(`/api/files/${fileId}/download`);
  return response.data;
};

export const updateFile = async (fileId, updates) => {
  const response = await apiClient.put(`/api/files/${fileId}`, updates);
  return response.data;
};

export const deleteFile = async (fileId) => {
  const response = await apiClient.delete(`/api/files/${fileId}`);
  return response.data;
};
