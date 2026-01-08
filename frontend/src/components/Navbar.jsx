import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User, BookOpen, LogOut, GraduationCap, UserCircle, Building2, Camera, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { NotificationBell } from './NotificationBell';
import styles from './Navbar.module.css';

export const Navbar = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const { currentUser, currentCollege, logout, updateUserPhoto } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // If logging out, redirect immediately
    if (isLoggingOut) {
      logout();
      // Use replace to prevent back button returning to protected pages
      navigate('/', { replace: true });
    }
  }, [isLoggingOut, navigate, logout]);

  const toggleMenu = () => {
    if (onMenuToggle) {
      onMenuToggle(prev => !prev);
    }
  };

  const compressImage = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size (reduce to max 800x800)
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > 800) {
            height = Math.round((height * 800) / width);
            width = 800;
          }
        } else {
          if (height > 800) {
            width = Math.round((width * 800) / height);
            height = 800;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob with quality compression
        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = (e) => {
              callback(e.target.result);
            };
          },
          'image/jpeg',
          0.8 // 80% quality
        );
      };
    };
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Compress image automatically
      compressImage(file, (compressedImage) => {
        // Check compressed size
        if (compressedImage.length > 500000) {
          console.error('Compressed image is still too large');
          return;
        }
        
        updateUserPhoto(compressedImage);
      });
    }
  };

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

  const getAvatarColor = (role) => {
    switch(role) {
      case 'admin':
        return '#EF4444'; // Red
      case 'professor':
        return '#3B82F6'; // Blue
      case 'student':
        return '#10B981'; // Green
      default:
        return '#3B82F6';
    }
  };

  // Safety check to prevent rendering errors
  if (!currentUser) {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        {/* Hamburger Menu - Mobile Only */}
        <button 
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        <Link to="/dashboard" className={styles.logo}>
          <img src="/note.png" alt="Note" className={styles.logoImage} />
        </Link>

        <div className={styles.navRight}>
          <div className={styles.userInfo}>
            <label 
              className={styles.avatar}
              style={{
                backgroundImage: currentUser?.photo ? `url(${currentUser?.photo})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: currentUser?.photo ? 'transparent' : (getAvatarColor(currentUser?.role) || '#3B82F6'),
                borderColor: getAvatarColor(currentUser?.role) || '#3B82F6'
              }}
            >
              {!currentUser?.photo && (
                <span className={styles.avatarLetter}>
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </span>
              )}
              <span className={styles.cameraIcon}>
                <Camera size={14} color="white" />
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </label>
            <div className={styles.userDetails}>
              <div className={`${styles.roleBadge} ${getRoleBadgeClass(currentUser?.role)}`}>
                {getRoleIcon(currentUser?.role)}
                <span>{currentUser?.role}</span>
              </div>
            </div>
          </div>

          <div className={styles.dividerVertical}></div>

          <div className={styles.collegeInfo}>
            <Building2 size={18} className={styles.collegeIcon} />
            <span>{currentCollege?.name?.toUpperCase()}</span>
          </div>

          <div className={styles.dividerVertical}></div>

          <NotificationBell />

          <button onClick={() => {
            setIsLoggingOut(true);
          }} className={styles.logoutBtn}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};