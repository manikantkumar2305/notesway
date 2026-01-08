import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSidebarState } from '../hooks/useSidebarState';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { FormInput } from '../components/FormInput';
import { LoadingButton } from '../components/LoadingButton';
import { User, GraduationCap, UserCircle, Plus, Edit, HardDrive, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { validateForm } from '../lib/validation';
import { fetchAdminUsers, promoteUser, fetchAdminStats, fetchStorageStats, fetchFacultyUsers, deleteUser } from '../services/adminApi';
import styles from './AdminPanel.module.css';

export default function AdminPanel() {
    const { 
    currentUser, 
    currentCollege,
    approveProfessorRequest, 
    rejectProfessorRequest,
    pendingProfessorRequests,
    isProcessingRequest,
    registerStudent,
  } = useAuth();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarState();
  const [showAddProfessor, setShowAddProfessor] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [professorForm, setProfessorForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'professor'
  });
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin'
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [professorErrors, setProfessorErrors] = useState({});
  const [adminErrors, setAdminErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalFiles: 0, storageUsageBytes: 0 });
  const [storage, setStorage] = useState({ totalSize: 0, fileCount: 0 });
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentUser?.role === 'admin') {
      loadUsers();
      loadStats();
    }
  }, [currentUser?.role]);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const data = await fetchAdminUsers();
      setUsers(data.users || []);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const loadStats = async () => {
    try {
      setLoadingStats(true);
      const fetchedStats = await fetchAdminStats();
      const storageStats = await fetchStorageStats();
      setStats(fetchedStats || { totalUsers: 0, totalFiles: 0, storageUsageBytes: 0 });
      setStorage(storageStats || { totalSize: 0, fileCount: 0 });
    } catch (error) {
      toast.error('Failed to load stats');
    } finally {
      setLoadingStats(false);
    }
  };

  // Filter users by current college
  const collegeUsers = users.filter(u => u.collegeId === (currentCollege?._id || currentCollege?.id));
  const adminUsers = collegeUsers.filter(u => u.role === 'admin');
  const professorUsers = collegeUsers.filter(u => u.role === 'professor');
  const totalUsers = stats?.totalUsers ?? collegeUsers.length;
  const totalFiles = stats?.totalFiles ?? storage?.fileCount ?? 0;
  const totalStorage = stats?.storageUsageBytes ?? storage?.totalSize ?? 0;

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

  const formatName = (name = '') => {
    return name
      .split(' ')
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

  const handleAddProfessor = (e) => {
    e.preventDefault();
    toast.info('Approve professor requests to add professors');
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setAdminErrors({});

    const validation = validateForm(adminForm, ['name', 'email', 'password']);
    if (!validation.isValid) {
      setAdminErrors(validation.errors);
      toast.error(Object.values(validation.errors)[0]);
      return;
    }

    try {
      const registration = await registerStudent({
        name: adminForm.name,
        email: adminForm.email,
        password: adminForm.password,
        collegeCode: currentCollege?.code || '',
      });

      if (!registration.success) {
        setAdminErrors({ email: registration.error });
        toast.error(registration.error || 'Failed to create user');
        return;
      }

      const userId = registration.user.id || registration.user._id;
      const promoted = await promoteUser(userId);
      toast.success(`Admin ${promoted.name} added successfully`);
      setAdminForm({ name: '', email: '', password: '', role: 'admin' });
      setShowAddAdmin(false);
      await loadUsers();
    } catch (error) {
      const message = error?.response?.data?.detail || error.message || 'Failed to add admin';
      toast.error(message);
    }
  };

  const handleEditRole = () => {};

  const handleDeleteUser = (userId) => {
    const selfId = currentUser?._id || currentUser?.id;
    if (selfId && selfId === userId) return; // prevent self-delete from UI
    const user = users.find(u => (u._id || u.id) === userId);
    setUserToDelete(user || null);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) {
      setShowDeleteModal(false);
      return;
    }
    try {
      await deleteUser(userToDelete._id || userToDelete.id);
      toast.success('User deleted');
      await loadUsers();
    } catch (error) {
      const message = error?.response?.data?.detail || error.message || 'Failed to delete user';
      toast.error(message);
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const formatStorage = (bytes) => {
    if (!bytes) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, i);
    return `${value.toFixed(1)} ${units[i]}`;
  };

  if (currentUser?.role !== 'admin') {
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
                <h1 className={styles.title}>Admin Panel</h1>
                <p className={styles.subtitle}>Manage users, roles, and professor requests</p>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setShowAddProfessor(true)}
                  className={styles.addBtn}
                  style={{ background: '#3B82F6' }}
                >
                  <Plus size={20} />
                  <span>Add Professor</span>
                </button>
                <button
                  onClick={() => setShowAddAdmin(true)}
                  className={styles.addBtn}
                  style={{ background: '#EF4444' }}
                >
                  <Plus size={20} />
                  <span>Add Admin</span>
                </button>
              </div>
            </div>
            {/* Pending Professor Requests */}
            {pendingProfessorRequests.length > 0 && (
              <div className={styles.tableCard}>
                <h2 className={styles.tableTitle}>Pending Professor Requests</h2>
                <div className={styles.requestsList}>
                  {pendingProfessorRequests.map(req => (
                    <div key={req.userId} className={styles.requestCard}>
                      <div className={styles.requestInfo}>
                        <div className={styles.requestHeader}>
                          <h3 className={styles.requestName}>{formatName(req.name)}</h3>
                          <span className={styles.requestStatus}>Pending</span>
                        </div>
                        <div className={styles.requestDetails}>
                          <div className={styles.requestDetail}>
                            <span className={styles.detailLabel}>Email:</span>
                            <span className={styles.detailValue}>{req.email}</span>
                          </div>
                          <div className={styles.requestDetail}>
                            <span className={styles.detailLabel}>College:</span>
                            <span className={styles.detailValue}>{currentCollege?.name || req.collegeId}</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.requestActions}>
                        <LoadingButton 
                          className={`${styles.actionBtn} ${styles.approveBtn}`}
                          isLoading={isProcessingRequest}
                          onClick={() => { approveProfessorRequest(req._id || req.id); }}
                          variant="success"
                        >
                          Approve
                        </LoadingButton>
                        <LoadingButton 
                          className={`${styles.actionBtn} ${styles.rejectBtn}`}
                          isLoading={isProcessingRequest}
                          onClick={() => { rejectProfessorRequest(req._id || req.id); }}
                          variant="danger"
                        >
                          Reject
                        </LoadingButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <HardDrive size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{formatStorage(totalStorage)}</div>
                  <div className={styles.statLabel}>Storage Used</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <User size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{adminUsers.length}</div>
                  <div className={styles.statLabel}>Total Admins</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <User size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{professorUsers.length}</div>
                  <div className={styles.statLabel}>Total Professors</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <User size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{totalUsers}</div>
                  <div className={styles.statLabel}>Total Users</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <HardDrive size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{totalFiles}</div>
                  <div className={styles.statLabel}>Total Files</div>
                </div>
              </div>
            </div>

            {/* Admins Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Admins Management</h2>
              <div className={styles.cardsGrid}>
                {adminUsers.map(user => {
                  const userId = user._id || user.id;
                  const isSelf = (currentUser?._id || currentUser?.id) === userId;
                  return (
                  <div key={userId} className={styles.userCard}>
                    <div className={styles.cardAvatarWrapper}>
                      {user.photo ? (
                        <img src={user.photo} alt={user.name} className={styles.cardAvatarImg} />
                      ) : (
                        <div className={styles.cardAvatar} style={{ background: '#EF4444' }}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardName}>{formatName(user.name)}</h3>
                      <p className={styles.cardEmail}>{user.email}</p>
                      <div className={styles.roleBadge} style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#EF4444'
                      }}>
                        <User size={12} />
                        <span>admin</span>
                      </div>
                    </div>
                    <div className={styles.cardActions}>
                      {!isSelf && (
                        <button
                          onClick={() => handleDeleteUser(userId)}
                          className={styles.deleteBtn}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                );})}
              </div>
            </div>

            {/* Professors Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Professors Management</h2>
              <div className={styles.cardsGrid}>
                {professorUsers.map(user => {
                  const userId = user._id || user.id;
                  return (
                  <div key={userId} className={styles.userCard}>
                    <div className={styles.cardAvatarWrapper}>
                      {user.photo ? (
                        <img src={user.photo} alt={user.name} className={styles.cardAvatarImg} />
                      ) : (
                        <div className={styles.cardAvatar} style={{ background: '#3B82F6' }}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardName}>{formatName(user.name)}</h3>
                      <p className={styles.cardEmail}>{user.email}</p>
                      <div className={styles.roleBadge} style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#3B82F6'
                      }}>
                        <GraduationCap size={12} />
                        <span>professor</span>
                      </div>
                    </div>
                    <div className={styles.cardActions}>
                      <button
                        onClick={() => handleDeleteUser(userId)}
                        className={styles.deleteBtn}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );})}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className={styles.modal} onClick={cancelDelete}>
          <div className={styles.deleteModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.deleteModalHeader}>
              <div style={{
                width: 48,
                height: 48,
                background: '#EF4444',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Trash2 size={24} color="#fff" />
              </div>
              <h2 className={styles.deleteModalTitle}>Delete User</h2>
            </div>
            <div className={styles.deleteModalBody}>
              <p>Are you sure you want to delete <strong>{userToDelete?.name}</strong>?</p>
              <p className={styles.deleteModalWarning}>This action cannot be undone.</p>
            </div>
            <div className={styles.deleteModalActions}>
              <button
                onClick={cancelDelete}
                className={styles.cancelDeleteBtn}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className={styles.confirmDeleteBtn}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddProfessor && (
        <div className={styles.modal} onClick={() => setShowAddProfessor(false)}>
          <div className={`${styles.modalContent} ${styles.professorModal}`} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Add New Professor</h2>
            <form onSubmit={handleAddProfessor} className={styles.form}>
              <FormInput
                label="Name"
                type="text"
                placeholder="Enter professor name"
                value={professorForm.name}
                onChange={(e) => setProfessorForm(prev => ({ ...prev, name: e.target.value }))}
                error={professorErrors.name}
                required
              />
              <FormInput
                label="Email"
                type="email"
                placeholder="Enter professor email"
                value={professorForm.email}
                onChange={(e) => setProfessorForm(prev => ({ ...prev, email: e.target.value }))}
                error={professorErrors.email}
                required
              />
              <FormInput
                label="Password"
                type="password"
                placeholder="Enter password (min 6 characters)"
                value={professorForm.password}
                onChange={(e) => setProfessorForm(prev => ({ ...prev, password: e.target.value }))}
                error={professorErrors.password}
                required
              />
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setShowAddProfessor(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <LoadingButton type="submit" variant="primary" className={styles.submitBtn}>
                  Add Professor
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddAdmin && (
        <div className={styles.modal} onClick={() => setShowAddAdmin(false)}>
          <div className={`${styles.modalContent} ${styles.adminModal}`} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Add New Admin</h2>
            <form onSubmit={handleAddAdmin} className={styles.form}>
              <FormInput
                label="Name"
                type="text"
                placeholder="Enter admin name"
                value={adminForm.name}
                onChange={(e) => setAdminForm(prev => ({ ...prev, name: e.target.value }))}
                error={adminErrors.name}
                required
              />
              <FormInput
                label="Email"
                type="email"
                placeholder="Enter admin email"
                value={adminForm.email}
                onChange={(e) => setAdminForm(prev => ({ ...prev, email: e.target.value }))}
                error={adminErrors.email}
                required
              />
              <FormInput
                label="Password"
                type="password"
                placeholder="Enter password (min 6 characters)"
                value={adminForm.password}
                onChange={(e) => setAdminForm(prev => ({ ...prev, password: e.target.value }))}
                error={adminErrors.password}
                required
              />
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setShowAddAdmin(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <LoadingButton type="submit" variant="primary" className={styles.submitBtn}>
                  Add Admin
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
