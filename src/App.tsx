// src/App.tsx — убираем грид городов, оставляем только pinned + поиск
import { useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { fetchCities } from './api/supabaseClient';
import { City } from './types';
import { SearchBar } from './components/SearchBar/SearchBar';
import { PinnedCities } from './components/PinnedCities/PinnedCities';
import styles from './App.module.css';

export function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCities()
      .then(setCities)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const pinned = useMemo(() => cities.filter((c) => c.is_pinned), [cities]);

  const fuse = useMemo(
    () =>
      new Fuse(cities, {
        keys: ['name'],
        threshold: 0.35,
        minMatchCharLength: 1,
      }),
    [cities]
  );

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse]);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.logo}>КСЭ</div>
        <h1 className={styles.title}>Регистрация в iSpring</h1>
        <p className={styles.subtitle}>
          Найди свой город и перейди по ссылке для регистрации
        </p>
      </header>

      <div className={styles.searchWrap}>
        <SearchBar
          value={query}
          onChange={setQuery}
          suggestions={suggestions}
          loading={loading}
          onSelect={(city) => {
            window.open(city.url, '_blank', 'noopener,noreferrer');
            setQuery('');
          }}
        />
      </div>

      <main className={styles.main}>
        {error && <p className={styles.error}>Ошибка загрузки: {error}</p>}

        {!loading && !error && pinned.length > 0 && (
          <section className={styles.section}>
            <PinnedCities cities={pinned} />
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        Курьер Сервис Экспресс · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
