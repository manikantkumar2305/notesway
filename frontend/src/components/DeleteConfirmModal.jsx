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
