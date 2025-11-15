import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User, BookOpen, LogOut, GraduationCap, UserCircle, Building2 } from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const { currentUser, currentCollege, logout } = useAuth();

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin':
        return <UserCircle size={16} />;
      case 'professor':
        return <GraduationCap size={16} />;
      case 'student':
        return <User size={16} />;
      default:
        return <User size={16} />;
    }
  };

  const getRoleBadgeClass = (role) => {
    switch(role) {
      case 'admin':
        return styles.badgeError;
      case 'professor':
        return styles.badgePrimary;
      case 'student':
        return styles.badgeSuccess;
      default:
        return styles.badgePrimary;
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/dashboard" className={styles.logo}>
          <BookOpen size={24} />
          <span>NoteShare Vault</span>
        </Link>

        <div className={styles.navRight}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {currentUser?.name?.charAt(0).toUpperCase()}
            </div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>{currentUser?.name}</div>
              <div className={`${styles.roleBadge} ${getRoleBadgeClass(currentUser?.role)}`}>
                {getRoleIcon(currentUser?.role)}
                <span>{currentUser?.role}</span>
              </div>
            </div>
          </div>

          <div className={styles.dividerVertical}></div>

          <div className={styles.collegeInfo}>
            <Building2 size={18} className={styles.collegeIcon} />
            <span>{currentCollege?.name}</span>
          </div>

          <button onClick={logout} className={styles.logoutBtn}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};