import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { validateEmail } from '../lib/securityUtils';
import { forgotPassword, verifyOtp } from '../services/authApi';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('email'); // 'email' | 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword({ email });

      toast.success(`Reset code sent to ${email}`);
      setStep('otp');
      setResendCountdown(60);

      const interval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError('Failed to send reset code. Please try again.');
      toast.error('Failed to send reset code');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp.trim()) {
      setError('Please enter the code');
      return;
    }

    if (otp.length < 4) {
      setError('Code must be at least 4 characters');
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOtp({ email, otp });

      localStorage.setItem('resetToken', response.reset_token);
      localStorage.setItem('resetEmail', email);

      toast.success('Code verified! Redirecting to reset password...');
      navigate('/reset-password');
    } catch (err) {
      setError('Invalid or expired code. Please try again.');
      toast.error('Code verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setResendCountdown(60);
    setOtp('');
    setError('');
    setIsLoading(true);

    try {
      await forgotPassword({ email });
      toast.success(`Reset code resent to ${email}`);

      const interval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      toast.error('Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtp('');
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Link to="/login" className={styles.backButton}>
            <ArrowLeft size={20} />
            <span>Back to Login</span>
          </Link>
        </div>

        {step === 'email' && (
          <div className={styles.content}>
            <div className={styles.icon}>
              <Mail size={48} color="#3B82F6" />
            </div>

            <h1 className={styles.title}>Forgot Password?</h1>
            <p className={styles.subtitle}>
              Enter your email address and we’ll send you a code.
            </p>

            <form onSubmit={handleSendOTP} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className={styles.submitButton}
              >
                {isLoading ? 'Sending...' : 'Send Reset Code'}
              </button>
            </form>
          </div>
        )}

        {step === 'otp' && (
          <div className={styles.content}>
            <div className={styles.icon}>
              <Mail size={48} color="#3B82F6" />
            </div>

            <h1 className={styles.title}>Enter Reset Code</h1>
            <p className={styles.subtitle}>
              We sent a 4-digit code to <strong>{email}</strong>
            </p>

            <form onSubmit={handleVerifyOTP} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Reset Code *</label>
                <input
                  type="text"
                  placeholder="Enter code"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setError('');
                  }}
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <button
                type="submit"
                disabled={isLoading || !otp.trim()}
                className={styles.submitButton}
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </button>
            </form>

            <div className={styles.resendContainer}>
              {resendCountdown > 0 ? (
                <p className={styles.resendText}>Resend code in {resendCountdown}s</p>
              ) : (
                <p className={styles.resendText}>
                  Code expired? <button onClick={handleResendOTP} className={styles.linkButton} disabled={isLoading}>Request new code</button>
                </p>
              )}
            </div>

            <button onClick={handleBackToEmail} className={styles.linkButton} style={{ display: 'block', margin: '12px auto 0' }}>
              Change Email Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
