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

    const fileData = {
      ...formData,
      uploaderName,
      uploaderRole,
      file: selectedFile
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