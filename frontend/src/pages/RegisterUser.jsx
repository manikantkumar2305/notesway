import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, UserPlus, BookOpen, Users, Shield, Upload, MessageSquare, TrendingUp, Lock, Bell, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { fetchCollegeByCode } from '../services/authApi';
import styles from './RegisterUser.module.css';
import studentStyles from './RegisterStudent.module.css';

export const RegisterUser = ({ isStudentRegistration }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { registerCollege, registerStudent } = useAuth();

  // Determine if this is student registration based on route or props
  const isStudent = isStudentRegistration || searchParams.get('type') === 'student';

  const [formData, setFormData] = useState({
    name: '',
    shortCode: '',
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    adminPasswordConfirm: '',
    // Student fields
    collegeCode: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    // Clear remembered login on registration pages
    localStorage.removeItem('rememberedEmail');
    localStorage.removeItem('rememberedCollege');

    // If coming from college registration, pre-fill college code
    const registeredCode = localStorage.getItem('registeredCollegeCode');
    if (registeredCode && isStudent) {
      setFormData(prev => ({
        ...prev,
        collegeCode: registeredCode
      }));
      localStorage.removeItem('registeredCollegeCode');
    }
  }, [isStudent]);

  // Auto-rotate carousel every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [features.length]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleCollegeRegistration = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('College name is required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.shortCode.trim()) {
      setError('College code is required');
      setIsSubmitting(false);
      return;
    }

    if (formData.shortCode.length > 10) {
      setError('College code cannot exceed 10 characters');
      setIsSubmitting(false);
      return;
    }

    if (!formData.adminEmail.includes('@')) {
      setError('Please enter a valid admin email');
      setIsSubmitting(false);
      return;
    }

    if (formData.adminPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setIsSubmitting(false);
      return;
    }

    if (formData.adminPassword !== formData.adminPasswordConfirm) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await registerCollege({
        collegeCode: formData.shortCode.toUpperCase(),
        collegeName: formData.name,
        adminName: formData.adminName,
        adminEmail: formData.adminEmail,
        password: formData.adminPassword,
        location: null,
        website: null
      });

      if (result.success) {
        localStorage.setItem('registeredCollegeCode', formData.shortCode.toUpperCase());
        navigate('/dashboard');
      } else {
        setError(result.error);
        setIsSubmitting(false);
      }
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const handleStudentRegistration = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validation
    if (!formData.collegeCode.trim()) {
      setError('College code is required');
      setIsSubmitting(false);
      return;
    }

    try {
      await fetchCollegeByCode(formData.collegeCode.trim());
    } catch (err) {
      setError('Invalid college code. Please ask your college to register first.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.name.trim()) {
      setError('Your name is required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsSubmitting(false);
      return;
    }

    const result = await registerStudent({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      collegeCode: formData.collegeCode.trim()
    });

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  if (isStudent) {
    // STUDENT REGISTRATION - Split Screen Layout
    return (
      <div className={studentStyles.authContainer}>
        {/* Left Panel - Form */}
        <div className={studentStyles.leftPanel}>
          <div className={studentStyles.formContainer}>
            <div className={studentStyles.formHeader}>
              <h1 className={studentStyles.formTitle}>Create Account</h1>
              <p className={studentStyles.formSubtitle}>Join your college community</p>
            </div>

            {error && <div className={studentStyles.errorMsg}>{error}</div>}

            <form onSubmit={handleStudentRegistration} className={studentStyles.form}>
              <div className={studentStyles.formGroup}>
                <label className={studentStyles.label}>College Code *</label>
                <input
                  type="text"
                  name="collegeCode"
                  value={formData.collegeCode}
                  onChange={handleChange}
                  required
                  className={studentStyles.input}
                  placeholder="College code"
                />
              </div>

              <div className={studentStyles.formGroup}>
                <label className={studentStyles.label}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={studentStyles.input}
                  placeholder="Your name"
                />
              </div>

              <div className={studentStyles.formGroup}>
                <label className={studentStyles.label}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={studentStyles.input}
                  placeholder="your@email.com"
                />
              </div>

              <div className={studentStyles.formGroup}>
                <label className={studentStyles.label}>Password *</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className={studentStyles.input}
                    placeholder="••••••••"
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
              </div>

              <button type="submit" disabled={isSubmitting} className={studentStyles.submitBtn}>
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className={studentStyles.footer}>
              Already have an account?{' '}
              <a href="/login" className={studentStyles.link}>
                Sign In
              </a>
            </div>
          </div>
        </div>

        {/* Right Panel - Features Carousel */}
        <div className={studentStyles.rightPanel}>
          <div className={studentStyles.featuresContainer}>
            <div className={studentStyles.featureCard}>
              <div className={studentStyles.featureIcon}>
                {(() => {
                  const CurrentIcon = features[activeFeature].icon;
                  return <CurrentIcon size={32} />;
                })()}
              </div>
              <h2 className={studentStyles.featureTitle}>{features[activeFeature].title}</h2>
              <p className={studentStyles.featureDesc}>
                {features[activeFeature].desc}
              </p>
            </div>

            <h3 className={studentStyles.featureHeading}>{features[activeFeature].heading}</h3>
            <p className={studentStyles.featureText}>
              {features[activeFeature].text}
            </p>

            <div className={studentStyles.featureList}>
              {features[activeFeature].items.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className={studentStyles.featureItem}>
                    <ItemIcon size={20} />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className={studentStyles.dots}>
              {features.map((_, index) => (
                <span
                  key={index}
                  className={index === activeFeature ? studentStyles.active : ''}
                  onClick={() => setActiveFeature(index)}
                  style={{ cursor: 'pointer' }}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // COLLEGE ADMIN REGISTRATION - Split Screen Layout
  return (
    <div className={styles.authContainer}>
      {/* Left Panel - Form */}
      <div className={styles.leftPanel}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Register College</h1>
            <p className={styles.formSubtitle}>Set up your institution account</p>
          </div>

          {error && <div className={styles.errorMsg}>{error}</div>}

          <form onSubmit={handleCollegeRegistration} className={styles.form}>
            {/* College Information Section */}
            <div className={styles.formGroup}>
              <label className={styles.label}>College Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="e.g., ABC College of Engineering"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>College Code *</label>
              <input
                type="text"
                name="shortCode"
                value={formData.shortCode}
                onChange={handleChange}
                required
                maxLength={10}
                className={styles.input}
                placeholder="e.g., ACE"
              />
              <small style={{ color: '#6B7280', marginTop: '4px', fontSize: '12px' }}>
                Unique code for students to register under your college
              </small>
            </div>

            {/* Admin Information Section */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Admin Name *</label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="Your full name"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Admin Email *</label>
              <input
                type="email"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="admin@college.edu"
              />
            </div>

            {/* Password Section */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Password *</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className={styles.input}
                  placeholder="••••••••"
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
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Confirm Password *</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="adminPasswordConfirm"
                  value={formData.adminPasswordConfirm}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className={styles.input}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
              {isSubmitting ? 'Registering...' : 'Register College'}
            </button>
          </form>

          <div className={styles.footer}>
            Are you a student?{' '}
            <a href="/register-student" className={styles.link}>
              Register as Student
            </a>
            <br />
            Already have an account?{' '}
            <a href="/login" className={styles.link}>
              Sign In
            </a>
          </div>
        </div>
      </div>

      {/* Right Panel - Features Carousel */}
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