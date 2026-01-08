
### 1. FRONTEND FOLDER STRUCTURE (AUTO-GENERATED)
frontend
plugins
public
src
.env
.gitignore
components.json
craco.config.js
frontend.log
jsconfig.json
package-lock.json
package.json
postcss.config.js
README.md
tailwind.config.js
yarn.lock
plugins\health-check
plugins\visual-edits
plugins\health-check\health-endpoints.js
plugins\health-check\webpack-health-plugin.js
plugins\visual-edits\babel-metadata-plugin.js
plugins\visual-edits\dev-server-setup.js
public\index.html
src\components
src\context
src\data
src\hooks
src\lib
src\pages
src\styles
src\utils
src\App.css
src\App.js
src\index.css
src\index.js
src\components\ui
src\components\CTASection.jsx
src\components\DeleteConfirmModal.jsx
src\components\DeleteConfirmModal.module.css
src\components\EditFileModal.jsx
src\components\EditFileModal.module.css
src\components\FeaturesGrid.jsx
src\components\FileCard.jsx
src\components\FileCard.module.css
src\components\Footer.jsx
src\components\FormError.jsx
src\components\FormError.module.css
src\components\FormInput.jsx
src\components\FormInput.module.css
src\components\GoogleLoginButton.jsx
src\components\GoogleLoginButton.module.css
src\components\HeroSection.jsx
src\components\HowItWorks.jsx
src\components\LoadingButton.jsx
src\components\LoadingButton.module.css
src\components\LoginModal.jsx
src\components\ModalOverlay.jsx
src\components\Navbar.jsx
src\components\Navbar.module.css
src\components\NotificationBell.jsx
src\components\NotificationBell.module.css
src\components\PasswordStrengthIndicator.jsx
src\components\PasswordStrengthIndicator.module.css
src\components\ProductPreview.jsx
src\components\SearchBar.jsx
src\components\SearchBar.module.css
src\components\SecuritySection.jsx
src\components\SessionTimeoutWarning.jsx
src\components\SessionTimeoutWarning.module.css
src\components\ShareModal.jsx
src\components\ShareModal.module.css
src\components\Sidebar.jsx
src\components\Sidebar.module.css
src\components\StudentRegistrationModal.jsx
src\components\ThemeToggle.jsx
src\components\ThemeToggle.module.css
src\components\UploadForm.jsx
src\components\UploadForm.module.css
src\components\UserRoles.jsx
src\components\ui\accordion.jsx
src\components\ui\alert-dialog.jsx
src\components\ui\alert.jsx
src\components\ui\aspect-ratio.jsx
src\components\ui\avatar.jsx
src\components\ui\badge.jsx
src\components\ui\breadcrumb.jsx
src\components\ui\button.jsx
src\components\ui\calendar.jsx
src\components\ui\card.jsx
src\components\ui\carousel.jsx
src\components\ui\checkbox.jsx
src\components\ui\collapsible.jsx
src\components\ui\command.jsx
src\components\ui\context-menu.jsx
src\components\ui\dialog.jsx
src\components\ui\drawer.jsx
src\components\ui\dropdown-menu.jsx
src\components\ui\form.jsx
src\components\ui\hover-card.jsx
src\components\ui\input-otp.jsx
src\components\ui\input.jsx
src\components\ui\label.jsx
src\components\ui\menubar.jsx
src\components\ui\navigation-menu.jsx
src\components\ui\pagination.jsx
src\components\ui\popover.jsx
src\components\ui\progress.jsx
src\components\ui\radio-group.jsx
src\components\ui\resizable.jsx
src\components\ui\scroll-area.jsx
src\components\ui\select.jsx
src\components\ui\separator.jsx
src\components\ui\sheet.jsx
src\components\ui\skeleton.jsx
src\components\ui\slider.jsx
src\components\ui\sonner.jsx
src\components\ui\switch.jsx
src\components\ui\table.jsx
src\components\ui\tabs.jsx
src\components\ui\textarea.jsx
src\components\ui\toast.jsx
src\components\ui\toaster.jsx
src\components\ui\toggle-group.jsx
src\components\ui\toggle.jsx
src\components\ui\tooltip.jsx
src\context\ThemeContext.jsx
src\data\colleges.js
src\data\files.js
src\data\notifications.js
src\data\registrationCodes.js
src\data\users.js
src\hooks\use-toast.js
src\hooks\useAuth.js
src\hooks\useFiles.js
src\hooks\useFileUpdate.js
src\hooks\useSecureAuth.js
src\hooks\useSidebarState.js
src\lib\downloadUtils.js
src\lib\securityUtils.js
src\lib\utils.js
src\lib\validation.js
src\pages\AdminPanel.jsx
src\pages\AdminPanel.module.css
src\pages\Dashboard.jsx
src\pages\Dashboard.module.css
src\pages\FileDetails.jsx
src\pages\FileDetails.module.css
src\pages\ForgotPassword.jsx
src\pages\ForgotPassword.module.css
src\pages\LandingPage.jsx
src\pages\Login.jsx
src\pages\Login.module.css
src\pages\MyUploads.jsx
src\pages\MyUploads.module.css
src\pages\ProfessorPanel.jsx
src\pages\ProfessorPanel.module.css
src\pages\Profile.jsx
src\pages\Profile.module.css
src\pages\RegisterStudent.module.css
src\pages\RegisterUser.jsx
src\pages\RegisterUser.module.css
src\pages\ResetPassword.jsx
src\pages\ResetPassword.module.css
src\pages\Search.jsx
src\pages\Search.module.css
src\pages\StudentPanel.jsx
src\pages\StudentPanel.module.css
src\pages\Upload.jsx
src\pages\Upload.module.css
src\styles\components.css
src\styles\globals.css
src\styles\layout.css
src\styles\theme.css
src\utils\secureAuth.js

### 2. FRONTEND ENV VARIABLES (AUTO-DETECTED)
```dotenv
REACT_APP_BACKEND_URL=https://notes-college-hub.preview.emergentagent.com
WDS_SOCKET_PORT=443
REACT_APP_ENABLE_VISUAL_EDITS=false
ENABLE_HEALTH_CHECK=false
```

### 3.1 Login.jsx
```jsx
import { useState, useEffect } from 'react';
import { BookOpen, Users, Shield, Upload, MessageSquare, TrendingUp, Lock, Bell, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getCollegeByCode } from '../data/colleges';
import styles from './Login.module.css';

export const Login = ({ onClose }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    collegeCode: '',
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const features = [
    {
      icon: BookOpen,
      title: 'Share Notes & Resources',
      desc: 'Upload and share your academic materials with classmates instantly',
      heading: 'Share with ease',
      text: 'Collaborate effortlessly by sharing notes, documents, and resources with your study groups and classmates in real time.',
      items: [
        { icon: Users, label: 'Share with classmates' },
        { icon: Shield, label: 'Private sharing controls' }
      ]
    },
    {
      icon: Upload,
      title: 'Easy File Upload',
      desc: 'Drag and drop files or upload documents with comprehensive support',
      heading: 'Simple uploads',
      text: 'Intuitive drag-and-drop interface makes uploading files quick and easy. Support for all major document formats.',
      items: [
        { icon: Upload, label: 'Drag & drop support' },
        { icon: Shield, label: 'Secure file storage' }
      ]
    },
    {
      icon: Lock,
      title: 'Access Permissions',
      desc: 'Fine-grained control over who can view, edit, and share your files',
      heading: 'Control access',
      text: 'Set granular permissions for each file and folder. Manage who can view, edit, download, or share your academic materials with precision.',
      items: [
        { icon: Shield, label: 'Role-based access control' },
        { icon: Lock, label: 'Granular permissions' }
      ]
    },
    {
      icon: TrendingUp,
      title: 'Activity Tracking',
      desc: 'Monitor file access, contributions, and activity across your network',
      heading: 'Track progress',
      text: 'Monitor contributions, track file access patterns, and gain insights into your academic activities and growth.',
      items: [
        { icon: TrendingUp, label: 'View activity insights' },
        { icon: Shield, label: 'Detailed access logs' }
      ]
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      desc: 'Get instant alerts for important updates, file changes, and collaboration activities',
      heading: 'Stay informed',
      text: 'Receive smart, customizable notifications about file updates, new comments, access requests, and collaboration activities in real-time.',
      items: [
        { icon: Bell, label: 'Instant notifications' },
        { icon: Users, label: 'Collaboration alerts' }
      ]
    }
  ];

  useEffect(() => {
    // If college was just registered, pre-fill the code
    const registeredCode = localStorage.getItem('registeredCollegeCode');
    if (registeredCode) {
      localStorage.removeItem('registeredCollegeCode');
    }

    // Load remembered email if exists
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedCode = localStorage.getItem('rememberedCollege');
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        collegeCode: rememberedCode || '',
        rememberMe: true
      }));
    }
  }, []);

  // Auto-rotate carousel every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [features.length]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth login
    // For now, show a message
    setError('Google login coming soon!');
    setTimeout(() => setError(''), 3000);
    console.log('Google login button clicked');
    // In production, you would:
    // 1. Redirect to Google OAuth endpoint
    // 2. Handle OAuth callback
    // 3. Send token to backend for verification
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate college code
    if (!formData.collegeCode.trim()) {
      setError('College code is required');
      setIsSubmitting(false);
      return;
    }

    // Get college by code
    const college = getCollegeByCode(formData.collegeCode);
    if (!college) {
      setError('Invalid college code');
      setIsSubmitting(false);
      return;
    }

    // Handle remember me
    if (formData.rememberMe) {
      localStorage.setItem('rememberedEmail', formData.email);
      localStorage.setItem('rememberedCollege', formData.collegeCode);
    } else {
      // Clear remembered data if unchecked
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedCollege');
    }

    // Login with email, password, and collegeId
    const result = login(formData.email, formData.password, college.id);

    if (result.success) {
      // Close modal on success
      if (onClose) onClose();
      // Navigate to dashboard
      window.location.href = '/dashboard';
    } else {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Left Panel - Login Form */}
      <div className={styles.leftPanel}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Sign in</h1>
            <p className={styles.formSubtitle}>Welcome back to StudyHub</p>
          </div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>College Code</label>
              <input
                type="text"
                name="collegeCode"
                value={formData.collegeCode}
                onChange={handleChange}
                className={styles.input}
                placeholder="e.g., ACE"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="example@gmail.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6b7280'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    style={{ cursor: 'pointer' }}
                  />
                  <span>Remember me</span>
                </label>
                <a href="/forgot-password" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitBtn}
            >
              {isSubmitting ? 'Signing In...' : 'Sign in'}
            </button>
          </form>

          <div className={styles.footer}>
            Don't have an account?{' '}
            <a href="/register" className={styles.link}>
              Create now
            </a>
          </div>
        </div>
      </div>

      {/* Right Panel - Features */}
      <div className={styles.rightPanel}>
        <div className={styles.featuresContainer}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              {(() => {
                const CurrentIcon = features[activeFeature].icon;
                return <CurrentIcon size={32} />;
              })()}
            </div>
            <h2 className={styles.featureTitle}>{features[activeFeature].title}</h2>
            <p className={styles.featureDesc}>
              {features[activeFeature].desc}
            </p>
          </div>

          <h3 className={styles.featureHeading}>{features[activeFeature].heading}</h3>
          <p className={styles.featureText}>
            {features[activeFeature].text}
          </p>

          <div className={styles.featureList}>
            {features[activeFeature].items.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className={styles.featureItem}>
                  <ItemIcon size={20} />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className={styles.dots}>
            {features.map((_, index) => (
              <span
                key={index}
                className={index === activeFeature ? styles.active : ''}
                onClick={() => setActiveFeature(index)}
                style={{ cursor: 'pointer' }}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
```

### 3.2 Signup.jsx
File not found in project.

### 3.3 ForgotPassword.jsx
```jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { validateEmail } from '../lib/securityUtils';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'success'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);

  // Step 1: Send OTP to email
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
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Backend API call
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      // For now, simulate success
      toast.success(`Reset code sent to ${email}`);
      setStep('otp');
      setResendCountdown(60); // 60 second countdown

      // Countdown timer
      const interval = setInterval(() => {
        setResendCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.message || 'Failed to send reset code. Please try again.');
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
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Backend API call
      // const response = await fetch('/api/auth/verify-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, otp })
      // });

      // For now, simulate success and store token
      const resetToken = `reset_${Date.now()}_${Math.random()}`;
      localStorage.setItem('resetToken', resetToken);
      localStorage.setItem('resetEmail', email);

      toast.success('Code verified! Redirecting to reset password...');
      setTimeout(() => {
        navigate('/reset-password', { state: { email, token: resetToken } });
      }, 1500);
    } catch (err) {
      setError(err.message || 'Invalid or expired code. Please try again.');
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Reset code resent to ${email}`);

      // Countdown timer
      const interval = setInterval(() => {
        setResendCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      toast.error('Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to email input
  const handleBackToEmail = () => {
    setStep('email');
    setOtp('');
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <Link to="/login" className={styles.backButton}>
            <ArrowLeft size={20} />
            <span>Back to Login</span>
          </Link>
        </div>

        {/* Content */}
        {step === 'email' && (
          <div className={styles.content}>
            <div className={styles.icon}>
              <Mail size={48} color="#3B82F6" />
            </div>

            <h1 className={styles.title}>Forgot Password?</h1>
            <p className={styles.subtitle}>
              No worries! Enter your email address and we'll send you a code to reset your password.
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
                  placeholder="your@email.com"
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

            <p className={styles.helperText}>
              Remember your password? <Link to="/login">Back to Login</Link>
            </p>
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
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.toUpperCase());
                    setError('');
                  }}
                  placeholder="Enter code"
                  className={styles.input}
                  maxLength={10}
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
                <p className={styles.resendText}>
                  Resend code in <strong>{resendCountdown}s</strong>
                </p>
              ) : (
                <button
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className={styles.resendButton}
                >
                  Resend Code
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleBackToEmail}
              className={styles.changeEmailButton}
            >
              Change Email Address
            </button>

            <p className={styles.helperText}>
              Code expired? <button
                type="button"
                onClick={handleBackToEmail}
                className={styles.linkButton}
              >
                Request new code
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

```

### 4.1 Upload Page
```jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFiles } from '../hooks/useFiles';
import { useSidebarState } from '../hooks/useSidebarState';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { UploadForm } from '../components/UploadForm';
import { CheckCircle } from 'lucide-react';
import { addNotification } from '../data/notifications';
import styles from './Upload.module.css';

export const Upload = () => {
  const navigate = useNavigate();
  const { currentUser, currentCollege } = useAuth();
  const { addFile } = useFiles();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarState();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (fileData) => {
    const result = addFile(fileData);

    if (result.success) {
      // Create notification for all roles in the college
      addNotification({
        type: 'file_upload',
        title: `New ${fileData.subject} Notes`,
        message: `${currentUser?.name} (${currentUser?.role}) uploaded "${fileData.title}"`,
        fileName: fileData.title,
        uploaderName: currentUser?.name,
        uploaderRole: currentUser?.role,
        collegeId: currentCollege?.id,
        targetRoles: ['admin', 'professor', 'student'], // All roles see this
        relatedId: result.file?.id
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/dashboard');
      }, 2000);
    }

    return result;
  };

  return (
    <div className={styles.layout}>
      <Navbar onMenuToggle={toggleSidebar} />
      <div className={styles.main}>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1 className={styles.title}>Upload Notes</h1>
              <p className={styles.subtitle}>
                Share your knowledge with fellow students and professors
              </p>
            </div>

            <div className={styles.formWrapper}>
              <UploadForm
                onSubmit={handleSubmit}
                uploaderName={currentUser?.name}
                uploaderRole={currentUser?.role}
              />
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className={styles.successModal}>
          <div className={styles.successContent}>
            <div className={styles.successIconWrapper}>
              <CheckCircle size={56} className={styles.successIcon} />
            </div>
            <h2 className={styles.successTitle}>Upload Successful!</h2>
            <p className={styles.successMessage}>Your notes have been uploaded successfully</p>
            <div className={styles.successSubtitle}>Redirecting to dashboard...</div>
          </div>
        </div>
      )}
    </div>
  );
};
```

### 4.2 Upload Hooks (useUpload)
File not found in project.

### 4.3 Upload Hooks (useFile)
File not found in project.

### 5.1 Student Dashboard
File not found in project.

### 5.2 Professor Dashboard
File not found in project.

### 5.3 Admin Dashboard
File not found in project.

### 5.4 Student Panel
```jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSidebarState } from '../hooks/useSidebarState';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { users } from '../data/users';
import { User, GraduationCap, UserCircle } from 'lucide-react';
import styles from './StudentPanel.module.css';

