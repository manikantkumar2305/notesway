import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import {
  presignUpload,
  uploadToPresignedUrl,
  createFileRecord,
  listFiles,
  searchFiles as searchFilesApi,
  fetchFile,
  deleteFile as deleteFileApi,
  updateFile as updateFileApi,
} from '../services/fileApi';
import { toast } from 'sonner';

export const useFiles = () => {
  const { currentCollege, currentUser } = useAuth();
  const [collegeFiles, setCollegeFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /* ================= LOAD FILES ================= */

  useEffect(() => {
    if (currentCollege) {
      fetchFiles();
    } else {
      setCollegeFiles([]);
    }
  }, [currentCollege]);

  const fetchFiles = async () => {
    if (!currentCollege) return;
    try {
      setIsLoading(true);
      const data = await listFiles({ skip: 0, limit: 100 });
      setCollegeFiles(data.files || []);
    } catch (error) {
      console.error(error);
      toast.error('Unable to load files');
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= ADD FILE ================= */

  const addFile = async (fileData) => {
    if (!currentCollege || !currentUser) {
      return { success: false, error: 'Not authenticated' };
    }

    const { file } = fileData;
    if (!file) {
      return { success: false, error: 'File is required' };
    }

    try {
      const mimeType = file.type || 'application/octet-stream';

      const presign = await presignUpload({
        filename: file.name,
        mimeType,
        size: file.size,
      });

      await uploadToPresignedUrl({
        uploadUrl: presign.uploadUrl,
        file,
        mimeType,
      });

      const payload = {
        fileId: presign.fileId,
        title: fileData.title,
        subject: fileData.subject,
        unit: fileData.unit,
        topic: fileData.topic,
        description: fileData.description,
        keywords: fileData.keywords || [],
        yearSemester: fileData.yearSemester,
        fileSize: file.size,
        mimeType,
        key: presign.key,
      };

      const created = await createFileRecord(payload);
      setCollegeFiles((prev) => [created, ...prev]);

      return { success: true, file: created };
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error.message ||
        'Upload failed';
      return { success: false, error: message };
    }
  };

  /* ================= SEARCH ================= */

  const searchFiles = async ({ q, subject, uploader, limit = 100 } = {}) => {
    if (!currentCollege) return { files: [], total: 0 };

    return searchFilesApi({
      q,
      subject,
      uploader,
      limit,
    });
  };

  /* ================= UPDATE ================= */

  const updateFile = async (id, updates) => {
    try {
      const updated = await updateFileApi(id, updates);
      setCollegeFiles((prev) =>
        prev.map((f) =>
          f.id === id || f._id === id ? updated : f
        )
      );
      return { success: true, file: updated };
    } catch (error) {
      return {
        success: false,
        error:
          error?.response?.data?.detail ||
          error.message ||
          'Failed to update file',
      };
    }
  };

  /* ================= DELETE ================= */

  const deleteFile = async (id) => {
    try {
      await deleteFileApi(id);
      setCollegeFiles((prev) =>
        prev.filter((f) => f.id !== id && f._id !== id)
      );
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error?.response?.data?.detail ||
          error.message ||
          'Failed to delete file',
      };
    }
  };

  /* ================= GET FILE ================= */

  const getFile = async (id) => {
    const local = collegeFiles.find(
      (f) => f.id === id || f._id === id
    );
    return local || fetchFile(id);
  };

  /* ================= DASHBOARD HELPERS ================= */

  const getRecentFiles = (limit = 6) => {
    return collegeFiles.slice(0, limit);
  };

  const getFilesBySubject = () => {
    const grouped = {};
    collegeFiles.forEach((file) => {
      if (!grouped[file.subject]) {
        grouped[file.subject] = [];
      }
      grouped[file.subject].push(file);
    });
    return grouped;
  };

  return {
    collegeFiles,
    isLoading,
    addFile,
    searchFiles,
    updateFile,
    deleteFile,
    getFile,
    refreshFiles: fetchFiles,
    getRecentFiles,
    getFilesBySubject,
  };
};
