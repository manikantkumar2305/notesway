/* =========================================================
   Imports
========================================================= */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  FileText,
  Download,
  User,
  GraduationCap,
  Trash2,
  Edit2,
  Share2,
} from 'lucide-react';

import { DeleteConfirmModal } from './DeleteConfirmModal';
import { ShareModal } from './ShareModal';

import { downloadFileUrl } from '../services/fileApi';

import styles from './FileCard.module.css';

/* =========================================================
   FileCard Component
========================================================= */
export const FileCard = ({
  file,
  onDelete,
  onEdit,
  showDeleteBtn = false,
}) => {
  /* ================= STATE ================= */
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);
  const [showShareModal, setShowShareModal] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] =
    useState(false);

  /* ================= CONSTANTS ================= */
  const targetId = file.id || file._id;

  /* =========================================================
     Utils
  ========================================================= */
  const getRoleIcon = (role) =>
    role === 'professor' ? (
      <GraduationCap size={14} />
    ) : (
      <User size={14} />
    );

  /* =========================================================
     Handlers
  ========================================================= */

  /* ---------- Delete ---------- */
  const handleDeleteClick = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    if (onDelete) {
      onDelete(targetId);
    }

    setShowDeleteModal(false);
    setIsDeleting(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  /* ---------- Edit ---------- */
  const handleEdit = (e) => {
    e.preventDefault();

    if (onEdit) {
      onEdit(file);
    }
  };

  /* ---------- Download ---------- */
  const handleDownload = async (e) => {
    e.preventDefault();
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const { url } = await downloadFileUrl(targetId);

      // Browser + S3 handle filename & type
      window.location.href = url;
    } finally {
      setIsDownloading(false);
    }
  };

  /* ---------- Share ---------- */
  const handleShare = (e) => {
    e.preventDefault();
    setShowShareModal(true);
  };

  /* =========================================================
     UI
  ========================================================= */
  return (
    <>
      <div className={styles.cardWrapper}>
        <Link
          to={`/file/${targetId}`}
          className={styles.card}
        >
          {/* ================= HEADER ================= */}
          <div className={styles.cardHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper}>
                <FileText size={24} />
              </div>
              <div className={styles.subject}>
                {file.subject}
              </div>
            </div>

            {showDeleteBtn && (
              <div className={styles.cardActions}>
                {onEdit && (
                  <button
                    onClick={handleEdit}
                    className={styles.editBtn}
                    title="Edit file details"
                  >
                    <Edit2 size={18} />
                  </button>
                )}

                {onDelete && (
                  <button
                    onClick={handleDeleteClick}
                    className={styles.deleteBtn}
                    title="Delete this file"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ================= BODY ================= */}
          <div className={styles.cardBody}>
            <h3 className={styles.title}>
              {file.title}
            </h3>

            <p className={styles.description}>
              {file.description}
            </p>

            <div className={styles.meta}>
              <span className={styles.unit}>
                {file.unit}
              </span>
              <span className={styles.dot}>•</span>
              <span className={styles.year}>
                {file.yearSemester}
              </span>
            </div>

            <div className={styles.keywords}>
              {file.keywords
                .slice(0, 3)
                .map((keyword, idx) => (
                  <span
                    key={idx}
                    className={styles.keyword}
                  >
                    {keyword}
                  </span>
                ))}
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <div className={styles.cardFooter}>
            <div className={styles.uploader}>
              {getRoleIcon(file.uploaderRole)}
              <span>{file.uploaderName}</span>
            </div>

            <div className={styles.actions}>
              <button
                onClick={handleShare}
                className={styles.shareIcon}
                title="Share this file"
              >
                <Share2 size={18} />
              </button>

              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`${styles.downloadIcon} ${
                  isDownloading
                    ? styles.downloading
                    : ''
                }`}
                title="Download this file"
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        </Link>
      </div>

      {/* ================= DELETE MODAL ================= */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        fileName={file.title}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />

      {/* ================= SHARE MODAL ================= */}
      <ShareModal
        isOpen={showShareModal}
        fileName={file.title}
        fileId={targetId}
        onClose={() => setShowShareModal(false)}
      />
    </>
  );
};
