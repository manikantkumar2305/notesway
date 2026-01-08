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
        fileId: file.id || file._id
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
