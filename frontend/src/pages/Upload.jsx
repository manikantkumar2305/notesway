import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFiles } from '../hooks/useFiles';
import { useSidebarState } from '../hooks/useSidebarState';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { UploadForm } from '../components/UploadForm';
import { CheckCircle } from 'lucide-react';
import styles from './Upload.module.css';

export const Upload = () => {
  const navigate = useNavigate();
  const { currentUser, currentCollege } = useAuth();
  const { addFile } = useFiles();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarState();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (fileData) => {
    const result = await addFile(fileData);

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/dashboard');
      }, 2000);
    }

    return result;
  };

  return (
    <div className={styles.layout}>
      <Navbar onMenuToggle={toggleSidebar} />
      <div className={styles.main}>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1 className={styles.title}>Upload Notes</h1>
              <p className={styles.subtitle}>
                Share your knowledge with fellow students and professors
              </p>
            </div>

            <div className={styles.formWrapper}>
              <UploadForm
                onSubmit={handleSubmit}
                uploaderName={currentUser?.name}
                uploaderRole={currentUser?.role}
              />
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className={styles.successModal}>
          <div className={styles.successContent}>
            <div className={styles.successIconWrapper}>
              <CheckCircle size={56} className={styles.successIcon} />
            </div>
            <h2 className={styles.successTitle}>Upload Successful!</h2>
            <p className={styles.successMessage}>Your notes have been uploaded successfully</p>
            <div className={styles.successSubtitle}>Redirecting to dashboard...</div>
          </div>
        </div>
      )}
    </div>
  );
};