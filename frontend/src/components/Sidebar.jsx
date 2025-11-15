import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, Upload, Search, User, Settings } from 'lucide-react';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
  const { currentUser } = useAuth();

  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/upload', icon: <Upload size={20} />, label: 'Upload Notes' },
    { to: '/search', icon: <Search size={20} />, label: 'Search Notes' },
    { to: '/profile', icon: <User size={20} />, label: 'Profile' },
  ];

  if (currentUser?.role === 'admin') {
    navItems.push(
      { to: '/admin', icon: <Settings size={20} />, label: 'Admin Panel' }
    );
  }

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};