export default function StudentPanel() {
  const { currentUser, currentCollege } = useAuth();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter users by current college
  const collegeUsers = users.filter(u => u.collegeId === currentCollege?.id);
  const adminUsers = collegeUsers.filter(u => u.role === 'admin');
  const professorUsers = collegeUsers.filter(u => u.role === 'professor');

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin':
        return <UserCircle size={16} />;
      case 'professor':
        return <GraduationCap size={16} />;
      default:
        return <User size={16} />;
    }
  };

  if (currentUser?.role !== 'student') {
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
                <h1 className={styles.title}>Faculty Directory</h1>
                <p className={styles.subtitle}>View administrators and professors in your college</p>
              </div>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <UserCircle size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{adminUsers.length}</div>
                  <div className={styles.statLabel}>Total Admins</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <GraduationCap size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{professorUsers.length}</div>
                  <div className={styles.statLabel}>Total Professors</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <User size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{adminUsers.length + professorUsers.length}</div>
                  <div className={styles.statLabel}>Total Faculty</div>
                </div>
              </div>
            </div>

            {/* Admins Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Administrators</h2>
              {adminUsers.length === 0 ? (
                <div className={styles.emptyMessage}>No administrators in your college</div>
              ) : (
                <div className={styles.cardsGrid}>
                  {adminUsers.map(admin => (
                    <div key={admin.id} className={styles.card}>
                      <div className={styles.cardAvatarWrapper}>
                        {admin.photo ? (
                          <img src={admin.photo} alt={admin.name} className={styles.cardAvatarImg} />
                        ) : (
                          <div className={styles.cardAvatar} style={{ background: '#EF4444' }}>
                            {admin.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardName}>{admin.name}</h3>
                        <p className={styles.cardEmail}>{admin.email}</p>
                        <div className={styles.cardRole} style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#EF4444'
                        }}>
                          <UserCircle size={12} />
                          <span>Administrator</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Professors Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Professors</h2>
              {professorUsers.length === 0 ? (
                <div className={styles.emptyMessage}>No professors in your college</div>
              ) : (
                <div className={styles.cardsGrid}>
                  {professorUsers.map(professor => (
                    <div key={professor.id} className={styles.card}>
                      <div className={styles.cardAvatarWrapper}>
                        {professor.photo ? (
                          <img src={professor.photo} alt={professor.name} className={styles.cardAvatarImg} />
                        ) : (
                          <div className={styles.cardAvatar} style={{ background: '#3B82F6' }}>
                            {professor.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardName}>{professor.name}</h3>
                        <p className={styles.cardEmail}>{professor.email}</p>
                        <div className={styles.cardRole} style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          color: '#3B82F6'
                        }}>
                          <GraduationCap size={12} />
                          <span>Professor</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

### 5.5 Professor Panel
```jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSidebarState } from '../hooks/useSidebarState';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { FormInput } from '../components/FormInput';
import { LoadingButton } from '../components/LoadingButton';
import { users, addUser, updateUser, deleteUser, getUserByEmail } from '../data/users';
import { User, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { validateForm } from '../lib/validation';
import styles from './ProfessorPanel.module.css';

export default function ProfessorPanel() {
  const { 
    currentUser, 
    currentCollege,
    deleteProfessor,
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter users by current college
  const collegeUsers = users.filter(u => u.collegeId === currentCollege?.id);
  const collegeStudents = collegeUsers.filter(u => u.role === 'student');
  const adminUsers = collegeUsers.filter(u => u.role === 'admin');
  const professorUsers = collegeUsers.filter(u => u.role === 'professor');

  const handleAddStudent = (e) => {
    e.preventDefault();
    setStudentErrors({});

    // Validate form
    const validation = validateForm(studentForm, ['name', 'email', 'password']);
    if (!validation.isValid) {
      setStudentErrors(validation.errors);
      toast.error(Object.values(validation.errors)[0]);
      return;
    }

    // Check for duplicate email
    if (getUserByEmail(studentForm.email)) {
      setStudentErrors({ email: 'Email already exists' });
      toast.error('Email already exists');
      return;
    }

    addUser({
      ...studentForm,
      collegeId: currentCollege.id
    });
    setStudentForm({ name: '', email: '', password: '', role: 'student' });
    setShowAddStudent(false);
    toast.success(`Student ${studentForm.name} added successfully`);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleDeleteUser = (userId) => {
    const user = collegeStudents.find(u => u.id === userId);
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setShowDeleteModal(false);
      setUserToDelete(null);
      setRefreshTrigger(prev => prev + 1);
      toast.success(`${userToDelete.name} has been deleted successfully`);
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
                  <div className={styles.statValue}>{collegeStudents.length}</div>
                  <div className={styles.statLabel}>Total Students</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <User size={24} className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{adminUsers.length + professorUsers.length + collegeStudents.length}</div>
                  <div className={styles.statLabel}>Total Users</div>
                </div>
              </div>
            </div>

            {/* Admins Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Admins</h2>
              <div className={styles.cardsGrid}>
                {adminUsers.map(user => (
                  <div key={user.id} className={styles.userCard}>
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
                      <h3 className={styles.cardName}>{user.name}</h3>
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
                ))}
              </div>
            </div>

            {/* Professors Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Professors</h2>
              <div className={styles.cardsGrid}>
                {professorUsers.map(user => (
                  <div key={user.id} className={styles.userCard}>
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
                      <h3 className={styles.cardName}>{user.name}</h3>
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
                ))}
              </div>
            </div>

            {/* Students Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Students Management</h2>
              <div className={styles.cardsGrid}>
                {collegeStudents.map(user => (
                  <div key={user.id} className={styles.userCard}>
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
                      <h3 className={styles.cardName}>{user.name}</h3>
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
                        onClick={() => handleDeleteUser(user.id)}
                        className={styles.deleteBtn}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
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

```

### 5.6 Admin Panel
```jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSidebarState } from '../hooks/useSidebarState';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { FormInput } from '../components/FormInput';
import { LoadingButton } from '../components/LoadingButton';
import { users, addUser, updateUser, deleteUser, getUserByEmail } from '../data/users';
import { User, GraduationCap, UserCircle, Plus, Edit, HardDrive, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { validateForm } from '../lib/validation';
import styles from './AdminPanel.module.css';

export default function AdminPanel() {
    const { 
    currentUser, 
    currentCollege,
    approveProfessorRequest, 
    rejectProfessorRequest,
    deleteProfessor,
    addNewProfessor,
    addNewStudent,
    deleteStudent,
    refreshTrigger,
    setRefreshTrigger,
    pendingProfessorRequests,
    isProcessingRequest
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter users by current college
  const collegeUsers = users.filter(u => u.collegeId === currentCollege?.id);
  const adminUsers = collegeUsers.filter(u => u.role === 'admin');
  const professorUsers = collegeUsers.filter(u => u.role === 'professor');

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

  const handleAddProfessor = (e) => {
    e.preventDefault();
    setProfessorErrors({});

    // Validate form
    const validation = validateForm(professorForm, ['name', 'email', 'password']);
    if (!validation.isValid) {
      setProfessorErrors(validation.errors);
      toast.error(Object.values(validation.errors)[0]);
      return;
    }

    // Check for duplicate email
    if (getUserByEmail(professorForm.email)) {
      setProfessorErrors({ email: 'Email already exists' });
      toast.error('Email already exists');
      return;
    }

    addUser({
      ...professorForm,
      collegeId: currentCollege.id
    });
    setProfessorForm({ name: '', email: '', password: '', role: 'professor' });
    setShowAddProfessor(false);
    toast.success(`Professor ${professorForm.name} added successfully`);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    setAdminErrors({});

    // Validate form
    const validation = validateForm(adminForm, ['name', 'email', 'password']);
    if (!validation.isValid) {
      setAdminErrors(validation.errors);
      toast.error(Object.values(validation.errors)[0]);
      return;
    }

    // Check for duplicate email
    if (getUserByEmail(adminForm.email)) {
      setAdminErrors({ email: 'Email already exists' });
      toast.error('Email already exists');
      return;
    }

    addUser({
      ...adminForm,
      collegeId: currentCollege.id
    });
    setAdminForm({ name: '', email: '', password: '', role: 'admin' });
    setShowAddAdmin(false);
    toast.success(`Admin ${adminForm.name} added successfully`);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEditRole = (userId, newRole) => {
    updateUser(userId, { role: newRole });
  };

  const handleDeleteUser = (userId) => {
    const user = collegeUsers.find(u => u.id === userId);
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setShowDeleteModal(false);
      setUserToDelete(null);
      setRefreshTrigger(prev => prev + 1);
      toast.success(`${userToDelete.name} has been deleted successfully`);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
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
                          <h3 className={styles.requestName}>{req.name}</h3>
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
                          onClick={() => { approveProfessorRequest(req.userId); }}
                          variant="success"
                        >
                          Approve
                        </LoadingButton>
                        <LoadingButton 
                          className={`${styles.actionBtn} ${styles.rejectBtn}`}
                          isLoading={isProcessingRequest}
                          onClick={() => { rejectProfessorRequest(req.userId); }}
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
                  <div className={styles.statValue}>24.5 GB</div>
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
                  <div className={styles.statValue}>{adminUsers.length + professorUsers.length}</div>
                  <div className={styles.statLabel}>Total Users</div>
                </div>
              </div>
            </div>

            {/* Admins Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Admins Management</h2>
              <div className={styles.cardsGrid}>
                {adminUsers.map(user => (
                  <div key={user.id} className={styles.userCard}>
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
                      <h3 className={styles.cardName}>{user.name}</h3>
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
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className={styles.deleteBtn}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professors Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Professors Management</h2>
              <div className={styles.cardsGrid}>
                {professorUsers.map(user => (
                  <div key={user.id} className={styles.userCard}>
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
                      <h3 className={styles.cardName}>{user.name}</h3>
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
                        onClick={() => handleDeleteUser(user.id)}
                        className={styles.deleteBtn}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
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

```

### 5.7 Dashboard
```jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFiles } from '../hooks/useFiles';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { FileCard } from '../components/FileCard';
import { SearchBar } from '../components/SearchBar';
import { Upload, Search, Settings, TrendingUp, FileText, Users, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { currentUser, requestProfessorAccess } = useAuth();
  const { getRecentFiles, getFilesBySubject, collegeFiles, deleteFile } = useFiles();
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const recentFiles = getRecentFiles(6);
  const filesBySubject = getFilesBySubject();
  const subjects = Object.keys(filesBySubject);

  // Check if user can delete a specific file
  const canDeleteFile = (file) => {
    return currentUser && file.uploaderId === currentUser.id;
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteFile = (fileId) => {
    const result = deleteFile(fileId);
    if (result.success) {
      showToast('File deleted successfully', 'success');
    } else {
      showToast(result.error || 'Failed to delete file', 'error');
    }
  };

  const quickActions = [
    { to: '/upload', icon: <Upload size={24} />, label: 'Upload Notes', color: '#3B82F6' },
    { to: '/search', icon: <Search size={24} />, label: 'Search Notes', color: '#10B981' },
  ];

  if (currentUser?.role === 'admin') {
    quickActions.push(
      { to: '/admin', icon: <Settings size={24} />, label: 'Admin Panel', color: '#EF4444' }
    );
  }

  const stats = [
    { label: 'Total Notes', value: collegeFiles.length, icon: <FileText size={24} />, color: '#3B82F6' },
    { label: 'Subjects', value: subjects.length, icon: <BookOpen size={24} />, color: '#10B981' },
    { label: 'Contributors', value: new Set(collegeFiles.map(f => f.uploaderName)).size, icon: <Users size={24} />, color: '#F59E0B' },
  ];

  return (
    <div className={styles.layout}>
      <Navbar onMenuToggle={setIsSidebarOpen} />
      <div className={styles.main}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className={styles.content}>
          {/* Toast Notification */}
          {toast && (
            <div className={`${styles.toast} ${styles[`toast-${toast.type}`]}`}>
              <div className={styles.toastContent}>
                {toast.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span>{toast.message}</span>
              </div>
            </div>
          )}

          <div className={styles.container}>
            <div className={styles.header}>
              <div>
                <h1 className={styles.welcomeTitle}>
                  Welcome back, {currentUser?.name}! 👋
                </h1>
                <p className={styles.welcomeSubtitle}>
                  Here's what's happening with your notes today
                </p>
              </div>
            </div>

            <div className={styles.stats}>
              {stats.map((stat, idx) => (
                <div key={idx} className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: `${stat.color}15` }}>
                    <span style={{ color: stat.color }}>{stat.icon}</span>
                  </div>
                  <div className={styles.statInfo}>
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.quickActions}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
              <div className={styles.actionsGrid}>
                {quickActions.map((action, idx) => (
                  <Link key={idx} to={action.to} className={styles.actionCard}>
                    <div className={styles.actionIcon} style={{ background: `${action.color}15` }}>
                      <span style={{ color: action.color }}>{action.icon}</span>
                    </div>
                    <span className={styles.actionLabel}>{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Recent Notes</h2>
                <Link to="/search" className={styles.viewAll}>
                  View All →
                </Link>
              </div>
              {recentFiles.length > 0 ? (
                <div className={styles.filesGrid}>
                  {recentFiles.map(file => (
                    <FileCard 
                      key={file.id} 
                      file={file}
                      showDeleteBtn={canDeleteFile(file)}
                      onDelete={canDeleteFile(file) ? handleDeleteFile : null}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <FileText size={48} />
                  <p>No notes available yet</p>
                  <Link to="/upload" className={styles.uploadBtn}>
                    Upload Your First Note
                  </Link>
                </div>
              )}
            </div>

            {subjects.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Browse by Subject</h2>
                <div className={styles.subjectsGrid}>
                  {subjects.map((subject) => (
                    <Link
                      key={subject}
                      to={`/search?subject=${encodeURIComponent(subject)}`}
                      className={styles.subjectCard}
                    >
                      <BookOpen size={24} />
                      <div className={styles.subjectInfo}>
                        <div className={styles.subjectName}>{subject}</div>
                        <div className={styles.subjectCount}>
                          {filesBySubject[subject].length} notes
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

```

### 6. ROUTING SYSTEM

#### App.js
```javascript
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import LandingPage from './pages/LandingPage';
import { RegisterUser } from './pages/RegisterUser';
import Dashboard from './pages/Dashboard';
import { Login } from './pages/Login';
import { Upload } from './pages/Upload';
import { MyUploads } from './pages/MyUploads';
import { Search } from './pages/Search';
import { Profile } from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import ProfessorPanel from './pages/ProfessorPanel';
import StudentPanel from './pages/StudentPanel';
import { FileDetails } from './pages/FileDetails';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/register-student" element={<RegisterUser isStudentRegistration={true} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/my-uploads" element={<MyUploads />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/professor" element={<ProfessorPanel />} />
          <Route path="/student" element={<StudentPanel />} />
          <Route path="/file/:id" element={<FileDetails />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

```

#### routes.jsx
File not found in project.

#### router/index.jsx
File not found in project.

#### ProtectedRoute.jsx
File not found in project.

#### RoleBasedRoute.jsx
File not found in project.

### 7. GLOBAL STATE MANAGEMENT

#### src/context/ThemeContext.jsx
```jsx
import { createContext, useContext, useState, useEffect } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme-preference');
    
    if (savedTheme) {
      // Use saved preference
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
    
    setIsLoaded(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isLoaded) {
      const htmlElement = document.documentElement;
      
      console.log('Applying theme:', isDarkMode ? 'dark' : 'light');
      
      if (isDarkMode) {
        htmlElement.setAttribute('data-theme', 'dark');
        htmlElement.classList.add('dark-mode');
        htmlElement.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        htmlElement.setAttribute('data-theme', 'light');
        htmlElement.classList.add('light-mode');
        htmlElement.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
      
      // Save preference to localStorage
      localStorage.setItem('theme-preference', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, isLoaded]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

```

#### src/hooks/useAuth.js
```javascript
import { useState, useEffect, createContext, useContext } from 'react';
import { users, addUser, getUserByEmail, updateUser, getPendingProfessorRequests, addPendingProfessorRequest, removePendingProfessorRequest } from '../data/users';
import { getCollegeById } from '../data/colleges';
import { toast } from 'sonner';
import { validateForm } from '../lib/validation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentCollege, setCurrentCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('currentUser');
    const storedCollege = localStorage.getItem('currentCollege');
    
    if (storedUser && storedCollege) {
      setCurrentUser(JSON.parse(storedUser));
      setCurrentCollege(JSON.parse(storedCollege));
    }
    setLoading(false);
  }, []);

  const registerUser = (userData) => {
    try {
      setIsRegistering(true);
      // Simulate network delay
      const delay = new Promise(resolve => setTimeout(resolve, 500));
      
      // Validate form
      const validation = validateForm(userData, ['name', 'email', 'password']);
      if (!validation.isValid) {
        const errorMsg = Object.values(validation.errors)[0];
        toast.error(errorMsg);
        setIsRegistering(false);
        return { success: false, error: errorMsg, errors: validation.errors };
      }

      // Check if user already exists
      const existingUser = getUserByEmail(userData.email);
      if (existingUser) {
        toast.error('User with this email already exists');
        setIsRegistering(false);
        return { success: false, error: 'Email already registered' };
      }

      const newUser = addUser(userData);
      const college = getCollegeById(userData.collegeId);
      
      setCurrentUser(newUser);
      setCurrentCollege(college);
      
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('currentCollege', JSON.stringify(college));
      
      toast.success('Registration successful! Welcome!');
      setIsRegistering(false);
      return { success: true, user: newUser };
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      setIsRegistering(false);
      return { success: false, error: error.message };
    }
  };

  const login = (email, password, collegeId) => {
    try {
      setIsLoggingIn(true);
      // Simulate network delay
      const delay = new Promise(resolve => setTimeout(resolve, 500));
      
      // Validate inputs
      const validation = validateForm({ email, password, name: 'temp' }, ['email', 'password']);
      if (!validation.isValid) {
        const errorMsg = Object.values(validation.errors)[0];
        toast.error(errorMsg);
        setIsLoggingIn(false);
        return { success: false, error: errorMsg };
      }

      const user = getUserByEmail(email);
      
      if (!user) {
        toast.error('User not found');
        setIsLoggingIn(false);
        return { success: false, error: 'User not found' };
      }
      
      if (user.password !== password) {
        toast.error('Invalid password');
        setIsLoggingIn(false);
        return { success: false, error: 'Invalid password' };
      }
      
      if (user.collegeId !== collegeId) {
        toast.error('User not registered at this college');
        setIsLoggingIn(false);
        return { success: false, error: 'User not registered at this college' };
      }
      
      const college = getCollegeById(collegeId);
      
      setCurrentUser(user);
      setCurrentCollege(college);
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('currentCollege', JSON.stringify(college));
      
      toast.success(`Welcome back, ${user.name}!`);
      setIsLoggingIn(false);
      return { success: true, user };
    } catch (error) {
      toast.error(error.message || 'Login failed');
      setIsLoggingIn(false);
      return { success: false, error: error.message };
    }
  };

  const googleLoginMock = (collegeId) => {
    try {
      // Pick a random user from the college for demo
      const collegeUsers = users.filter(u => u.collegeId === collegeId);
      if (collegeUsers.length === 0) {
        throw new Error('No users found for this college');
      }
      
      const user = collegeUsers[0]; // Use first user for demo
      const college = getCollegeById(collegeId);
      
      setCurrentUser(user);
      setCurrentCollege(college);
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('currentCollege', JSON.stringify(college));
      
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentCollege(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentCollege');
  };

  const updateUserPhoto = (photoData) => {
    if (currentUser) {
      // Limit photo data size to prevent localStorage quota exceeded
      // Store only a smaller version or skip if too large
      let photoToStore = photoData;
      if (photoData && photoData.length > 100000) {
        // If image is too large, don't store it (avoid quota error)
        // In production, you'd upload to a server instead
        console.warn('Image too large for storage, storing reference only');
        photoToStore = null;
      }
      
      const updated = { ...currentUser, photo: photoToStore };
      updateUser(currentUser.id, { photo: photoToStore });
      setCurrentUser(updated);
      
      // Only store in localStorage if it's small enough
      if (photoToStore) {
        try {
          localStorage.setItem('currentUser', JSON.stringify(updated));
        } catch (e) {
          console.warn('Could not save photo to localStorage:', e);
          // Keep the updated user in memory even if localStorage fails
        }
      }
    }
  };

  const updateUserName = (newName) => {
    if (currentUser) {
      const updated = { ...currentUser, name: newName };
      updateUser(currentUser.id, { name: newName });
      setCurrentUser(updated);
      localStorage.setItem('currentUser', JSON.stringify(updated));
      return { success: true };
    }
    return { success: false, error: 'No user logged in' };
  };

  // Professor request flow
  const requestProfessorAccess = (userId) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) throw new Error('User not found');
      // mark user as pending and add to pending requests
      updateUser(userId, { role: 'pending' });
      addPendingProfessorRequest(user);
      // update currentUser if it is the same
      if (currentUser?.id === userId) {
        const updated = { ...currentUser, role: 'pending' };
        setCurrentUser(updated);
        localStorage.setItem('currentUser', JSON.stringify(updated));
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const approveProfessorRequest = (userId) => {
    try {
      setIsProcessingRequest(true);
      const user = users.find(u => u.id === userId);
      updateUser(userId, { role: 'professor' });
      removePendingProfessorRequest(userId);
      if (currentUser?.id === userId) {
        const updated = { ...currentUser, role: 'professor' };
        setCurrentUser(updated);
        localStorage.setItem('currentUser', JSON.stringify(updated));
      }
      setRefreshTrigger(prev => prev + 1);
      toast.success(`✅ ${user?.name} approved as Professor!`);
      setIsProcessingRequest(false);
      return { success: true };
    } catch (err) {
      toast.error('Failed to approve professor');
      setIsProcessingRequest(false);
      return { success: false, error: err.message };
    }
  };

  const rejectProfessorRequest = (userId) => {
    try {
      setIsProcessingRequest(true);
      const user = users.find(u => u.id === userId);
      updateUser(userId, { role: 'student' });
      removePendingProfessorRequest(userId);
      if (currentUser?.id === userId) {
        const updated = { ...currentUser, role: 'student' };
        setCurrentUser(updated);
        localStorage.setItem('currentUser', JSON.stringify(updated));
      }
      setRefreshTrigger(prev => prev + 1);
      toast.info(`❌ ${user?.name} professor request rejected`);
      setIsProcessingRequest(false);
      return { success: true };
    } catch (err) {
      toast.error('Failed to reject professor request');
      setIsProcessingRequest(false);
      return { success: false, error: err.message };
    }
  };

  const createAdmin = (adminData) => {
    try {
      const existing = getUserByEmail(adminData.email);
      if (existing) throw new Error('User with this email already exists');
      const newAdmin = addUser({ ...adminData, role: 'admin' });
      return { success: true, user: newAdmin };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const value = {
    currentUser,
    currentCollege,
    loading,
    isRegistering,
    isLoggingIn,
    isProcessingRequest,
    registerUser,
    login,
    googleLoginMock,
    logout,
    updateUserPhoto,
    updateUserName,
    requestProfessorAccess,
    approveProfessorRequest,
    rejectProfessorRequest,
    createAdmin,
    pendingProfessorRequests: getPendingProfessorRequests(),
    refreshTrigger,
    setRefreshTrigger
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

#### src/hooks/useSecureAuth.js
```javascript
import { useState, useEffect, createContext, useContext } from 'react';
import { toast } from 'sonner';
import { 
  SecureTokenStorage, 
  secureAPI, 
  validateInput,
  SecureStorage,
  secureLogout,
  initSessionTimeout 
} from '../utils/secureAuth';

const SecureAuthContext = createContext();

export const SecureAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentCollege, setCurrentCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(null);

  // Initialize on mount
  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = () => {
    // Check if token exists
    if (SecureTokenStorage.hasToken()) {
      // Verify token with backend
      verifyToken();
      // Start inactivity timer
      const cleanup = initSessionTimeout(30 * 60 * 1000); // 30 minutes
      setSessionTimeout(cleanup);
    }
    setLoading(false);
  };

  /**
   * Verify token is still valid on backend
   */
  const verifyToken = async () => {
    try {
      const response = await secureAPI.get('/api/auth/verify');
      if (response.success) {
        setCurrentUser(response.user);
        setCurrentCollege(response.college);
        setIsAuthenticated(true);
      } else {
        // Token invalid
        SecureTokenStorage.clearToken();
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      SecureTokenStorage.clearToken();
      setIsAuthenticated(false);
    }
  };

  /**
   * Secure registration with validation
   */
  const register = async (userData) => {
    try {
      // Validate inputs on client
      const validation = validateInput(userData, {
        name: { required: true, minLength: 1, maxLength: 50 },
        email: { required: true, type: 'email' },
        password: { required: true, type: 'password' },
        collegeId: { required: true }
      });

      if (!validation.isValid) {
        Object.values(validation.errors).forEach(error => {
          toast.error(error);
        });
        return { success: false, errors: validation.errors };
      }

      // Send to backend for validation + storage
      const response = await secureAPI.post('/api/auth/register', {
        name: userData.name.trim(),
        email: userData.email.toLowerCase().trim(),
        password: userData.password, // Sent only over HTTPS
        collegeId: userData.collegeId
      });

      if (response.success) {
        // Backend returns token (NOT password)
        SecureTokenStorage.setToken(response.token);
        SecureStorage.setUser(response.user);
        setCurrentUser(response.user);
        setCurrentCollege(response.college);
        setIsAuthenticated(true);
        
        // Start session timeout
        const cleanup = initSessionTimeout(30 * 60 * 1000);
        setSessionTimeout(cleanup);
        
        toast.success('Registration successful! Welcome!');
        return { success: true };
      } else {
        toast.error(response.error || 'Registration failed');
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed');
      return { success: false, error: error.message };
    }
  };

  /**
   * Secure login
   */
  const login = async (email, password, collegeId) => {
    try {
      // Validate inputs
      const validation = validateInput(
        { email, password },
        {
          email: { required: true, type: 'email' },
          password: { required: true, minLength: 6 }
        }
      );

      if (!validation.isValid) {
        Object.values(validation.errors).forEach(error => {
          toast.error(error);
        });
        return { success: false, errors: validation.errors };
      }

      // Send credentials to backend (over HTTPS only)
      const response = await secureAPI.post('/api/auth/login', {
        email: email.toLowerCase().trim(),
        password: password, // Only sent over HTTPS
        collegeId
      });

      if (response.success) {
        // Store secure token (NOT password)
        SecureTokenStorage.setToken(response.token);
        SecureStorage.setUser(response.user);
        setCurrentUser(response.user);
        setCurrentCollege(response.college);
        setIsAuthenticated(true);

        // Start session timeout
        const cleanup = initSessionTimeout(30 * 60 * 1000);
        setSessionTimeout(cleanup);

        toast.success(`Welcome back, ${response.user.name}!`);
        return { success: true, user: response.user };
      } else {
        toast.error(response.error || 'Login failed');
        // Log failed attempt (backend already logs this)
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    }
  };

  /**
   * Secure logout
   */
  const logout = async () => {
    try {
      // Stop inactivity timer
      if (sessionTimeout) {
        sessionTimeout();
      }

      // Call secure logout (clears backend session)
      await secureLogout();

      // Clear state
      setCurrentUser(null);
      setCurrentCollege(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  /**
   * Check if user has permission
   */
  const hasPermission = (action) => {
    if (!currentUser) return false;

    const permissions = {
      'student': ['view:notes', 'download:notes', 'upload:notes', 'request:professor'],
      'professor': ['view:notes', 'download:notes', 'upload:notes', 'manage:students', 'manage:panel'],
      'admin': ['*'], // Admin has all permissions
    };

    const userPermissions = permissions[currentUser.role] || [];
    return userPermissions.includes('*') || userPermissions.includes(action);
  };

  /**
   * Refresh token (automatically called before expiration)
   */
  const refreshToken = async () => {
    try {
      const response = await secureAPI.post('/api/auth/refresh', {});
      if (response.success) {
        SecureTokenStorage.setToken(response.token);
        return { success: true };
      } else {
        // Refresh failed, logout user
        await logout();
        return { success: false };
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      await logout();
      return { success: false };
    }
  };

  const value = {
    currentUser,
    currentCollege,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    hasPermission,
    refreshToken,
    verifyToken
  };

  return (
    <SecureAuthContext.Provider value={value}>
      {children}
    </SecureAuthContext.Provider>
  );
};

/**
 * Hook to use secure auth context
 */
export const useSecureAuth = () => {
  const context = useContext(SecureAuthContext);
  if (!context) {
    throw new Error('useSecureAuth must be used within SecureAuthProvider');
  }
  return context;
};

export default SecureAuthContext;

```

#### src/hooks/useSidebarState.js
```javascript
import { useState } from 'react';

export const useSidebarState = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (state) => {
    if (typeof state === 'boolean') {
      setIsSidebarOpen(state);
    } else {
      setIsSidebarOpen(prev => !prev);
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar
  };
};

```

### 8. UI COMPONENTS (FULL SOURCE)

#### src\components\CTASection.jsx
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = ({ handleGetStarted, handleSignIn }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]"></div>
          {/* Animated Blobs */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -50, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10 px-8 py-20 md:px-16 md:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Start Your Journey Today</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Ready to Transform
              <br />
              Your Note Sharing?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
            >
              Experience a smarter way to organize, share, and collaborate on notes—built for students and educators.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                onClick={handleGetStarted}
                className="group px-10 py-4 bg-white text-[#3B82F6] rounded-xl font-semibold shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={handleSignIn}
                className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-xl font-semibold hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

```

#### src\components\DeleteConfirmModal.jsx
```jsx
import { Trash2 } from 'lucide-react';
import styles from './DeleteConfirmModal.module.css';

export const DeleteConfirmModal = ({ isOpen, fileName, onConfirm, onCancel, isLoading = false }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.iconWrapper}>
            <Trash2 size={24} />
          </div>
          <h2 className={styles.title}>Delete File?</h2>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.message}>
            Are you sure you want to delete <strong>{fileName}</strong>? This action cannot be undone.
          </p>
        </div>

        <div className={styles.modalFooter}>
          <button 
            className={styles.cancelBtn}
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            className={styles.deleteBtn}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

```

#### src\components\DeleteConfirmModal.module.css
```css
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeInOverlay 0.3s ease;
  backdrop-filter: blur(4px);
}

@keyframes fadeInOverlay {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(4px);
  }
}

.modal {
  background: linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 420px;
  animation: slideUpScale 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

@keyframes slideUpScale {
  from {
    transform: translateY(30px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.modalHeader {
  padding: 32px var(--space-lg) var(--space-lg);
  background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  border-bottom: 2px solid #FECACA;
}

.iconWrapper {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  flex-shrink: 0;
  box-shadow: 0 8px 16px rgba(239, 68, 68, 0.3);
  animation: scaleIcon 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

@keyframes scaleIcon {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0;
  letter-spacing: -0.5px;
}

.modalBody {
  padding: 28px var(--space-lg);
  animation: fadeInBody 0.5s ease 0.1s both;
}

@keyframes fadeInBody {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.message {
  color: var(--gray-600);
  line-height: 1.6;
  margin: 0;
  font-size: 14px;
}

.message strong {
  color: var(--gray-900);
  font-weight: 700;
  word-break: break-word;
}

.modalFooter {
  padding: var(--space-lg);
  border-top: 1px solid var(--gray-200);
  display: flex;
  gap: var(--space-md);
  justify-content: flex-end;
  background: linear-gradient(135deg, #FAFBFC 0%, #F3F4F6 100%);
  animation: fadeInFooter 0.5s ease 0.2s both;
}

@keyframes fadeInFooter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cancelBtn {
  padding: 11px 24px;
  border: 2px solid var(--gray-300);
  background: var(--white);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  color: var(--gray-700);
  letter-spacing: 0.3px;
}

.cancelBtn:hover:not(:disabled) {
  background: var(--gray-50);
  border-color: var(--gray-400);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cancelBtn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cancelBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.deleteBtn {
  padding: 11px 24px;
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: var(--white);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.deleteBtn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.deleteBtn:hover:not(:disabled) {
  background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
}

.deleteBtn:active:not(:disabled)::before {
  width: 300px;
  height: 300px;
}

.deleteBtn:active:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.deleteBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

```

#### src\components\EditFileModal.jsx
```jsx
import { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info, Zap, Edit3, FileText } from 'lucide-react';
import { toast } from 'sonner';
import styles from './EditFileModal.module.css';

export const EditFileModal = ({ isOpen, file, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    unit: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    if (file && isOpen) {
      const initialData = {
        title: file.title || '',
        description: file.description || '',
        subject: file.subject || '',
        unit: file.unit || ''
      };
      setFormData(initialData);
      setOriginalData(initialData);
      setError(null);
      setHasChanges(false);
      setFocusedField(null);
    }
  }, [file, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedData);
    setError(null);
    
    // Check if form has changes
    if (originalData) {
      const changed = Object.keys(updatedData).some(
        key => updatedData[key] !== originalData[key]
      );
      setHasChanges(changed);
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const getProgressColor = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage === 0) return '#e5e7eb';
    if (percentage < 50) return '#10b981';
    if (percentage < 80) return '#f59e0b';
    return '#ef4444';
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('File title is required');
      setFocusedField('title');
      return false;
    }
    if (formData.title.trim().length > 100) {
      setError('File title must be less than 100 characters');
      setFocusedField('title');
      return false;
    }
    if (formData.description.trim().length > 500) {
      setError('Description must be less than 500 characters');
      setFocusedField('description');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const result = await onSave({
        ...formData,
        fileId: file.id
      });
      
      if (result && result.success) {
        toast.success('File details updated successfully!');
        onClose();
      }
    } catch (err) {
      const errorMsg = err.message || 'Failed to update file details';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const getFieldPercentage = (field) => {
    const limits = { title: 100, description: 500 };
    const limit = limits[field] || 100;
    return Math.min((formData[field].length / limit) * 100, 100);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Edit3 size={24} style={{ color: '#ffffff' }} />
            <h2 style={{ margin: 0 }}>Edit File Details</h2>
          </div>
          <button onClick={onClose} className={styles.closeBtn} disabled={isSaving}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          {error && (
            <div className={styles.errorAlert}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label htmlFor="title" className={styles.label}>
                File Title *
              </label>
              <span className={styles.charCount}>
                {formData.title.length}/100
              </span>
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onFocus={() => handleFocus('title')}
              onBlur={handleBlur}
              placeholder="Enter file title"
              maxLength="100"
              className={`${styles.input} ${focusedField === 'title' ? styles.focused : ''}`}
              disabled={isSaving}
            />
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{
                  width: `${getFieldPercentage('title')}%`,
                  backgroundColor: getProgressColor(formData.title.length, 100)
                }}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <span className={styles.charCount}>
                {formData.description.length}/500
              </span>
            </div>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onFocus={() => handleFocus('description')}
              onBlur={handleBlur}
              placeholder="Enter file description (optional)"
              maxLength="500"
              rows="4"
              className={`${styles.textarea} ${focusedField === 'description' ? styles.focused : ''}`}
              disabled={isSaving}
            />
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{
                  width: `${getFieldPercentage('description')}%`,
                  backgroundColor: getProgressColor(formData.description.length, 500)
                }}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => handleFocus('subject')}
                onBlur={handleBlur}
                placeholder="e.g., Mathematics"
                className={`${styles.input} ${focusedField === 'subject' ? styles.focused : ''}`}
                disabled={isSaving}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="unit" className={styles.label}>
                Unit/Chapter
              </label>
              <input
                type="text"
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                onFocus={() => handleFocus('unit')}
                onBlur={handleBlur}
                placeholder="e.g., Chapter 5"
                className={`${styles.input} ${focusedField === 'unit' ? styles.focused : ''}`}
                disabled={isSaving}
              />
            </div>
          </div>

          {hasChanges && (
            <div className={styles.changesAlert}>
              <div className={styles.changesAlertHeader}>
                <Zap size={16} />
                <span>Unsaved Changes</span>
              </div>
              <p className={styles.changesAlertText}>
                <strong>Current File:</strong> {file?.title}
              </p>
              <p className={styles.changesAlertHint}>
                Click "Save Changes" to apply your updates
              </p>
            </div>
          )}
          
          {!hasChanges && (
            <div className={styles.info}>
              <div className={styles.infoHeader}>
                <Info size={16} />
                <span>File Information</span>
              </div>
              <p>
                <strong>Current File:</strong> {file?.title}
              </p>
              {file?.uploadDate && (
                <p>
                  <strong>Uploaded:</strong> {new Date(file.uploadDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              )}
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button
            onClick={onClose}
            className={styles.cancelBtn}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={styles.saveBtn}
            disabled={isSaving || !formData.title.trim()}
            title={!formData.title.trim() ? 'Title is required' : 'Save changes'}
          >
            {isSaving ? (
              <>
                <span className={styles.spinner}></span>
                Saving...
              </>
            ) : (
              <>
                <CheckCircle size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

```

#### src\components\EditFileModal.module.css
```css
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
  backdrop-filter: blur(4px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
  max-width: 650px;
  width: 90%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}

@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-bottom: none;
}

.header h2 {
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.5px;
}

.closeBtn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.closeBtn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.closeBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #f8fafb;
}

.content::-webkit-scrollbar {
  width: 6px;
}

.content::-webkit-scrollbar-track {
  background: transparent;
}

.content::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.errorAlert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1.5px solid #ef4444;
  border-radius: 10px;
  color: #7f1d1d;
  font-size: 14px;
  font-weight: 500;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.errorAlert svg {
  flex-shrink: 0;
  color: #ef4444;
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.labelWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.label {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input,
.textarea {
  padding: 12px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  color: #0f172a;
  background: #ffffff;
  transition: all 0.3s ease;
}

.input::placeholder,
.textarea::placeholder {
  color: #9ca3af;
  font-weight: 500;
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  background: #ffffff;
}

.input.focused,
.textarea.focused {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.input:disabled,
.textarea:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.7;
  color: #9ca3af;
}

.textarea {
  resize: vertical;
  min-height: 80px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.charCount {
  font-size: 12px;
  color: #6b7280;
  font-weight: 600;
  text-align: right;
}

.progressBar {
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 8px;
}

.progressFill {
  height: 100%;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.formRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.info {
  padding: 11px 12px;
  background: #ffffff;
  border-radius: 10px;
  font-size: 12px;
  color: #6b7280;
  border-left: 4px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.infoHighlight {
  background: rgba(59, 130, 246, 0.08);
  border-left-color: #3b82f6;
  border-color: #3b82f6;
  color: #1e40af;
}

.infoHeader {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-weight: 700;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 11px;
}

.infoHeader svg {
  animation: pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

.infoHighlight .infoHeader svg {
  animation: pulse 1s ease-in-out infinite;
  color: #3b82f6;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.info p {
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
}

.info strong {
  color: #0f172a;
  font-weight: 700;
}

.footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 14px 22px;
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
  flex-shrink: 0;
}

.cancelBtn {
  padding: 9px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cancelBtn:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #d1d5db;
  color: #374151;
}

.cancelBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.saveBtn {
  padding: 9px 22px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.saveBtn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5);
}

.saveBtn:active:not(:disabled) {
  transform: translateY(0);
}

.saveBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.info p {
  margin: 0;
  line-height: 1.6;
}

.info strong {
  color: var(--text-primary);
  font-weight: 600;
}

.changesAlert {
  padding: 16px 18px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.05) 100%);
  border: 2px solid #3b82f6;
  border-radius: 12px;
  animation: slideDown 0.3s ease;
}

.changesAlertHeader {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-weight: 700;
  color: #1e40af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 12px;
}

.changesAlertHeader svg {
  animation: pulse 1s ease-in-out infinite;
  flex-shrink: 0;
  color: #3b82f6;
}

.changesAlertText {
  margin: 6px 0;
  font-size: 14px;
  color: #1e40af;
  line-height: 1.6;
  font-weight: 500;
}

.changesAlertText strong {
  color: #0f172a;
  font-weight: 700;
}

.changesAlertHint {
  margin: 8px 0 0 0;
  font-size: 13px;
  color: #3b82f6;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid var(--gray-200);
  background: var(--white);
}

.cancelBtn,
.saveBtn {
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
}

.cancelBtn {
  background: var(--bg-hover);
  color: var(--text-primary);
  border: 1px solid var(--gray-300);
}

.cancelBtn:hover:not(:disabled) {
  background: var(--gray-200);
  border-color: var(--gray-400);
}

.cancelBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.saveBtn {
  background: var(--primary);
  color: var(--white);
  border: 2px solid var(--primary);
  font-weight: 600;
}

.saveBtn:hover:not(:disabled) {
  background: var(--primary-dark);
  border-color: var(--primary-dark);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}

.savebtnDisabled {
  background: var(--gray-400);
  border-color: var(--gray-400);
  opacity: 0.5;
}

.saveBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: var(--white);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .modal {
    width: 95%;
    max-height: 95vh;
  }

  .formRow {
    grid-template-columns: 1fr;
  }

  .header {
    padding: 16px;
  }

  .content {
    padding: 16px;
    gap: 16px;
  }

  .footer {
    padding: 12px 16px;
    gap: 8px;
  }

  .cancelBtn,
  .saveBtn {
    flex: 1;
    justify-content: center;
    padding: 10px 12px;
  }
}

```

#### src\components\FeaturesGrid.jsx
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Share2, Lock, Bell, Search, FileText } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Organized Note Management',
    description: 'Keep all your academic notes structured and easily accessible in one secure platform.'
  },
  {
    icon: Share2,
    title: 'Seamless Sharing',
    description: 'Share notes instantly with classmates, professors, and study groups with just a few clicks.'
  },
  {
    icon: Lock,
    title: 'Role-Based Access Control',
    description: 'Granular permissions ensure only authorized users can view, edit, or manage specific content.'
  },
  {
    icon: Bell,
    title: 'Activity Feed & Notifications',
    description: 'Real-time updates on file access and shares. Track activities instantly and stay informed about your workspace.'
  },
  {
    icon: Search,
    title: 'Powerful Search',
    description: 'Find any note instantly with advanced search filters by title, subject, or keywords.'
  },
  {
    icon: FileText,
    title: 'Rich Content Support',
    description: 'Upload and share PDFs, images, documents, and multimedia content effortlessly.'
  }
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="text-[#3B82F6]"> Academic Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to share, collaborate, and manage academic content securely.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#3B82F6]/50 transition-all shadow-sm hover:shadow-xl cursor-pointer"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3B82F6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <motion.div
                    className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#3B82F6] transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-7 h-7 text-[#3B82F6] group-hover:text-white transition-colors" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#3B82F6] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#3B82F6]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
```

#### src\components\FileCard.jsx
```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, User, GraduationCap, Trash2, Edit2, Share2 } from 'lucide-react';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { ShareModal } from './ShareModal';
import { downloadFile, generateFilename } from '../lib/downloadUtils';
import styles from './FileCard.module.css';

export const FileCard = ({ file, onDelete, onEdit, showDeleteBtn = false }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const getRoleIcon = (role) => {
    return role === 'professor' ? <GraduationCap size={14} /> : <User size={14} />;
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    if (onDelete) {
      onDelete(file.id);
    }
    setShowDeleteModal(false);
    setIsDeleting(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (onEdit) {
      onEdit(file);
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    
    if (!file.downloadUrl) {
      return;
    }

    setIsDownloading(true);
    const filename = generateFilename(file.title, 'pdf');
    const result = await downloadFile(file.downloadUrl, filename);
    setIsDownloading(false);

    return result;
  };

  const handleShare = (e) => {
    e.preventDefault();
    setShowShareModal(true);
  };

  return (
    <>
      <div className={styles.cardWrapper}>
        <Link to={`/file/${file.id}`} className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper}>
                <FileText size={24} />
              </div>
              <div className={styles.subject}>{file.subject}</div>
            </div>
            {showDeleteBtn && (
              <div className={styles.cardActions}>
                {onEdit && (
                  <button onClick={handleEdit} className={styles.editBtn} title="Edit file details">
                    <Edit2 size={18} />
                  </button>
                )}
                {onDelete && (
                  <button onClick={handleDeleteClick} className={styles.deleteBtn} title="Delete this file">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            )}
          </div>

          <div className={styles.cardBody}>
            <h3 className={styles.title}>{file.title}</h3>
            <p className={styles.description}>{file.description}</p>

            <div className={styles.meta}>
              <span className={styles.unit}>{file.unit}</span>
              <span className={styles.dot}>•</span>
              <span className={styles.year}>{file.yearSemester}</span>
            </div>

            <div className={styles.keywords}>
              {file.keywords.slice(0, 3).map((keyword, idx) => (
                <span key={idx} className={styles.keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.uploader}>
              {getRoleIcon(file.uploaderRole)}
              <span>{file.uploaderName}</span>
            </div>
            <div className={styles.actions}>
              <button
                onClick={handleShare}
                className={styles.shareIcon}
                title="Share this file"
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={handleDownload}
                disabled={isDownloading || !file.downloadUrl}
                className={`${styles.downloadIcon} ${isDownloading ? styles.downloading : ''}`}
                title={file.downloadUrl ? 'Download this file' : 'File URL not available'}
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        </Link>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        fileName={file.title}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />

      <ShareModal
        isOpen={showShareModal}
        fileName={file.title}
        fileId={file.id}
        onClose={() => setShowShareModal(false)}
      />
    </>
  );
};
```

#### src\components\FileCard.module.css
```css
.cardWrapper {
  position: relative;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 24px;
  padding-top: 20px;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #e5e7eb;
  position: relative;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.cardHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.headerLeft {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
  flex-wrap: wrap;
}

.iconWrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #3b82f6;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.subject {
  padding: 6px 12px;
  background: #dbeafe;
  color: #2563eb;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  word-break: break-word;
  white-space: normal;
  flex-shrink: 1;
  max-width: 100%;
  overflow-wrap: break-word;
  min-width: 0;
}

.cardBody {
  flex: 1;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: var(--space-sm);
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-md);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 13px;
  color: #64748b;
  margin-bottom: var(--space-md);
}

.dot {
  color: #cbd5e1;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: var(--space-md);
}

.keyword {
  padding: 4px 10px;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 6px;
  font-size: 12px;
}

.cardFooter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-md);
  border-top: 1px solid var(--gray-200);
  margin-top: auto;
}

.uploader {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-secondary);
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.shareIcon {
  color: var(--primary);
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.shareIcon:hover {
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary);
  transform: scale(1.1);
}

.downloadIcon {
  color: var(--primary);
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.downloadIcon:hover:not(:disabled) {
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary);
  transform: scale(1.1);
}

.downloadIcon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.downloadIcon.downloading {
  animation: spin 1s linear infinite;
  opacity: 0.7;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.cardActions {
  display: flex;
  gap: 8px;
  background: transparent;
  padding: 0;
  border-radius: 8px;
  z-index: 10;
  flex-shrink: 0;
}

.cardWrapper:hover .cardActions {
  opacity: 1;
}

.actionBtn,
.deleteBtn,
.editBtn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: var(--primary);
}

.actionBtn:hover {
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary);
}

.editBtn {
  color: #3b82f6;
}

.editBtn:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}

.deleteBtn {
  color: #ef4444;
}

.deleteBtn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}
```

#### src\components\Footer.jsx
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <motion.div
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <BookOpen className="w-8 h-8 text-[#3B82F6]" />
              <span className="text-xl font-bold">NoteShare Vault</span>
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Secure note sharing and collaboration platform for students, professors, and administrators.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#security" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                  Acceptable Use
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} NoteShare Vault. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

#### src\components\FormError.jsx
```jsx
import { AlertCircle } from 'lucide-react';
import styles from './FormError.module.css';

export const FormError = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className={styles.errorContainer}>
      <AlertCircle size={18} className={styles.icon} />
      <span className={styles.message}>{message}</span>
    </div>
  );
};

```

#### src\components\FormError.module.css
```css
.errorContainer {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 12px;
  margin-top: 4px;
  background: #FEE2E2;
  border: 1px solid #FECACA;
  border-radius: 6px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.icon {
  color: #DC2626;
  flex-shrink: 0;
  margin-top: 2px;
}
.message {
  color: #7F1D1D;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
}

/* Alternative styling options */
.errorContainer:hover {
  background: #FECACA;
  border-color: #F87171;
}

```

#### src\components\FormInput.jsx
```jsx
import { FormError } from './FormError';
import styles from './FormInput.module.css';

export const FormInput = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  ...props
}) => {
  return (
    <div className={styles.inputGroup}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        {...props}
      />
      {error && <FormError message={error} />}
    </div>
  );
};

```

#### src\components\FormInput.module.css
```css
.inputGroup {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.required {
  color: #DC2626;
  margin-left: 4px;
}

.input {
  padding: 10px 12px;
  font-size: 14px;
  border: 1.5px solid #E5E7EB;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
}

.input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #F0F9FF;
}

.input:hover:not(:focus) {
  border-color: #D1D5DB;
  background-color: #F9FAFB;
}

.inputError {
  border-color: #FCA5A5 !important;
  background-color: #FEF2F2;
}

.inputError:focus {
  border-color: #F87171 !important;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
}

/* Placeholder styling */
.input::placeholder {
  color: #9CA3AF;
}

/* Disabled state */
.input:disabled {
  background-color: #F3F4F6;
  color: #9CA3AF;
  cursor: not-allowed;
}

```

#### src\components\GoogleLoginButton.jsx
```jsx
import styles from './GoogleLoginButton.module.css';

export const GoogleLoginButton = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={styles.googleBtn}
    >
      <svg className={styles.googleIcon} viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      <span>Continue with Google</span>
    </button>
  );
};
```

#### src\components\GoogleLoginButton.module.css
```css
.googleBtn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: 12px 24px;
  background: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-family);
}

.googleBtn:hover:not(:disabled) {
  background: var(--gray-50);
  border-color: var(--gray-400);
  box-shadow: var(--shadow-sm);
}

.googleBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.googleIcon {
  width: 20px;
  height: 20px;
}
```

#### src\components\HeroSection.jsx
```jsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ handleGetStarted, handleSignIn }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Floating Gradient Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-[#3B82F6]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-[#93C5FD]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ opacity }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full mb-6"
            >
              <span className="text-sm font-medium text-[#3B82F6]">Secure Note Collaboration</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Share notes.
              <br />
              <span className="text-[#3B82F6]">Collaborate smarter.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 max-w-xl leading-relaxed"
            >
              Securely share and manage academic notes with role-based access control. Empower students, professors, and administrators with seamless collaboration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={handleGetStarted}
                className="group px-8 py-4 bg-[#3B82F6] text-white rounded-xl font-semibold shadow-xl shadow-[#3B82F6]/30 hover:shadow-2xl hover:shadow-[#3B82F6]/40 transition-all flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={handleSignIn}
                className="px-8 py-4 bg-white text-[#3B82F6] border-2 border-[#3B82F6] rounded-xl font-semibold hover:bg-blue-50 transition-all"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Screenshot in Browser Frame */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ y }}
            className="relative"
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Browser Frame */}
              <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 mx-4 bg-gray-700 rounded px-3 py-1 text-xs text-gray-400">
                  notesharevault.com
                </div>
              </div>

              {/* Screenshot */}
              <div className="relative">
                <img
                  src="https://customer-assets.emergentagent.com/job_36d9e875-a237-4e46-930b-686fabb257b4/artifacts/own4r3ka_image.png"
                  alt="NoteShare Vault Dashboard"
                  className="w-full h-auto"
                />
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3B82F6]/20 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

```

#### src\components\HowItWorks.jsx
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Share2, Activity } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Notes',
    description: 'Simply drag and drop your documents, PDFs, or create new notes directly in the platform.'
  },
  {
    icon: Share2,
    title: 'Share with Your Team',
    description: 'Control access with role-based permissions. Share notes with classmates and professors while maintaining security and privacy.'
  },
  {
    icon: Activity,
    title: 'Activity Overview',
    description: 'View complete activity logs with real-time updates. Track file access, downloads, and sharing to maintain visibility across your academic workspace.'
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It
            <span className="text-[#3B82F6]"> Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in three simple steps and transform your note-sharing experience.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#3B82F6]/20 via-[#3B82F6] to-[#3B82F6]/20 transform -translate-y-1/2"></div>

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative"
                >
                  <motion.div
                    className="bg-white rounded-2xl p-8 text-center shadow-lg border-2 border-gray-200 hover:border-[#3B82F6] transition-all"
                    whileHover={{ y: -10, scale: 1.05 }}
                  >
                    {/* Step Number */}
                    <motion.div
                      className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#3B82F6] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {index + 1}
                    </motion.div>

                    <motion.div
                      className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-6"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-10 h-10 text-[#3B82F6]" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
```

#### src\components\LoadingButton.jsx
```jsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import styles from './LoadingButton.module.css';

function LoadingButton({
  children,
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  variant = 'primary',
}) {
  const isDisabled = isLoading || disabled;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${styles.button} ${styles[variant]} ${isDisabled ? styles.disabled : ''} ${className}`}
    >
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <Loader2 className={styles.spinner} size={18} />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default LoadingButton;
export { LoadingButton };

```

#### src\components\LoadingButton.module.css
```css
.button {
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  font-family: inherit;
}

.button:hover:not(.disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.button:active:not(.disabled) {
  transform: translateY(0);
}

.primary {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: white;
}

.primary:hover:not(.disabled) {
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
}

.secondary {
  background: #F3F4F6;
  color: #374151;
  border: 1px solid #E5E7EB;
}

.secondary:hover:not(.disabled) {
  background: #E5E7EB;
  border-color: #D1D5DB;
}

.danger {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
}

.danger:hover:not(.disabled) {
  background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
}

.success {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
}

.success:hover:not(.disabled) {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.loadingContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.spinner {
  animation: spin 1s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

```

#### src\components\LoginModal.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getCollegeByCode } from '../data/colleges';

const LoginModal = ({ onClose, onSuccess }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    collegeCode: '',
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load remembered credentials if they exist
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedCode = localStorage.getItem('rememberedCollege');
    
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        collegeCode: rememberedCode || '',
        rememberMe: true
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.collegeCode.trim()) {
      setError('College code is required');
      return false;
    }

    const college = getCollegeByCode(formData.collegeCode);
    if (!college) {
      setError('Invalid college code');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }

    if (!formData.password) {
      setError('Password is required');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const result = login({
        email: formData.email,
        password: formData.password,
        collegeCode: formData.collegeCode
      });

      if (result.success) {
        // Handle remember me
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
          localStorage.setItem('rememberedCollege', formData.collegeCode);
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedCollege');
        }

        setIsSubmitting(false);
        if (onSuccess) {
          onSuccess();
        }
        onClose();
      } else {
        setError(result.error || 'Login failed');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('An error occurred during login');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Sign In to Your Account</h3>
          <p className="text-gray-600">Access your files and collaborate with classmates</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">College Code *</label>
            <input
              type="text"
              name="collegeCode"
              value={formData.collegeCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition"
              placeholder="Enter college code"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 text-[#3B82F6] focus:ring-[#3B82F6]"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-[#3B82F6] text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-[#3B82F6] hover:underline font-semibold">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

```

#### src\components\ModalOverlay.jsx
```jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ModalOverlay = ({ isOpen, onClose, children, title, size = 'lg' }) => {
  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-5xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blurred Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[999]"
            style={{ backdropFilter: 'blur(10px)' }}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto pointer-events-auto`}
            >
              {/* Header */}
              {title && (
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                  <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-900"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalOverlay;

```

#### src\components\Navbar.jsx
```jsx
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
    // If logging out, redirect after a tiny delay to ensure state change processes
    if (isLoggingOut) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isLoggingOut, navigate]);

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
          <BookOpen size={24} />
          <span>NoteShare Vault</span>
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
            logout();
            setIsLoggingOut(true);
          }} className={styles.logoutBtn}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};
```

#### src\components\Navbar.module.css
```css
.navbar {
  background: var(--white);
  border-bottom: 1px solid var(--gray-200);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbarContainer {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
}

.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary);
  padding: 8px;
  transition: var(--transition);
}

.hamburger:hover {
  color: var(--primary-dark);
  transform: scale(1.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  font-size: 20px;
  font-weight: 700;
  color: var(--primary);
  text-decoration: none;
  transition: var(--transition);
}

.logo:hover {
  color: var(--primary);
}

.navRight {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.userInfo {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.userIcon {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
  transition: all 0.2s ease;
  border: 2px solid #000000;
}

.userIcon:hover {
  background: rgba(212, 232, 235, 0.3);
  transform: scale(1.05);
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid #EF4444;
}

.avatar:hover {
  transform: scale(1.05);
}

.avatarLetter {
  position: relative;
  color: #ffffff;
  font-weight: 700;
  font-size: 20px;
  z-index: 10;
  line-height: 1;
  transition: opacity 0.2s ease;
}

.avatar:hover .avatarLetter {
  opacity: 0;
}

.cameraIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 5;
}

.avatar:hover .cameraIcon {
  opacity: 1;
}

.userDetails {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  text-align: center;
}

.userNameCenter {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
}

.userNameText {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.userNameText:hover {
  color: var(--primary);
}

.userName {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.userName:hover {
  color: var(--text-primary);
}

.roleBadge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  width: fit-content;
  justify-content: center;
}

.badgePrimary {
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary);
}

.badgeSuccess {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success);
}

.badgeError {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error);
}

.dividerVertical {
  width: 1px;
  height: 40px;
  background: var(--gray-200);
}

.collegeInfo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 8px 16px;
  background: var(--bg-hover);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.collegeIcon {
  color: var(--primary);
}

.logoutBtn {
  padding: 10px;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logoutBtn:hover {
  background: var(--bg-hover);
  color: var(--error);
}

@media (max-width: 1024px) {
  .navbarContainer {
    padding: 0 var(--space-md);
  }

  .logo {
    font-size: 18px;
  }

  .navRight {
    gap: var(--space-md);
  }
}

@media (max-width: 768px) {
  .navbarContainer {
    height: 60px;
    padding: 0 var(--space-sm);
    gap: var(--space-sm);
  }

  .hamburger {
    display: flex;
    order: -1;
  }

  .logo {
    font-size: 16px;
    gap: var(--space-sm);
  }

  .logo svg {
    width: 20px;
    height: 20px;
  }

  .collegeInfo span {
    display: none;
  }

  .userDetails {
    display: none;
  }

  .navRight {
    gap: var(--space-sm);
  }

  .userInfo {
    gap: var(--space-sm);
  }

  .userName,
  .userRole {
    display: none;
  }

  .userIcon,
  .avatar {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }

  .divider {
    display: none;
  }

  .logoutBtn {
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .navbarContainer {
    height: 55px;
    padding: 0 var(--space-sm);
  }

  .logo {
    font-size: 14px;
  }

  .logo svg {
    width: 18px;
    height: 18px;
  }

  .navRight {
    gap: 6px;
  }

  .userIcon,
  .avatar {
    width: 32px;
    height: 32px;
    font-size: 12px;
    border-width: 1px;
  }

  .logoutBtn {
    padding: 6px;
  }
}
```

#### src\components\NotificationBell.jsx
```jsx
import { useState, useEffect } from 'react';
import { Bell, X, Check, Trash2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getNotificationsForUser, getUnreadCount, markNotificationAsRead, markAllAsRead, deleteNotification } from '../data/notifications';
import styles from './NotificationBell.module.css';

export const NotificationBell = () => {
  const { currentUser, currentCollege } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (currentUser && currentCollege) {
      updateNotifications();
      // Refresh every 5 seconds
      const interval = setInterval(updateNotifications, 5000);
      return () => clearInterval(interval);
    }
  }, [currentUser, currentCollege]);

  const updateNotifications = () => {
    if (currentUser && currentCollege) {
      const userNotifications = getNotificationsForUser(currentUser.role, currentCollege.id);
      setNotifications(userNotifications);
      const unread = getUnreadCount(currentUser.role, currentCollege.id);
      setUnreadCount(unread);
    }
  };

  const handleMarkAsRead = (notificationId) => {
    markNotificationAsRead(notificationId);
    updateNotifications();
  };

  const handleMarkAllAsRead = () => {
    if (currentUser && currentCollege) {
      markAllAsRead(currentUser.role, currentCollege.id);
      updateNotifications();
    }
  };

  const handleDelete = (notificationId, e) => {
    e.stopPropagation();
    deleteNotification(notificationId);
    updateNotifications();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'file_upload':
        return '📤';
      case 'professor_request':
        return '👨‍🏫';
      default:
        return '📢';
    }
  };

  const getTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className={styles.notificationContainer}>
      <button
        className={styles.bellBtn}
        onClick={() => setIsOpen(!isOpen)}
        title="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <h3 className={styles.title}>Notifications</h3>
            <div className={styles.headerActions}>
              {unreadCount > 0 && (
                <button
                  className={styles.markAllBtn}
                  onClick={handleMarkAllAsRead}
                >
                  Mark all as read
                </button>
              )}
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className={styles.notificationsList}>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`${styles.notification} ${!notification.read ? styles.unread : ''}`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className={styles.notificationIcon}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className={styles.notificationContent}>
                    <h4 className={styles.notificationTitle}>{notification.title}</h4>
                    <p className={styles.notificationMessage}>{notification.message}</p>
                    <span className={styles.timestamp}>
                      {getTimeAgo(notification.timestamp)}
                    </span>
                  </div>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => handleDelete(notification.id, e)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

```

#### src\components\NotificationBell.module.css
```css
.notificationContainer {
  position: relative;
}

.bellBtn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;
  border-radius: 6px;
}

.bellBtn:hover {
  background: var(--gray-100);
  color: var(--primary);
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #EF4444;
  color: var(--white);
  font-size: 11px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--white);
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--white);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 380px;
  max-width: 450px;
  margin-top: 8px;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  padding: var(--space-lg);
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
}

.headerActions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.markAllBtn {
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  white-space: nowrap;
  padding: 4px 8px;
  border-radius: 4px;
  flex-shrink: 0;
}

.markAllBtn:hover {
  color: var(--primary-dark);
  text-decoration: underline;
  background: rgba(59, 130, 246, 0.05);
}

.notificationsList {
  max-height: 450px;
  overflow-y: auto;
}

.notification {
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--gray-100);
  display: flex;
  gap: var(--space-md);
  cursor: pointer;
  transition: background 0.2s ease;
  align-items: flex-start;
}

.notification:hover {
  background: var(--gray-50);
}

.notification.unread {
  background: #F0F4FF;
}

.notificationIcon {
  font-size: 24px;
  min-width: 32px;
  text-align: center;
  line-height: 1;
}

.notificationContent {
  flex: 1;
  min-width: 0;
}

.notificationTitle {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px 0;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.notificationMessage {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0 0 6px 0;
  line-height: 1.4;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.timestamp {
  font-size: 12px;
  color: #9CA3AF;
}

.deleteBtn {
  background: none;
  border: none;
  cursor: pointer;
  color: #D1D5DB;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.deleteBtn:hover {
  color: #EF4444;
}

.emptyState {
  padding: var(--space-2xl) var(--space-lg);
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
}

.closeBtn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.closeBtn:hover {
  color: var(--text-primary);
}

/* Scrollbar styling */
.notificationsList::-webkit-scrollbar {
  width: 6px;
}

.notificationsList::-webkit-scrollbar-track {
  background: transparent;
}

.notificationsList::-webkit-scrollbar-thumb {
  background: #D1D5DB;
  border-radius: 3px;
}

.notificationsList::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}

@media (max-width: 640px) {
  .dropdown {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    min-width: unset;
    max-width: unset;
    border-radius: 12px 12px 0 0;
    max-height: 70vh;
  }
}

```

#### src\components\PasswordStrengthIndicator.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { validatePasswordStrength } from '../lib/securityUtils';
import styles from './PasswordStrengthIndicator.module.css';

export const PasswordStrengthIndicator = ({ password = '' }) => {
  const [strength, setStrength] = useState(null);

  useEffect(() => {
    if (password) {
      setStrength(validatePasswordStrength(password));
    } else {
      setStrength(null);
    }
  }, [password]);

  if (!strength) return null;

  const getStrengthColor = () => {
    switch (strength.strength) {
      case 'weak':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'strong':
        return '#10b981';
      default:
        return '#9ca3af';
    }
  };

  const getStrengthLabel = () => {
    switch (strength.strength) {
      case 'weak':
        return 'Weak';
      case 'medium':
        return 'Medium';
      case 'strong':
        return 'Strong';
      default:
        return 'Unknown';
    }
  };

  const progressPercentage = (
    (Object.values(strength.checks).filter(Boolean).length / 5) * 100
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Strength: <strong>{getStrengthLabel()}</strong></span>
        <span className={styles.percentage}>{Math.round(progressPercentage)}%</span>
      </div>

      {/* Progress Bar Only */}
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: getStrengthColor()
          }}
        />
      </div>
    </div>
  );
};

```

#### src\components\PasswordStrengthIndicator.module.css
```css
.container {
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  padding: 6px 0;
  margin-top: 4px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
}

.percentage {
  font-weight: 700;
  color: var(--primary);
  font-size: 11px;
}

.progressBar {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: 0;
}

.progress {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
  border-radius: var(--radius-full);
}

```

#### src\components\ProductPreview.jsx
```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const screenshots = [
  {
    url: 'https://customer-assets.emergentagent.com/job_36d9e875-a237-4e46-930b-686fabb257b4/artifacts/cll3rruk_image.png',
    title: 'Recent Notes',
    description: 'View and manage all your shared notes'
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_36d9e875-a237-4e46-930b-686fabb257b4/artifacts/ekqwh872_image.png',
    title: 'Search & Discover',
    description: 'Find notes instantly with powerful search'
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_36d9e875-a237-4e46-930b-686fabb257b4/artifacts/ng16s9pu_image.png',
    title: 'Profile Management',
    description: 'Customize your account and preferences'
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_36d9e875-a237-4e46-930b-686fabb257b4/artifacts/ii4qtjl4_image.png',
    title: 'Admin Control',
    description: 'Manage users and system settings'
  }
];

const ProductPreview = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            See It in
            <span className="text-[#3B82F6]"> Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the power and simplicity of NoteShare Vault's interface.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Main Screenshot Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mb-8"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="relative w-full flex items-center justify-center p-8"
                >
                  <img
                    src={screenshots[selectedIndex].url}
                    alt={screenshots[selectedIndex].title}
                    className="w-full h-auto object-contain rounded-lg shadow-xl"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none"></div>
                </motion.div>
              </AnimatePresence>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 z-10"
              >
                <span className="text-sm font-semibold text-gray-900">Live Interface</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {screenshots.map((screenshot, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedIndex(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative group rounded-2xl overflow-hidden transition-all ${
                  selectedIndex === index
                    ? 'ring-4 ring-[#3B82F6] shadow-xl'
                    : 'ring-2 ring-gray-200 hover:ring-[#3B82F6]/50 shadow-md'
                }`}
              >
                {/* Thumbnail */}
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-2">
                  <img
                    src={screenshot.url}
                    alt={screenshot.title}
                    className={`w-full h-full object-contain transition-all duration-300 ${
                      selectedIndex === index ? 'scale-100' : 'scale-95 opacity-60 group-hover:opacity-80'
                    }`}
                  />
                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 transition-all duration-300 ${
                      selectedIndex === index
                        ? 'bg-[#3B82F6]/10'
                        : 'bg-black/10 group-hover:bg-black/5'
                    }`}
                  ></div>
                </div>

                {/* Label */}
                <div className="p-4 bg-white">
                  <h3
                    className={`font-semibold mb-1 transition-colors ${
                      selectedIndex === index ? 'text-[#3B82F6]' : 'text-gray-900'
                    }`}
                  >
                    {screenshot.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {screenshot.description}
                  </p>
                </div>

                {/* Active indicator */}
                {selectedIndex === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-3 left-3 w-3 h-3 bg-[#3B82F6] rounded-full shadow-lg"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
```

#### src\components\SearchBar.jsx
```jsx
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export const SearchBar = ({ value, onChange, placeholder = 'Search notes...' }) => {
  return (
    <div className={styles.searchWrapper}>
      <Search className={styles.searchIcon} size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.searchInput}
      />
    </div>
  );
};
```

#### src\components\SearchBar.module.css
```css
.searchWrapper {
  position: relative;
  width: 100%;
}

.searchIcon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
  pointer-events: none;
}

.searchInput {
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-lg);
  font-size: 15px;
  font-family: var(--font-family);
  background: var(--white);
  color: var(--text-primary);
  transition: var(--transition);
}

.searchInput:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.searchInput::placeholder {
  color: var(--gray-400);
}
```

#### src\components\SecuritySection.jsx
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, CheckCircle2 } from 'lucide-react';

const securityFeatures = [
  {
    icon: Shield,
    title: 'End-to-End Encryption',
    description: 'All your notes are encrypted with industry-standard 256-bit AES encryption.'
  },
  {
    icon: Lock,
    title: 'Secure Access Control',
    description: 'Role-based permissions ensure only authorized users can access sensitive content.'
  },
  {
    icon: Eye,
    title: 'Privacy First',
    description: 'We never sell your data. Your academic content remains private and secure.'
  },
  {
    icon: CheckCircle2,
    title: 'Regular Security Audits',
    description: 'Our platform undergoes regular security audits to maintain the highest standards.'
  }
];

const SecuritySection = () => {
  return (
    <section id="security" className="py-24 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose
            <span className="text-[#3B82F6]"> NoteShare Vault</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your security and privacy are our top priorities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#3B82F6] transition-all shadow-md hover:shadow-xl text-center"
              >
                <motion.div
                  className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-8 h-8 text-[#3B82F6]" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
```

#### src\components\SessionTimeoutWarning.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import styles from './SessionTimeoutWarning.module.css';

const INACTIVITY_WARNING_TIME = 25 * 60 * 1000; // 25 minutes
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const SessionTimeoutWarning = ({ onTimeout, onExtend }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  let timeoutId = null;
  let warningTimeoutId = null;
  let countdownId = null;

  useEffect(() => {
    const resetInactivityTimer = () => {
      clearTimeout(timeoutId);
      clearTimeout(warningTimeoutId);
      clearInterval(countdownId);
      setShowWarning(false);

      // Show warning after 25 minutes of inactivity
      warningTimeoutId = setTimeout(() => {
        setShowWarning(true);
        setTimeRemaining(5 * 60); // 5 minutes countdown

        // Countdown timer
        countdownId = setInterval(() => {
          setTimeRemaining(prev => {
            if (prev <= 1) {
              clearInterval(countdownId);
              handleTimeout();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, INACTIVITY_WARNING_TIME);

      // Auto logout after 30 minutes
      timeoutId = setTimeout(() => {
        handleTimeout();
      }, SESSION_TIMEOUT);
    };

    // Track user activity
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

    activityEvents.forEach(event => {
      document.addEventListener(event, resetInactivityTimer, true);
    });

    resetInactivityTimer();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(warningTimeoutId);
      clearInterval(countdownId);
      activityEvents.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer, true);
      });
    };
  }, []);

  const handleTimeout = () => {
    setShowWarning(false);
    onTimeout?.();
  };

  const handleExtend = () => {
    setShowWarning(false);
    onExtend?.();
    // Reset the timer
    const resetInactivityTimer = () => {
      // Timer will be reset
    };
    resetInactivityTimer();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!showWarning) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <AlertTriangle size={32} color="#f59e0b" />
          <h2>Session Timeout Warning</h2>
        </div>

        <div className={styles.content}>
          <p>Your session is about to expire due to inactivity.</p>
          <p className={styles.timeRemaining}>
            Time remaining: <strong>{formatTime(timeRemaining)}</strong>
          </p>
          <p className={styles.warning}>
            Click "Continue Session" to stay logged in, or your session will be automatically terminated.
          </p>
        </div>

        <div className={styles.actions}>
          <button className={styles.extendBtn} onClick={handleExtend}>
            Continue Session
          </button>
          <button className={styles.logoutBtn} onClick={handleTimeout}>
            Logout Now
          </button>
        </div>
      </div>
    </div>
  );
};

```

#### src\components\SessionTimeoutWarning.module.css
```css
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: var(--space-lg);
  max-width: 400px;
  width: 90%;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #f59e0b;
}

.content {
  margin-bottom: var(--space-lg);
}

.content p {
  margin: var(--space-sm) 0;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.timeRemaining {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: var(--space-md);
  border-radius: var(--radius-sm);
  margin: var(--space-md) 0 !important;
  font-size: 16px !important;
  color: #92400e !important;
}

.warning {
  background: #fee2e2;
  border-left: 4px solid #ef4444;
  padding: var(--space-md);
  border-radius: var(--radius-sm);
  margin: var(--space-md) 0 !important;
  font-size: 13px !important;
}

.actions {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
}

.extendBtn {
  flex: 1;
  padding: var(--space-md);
  background: #10b981;
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.extendBtn:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.extendBtn:active {
  transform: translateY(0);
}

.logoutBtn {
  flex: 1;
  padding: var(--space-md);
  background: #ef4444;
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.logoutBtn:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.logoutBtn:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 480px) {
  .modal {
    padding: var(--space-md);
    max-width: 95%;
  }

  .header {
    gap: var(--space-sm);
  }

  .header h2 {
    font-size: 18px;
  }

  .actions {
    flex-direction: column;
  }

  .content p {
    font-size: 13px;
  }
}

```

#### src\components\ShareModal.jsx
```jsx
import { useState } from 'react';
import { X, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import styles from './ShareModal.module.css';

export const ShareModal = ({ isOpen, fileName, fileId, onClose }) => {
  const [copied, setCopied] = useState(false);

  const shareLink = `${window.location.origin}/file/${fileId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Share "{fileName}"</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          <p className={styles.description}>
            Share this link with others to let them access this file instantly:
          </p>

          <div className={styles.linkContainer}>
            <input
              type="text"
              value={shareLink}
              readOnly
              className={styles.linkInput}
            />
            <button
              onClick={handleCopyLink}
              className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
              title="Copy link to clipboard"
            >
              {copied ? (
                <>
                  <CheckCircle size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className={styles.info}>
            <p>Anyone with this link can access and view this file on the platform.</p>
          </div>
        </div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.doneBtn}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

```

#### src\components\ShareModal.module.css
```css
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(31, 41, 55, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.3s ease;
  backdrop-filter: blur(4px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  max-width: 520px;
  width: 100%;
  animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
}

.header h2 {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  word-break: break-word;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header h2::before {
  content: '🔗';
  font-size: 20px;
}

.closeBtn {
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  transition: all 0.3s ease;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
}

.closeBtn:hover {
  color: #ef4444;
  background: #fee2e2;
}

.content {
  padding: 2rem;
}

.description {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 1.75rem 0;
  line-height: 1.6;
  font-weight: 500;
}

.linkContainer {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  align-items: stretch;
}

.linkInput {
  flex: 1;
  padding: 0.875rem 1.125rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.625rem;
  font-size: 13px;
  color: #1f2937;
  background: #f9fafb;
  font-family: 'Courier New', monospace;
  word-break: break-all;
  transition: all 0.3s ease;
}

.linkInput:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.linkInput::selection {
  background: #3b82f6;
  color: white;
}

.copyBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 0.625rem;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.copyBtn:hover:not(.copied) {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.copyBtn:active:not(.copied) {
  transform: translateY(0);
}

.copyBtn.copied {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.copyBtn svg {
  width: 16px;
  height: 16px;
}

.info {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 1.5px solid #bfdbfe;
  border-radius: 0.625rem;
  padding: 1rem 1.125rem;
  margin-bottom: 0;
}

.info p {
  font-size: 13px;
  color: #1e40af;
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.doneBtn {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.625rem;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.doneBtn:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.doneBtn:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 480px) {
  .overlay {
    padding: 1rem;
  }

  .modal {
    max-width: 100%;
  }

  .header {
    padding: 1.5rem;
  }

  .header h2 {
    font-size: 16px;
  }

  .content,
  .footer {
    padding: 1.5rem;
  }

  .linkContainer {
    flex-direction: column;
  }

  .copyBtn {
    width: 100%;
    justify-content: center;
  }

  .doneBtn {
    width: 100%;
  }
}


```

#### src\components\Sidebar.jsx
```jsx
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
```

#### src\components\Sidebar.module.css
```css
.sidebar {
  width: 260px;
  background: var(--white);
  border-right: 1px solid var(--gray-200);
  height: calc(100vh - 70px);
  position: sticky;
  top: 70px;
  overflow-y: auto;
}

.nav {
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.navItem {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: 12px 16px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: var(--transition);
}

.navItem:hover {
  background: var(--bg-hover);
  color: var(--primary);
}

.navItemActive {
  background: var(--bg-hover);
  color: var(--primary);
  font-weight: 600;
}

/* Overlay for mobile */
.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 97;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Close button inside sidebar */
.closeBtn {
  display: none;
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  padding: 6px;
  z-index: 1001;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
}

.closeBtn:hover {
  color: var(--primary);
  background: rgba(0, 0, 0, 0.05);
  border-radius: var(--radius-md);
}

@media (max-width: 1024px) {
  .sidebar {
    width: 70px;
  }

  .navItem span {
    display: none;
  }

  .navItem {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .sidebar {
    position: fixed;
    top: 70px;
    left: 0;
    width: 260px;
    height: calc(100vh - 70px);
    background: var(--white);
    border-right: 1px solid var(--gray-200);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 100;
    overflow-y: auto;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }

  .sidebarOpen {
    transform: translateX(0);
  }

  .overlay {
    display: block;
  }

  .nav {
    padding: 60px var(--space-md) var(--space-lg) var(--space-md);
  }

  .navItem {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: 12px 16px;
  }

  .navItem span {
    display: inline;
  }

  .closeBtn {
    display: flex;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 240px;
  }

  .hamburger {
    left: 12px;
    top: 12px;
  }

  .hamburger span {
    width: 22px;
    height: 2.5px;
  }

  .navItem {
    padding: 10px 14px;
    font-size: 14px;
    gap: var(--space-sm);
  }

  .nav {
    padding: 55px var(--space-md) var(--space-md) var(--space-md);
  }

  .closeBtn {
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
  }
}
```

#### src\components\StudentRegistrationModal.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getCollegeByCode } from '../data/colleges';

const StudentRegistrationModal = ({ onClose, onSuccess }) => {
  const { registerUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    collegeCode: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Pre-fill college code if available
    const registeredCode = localStorage.getItem('registeredCollegeCode');
    if (registeredCode) {
      setFormData(prev => ({
        ...prev,
        collegeCode: registeredCode
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }

    if (!formData.collegeCode.trim()) {
      setError('College code is required');
      return false;
    }

    const college = getCollegeByCode(formData.collegeCode);
    if (!college) {
      setError('Invalid college code');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Register user
      const result = registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        collegeCode: formData.collegeCode,
        role: 'student'
      });

      if (result.success) {
        setIsSubmitting(false);
        if (onSuccess) {
          onSuccess();
        }
        onClose();
      } else {
        setError(result.error || 'Registration failed');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('An error occurred during registration');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Student Registration</h3>
          <p className="text-gray-600">Create your account to start sharing notes</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">College Code *</label>
            <input
              type="text"
              name="collegeCode"
              value={formData.collegeCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition"
              placeholder="Enter college code"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition pr-10"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password *</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition pr-10"
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-[#3B82F6] text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isSubmitting ? 'Creating Account...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationModal;

```

#### src\components\ThemeToggle.jsx
```jsx
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggle}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun size={20} className={styles.icon} />
      ) : (
        <Moon size={20} className={styles.icon} />
      )}
    </button>
  );
};

```

#### src\components\ThemeToggle.module.css
```css
.toggle {
  background: none;
  border: 2px solid var(--gray-300);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-secondary);
}

.toggle:hover {
  background: var(--gray-100);
  border-color: var(--primary);
  color: var(--primary);
  transform: scale(1.05);
}

.toggle:active {
  transform: scale(0.95);
}

.icon {
  transition: transform 0.3s ease;
}

.toggle:hover .icon {
  transform: rotate(20deg);
}

/* Dark mode specific styles */
[data-theme='dark'] .toggle {
  border-color: var(--gray-600);
  color: var(--text-secondary);
}

[data-theme='dark'] .toggle:hover {
  background: var(--gray-800);
  border-color: var(--primary);
  color: var(--primary);
}

@media (max-width: 640px) {
  .toggle {
    width: 36px;
    height: 36px;
  }

  .toggle svg {
    width: 18px;
    height: 18px;
  }
}

```

#### src\components\ui\accordion.jsx
```jsx
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}>
      {children}
      <ChevronDown
        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}>
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

```

#### src\components\ui\alert-dialog.jsx
```jsx
import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref} />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props} />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props} />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props} />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

```

#### src\components\ui\alert.jsx
```jsx
import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props} />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props} />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props} />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

```

#### src\components\ui\aspect-ratio.jsx
```jsx
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }

```

#### src\components\ui\avatar.jsx
```jsx
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props} />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props} />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

```

#### src\components\ui\badge.jsx
```jsx
import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }

```

#### src\components\ui\breadcrumb.jsx
```jsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef(
  ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props} />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props} />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props} />
  );
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props} />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}>
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

```

#### src\components\ui\button.jsx
```jsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }

```

#### src\components\ui\calendar.jsx
```jsx
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props} />
  );
}
Calendar.displayName = "Calendar"

export { Calendar }

```

#### src\components\ui\card.jsx
```jsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

#### src\components\ui\carousel.jsx
```jsx
import * as React from "react"
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CarouselContext = React.createContext(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef((
  {
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  },
  ref
) => {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
  }, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api) => {
    if (!api) {
      return
    }

    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback((event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      scrollNext()
    }
  }, [scrollPrev, scrollNext])

  React.useEffect(() => {
    if (!api || !setApi) {
      return
    }

    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) {
      return
    }

    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    };
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}>
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props} />
    </div>
  );
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props} />
  );
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute  h-8 w-8 rounded-full", orientation === "horizontal"
        ? "-left-12 top-1/2 -translate-y-1/2"
        : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}>
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute h-8 w-8 rounded-full", orientation === "horizontal"
        ? "-right-12 top-1/2 -translate-y-1/2"
        : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}>
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
})
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };

```

#### src\components\ui\checkbox.jsx
```jsx
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}>
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

```

#### src\components\ui\collapsible.jsx
```jsx
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

```

#### src\components\ui\command.jsx
```jsx
import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props} />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({
  children,
  ...props
}) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

const CommandInput = React.forwardRef(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props} />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props} />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props} />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("-mx-1 h-px bg-border", className)} {...props} />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props} />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props} />
  );
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

```

#### src\components\ui\context-menu.jsx
```jsx
import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}>
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
      className
    )}
    {...props} />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 max-h-[--radix-context-menu-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
        className
      )}
      {...props} />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props} />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props} />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props} />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props} />
  );
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}

```

#### src\components\ui\dialog.jsx
```jsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props} />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}>
      {children}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props} />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

```

#### src\components\ui\drawer.jsx
```jsx
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props} />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}>
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props} />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props} />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

```

#### src\components\ui\dropdown-menu.jsx
```jsx
import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}>
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    )}
    {...props} />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props} />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props} />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props} />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props} />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props} />
  );
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

```

#### src\components\ui\form.jsx
```jsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

const FormFieldContext = React.createContext({})

const FormField = (
  {
    ...props
  }
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const FormItemContext = React.createContext({})

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props} />
  );
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props} />
  );
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props} />
  );
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}>
      {body}
    </p>
  );
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

#### src\components\ui\hover-card.jsx
```jsx
import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]",
      className
    )}
    {...props} />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }

```

#### src\components\ui\input-otp.jsx
```jsx
import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props} />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className
      )}
      {...props}>
      {char}
      {hasFakeCaret && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

```

#### src\components\ui\input.jsx
```jsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />
  );
})
Input.displayName = "Input"

export { Input }

```

#### src\components\ui\label.jsx
```jsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

#### src\components\ui\menubar.jsx
```jsx
import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function MenubarMenu({
  ...props
}) {
  return <MenubarPrimitive.Menu {...props} />;
}

function MenubarGroup({
  ...props
}) {
  return <MenubarPrimitive.Group {...props} />;
}

function MenubarPortal({
  ...props
}) {
  return <MenubarPrimitive.Portal {...props} />;
}

function MenubarRadioGroup({
  ...props
}) {
  return <MenubarPrimitive.RadioGroup {...props} />;
}

function MenubarSub({
  ...props
}) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

const Menubar = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      className
    )}
    {...props} />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props} />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}>
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
      className
    )}
    {...props} />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef((
  { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
  ref
) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
        className
      )}
      {...props} />
  </MenubarPrimitive.Portal>
))
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props} />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props} />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props} />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props} />
  );
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}

```

#### src\components\ui\navigation-menu.jsx
```jsx
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}>
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props} />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
)

const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}>
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true" />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props} />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props} />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}>
    <div
      className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}

```

#### src\components\ui\pagination.jsx
```jsx
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button";

const Pagination = ({
  className,
  ...props
}) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props} />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props} />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(buttonVariants({
      variant: isActive ? "outline" : "ghost",
      size,
    }), className)}
    {...props} />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}>
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}>
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}

```

#### src\components\ui\popover.jsx
```jsx
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props} />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }

```

#### src\components\ui\progress.jsx
```jsx
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}>
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

```

#### src\components\ui\radio-group.jsx
```jsx
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (<RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />);
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }

```

#### src\components\ui\resizable.jsx
```jsx
import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props} />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}>
    {withHandle && (
      <div
        className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

```

#### src\components\ui\scroll-area.jsx
```jsx
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}>
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}>
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }

```

#### src\components\ui\select.jsx
```jsx
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}>
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}>
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}>
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn("p-1", position === "popper" &&
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]")}>
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props} />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}>
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props} />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

```

#### src\components\ui\separator.jsx
```jsx
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef((
  { className, orientation = "horizontal", decorative = true, ...props },
  ref
) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props} />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

```

#### src\components\ui\sheet.jsx
```jsx
import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva } from "class-variance-authority";
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref} />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      <SheetPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props} />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props} />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

#### src\components\ui\skeleton.jsx
```jsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props} />
  );
}

export { Skeleton }

```

#### src\components\ui\slider.jsx
```jsx
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}>
    <SliderPrimitive.Track
      className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

```

#### src\components\ui\sonner.jsx
```jsx
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props} />
  );
}

export { Toaster, toast }

```

#### src\components\ui\switch.jsx
```jsx
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}>
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      )} />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

```

#### src\components\ui\table.jsx
```jsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props} />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props} />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
    {...props} />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props} />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props} />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props} />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props} />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

