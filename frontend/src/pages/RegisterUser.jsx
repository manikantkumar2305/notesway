import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getCollegeById } from '../data/colleges';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import styles from './RegisterUser.module.css';

export const RegisterUser = () => {
  const navigate = useNavigate();
  const { registerUser, googleLoginMock } = useAuth();
  const [college, setCollege] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get pending college ID
    const collegeId = localStorage.getItem('pendingCollegeId');
    if (!collegeId) {
      navigate('/register-college');
      return;
    }

    const collegeData = getCollegeById(collegeId);
    if (collegeData) {
      setCollege(collegeData);
    } else {
      navigate('/register-college');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const result = registerUser({
      ...formData,
      collegeId: college.id
    });

    if (result.success) {
      localStorage.removeItem('pendingCollegeId');
      navigate('/dashboard');
    } else {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    const result = googleLoginMock(college.id);
    if (result.success) {
      localStorage.removeItem('pendingCollegeId');
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  if (!college) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <UserPlus size={40} />
          </div>
          <h1 className={styles.title}>Create Your Account</h1>
          <p className={styles.subtitle}>
            Register for <strong>{college.name}</strong>
          </p>
        </div>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="John Doe"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="john@example.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className={styles.input}
              placeholder="••••••••"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Role *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="student">Student</option>
              <option value="professor">Professor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitBtn}
          >
            {isSubmitting ? (
              <>
                <div className={styles.spinner}></div>
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <GoogleLoginButton onClick={handleGoogleLogin} />

        <div className={styles.footer}>
          Already have an account?{' '}
          <a href="/login" className={styles.link}>
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};