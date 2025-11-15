import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Upload } from 'lucide-react';
import { addCollege } from '../data/colleges';
import styles from './RegisterCollege.module.css';

export const RegisterCollege = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    shortCode: '',
    logo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add college
    const newCollege = addCollege({
      name: formData.name,
      shortCode: formData.shortCode,
      logo: formData.logo || 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop'
    });

    // Save to localStorage for next step
    localStorage.setItem('pendingCollegeId', newCollege.id);

    setIsSubmitting(false);
    
    // Navigate to user registration
    navigate('/register');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <Building2 size={40} />
          </div>
          <h1 className={styles.title}>Register Your College</h1>
          <p className={styles.subtitle}>
            Welcome to NoteShare Vault! Let's start by adding your college.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
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
            <label className={styles.label}>Short Code *</label>
            <input
              type="text"
              name="shortCode"
              value={formData.shortCode}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="e.g., ACE"
              maxLength={10}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>College Logo URL (optional)</label>
            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className={styles.input}
              placeholder="https://example.com/logo.png"
            />
            <p className={styles.hint}>Leave empty to use default logo</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitBtn}
          >
            {isSubmitting ? (
              <>
                <div className={styles.spinner}></div>
                <span>Creating...</span>
              </>
            ) : (
              <span>Continue to Registration</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};