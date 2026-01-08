import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFiles } from '../hooks/useFiles';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { FileCard } from '../components/FileCard';
import { SearchBar } from '../components/SearchBar';
import { Upload, Search, Settings, TrendingUp, FileText, Users, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { currentUser, requestProfessorAccess } = useAuth();
  const { getRecentFiles, getFilesBySubject, collegeFiles, deleteFile } = useFiles();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Redirect if not authenticated
    if (!currentUser) {
      navigate('/login', { replace: true });
      return;
    }
    window.scrollTo(0, 0);
  }, [currentUser, navigate]);

  // Don't render anything if not authenticated
  if (!currentUser) {
    return null;
  }

  const recentFiles = getRecentFiles(6);
  const filesBySubject = getFilesBySubject();
  const subjects = Object.keys(filesBySubject);

  // Check if user can delete a specific file
  const canDeleteFile = (file) => {
    if (!currentUser) return false;
    const userId = currentUser.id || currentUser._id;
    return file.uploaderId === userId;
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteFile = async (fileId) => {
    const result = await deleteFile(fileId);
    if (result.success) {
      showToast('File deleted successfully', 'success');
    } else {
      showToast(result.error || 'Failed to delete file', 'error');
    }
  };

  const quickActions = [
    { to: '/upload', icon: <Upload size={24} />, label: 'Upload Notes', color: '#3B82F6' },
    { to: '/search', icon: <Search size={24} />, label: 'Search Notes', color: '#10B981' },
  ];

  if (currentUser?.role === 'admin') {
    quickActions.push(
      { to: '/admin', icon: <Settings size={24} />, label: 'Admin Panel', color: '#EF4444' }
    );
  }

  const stats = [
    { label: 'Total Notes', value: collegeFiles.length, icon: <FileText size={24} />, color: '#3B82F6' },
    { label: 'Subjects', value: subjects.length, icon: <BookOpen size={24} />, color: '#10B981' },
    { label: 'Contributors', value: new Set(collegeFiles.map(f => f.uploaderName)).size, icon: <Users size={24} />, color: '#F59E0B' },
  ];

  return (
    <div className={styles.layout}>
      <Navbar onMenuToggle={setIsSidebarOpen} />
      <div className={styles.main}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className={styles.content}>
          {/* Toast Notification */}
          {toast && (
            <div className={`${styles.toast} ${styles[`toast-${toast.type}`]}`}>
              <div className={styles.toastContent}>
                {toast.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span>{toast.message}</span>
              </div>
            </div>
          )}

          <div className={styles.container}>
            <div className={styles.header}>
              <div>
                <h1 className={styles.welcomeTitle}>
                  Welcome back, {currentUser?.name}! 👋
                </h1>
                <p className={styles.welcomeSubtitle}>
                  Here's what's happening with your notes today
                </p>
              </div>
            </div>

            <div className={styles.stats}>
              {stats.map((stat, idx) => (
                <div key={idx} className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: `${stat.color}15` }}>
                    <span style={{ color: stat.color }}>{stat.icon}</span>
                  </div>
                  <div className={styles.statInfo}>
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.quickActions}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
              <div className={styles.actionsGrid}>
                {quickActions.map((action, idx) => (
                  <Link key={idx} to={action.to} className={styles.actionCard}>
                    <div className={styles.actionIcon} style={{ background: `${action.color}15` }}>
                      <span style={{ color: action.color }}>{action.icon}</span>
                    </div>
                    <span className={styles.actionLabel}>{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Recent Notes</h2>
                <Link to="/search" className={styles.viewAll}>
                  View All →
                </Link>
              </div>
              {recentFiles.length > 0 ? (
                <div className={styles.filesGrid}>
                  {recentFiles.map((file, idx) => {
                    const key = file.id || file._id || `file-${idx}`;
                    return (
                      <FileCard 
                        key={key}
                        file={file}
                        showDeleteBtn={canDeleteFile(file)}
                        onDelete={canDeleteFile(file) ? handleDeleteFile : null}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <FileText size={48} />
                  <p>No notes available yet</p>
                  <Link to="/upload" className={styles.uploadBtn}>
                    Upload Your First Note
                  </Link>
                </div>
              )}
            </div>

            {subjects.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Browse by Subject</h2>
                <div className={styles.subjectsGrid}>
                  {subjects.map((subject) => (
                    <Link
                      key={subject}
                      to={`/search?subject=${encodeURIComponent(subject)}`}
                      className={styles.subjectCard}
                    >
                      <BookOpen size={24} />
                      <div className={styles.subjectInfo}>
                        <div className={styles.subjectName}>{subject}</div>
                        <div className={styles.subjectCount}>
                          {filesBySubject[subject].length} notes
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
