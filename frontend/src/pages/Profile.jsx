import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSidebarState } from '../hooks/useSidebarState';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { LoadingButton } from '../components/LoadingButton';
import { User, Mail, Building2, UserCircle, GraduationCap, Camera, X, Edit2, Check, X as XIcon, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import styles from './Profile.module.css';

export const Profile = () => {
  const { currentUser, currentCollege, requestProfessorAccess, updateUserPhoto, updateUserName, isProcessingRequest } = useAuth();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarState();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(currentUser?.name || '');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Update edited values when currentUser changes
    setEditedName(currentUser?.name || '');
    // Mark as initialized after data is ready
    if (currentUser) {
      setIsInitializing(false);
    }
  }, [currentUser]);

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
          setErrorMessage('Compressed image is still too large. Please use a smaller image.');
          setTimeout(() => setErrorMessage(''), 4000);
          return;
        }
        
        handlePhotoUpload(compressedImage, file);
      });
    }
  };

  const handlePhotoUpload = (photoData, file) => {
    setIsUploading(true);
    try {
      updateUserPhoto(photoData);
      toast.success('Profile picture updated!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo');
    } finally {
      setIsUploading(false);
    }
  };

  const removePhoto = () => {
    updateUserPhoto(null);
    toast.success('Profile picture removed!');
  };

  const handleSaveName = () => {
    if (editedName.trim()) {
      updateUserName(editedName.trim());
      setIsEditingName(false);
      toast.success('Name updated successfully!');
    }
  };

  const handleCancelEdit = () => {
    setEditedName(currentUser?.name || '');
    setIsEditingName(false);
  };

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
      <Navbar onMenuToggle={toggleSidebar} />
      <div className={styles.main}>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1 className={styles.title}>My Profile</h1>
              <p className={styles.subtitle}>Manage your account information</p>
            </div>

            {!isInitializing && (
            <div className={styles.profileCard}>
              <div className={`${styles.profileHeader} ${styles[`profileHeader${currentUser?.role}`]}`}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <div className={styles.avatarLarge} style={{
                    backgroundImage: currentUser?.photo ? `url(${currentUser?.photo})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderColor: getRoleColor(currentUser?.role)
                  }}>
                    {!currentUser?.photo && currentUser?.name?.charAt(0).toUpperCase()}
                    <label className={styles.cameraOverlay}>
                      <Camera size={24} color="white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{ display: 'none' }}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                  {currentUser?.photo && (
                    <button
                      onClick={removePhoto}
                      className={styles.removePhotoButton}
                      title="Remove photo"
                    >
                      <X size={16} color="white" />
                    </button>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <div className={styles.profileInfo}>
                    <h2 className={styles.profileName}>{currentUser?.name?.toUpperCase()}</h2>
                    <div
                      className={styles.roleBadgeLarge}
                      style={{ background: `${getRoleColor(currentUser?.role)}15`, marginTop: '12px' }}
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
                      {isEditingName ? (
                        <div className={styles.editInputContainer}>
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className={styles.editInput}
                            autoFocus
                          />
                          <button
                            onClick={handleSaveName}
                            className={styles.btnSave}
                            title="Save"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className={styles.btnCancel}
                            title="Cancel"
                          >
                            <XIcon size={18} />
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <div className={`${styles.infoValue} ${styles.displayName}`}>{currentUser?.name?.toUpperCase()}</div>
                          <button
                            onClick={() => setIsEditingName(true)}
                            className={styles.btnEdit}
                            title="Edit name"
                          >
                            <Edit2 size={16} />
                          </button>
                        </div>
                      )}
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
                      <div className={styles.infoValue}>{currentCollege?.name?.toUpperCase()}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role & Permissions Section */}
              <div className={styles.infoSection}>
                <h3 className={styles.sectionTitle}>Role & Permissions</h3>
                <div className={styles.rolePermsBox}>
                  <div className={styles.rolePermsRow}>
                    <span className={styles.infoLabel}>Current Role:</span>
                    <span className={styles.infoValue} style={{ textTransform: 'capitalize' }}>
                      {currentUser?.role === 'pending' ? 'Student (Pending Professor)' : currentUser?.role}
                    </span>
                  </div>
                  
                  <div className={styles.permissionsGrid}>
                    <div className={styles.permissionCard}>
                      <h4 className={styles.permTitle}>Your Permissions</h4>
                      <ul className={styles.permList}>
                        {currentUser?.role === 'admin' && (
                          <>
                            <li>✓ Upload & manage all files</li>
                            <li>✓ Approve professor requests</li>
                            <li>✓ Manage users</li>
                          </>
                        )}
                        {currentUser?.role === 'professor' && (
                          <>
                            <li>✓ Upload & manage your files</li>
                            <li>✓ Delete your files & student files</li>
                            <li>✓ Search all college notes</li>
                          </>
                        )}
                        {(currentUser?.role === 'student' || currentUser?.role === 'pending') && (
                          <>
                            <li>✓ Upload & manage your files</li>
                            <li>✓ Delete only your files</li>
                            <li>✓ Search all college notes</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>

                  {currentUser?.role === 'student' && (
                    <>
                      <LoadingButton
                        className={styles.requestProfBtn}
                        isLoading={isProcessingRequest}
                        onClick={() => {
                          requestProfessorAccess(currentUser.id);
                        }}
                        variant="primary"
                      >
                        Request Professor Access
                      </LoadingButton>
                      <div className={styles.requestProfInfo}>
                        Want to upload and manage notes as a professor? Request access here.
                      </div>
                    </>
                  )}
                  {currentUser?.role === 'pending' && (
                    <div className={styles.pendingBox}>
                      Your request to become a professor is <b>awaiting admin approval</b>.
                    </div>
                  )}
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {uploadSuccess && (
        <div className={`${styles.successPopup} ${!uploadSuccess ? styles.hide : ''}`}>
          {uploadSuccess}
        </div>
      )}

      {/* Error Popup */}
      {errorMessage && (
        <div className={`${styles.errorPopup} ${!errorMessage ? styles.hide : ''}`}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};