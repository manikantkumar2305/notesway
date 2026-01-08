import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSidebarState } from '../hooks/useSidebarState';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { fetchFacultyUsers } from '../services/adminApi';
import { User, GraduationCap, UserCircle } from 'lucide-react';
import styles from './StudentPanel.module.css';

export default function StudentPanel() {
  const { currentUser, currentCollege } = useAuth();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarState();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentUser?.role === 'student') {
      loadUsers();
    }
  }, [currentUser?.role]);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const data = await fetchFacultyUsers();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Failed to load users', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Filter users by current college
  const collegeUsers = users.filter(u => u.collegeId === (currentCollege?._id || currentCollege?.id));
  const adminUsers = collegeUsers.filter(u => u.role === 'admin');
  const professorUsers = collegeUsers.filter(u => u.role === 'professor');

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin':
        return <UserCircle size={16} />;
      case 'professor':
        return <GraduationCap size={16} />;
      default:
        return <User size={16} />;
    }
  };

  const formatName = (name = '') => {
    return name
      .split(' ')
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

  if (currentUser?.role !== 'student') {
    return (
      <div className={styles.layout}>
        <Navbar onMenuToggle={toggleSidebar} />
        <div className={styles.main}>
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <div className={styles.content}>
            <div className={styles.container}>
              <div className={styles.accessDenied}>
                <h2>Access Denied</h2>
                <p>You don't have permission to access this page.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Navbar onMenuToggle={toggleSidebar} />
      <div className={styles.main}>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div>
                <h1 className={styles.title}>Faculty Directory</h1>
                <p className={styles.subtitle}>View administrators and professors in your college</p>
              </div>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <UserCircle size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{loadingUsers ? '...' : adminUsers.length}</div>
                  <div className={styles.statLabel}>Total Admins</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <GraduationCap size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{loadingUsers ? '...' : professorUsers.length}</div>
                  <div className={styles.statLabel}>Total Professors</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <User size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{loadingUsers ? '...' : adminUsers.length + professorUsers.length}</div>
                  <div className={styles.statLabel}>Total Faculty</div>
                </div>
              </div>
            </div>

            {/* Admins Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Administrators</h2>
              {adminUsers.length === 0 ? (
                <div className={styles.emptyMessage}>No administrators in your college</div>
              ) : (
                <div className={styles.cardsGrid}>
                  {adminUsers.map(admin => {
                    const userId = admin._id || admin.id;
                    return (
                    <div key={userId} className={styles.card}>
                      <div className={styles.cardAvatarWrapper}>
                        {admin.photo ? (
                          <img src={admin.photo} alt={admin.name} className={styles.cardAvatarImg} />
                        ) : (
                          <div className={styles.cardAvatar} style={{ background: '#EF4444' }}>
                            {admin.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardName}>{formatName(admin.name)}</h3>
                        <p className={styles.cardEmail}>{admin.email}</p>
                        <div className={styles.cardRole} style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#EF4444'
                        }}>
                          <UserCircle size={12} />
                          <span>Administrator</span>
                        </div>
                      </div>
                    </div>
                  );})}
                </div>
              )}
            </div>

            {/* Professors Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Professors</h2>
              {professorUsers.length === 0 ? (
                <div className={styles.emptyMessage}>No professors in your college</div>
              ) : (
                <div className={styles.cardsGrid}>
                  {professorUsers.map(professor => {
                    const userId = professor._id || professor.id;
                    return (
                    <div key={userId} className={styles.card}>
                      <div className={styles.cardAvatarWrapper}>
                        {professor.photo ? (
                          <img src={professor.photo} alt={professor.name} className={styles.cardAvatarImg} />
                        ) : (
                          <div className={styles.cardAvatar} style={{ background: '#3B82F6' }}>
                            {professor.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardName}>{formatName(professor.name)}</h3>
                        <p className={styles.cardEmail}>{professor.email}</p>
                        <div className={styles.cardRole} style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          color: '#3B82F6'
                        }}>
                          <GraduationCap size={12} />
                          <span>Professor</span>
                        </div>
                      </div>
                    </div>
                  );})}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
