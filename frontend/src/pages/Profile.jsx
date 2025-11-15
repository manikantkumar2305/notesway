import { useAuth } from '../hooks/useAuth';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { User, Mail, Building2, UserCircle, GraduationCap } from 'lucide-react';
import styles from './Profile.module.css';

export const Profile = () => {
  const { currentUser, currentCollege } = useAuth();

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin':
        return <UserCircle size={24} />;
      case 'professor':
        return <GraduationCap size={24} />;
      case 'student':
        return <User size={24} />;
      default:
        return <User size={24} />;
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin':
        return '#EF4444';
      case 'professor':
        return '#3B82F6';
      case 'student':
        return '#10B981';
      default:
        return '#3B82F6';
    }
  };

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1 className={styles.title}>My Profile</h1>
              <p className={styles.subtitle}>Manage your account information</p>
            </div>

            <div className={styles.profileCard}>
              <div className={styles.profileHeader}>
                <div className={styles.avatarLarge}>
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </div>
                <div className={styles.profileInfo}>
                  <h2 className={styles.profileName}>{currentUser?.name}</h2>
                  <div
                    className={styles.roleBadgeLarge}
                    style={{ background: `${getRoleColor(currentUser?.role)}15` }}
                  >
                    <span style={{ color: getRoleColor(currentUser?.role) }}>
                      {getRoleIcon(currentUser?.role)}
                    </span>
                    <span style={{ color: getRoleColor(currentUser?.role) }}>
                      {currentUser?.role?.charAt(0).toUpperCase() + currentUser?.role?.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.divider}></div>

              <div className={styles.infoSection}>
                <h3 className={styles.sectionTitle}>Personal Information</h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <User size={20} />
                    </div>
                    <div className={styles.infoContent}>
                      <div className={styles.infoLabel}>Full Name</div>
                      <div className={styles.infoValue}>{currentUser?.name}</div>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Mail size={20} />
                    </div>
                    <div className={styles.infoContent}>
                      <div className={styles.infoLabel}>Email Address</div>
                      <div className={styles.infoValue}>{currentUser?.email}</div>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Building2 size={20} />
                    </div>
                    <div className={styles.infoContent}>
                      <div className={styles.infoLabel}>College</div>
                      <div className={styles.infoValue}>{currentCollege?.name}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};