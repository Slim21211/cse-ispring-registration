import { useRef, useEffect } from 'react';
import { City } from '../../types';
import styles from './SearchBar.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  suggestions: City[];
  loading: boolean;
  onSelect: (city: City) => void;
}

export function SearchBar({ value, onChange, suggestions, loading, onSelect }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isOpen = value.trim().length > 0;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        onChange('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onChange]);

  function highlight(name: string, query: string) {
    const idx = name.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return <span>{name}</span>;
    return (
      <>
        {name.slice(0, idx)}
        <mark className={styles.mark}>{name.slice(idx, idx + query.length)}</mark>
        {name.slice(idx + query.length)}
      </>
    );
  }

  return (
    <div className={styles.wrapper} ref={rootRef}>
      <span className={styles.icon}>{loading ? '⏳' : '🔍'}</span>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={loading ? 'Загружаем города...' : 'Начни вводить название города...'}
        autoComplete="off"
        autoCorrect="off"
        disabled={loading}
        spellCheck={false}
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')} type="button">
          ✕
        </button>
      )}

      {isOpen && (
        <div className={styles.dropdown}>
          {suggestions.length > 0 ? (
            suggestions.slice(0, 7).map((city) => (
              <button
                key={city.id}
                className={styles.suggestion}
                onClick={() => { onSelect(city); onChange(''); }}
                type="button"
              >
                <span className={styles.suggestionName}>
                  {highlight(city.name, value)}
                </span>
                <span className={styles.suggestionHint}>
                  Зарегистрироваться →
                </span>
              </button>
            ))
          ) : (
            <div className={styles.empty}>
              🤔 Город не найден — попробуй другое написание
            </div>
          )}
        </div>
      )}
    </div>
  );
}
