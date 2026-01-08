import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFiles } from '../hooks/useFiles';
import { useSidebarState } from '../hooks/useSidebarState';

import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { SearchBar } from '../components/SearchBar';
import { FileCard } from '../components/FileCard';

import { Search as SearchIcon, AlertCircle, CheckCircle } from 'lucide-react';
import styles from './Search.module.css';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { collegeFiles, deleteFile } = useFiles();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarState();

  const [query, setQuery] = useState(searchParams.get('subject') || '');
  const [toast, setToast] = useState(null);

  /* ================= DELETE PERMISSION ================= */

  const canDeleteFile = (file) => {
    const userId = currentUser?.id || currentUser?._id;
    return file.uploaderId === userId;
  };

  /* ================= FRONTEND-ONLY SEARCH ================= */

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return collegeFiles || [];

    return (collegeFiles || []).filter((file) => {
      return (
        file.title?.toLowerCase().includes(q) ||
        file.subject?.toLowerCase().includes(q) ||
        file.topic?.toLowerCase().includes(q) ||
        file.description?.toLowerCase().includes(q) ||
        file.keywords?.some((k) => k.toLowerCase().includes(q)) ||
        file.uploaderName?.toLowerCase().includes(q)
      );
    });
  }, [query, collegeFiles]);

  /* ================= TOAST ================= */

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteFile = async (fileId) => {
    const result = await deleteFile(fileId);
    if (result?.success) {
      showToast('File deleted successfully', 'success');
      navigate('/dashboard');
    } else {
      showToast(result?.error || 'Failed to delete file', 'error');
    }
  };

  /* ================= UI ================= */

  return (
    <div className={styles.layout}>
      <Navbar onMenuToggle={toggleSidebar} />
      <div className={styles.main}>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <div className={styles.content}>
          {toast && (
            <div className={`${styles.toast} ${styles[`toast-${toast.type}`]}`}>
              {toast.type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <span>{toast.message}</span>
            </div>
          )}

          <div className={styles.container}>
            <h1 className={styles.title}>Search Notes</h1>

            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search notes, subjects, topics, or uploader..."
            />

            <div className={styles.results}>
              <h2>
                {query ? `Results for "${query}"` : 'All Notes'} (
                {results.length})
              </h2>

              {results.length > 0 ? (
                <div className={styles.filesGrid}>
                  {results.map((file) => (
                    <FileCard
                      key={file.id || file._id}
                      file={{ ...file, id: file.id || file._id }}
                      showDeleteBtn={canDeleteFile(file)}
                      onDelete={
                        canDeleteFile(file)
                          ? handleDeleteFile
                          : null
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <SearchIcon size={48} />
                  <p>No notes found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
