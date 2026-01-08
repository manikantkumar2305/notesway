/* =========================================================
   Imports
========================================================= */
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useFiles } from '../hooks/useFiles';
import { useAuth } from '../hooks/useAuth';
import { useSidebarState } from '../hooks/useSidebarState';

import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

import {
  Download,
  ArrowLeft,
  User,
  GraduationCap,
  Calendar,
  Key,
  Trash2,
} from 'lucide-react';

import { downloadFileUrl } from '../services/fileApi';

import styles from './FileDetails.module.css';

/* =========================================================
   FileDetails Component
========================================================= */
export const FileDetails = () => {
  /* ================= ROUTER ================= */
  const { id } = useParams();
  const navigate = useNavigate();

  /* ================= HOOKS ================= */
  const { getFile, deleteFile } = useFiles();
  const { currentUser } = useAuth();
  const { isSidebarOpen, toggleSidebar, closeSidebar } =
    useSidebarState();

  /* ================= STATE ================= */
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* =========================================================
     Load File
  ========================================================= */
  useEffect(() => {
    let isMounted = true;

    const loadFile = async () => {
      try {
        const data = await getFile(id);
        if (isMounted) setFile(data);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadFile();
    window.scrollTo(0, 0);

    return () => {
      isMounted = false;
    };
  }, [id, getFile]);

  /* =========================================================
     Loading State
  ========================================================= */
  if (isLoading) {
    return (
      <div className={styles.layout}>
        <Navbar onMenuToggle={toggleSidebar} />

        <div className={styles.main}>
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
          />

          <div className={styles.content}>
            <div className={styles.container}>
              <div className={styles.notFound}>
                <h2>Loading file...</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     Not Found
  ========================================================= */
  if (!file) {
    return (
      <div className={styles.layout}>
        <Navbar onMenuToggle={toggleSidebar} />

        <div className={styles.main}>
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
          />

          <div className={styles.content}>
            <div className={styles.container}>
              <div className={styles.notFound}>
                <h2>File Not Found</h2>
                <button
                  onClick={() => navigate('/search')}
                  className={styles.backBtn}
                >
                  Go to Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     Handlers
  ========================================================= */

  /* ---------- Download ---------- */
  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const { url } = await downloadFileUrl(
        file.id || file._id
      );

      // Browser + S3 handle filename & type
      window.location.href = url;
    } finally {
      setIsDownloading(false);
    }
  };

  /* ---------- Delete ---------- */
  const canDeleteFile = () =>
    file &&
    (file.uploaderId === currentUser?.id ||
      file.uploaderId === currentUser?._id);

  const handleDeleteClick = () => {
    if (canDeleteFile()) setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    const result = await deleteFile(
      file.id || file._id
    );

    setIsDeleting(false);

    if (result.success) {
      navigate('/dashboard');
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  /* ---------- Utils ---------- */
  const getRoleIcon = (role) =>
    role === 'professor' ? (
      <GraduationCap size={18} />
    ) : (
      <User size={18} />
    );

  /* =========================================================
     UI
  ========================================================= */
  return (
    <div className={styles.layout}>
      <Navbar onMenuToggle={toggleSidebar} />

      <div className={styles.main}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        <div className={styles.content}>
          <div className={styles.container}>
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className={styles.backButton}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>

            <div className={styles.fileContainer}>
              {/* ================= HEADER ================= */}
              <div className={styles.fileHeader}>
                <div className={styles.headerContent}>
                  <div className={styles.subject}>
                    {file.subject}
                  </div>

                  <h1 className={styles.title}>
                    {file.title}
                  </h1>

                  <div className={styles.meta}>
                    <div className={styles.metaItem}>
                      {getRoleIcon(
                        file.uploaderRole
                      )}
                      <span>
                        {file.uploaderName}
                      </span>
                    </div>

                    <div className={styles.metaDot}>
                      •
                    </div>

                    <div className={styles.metaItem}>
                      <Calendar size={18} />
                      <span>
                        {file.createdAt
                          ? new Date(
                              file.createdAt
                            ).toLocaleDateString()
                          : file.uploadedAt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.headerActions}>
                  <button
                    onClick={handleDownload}
                    className={styles.downloadBtn}
                    disabled={isDownloading}
                  >
                    <Download size={20} />
                    <span>
                      {isDownloading
                        ? 'Downloading...'
                        : 'Download File'}
                    </span>
                  </button>

                  {canDeleteFile() && (
                    <button
                      onClick={handleDeleteClick}
                      className={styles.deleteBtn}
                      title="Delete File"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              </div>

              {/* ================= BODY ================= */}
              <div className={styles.fileBody}>
                {/* Description */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>
                    Description
                  </h3>
                  <p className={styles.description}>
                    {file.description}
                  </p>
                </div>

                {/* Info Grid */}
                <div className={styles.infoGrid}>
                  <div className={styles.infoCard}>
                    <div className={styles.infoLabel}>
                      Unit
                    </div>
                    <div className={styles.infoValue}>
                      {file.unit}
                    </div>
                  </div>

                  <div className={styles.infoCard}>
                    <div className={styles.infoLabel}>
                      Topic
                    </div>
                    <div className={styles.infoValue}>
                      {file.topic}
                    </div>
                  </div>

                  <div className={styles.infoCard}>
                    <div className={styles.infoLabel}>
                      Year / Semester
                    </div>
                    <div className={styles.infoValue}>
                      {file.yearSemester}
                    </div>
                  </div>
                </div>

                {/* File Key */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>
                    File Key
                  </h3>
                  <div className={styles.keyBox}>
                    <Key size={18} />
                    <code>{file.key}</code>
                  </div>
                </div>

                {/* Keywords */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>
                    Keywords
                  </h3>
                  <div className={styles.keywords}>
                    {file.keywords.map(
                      (keyword, idx) => (
                        <span
                          key={idx}
                          className={styles.keyword}
                        >
                          {keyword}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DELETE MODAL ================= */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        fileName={file?.title}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};
