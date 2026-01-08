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
