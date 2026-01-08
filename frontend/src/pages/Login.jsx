import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Users, Shield, Upload, MessageSquare, TrendingUp, Lock, Bell, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import styles from './Login.module.css';

export const Login = ({ onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate college code
    if (!formData.collegeCode.trim()) {
      setError('College code is required');
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
    const result = await login(formData.email, formData.password, formData.collegeCode);

    if (result.success) {
      // Close modal on success
      if (onClose) onClose();
      // Navigate to dashboard
      navigate('/dashboard', { replace: true });
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
            <Link to="/register" className={styles.link}>
              Create now
            </Link>
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