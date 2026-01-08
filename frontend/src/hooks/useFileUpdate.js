import { useState } from 'react';
import { updateFile as updateFileApi } from '../services/fileApi';

export const useFileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFileMetadata = async (fileId, metadata) => {
    setLoading(true);
    setError(null);
    
    try {
      // Ensure we send a usable identifier (id or _id)
      const targetId = fileId || metadata?.fileId;
      const updated = await updateFileApi(targetId, metadata);
      setLoading(false);
      return {
        success: true,
        message: 'File updated successfully',
        file: updated
      };
    } catch (err) {
      console.error('Error updating file:', err);
      const errorMessage = err.message || 'Failed to update file metadata';
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  return {
    updateFileMetadata,
    loading,
    error
  };
};
