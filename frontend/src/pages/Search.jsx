import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFiles } from '../hooks/useFiles';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { SearchBar } from '../components/SearchBar';
import { FileCard } from '../components/FileCard';
import { Search as SearchIcon } from 'lucide-react';
import styles from './Search.module.css';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const { searchFiles, collegeFiles } = useFiles();
  const [query, setQuery] = useState(searchParams.get('subject') || '');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchFiles(query);
      setResults(searchResults);
    } else {
      setResults(collegeFiles);
    }
  }, [query, collegeFiles]);

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1 className={styles.title}>Search Notes</h1>
              <p className={styles.subtitle}>
                Search by title, subject, keywords, or key
              </p>
            </div>

            <div className={styles.searchWrapper}>
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Search for notes, subjects, topics..."
              />
            </div>

            <div className={styles.results}>
              <div className={styles.resultsHeader}>
                <h2 className={styles.resultsTitle}>
                  {query ? `Results for "${query}"` : 'All Notes'}
                </h2>
                <span className={styles.resultsCount}>
                  {results.length} {results.length === 1 ? 'note' : 'notes'} found
                </span>
              </div>

              {results.length > 0 ? (
                <div className={styles.filesGrid}>
                  {results.map(file => (
                    <FileCard key={file.id} file={file} />
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <SearchIcon size={48} />
                  <p>No notes found</p>
                  <span>Try adjusting your search terms</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};