#### src\components\ui\tabs.jsx
```jsx
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props} />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

#### src\components\ui\textarea.jsx
```jsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />
  );
})
Textarea.displayName = "Textarea"

export { Textarea }

```

#### src\components\ui\toast.jsx
```jsx
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva } from "class-variance-authority";
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props} />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props} />
  );
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props} />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}>
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props} />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction };

```

#### src\components\ui\toaster.jsx
```jsx
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

```

#### src\components\ui\toggle-group.jsx
```jsx
import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(toggleVariants({
        variant: context.variant || variant,
        size: context.size || size,
      }), className)}
      {...props}>
      {children}
    </ToggleGroupPrimitive.Item>
  );
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }

```

#### src\components\ui\toggle.jsx
```jsx
"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props} />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }

```

#### src\components\ui\tooltip.jsx
```jsx
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
        className
      )}
      {...props} />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```

#### src\components\UploadForm.jsx
```jsx
import { useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import styles from './UploadForm.module.css';

export const UploadForm = ({ onSubmit, uploaderName, uploaderRole }) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    unit: '',
    topic: '',
    description: '',
    yearSemester: '',
    keywords: []
  });
  const [keywordInput, setKeywordInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddKeyword = (e) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      e.preventDefault();
      if (!formData.keywords.includes(keywordInput.trim())) {
        setFormData(prev => ({
          ...prev,
          keywords: [...prev.keywords, keywordInput.trim()]
        }));
      }
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
      
      if (validTypes.includes(file.type) || file.name.endsWith('.pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx') || file.name.endsWith('.ppt') || file.name.endsWith('.pptx')) {
        setSelectedFile(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that a file is selected
    if (!selectedFile) {
      setValidationError('Please select a file to upload');
      return;
    }

    // Clear validation error on successful validation
    setValidationError('');

    setIsSubmitting(true);

    // Generate key
    const key = `${formData.subject.replace(/\s+/g, '')}_${formData.unit.replace(/\s+/g, '')}_${formData.topic.replace(/\s+/g, '')}_${new Date().getFullYear()}`;

    const fileData = {
      ...formData,
      key,
      uploaderName,
      uploaderRole,
      downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' // Mock URL
    };

    const result = await onSubmit(fileData);
    
    if (result.success) {
      // Reset form
      setFormData({
        title: '',
        subject: '',
        unit: '',
        topic: '',
        description: '',
        yearSemester: '',
        keywords: []
      });
      setSelectedFile(null);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={styles.input}
          placeholder="e.g., Introduction to Data Structures"
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Subject *</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="e.g., Computer Science"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Unit *</label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="e.g., Unit 1"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Topic *</label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          required
          className={styles.input}
          placeholder="e.g., Arrays and Linked Lists"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className={styles.textarea}
          placeholder="Describe the content of your notes..."
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Year/Semester *</label>
        <input
          type="text"
          name="yearSemester"
          value={formData.yearSemester}
          onChange={handleChange}
          required
          className={styles.input}
          placeholder="e.g., 2024 Semester 1"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Keywords (Press Enter to add)</label>
        <div className={styles.tagInputWrapper}>
          {formData.keywords.map((keyword) => (
            <span key={keyword} className={styles.tag}>
              {keyword}
              <button
                type="button"
                onClick={() => handleRemoveKeyword(keyword)}
                className={styles.tagRemove}
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleAddKeyword}
            className={styles.tagInput}
            placeholder="Add keywords..."
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Upload File *</label>
        <div 
          className={`${styles.fileInputWrapper} ${isDragging ? styles.dragging : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.fileInput}
            id="file-upload"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
          />
          <label htmlFor="file-upload" className={styles.fileLabel}>
            <Upload size={20} />
            <div className={styles.fileText}>
              <span>{selectedFile ? selectedFile.name : 'Choose a file'}</span>
              <p className={styles.dragHint}>or drag and drop a file</p>
            </div>
          </label>
          {selectedFile && (
            <div className={styles.fileSelected}>
              <FileText size={16} />
              <span>{selectedFile.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.autoKey}>
        <strong>Auto-generated Key:</strong>{' '}
        {formData.subject && formData.unit && formData.topic
          ? `${formData.subject.replace(/\s+/g, '')}_${formData.unit.replace(/\s+/g, '')}_${formData.topic.replace(/\s+/g, '')}_${new Date().getFullYear()}`
          : 'Fill in subject, unit, and topic to generate key'}
      </div>

      {validationError && (
        <div className={styles.errorMessage}>
          {validationError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitBtn}
      >
        {isSubmitting ? (
          <>
            <div className={styles.spinner}></div>
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <Upload size={20} />
            <span>Upload Notes</span>
          </>
        )}
      </button>
    </form>
  );
};
```

#### src\components\UploadForm.module.css
```css
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.formRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
}

.input,
.textarea {
  width: 100%;
  padding: 14px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  font-family: var(--font-family);
  background: #ffffff;
  color: #1a1a1a;
  transition: all 0.2s ease;
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.textarea {
  resize: vertical;
  min-height: 140px;
  padding: 14px 14px;
}

.tagInputWrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 12px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  min-height: 48px;
  align-items: center;
  transition: all 0.2s ease;
}

.tagInputWrapper:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: #dbeafe;
  color: #2563eb;
  border-radius: 6px;
  font-size: 13px;
}

.tagRemove {
  background: none;
  border: none;
  color: var(--white);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: var(--transition);
}

.tagRemove:hover {
  opacity: 0.8;
}

.tagInput {
  flex: 1;
  min-width: 120px;
  border: none;
  outline: none;
  padding: 4px;
  font-size: 15px;
  font-family: var(--font-family);
}

.fileInputWrapper {
  position: relative;
  transition: all 0.2s ease;
}

.fileInputWrapper.dragging {
  background: #eff6ff;
  border-radius: 8px;
}

.fileInputWrapper.dragging .fileLabel {
  border-color: #3b82f6;
  background: #dbeafe;
  color: #1d4ed8;
}

.fileInput {
  display: none;
}

.fileLabel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px 24px;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  min-height: 80px;
}

.fileLabel:hover {
  border-color: #3b82f6;
  background: #eff6ff;
  color: #3b82f6;
}

.fileText {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.fileText span {
  font-size: 15px;
  font-weight: 500;
}

.dragHint {
  font-size: 13px;
  color: #9ca3af;
  font-weight: 400;
  margin: 0;
}

.fileLabel:hover .dragHint {
  color: #6b7280;
}

.fileInputWrapper.dragging .dragHint {
  color: #3b82f6;
}

.fileSelected {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  margin-top: 8px;
  background: #ecfdf5;
  border: 1px solid #d1fae5;
  border-radius: 6px;
  font-size: 14px;
  color: #065f46;
}

.autoKey {
  padding: 12px 14px;
  background: #f0f4f8;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #475569;
  border-left: 4px solid #3b82f6;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  line-height: 1.5;
}

.autoKey strong {
  color: var(--text-primary);
}

.errorMessage {
  padding: 12px 14px;
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.submitBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  background: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
  width: 100%;
}

.submitBtn:hover:not(:disabled) {
  background: #2563eb;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}

.submitBtn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: var(--white);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .formRow {
    grid-template-columns: 1fr;
  }
}
```

#### src\components\UserRoles.jsx
```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Shield } from 'lucide-react';

const roles = [
  {
    icon: GraduationCap,
    title: 'Students',
    shortDesc: 'Access and organize your study materials',
    fullDesc: 'Students can upload, organize, and share notes with classmates. Collaborate on group projects, access shared resources, and keep all your academic materials in one secure place.'
  },
  {
    icon: BookOpen,
    title: 'Professors',
    shortDesc: 'Share course materials and manage content',
    fullDesc: 'Professors can distribute lecture notes, assignments, and course materials to students. Control access permissions, track engagement, and provide resources that enhance learning outcomes.'
  },
  {
    icon: Shield,
    title: 'Administrators',
    shortDesc: 'Manage users and oversee platform security',
    fullDesc: 'Administrators have full control over user management, access permissions, and platform settings. Monitor activity, ensure compliance, and maintain institutional data security standards.'
  }
];

const UserRoles = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/20 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Built for
            <span className="text-[#3B82F6]"> Every Role</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tailored features for students, professors, and administrators.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <motion.div
                  layout
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#3B82F6] transition-all cursor-pointer shadow-lg hover:shadow-xl"
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="w-8 h-8 text-[#3B82F6]" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    {role.shortDesc}
                  </p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {role.fullDesc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="text-center mt-4">
                    <span className="text-[#3B82F6] text-sm font-medium">
                      {isExpanded ? 'Click to collapse' : 'Click to expand'}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserRoles;
```

### 9. API SERVICE LAYER
No API service files detected

### 10. UI DESIGN SYSTEM (AUTO-DETECTED)
Tailwind config present (tailwind.config.js).
CSS Modules detected.
Custom UI library components under src/components/ui.

### 11. TOKEN STORAGE METHOD (AUTO-DETECTED)
src\components\LoginModal.jsx: L20: const rememberedEmail = localStorage.getItem('rememberedEmail');
src\components\LoginModal.jsx: L21: const rememberedCode = localStorage.getItem('rememberedCollege');
src\components\LoginModal.jsx: L87: localStorage.setItem('rememberedEmail', formData.email);
src\components\LoginModal.jsx: L88: localStorage.setItem('rememberedCollege', formData.collegeCode);
src\components\LoginModal.jsx: L90: localStorage.removeItem('rememberedEmail');
src\components\LoginModal.jsx: L91: localStorage.removeItem('rememberedCollege');
src\components\StudentRegistrationModal.jsx: L22: const registeredCode = localStorage.getItem('registeredCollegeCode');
src\context\ThemeContext.jsx: L13: // Check localStorage for saved theme preference
src\context\ThemeContext.jsx: L14: const savedTheme = localStorage.getItem('theme-preference');
src\context\ThemeContext.jsx: L49: // Save preference to localStorage
src\context\ThemeContext.jsx: L50: localStorage.setItem('theme-preference', isDarkMode ? 'dark' : 'light');
src\data\notifications.js: L6: // Initialize notifications from localStorage
src\data\notifications.js: L8: if (typeof window !== 'undefined' && window.localStorage) {
src\data\notifications.js: L9: const raw = window.localStorage.getItem(NOTIFICATIONS_KEY);
src\data\notifications.js: L18: if (typeof window !== 'undefined' && window.localStorage) {
src\data\notifications.js: L19: window.localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
src\data\users.js: L54: // Load pending requests from localStorage if available (keeps data across reloads in the browser)
src\data\users.js: L57: if (typeof window !== 'undefined' && window.localStorage) {
src\data\users.js: L58: const raw = window.localStorage.getItem(PENDING_KEY);
src\data\users.js: L62: // ignore localStorage errors
src\data\users.js: L67: if (typeof window !== 'undefined' && window.localStorage) {
src\data\users.js: L68: window.localStorage.setItem(PENDING_KEY, JSON.stringify(pendingProfessorRequests));
src\hooks\useAuth.js: L19: // Check if user is logged in (from localStorage)
src\hooks\useAuth.js: L20: const storedUser = localStorage.getItem('currentUser');
src\hooks\useAuth.js: L21: const storedCollege = localStorage.getItem('currentCollege');
src\hooks\useAuth.js: L59: localStorage.setItem('currentUser', JSON.stringify(newUser));
src\hooks\useAuth.js: L60: localStorage.setItem('currentCollege', JSON.stringify(college));
src\hooks\useAuth.js: L112: localStorage.setItem('currentUser', JSON.stringify(user));
src\hooks\useAuth.js: L113: localStorage.setItem('currentCollege', JSON.stringify(college));
src\hooks\useAuth.js: L139: localStorage.setItem('currentUser', JSON.stringify(user));
src\hooks\useAuth.js: L140: localStorage.setItem('currentCollege', JSON.stringify(college));
src\hooks\useAuth.js: L151: localStorage.removeItem('currentUser');
src\hooks\useAuth.js: L152: localStorage.removeItem('currentCollege');
src\hooks\useAuth.js: L157: // Limit photo data size to prevent localStorage quota exceeded
src\hooks\useAuth.js: L171: // Only store in localStorage if it's small enough
src\hooks\useAuth.js: L174: localStorage.setItem('currentUser', JSON.stringify(updated));
src\hooks\useAuth.js: L176: console.warn('Could not save photo to localStorage:', e);
src\hooks\useAuth.js: L177: // Keep the updated user in memory even if localStorage fails
src\hooks\useAuth.js: L188: localStorage.setItem('currentUser', JSON.stringify(updated));
src\hooks\useAuth.js: L206: localStorage.setItem('currentUser', JSON.stringify(updated));
src\hooks\useAuth.js: L223: localStorage.setItem('currentUser', JSON.stringify(updated));
src\hooks\useAuth.js: L245: localStorage.setItem('currentUser', JSON.stringify(updated));
src\hooks\useSecureAuth.js: L4: SecureTokenStorage,
src\hooks\useSecureAuth.js: L5: secureAPI,
src\hooks\useSecureAuth.js: L28: if (SecureTokenStorage.hasToken()) {
src\hooks\useSecureAuth.js: L43: const response = await secureAPI.get('/api/auth/verify');
src\hooks\useSecureAuth.js: L50: SecureTokenStorage.clearToken();
src\hooks\useSecureAuth.js: L55: SecureTokenStorage.clearToken();
src\hooks\useSecureAuth.js: L81: const response = await secureAPI.post('/api/auth/register', {
src\hooks\useSecureAuth.js: L90: SecureTokenStorage.setToken(response.token);

### 12. ADDITIONAL NOTES (AUTO)
src\components\SessionTimeoutWarning.jsx: L3: import styles from './SessionTimeoutWarning.module.css';
src\components\SessionTimeoutWarning.jsx: L5: const INACTIVITY_WARNING_TIME = 25 * 60 * 1000; // 25 minutes
src\components\SessionTimeoutWarning.jsx: L8: export const SessionTimeoutWarning = ({ onTimeout, onExtend }) => {
src\components\SessionTimeoutWarning.jsx: L9: const [showWarning, setShowWarning] = useState(false);
src\components\SessionTimeoutWarning.jsx: L12: let warningTimeoutId = null;
src\components\SessionTimeoutWarning.jsx: L18: clearTimeout(warningTimeoutId);
src\components\SessionTimeoutWarning.jsx: L20: setShowWarning(false);
src\components\SessionTimeoutWarning.jsx: L22: // Show warning after 25 minutes of inactivity
src\components\SessionTimeoutWarning.jsx: L23: warningTimeoutId = setTimeout(() => {
src\components\SessionTimeoutWarning.jsx: L24: setShowWarning(true);
src\components\SessionTimeoutWarning.jsx: L38: }, INACTIVITY_WARNING_TIME);
src\components\SessionTimeoutWarning.jsx: L57: clearTimeout(warningTimeoutId);
src\components\SessionTimeoutWarning.jsx: L66: setShowWarning(false);
src\components\SessionTimeoutWarning.jsx: L71: setShowWarning(false);
src\components\SessionTimeoutWarning.jsx: L86: if (!showWarning) return null;
src\components\SessionTimeoutWarning.jsx: L93: <h2>Session Timeout Warning</h2>
src\components\SessionTimeoutWarning.jsx: L101: <p className={styles.warning}>
src\hooks\useAuth.js: L163: console.warn('Image too large for storage, storing reference only');
src\hooks\useAuth.js: L176: console.warn('Could not save photo to localStorage:', e);
src\lib\securityUtils.js: L321: * @param {string} severity - 'info' | 'warning' | 'error'
src\lib\securityUtils.js: L341: if (severity === 'warning' || severity === 'error') {
src\lib\securityUtils.js: L342: console.warn(`[Security Event] ${action}:`, details);
src\pages\AdminPanel.jsx: L398: <p className={styles.deleteModalWarning}>This action cannot be undone.</p>
src\pages\ForgotPassword.jsx: L37: // TODO: Backend API call
src\pages\ForgotPassword.jsx: L87: // TODO: Backend API call
src\pages\Login.jsx: L116: // TODO: Implement Google OAuth login
src\pages\ProfessorPanel.jsx: L294: <p className={styles.deleteModalWarning}>This action cannot be undone.</p>
src\utils\secureAuth.js: L215: console.warn('Logout API error:', error);
src\utils\secureAuth.js: L239: console.warn('Session timeout due to inactivity');

### 13. BACKEND ENDPOINTS (AUTO)
DELETE /{file_id} (files.py)
GET /me (users.py)
GET /search (files.py)
GET /stats (admin.py)
GET /storage (admin.py)
GET /users (admin.py)
GET /{code} (colleges.py)
GET /{file_id} (files.py)
GET /{file_id}/download (files.py)
GET /{user_id} (users.py)
POST /avatar/presign (users.py)
POST /presign (files.py)
POST /users/{user_id}/promote (admin.py)
POST /{request_id}/approve (professor_requests.py)
POST /{request_id}/reject (professor_requests.py)
PUT /me (users.py)
PUT /{file_id} (files.py)

✔ Auto-collection complete. Waiting for confirmation to generate integration plan.
