import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFiles } from '../hooks/useFiles';
import { useFileUpdate } from '../hooks/useFileUpdate';
import { useSidebarState } from '../hooks/useSidebarState';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { FileCard } from '../components/FileCard';
import { EditFileModal } from '../components/EditFileModal';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './MyUploads.module.css';

export const MyUploads = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { collegeFiles, deleteFile, refreshFiles } = useFiles();
  const { updateFileMetadata } = useFileUpdate();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarState();
  const [toast, setToast] = useState(null);
  const [editingFile, setEditingFile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Get files uploaded by current user (supports id or _id on user)
  const userId = currentUser?.id || currentUser?._id;
  const myUploads = collegeFiles.filter(file => file.uploaderId === userId) || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = async (fileId) => {
    const result = await deleteFile(fileId);
    if (result.success) {
      setToast({ type: 'success', message: 'File deleted successfully' });
      setTimeout(() => setToast(null), 3000);
    } else {
      setToast({ type: 'error', message: result.error || 'Failed to delete file' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleEdit = (file) => {
    setEditingFile(file);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      await updateFileMetadata(updatedData.fileId, {
        title: updatedData.title,
        description: updatedData.description,
        subject: updatedData.subject,
        unit: updatedData.unit
      });

      // Refresh files to show updated data
      refreshFiles();
      return { success: true };
    } catch (err) {
      console.error('Error saving file:', err);
      throw err;
    }
  };

  return (
    <div className={styles.layout}>
      <Navbar onMenuToggle={toggleSidebar} />
      <div className={styles.main}>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <div className={styles.content}>
          <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>

            <div className={styles.header}>
              <div>
                <h1 className={styles.title}>Uploaded Asset</h1>
                <p className={styles.subtitle}>Manage your uploaded files</p>
              </div>
              <div className={styles.count}>
                {myUploads.length} file{myUploads.length !== 1 ? 's' : ''}
              </div>
            </div>

            {toast && (
              <div className={`${styles.toast} ${styles[`toast${toast.type}`]}`}>
                {toast.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span>{toast.message}</span>
              </div>
            )}

            <div className={styles.filesGrid}>
              {myUploads.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyContainer}>
                    <div className={styles.emptyIconWrapper}>
                      <div className={styles.emptyIcon}>
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                      <div className={styles.orb1}></div>
                      <div className={styles.orb2}></div>
                    </div>
                    <h2 className={styles.emptyTitle}>No files uploaded yet</h2>
                    <p className={styles.emptyDescription}>Start by uploading your first file to get organized</p>
                    <div className={styles.emptyFeatures}>
                      <div className={styles.feature}>
                        <span className={styles.featureIcon}>✓</span>
                        <span>Organize your notes</span>
                      </div>
                      <div className={styles.feature}>
                        <span className={styles.featureIcon}>✓</span>
                        <span>Share with classmates</span>
                      </div>
                      <div className={styles.feature}>
                        <span className={styles.featureIcon}>✓</span>
                        <span>Easy management</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate('/upload')}
                      className={styles.uploadBtn}
                    >
                      <span>📤</span> Upload Your First File
                    </button>
                  </div>
                </div>
              ) : (
                myUploads.map((file) => (
                  <FileCard
                    key={file.id || file._id}
                    file={file}
                    onDelete={() => handleDelete(file.id || file._id)}
                    onEdit={() => handleEdit(file)}
                    showDeleteBtn={true}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <EditFileModal
        isOpen={showEditModal}
        file={editingFile}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};
