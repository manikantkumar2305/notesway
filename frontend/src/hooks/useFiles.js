import { useState, useEffect } from 'react';
import { files, addFile as addFileToData, getFileById, getFilesByCollege, searchFiles as searchFilesData } from '../data/files';
import { useAuth } from './useAuth';

export const useFiles = () => {
  const { currentCollege } = useAuth();
  const [collegeFiles, setCollegeFiles] = useState([]);

  useEffect(() => {
    if (currentCollege) {
      const filesForCollege = getFilesByCollege(currentCollege.id);
      setCollegeFiles(filesForCollege);
    }
  }, [currentCollege]);

  const addFile = (fileData) => {
    if (!currentCollege) {
      return { success: false, error: 'No college selected' };
    }

    try {
      const newFile = addFileToData({
        ...fileData,
        collegeId: currentCollege.id
      });
      
      setCollegeFiles(prev => [newFile, ...prev]);
      return { success: true, file: newFile };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const searchFiles = (query) => {
    if (!currentCollege) return [];
    return searchFilesData(query, currentCollege.id);
  };

  const getFile = (id) => {
    return getFileById(id);
  };

  const getRecentFiles = (limit = 6) => {
    return collegeFiles.slice(0, limit);
  };

  const getFilesBySubject = () => {
    const grouped = {};
    collegeFiles.forEach(file => {
      if (!grouped[file.subject]) {
        grouped[file.subject] = [];
      }
      grouped[file.subject].push(file);
    });
    return grouped;
  };

  return {
    collegeFiles,
    addFile,
    searchFiles,
    getFile,
    getRecentFiles,
    getFilesBySubject
  };
};