import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { PasswordStrengthIndicator } from '../components/PasswordStrengthIndicator.jsx';
import { sanitizeInput, validatePasswordStrength } from '../lib/securityUtils';
import { resetPassword } from '../services/authApi';
import styles from './ResetPassword.module.css';

function ResetPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState('password');
  const [resetData, setResetData] = useState(null);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('resetToken');
    const email = localStorage.getItem('resetEmail');

    if (!token || !email) {
      toast.error('Invalid reset flow. Please start again.');
      navigate('/forgot-password');
      return;
    }

    setResetData({ token, email });
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));
    setError('');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const validation = validatePasswordStrength(formData.newPassword);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword({
        email: resetData.email,
        reset_token: resetData.token,
        new_password: formData.newPassword,
      });

      localStorage.removeItem('resetToken');
      localStorage.removeItem('resetEmail');

      setStep('success');
      toast.success('Password reset successful');

      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setError('Failed to reset password. Please try again.');
      toast.error('Password reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.icon}>
              <CheckCircle size={64} color="#10b981" />
            </div>
            <h1 className={styles.title}>Password Reset</h1>
            <p className={styles.subtitle}>
              Your password has been successfully reset. You can now log in with your new password.
            </p>
            <p className={styles.redirectText}>
              Redirecting to login page in a moment...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!resetData) return null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <button
          onClick={() => navigate('/forgot-password')}
          className={styles.backButton}
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className={styles.content}>
          <div className={styles.icon}>
            <Lock size={48} color="#3B82F6" />
          </div>

          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.subtitle}>
            Enter your new password below. Make sure it's strong and unique.
          </p>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleResetPassword} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>New Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <PasswordStrengthIndicator password={formData.newPassword} />

            <div className={styles.formGroup}>
              <label className={styles.label}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter new password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <button type="submit" disabled={isLoading} className={styles.submitButton}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <p className={styles.helperText}>
            Remember your new password? <button onClick={() => navigate('/login')} className={styles.linkButton}>Return to Login</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
