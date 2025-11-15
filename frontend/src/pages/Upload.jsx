import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFiles } from '../hooks/useFiles';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { UploadForm } from '../components/UploadForm';
import { CheckCircle } from 'lucide-react';
import styles from './Upload.module.css';

export const Upload = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addFile } = useFiles();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (fileData) => {
    const result = addFile(fileData);

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
      <Navbar />
      <div className={styles.main}>
        <Sidebar />
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
            <CheckCircle size={64} className={styles.successIcon} />
            <h2>Upload Successful!</h2>
            <p>Your notes have been uploaded successfully</p>
          </div>
        </div>
      )}
    </div>
  );
};