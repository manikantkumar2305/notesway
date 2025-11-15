import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { colleges } from '../data/colleges';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import styles from './Login.module.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login, googleLoginMock } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    collegeId: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const result = login(formData.email, formData.password, formData.collegeId);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!formData.collegeId) {
      setError('Please select your college first');
      return;
    }

    const result = googleLoginMock(formData.collegeId);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <LogIn size={40} />
          </div>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>
            Sign in to access your notes and resources
          </p>
        </div>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>College *</label>
            <select
              name="collegeId"
              value={formData.collegeId}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Select your college</option>
              {colleges.map(college => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>
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
              className={styles.input}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitBtn}
          >
            {isSubmitting ? (
              <>
                <div className={styles.spinner}></div>
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <GoogleLoginButton onClick={handleGoogleLogin} />

        <div className={styles.footer}>
          New to NoteShare Vault?{' '}
          <a href="/register-college" className={styles.link}>
            Register Your College
          </a>
        </div>
      </div>
    </div>
  );
};