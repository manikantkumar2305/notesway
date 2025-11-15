import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { users, addUser, updateUser } from '../data/users';
import { User, GraduationCap, UserCircle, Plus, Edit, HardDrive } from 'lucide-react';
import styles from './AdminPanel.module.css';

export const AdminPanel = () => {
  const { currentUser, currentCollege } = useAuth();
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  // Filter users by current college
  const collegeUsers = users.filter(u => u.collegeId === currentCollege?.id);

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

  const handleAddUser = (e) => {
    e.preventDefault();
    addUser({
      ...formData,
      collegeId: currentCollege.id
    });
    setFormData({ name: '', email: '', password: '', role: 'student' });
    setShowAddUser(false);
  };

  const handleEditRole = (userId, newRole) => {
    updateUser(userId, { role: newRole });
    setEditingUser(null);
  };

  if (currentUser?.role !== 'admin') {
    return (
      <div className={styles.layout}>
        <Navbar />
        <div className={styles.main}>
          <Sidebar />
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
      <Navbar />
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div>
                <h1 className={styles.title}>Admin Panel</h1>
                <p className={styles.subtitle}>Manage users and system settings</p>
              </div>
              <button
                onClick={() => setShowAddUser(true)}
                className={styles.addBtn}
              >
                <Plus size={20} />
                <span>Add User</span>
              </button>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <HardDrive size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>24.5 GB</div>
                  <div className={styles.statLabel}>Storage Used</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <User size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{collegeUsers.length}</div>
                  <div className={styles.statLabel}>Total Users</div>
                </div>
              </div>
            </div>

            <div className={styles.tableCard}>
              <h2 className={styles.tableTitle}>Users Management</h2>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collegeUsers.map(user => (
                      <tr key={user.id}>
                        <td>
                          <div className={styles.userCell}>
                            <div className={styles.avatar}>
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          {editingUser === user.id ? (
                            <select
                              value={user.role}
                              onChange={(e) => handleEditRole(user.id, e.target.value)}
                              className={styles.roleSelect}
                            >
                              <option value="student">Student</option>
                              <option value="professor">Professor</option>
                              <option value="admin">Admin</option>
                            </select>
                          ) : (
                            <div className={`${styles.roleBadge} ${getRoleBadgeClass(user.role)}`}>
                              {getRoleIcon(user.role)}
                              <span>{user.role}</span>
                            </div>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => setEditingUser(editingUser === user.id ? null : user.id)}
                            className={styles.editBtn}
                          >
                            <Edit size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddUser && (
        <div className={styles.modal} onClick={() => setShowAddUser(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Add New User</h2>
            <form onSubmit={handleAddUser} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className={styles.select}
                >
                  <option value="student">Student</option>
                  <option value="professor">Professor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};