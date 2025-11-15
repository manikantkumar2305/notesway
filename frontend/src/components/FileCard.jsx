import { Link } from 'react-router-dom';
import { FileText, Download, User, GraduationCap } from 'lucide-react';
import styles from './FileCard.module.css';

export const FileCard = ({ file }) => {
  const getRoleIcon = (role) => {
    return role === 'professor' ? <GraduationCap size={14} /> : <User size={14} />;
  };

  return (
    <Link to={`/file/${file.id}`} className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>
          <FileText size={24} />
        </div>
        <div className={styles.subject}>{file.subject}</div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.title}>{file.title}</h3>
        <p className={styles.description}>{file.description}</p>

        <div className={styles.meta}>
          <span className={styles.unit}>{file.unit}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.year}>{file.yearSemester}</span>
        </div>

        <div className={styles.keywords}>
          {file.keywords.slice(0, 3).map((keyword, idx) => (
            <span key={idx} className={styles.keyword}>
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.uploader}>
          {getRoleIcon(file.uploaderRole)}
          <span>{file.uploaderName}</span>
        </div>
        <div className={styles.downloadIcon}>
          <Download size={18} />
        </div>
      </div>
    </Link>
  );
};