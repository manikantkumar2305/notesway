import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export const SearchBar = ({ value, onChange, placeholder = 'Search notes...' }) => {
  return (
    <div className={styles.searchWrapper}>
      <Search className={styles.searchIcon} size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.searchInput}
      />
    </div>
  );
};