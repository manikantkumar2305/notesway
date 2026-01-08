import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, Upload, Search, User, Settings, FileText, X } from 'lucide-react';
import { useState } from 'react';
import styles from './Sidebar.module.css';

export const Sidebar = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();

  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/upload', icon: <Upload size={20} />, label: 'Upload Notes' },
    { to: '/my-uploads', icon: <FileText size={20} />, label: 'Uploaded Asset' },
    { to: '/search', icon: <Search size={20} />, label: 'Search Notes' },
    { to: '/profile', icon: <User size={20} />, label: 'Profile' },
  ];

  if (currentUser?.role === 'admin') {
    navItems.push(
      { to: '/admin', icon: <Settings size={20} />, label: 'Admin Panel' }
    );
  }

  if (currentUser?.role === 'professor') {
    navItems.push(
      { to: '/professor', icon: <Settings size={20} />, label: 'Professor Panel' }
    );
  }

  if (currentUser?.role === 'student') {
    navItems.push(
      { to: '/student', icon: <Settings size={20} />, label: 'Faculty Directory' }
    );
  }

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay - Visible when sidebar is open on mobile */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        {/* Close button for mobile */}
        <button 
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
              }
              onClick={handleNavClick}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};