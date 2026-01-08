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
