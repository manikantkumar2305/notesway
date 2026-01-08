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
