import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSidebarState } from '../hooks/useSidebarState';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { FormInput } from '../components/FormInput';
import { LoadingButton } from '../components/LoadingButton';
import { fetchCollegeUsers, deleteUser } from '../services/adminApi';
import { User, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { validateForm } from '../lib/validation';
import styles from './ProfessorPanel.module.css';

export default function ProfessorPanel() {
  const { 
    currentUser, 
    currentCollege,
    deleteProfessor,
    registerStudent,
    refreshTrigger,
    setRefreshTrigger
  } = useAuth();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarState();
  const [showAddStudent, setShowAddStudent] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [studentErrors, setStudentErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentUser?.role === 'professor') {
      loadUsers();
    }
  }, [currentUser?.role]);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const data = await fetchCollegeUsers();
      setUsers(data.users || []);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  };

  // Filter users by current college
  const collegeUsers = users.filter(u => u.collegeId === (currentCollege?._id || currentCollege?.id));
  const collegeStudents = collegeUsers.filter(u => u.role === 'student');
  const adminUsers = collegeUsers.filter(u => u.role === 'admin');
  const professorUsers = collegeUsers.filter(u => u.role === 'professor');

  const formatName = (name = '') => {
    return name
      .split(' ')
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setStudentErrors({});

    const validation = validateForm(studentForm, ['name', 'email', 'password']);
    if (!validation.isValid) {
      setStudentErrors(validation.errors);
      toast.error(Object.values(validation.errors)[0]);
      return;
    }

    try {
      const result = await registerStudent({
        name: studentForm.name,
        email: studentForm.email,
        password: studentForm.password,
        collegeCode: currentCollege?.code || '',
      });

      if (!result.success) {
        setStudentErrors({ email: result.error });
        toast.error(result.error || 'Failed to add student');
        return;
      }

      setStudentForm({ name: '', email: '', password: '', role: 'student' });
      setShowAddStudent(false);
      toast.success(`Student ${studentForm.name} added successfully`);
      setRefreshTrigger(prev => prev + 1);
      await loadUsers();
    } catch (error) {
      const message = error?.response?.data?.detail || error.message || 'Failed to add student';
      toast.error(message);
    }
  };

  const handleDeleteUser = (userId) => {
    const user = collegeStudents.find(u => (u._id || u.id) === userId);
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
      toast.success('Student deleted');
      await loadUsers();
    } catch (error) {
      const message = error?.response?.data?.detail || error.message || 'Failed to delete student';
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

  if (currentUser?.role !== 'professor') {
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
                <h1 className={styles.title}>Professor Panel</h1>
                <p className={styles.subtitle}>Manage your students and track their progress</p>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setShowAddStudent(true)}
                  className={styles.addBtn}
                  style={{ background: '#10B981' }}
                >
                  <Plus size={20} />
                  <span>Add Student</span>
                </button>
              </div>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <User size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{loadingUsers ? '...' : adminUsers.length}</div>
                  <div className={styles.statLabel}>Total Admins</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <User size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{loadingUsers ? '...' : professorUsers.length}</div>
                  <div className={styles.statLabel}>Total Professors</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <User size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{loadingUsers ? '...' : collegeStudents.length}</div>
                  <div className={styles.statLabel}>Total Students</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <User size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{loadingUsers ? '...' : adminUsers.length + professorUsers.length + collegeStudents.length}</div>
                  <div className={styles.statLabel}>Total Users</div>
                </div>
              </div>
            </div>

            {/* Admins Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Admins</h2>
              <div className={styles.cardsGrid}>
                {adminUsers.map(user => {
                  const userId = user._id || user.id;
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
                  </div>
                );})}
              </div>
            </div>

            {/* Professors Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Professors</h2>
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
                        <User size={12} />
                        <span>professor</span>
                      </div>
                    </div>
                  </div>
                );})}
              </div>
            </div>

            {/* Students Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Students Management</h2>
              <div className={styles.cardsGrid}>
                {collegeStudents.map(user => {
                  const userId = user._id || user.id;
                  return (
                    <div key={userId} className={styles.userCard}>
                    <div className={styles.cardAvatarWrapper}>
                      {user.photo ? (
                        <img src={user.photo} alt={user.name} className={styles.cardAvatarImg} />
                      ) : (
                        <div className={styles.cardAvatar} style={{ background: '#10B981' }}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardName}>{formatName(user.name)}</h3>
                      <p className={styles.cardEmail}>{user.email}</p>
                      <div className={styles.roleBadge} style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#10B981'
                      }}>
                        <User size={12} />
                        <span>student</span>
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
                  );
                })}
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
              <h2 className={styles.deleteModalTitle}>Delete Student</h2>
            </div>
            <div className={styles.deleteModalBody}>
              <p>Are you sure you want to delete <strong>{formatName(userToDelete?.name)}</strong>?</p>
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
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddStudent && (
        <div className={styles.modal} onClick={() => setShowAddStudent(false)}>
          <div className={`${styles.modalContent} ${styles.studentModal}`} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Add New Student</h2>
            <form onSubmit={handleAddStudent} className={styles.form}>
              <FormInput
                label="Name"
                type="text"
                placeholder="Enter student name"
                value={studentForm.name}
                onChange={(e) => setStudentForm(prev => ({ ...prev, name: e.target.value }))}
                error={studentErrors.name}
                required
              />
              <FormInput
                label="Email"
                type="email"
                placeholder="Enter student email"
                value={studentForm.email}
                onChange={(e) => setStudentForm(prev => ({ ...prev, email: e.target.value }))}
                error={studentErrors.email}
                required
              />
              <FormInput
                label="Password"
                type="password"
                placeholder="Enter password (min 6 characters)"
                value={studentForm.password}
                onChange={(e) => setStudentForm(prev => ({ ...prev, password: e.target.value }))}
                error={studentErrors.password}
                required
              />
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setShowAddStudent(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <LoadingButton type="submit" variant="primary" className={styles.submitBtn}>
                  Add Student
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
