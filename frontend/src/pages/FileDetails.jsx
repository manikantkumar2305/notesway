import { useParams, useNavigate } from 'react-router-dom';
import { useFiles } from '../hooks/useFiles';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Download, ArrowLeft, User, GraduationCap, Calendar, Key } from 'lucide-react';
import styles from './FileDetails.module.css';

export const FileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFile } = useFiles();

  const file = getFile(id);

  if (!file) {
    return (
      <div className={styles.layout}>
        <Navbar />
        <div className={styles.main}>
          <Sidebar />
          <div className={styles.content}>
            <div className={styles.container}>
              <div className={styles.notFound}>
                <h2>File Not Found</h2>
                <button onClick={() => navigate('/search')} className={styles.backBtn}>
                  Go to Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    // Trigger download
    const link = document.createElement('a');
    link.href = file.downloadUrl;
    link.download = `${file.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getRoleIcon = (role) => {
    return role === 'professor' ? <GraduationCap size={18} /> : <User size={18} />;
  };

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>

            <div className={styles.fileContainer}>
              <div className={styles.fileHeader}>
                <div className={styles.headerContent}>
                  <div className={styles.subject}>{file.subject}</div>
                  <h1 className={styles.title}>{file.title}</h1>
                  <div className={styles.meta}>
                    <div className={styles.metaItem}>
                      {getRoleIcon(file.uploaderRole)}
                      <span>{file.uploaderName}</span>
                    </div>
                    <div className={styles.metaDot}>•</div>
                    <div className={styles.metaItem}>
                      <Calendar size={18} />
                      <span>{file.uploadedAt}</span>
                    </div>
                  </div>
                </div>
                <button onClick={handleDownload} className={styles.downloadBtn}>
                  <Download size={20} />
                  <span>Download File</span>
                </button>
              </div>

              <div className={styles.fileBody}>
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Description</h3>
                  <p className={styles.description}>{file.description}</p>
                </div>

                <div className={styles.infoGrid}>
                  <div className={styles.infoCard}>
                    <div className={styles.infoLabel}>Unit</div>
                    <div className={styles.infoValue}>{file.unit}</div>
                  </div>
                  <div className={styles.infoCard}>
                    <div className={styles.infoLabel}>Topic</div>
                    <div className={styles.infoValue}>{file.topic}</div>
                  </div>
                  <div className={styles.infoCard}>
                    <div className={styles.infoLabel}>Year/Semester</div>
                    <div className={styles.infoValue}>{file.yearSemester}</div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>File Key</h3>
                  <div className={styles.keyBox}>
                    <Key size={18} />
                    <code>{file.key}</code>
                  </div>
                </div>

                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Keywords</h3>
                  <div className={styles.keywords}>
                    {file.keywords.map((keyword, idx) => (
                      <span key={idx} className={styles.keyword}>
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};