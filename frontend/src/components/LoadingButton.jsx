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
