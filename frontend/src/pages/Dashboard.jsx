import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFiles } from '../hooks/useFiles';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { FileCard } from '../components/FileCard';
import { SearchBar } from '../components/SearchBar';
import { Upload, Search, Settings, TrendingUp, FileText, Users, BookOpen } from 'lucide-react';
import { useState } from 'react';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const { getRecentFiles, getFilesBySubject, collegeFiles } = useFiles();
  const [searchQuery, setSearchQuery] = useState('');

  const recentFiles = getRecentFiles(6);
  const filesBySubject = getFilesBySubject();
  const subjects = Object.keys(filesBySubject);

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
      <Navbar />
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.content}>
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
                  {recentFiles.map(file => (
                    <FileCard key={file.id} file={file} />
                  ))}
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
};
