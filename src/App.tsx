import { useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { fetchCities } from './api/supabaseClient';
import { City } from './types';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SubCityPanel } from './components/SubCityPanel/SubCityPanel';
import styles from './App.module.css';

export function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedParent, setSelectedParent] = useState<City | null>(null);

  useEffect(() => {
    fetchCities()
      .then(setCities)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const topCities = useMemo(() => cities.filter((c) => !c.parent_id), [cities]);
  const pinned = useMemo(
    () => topCities.filter((c) => c.is_pinned),
    [topCities]
  );

  const fuse = useMemo(
    () =>
      new Fuse(topCities, {
        keys: ['name'],
        threshold: 0.35,
        minMatchCharLength: 1,
      }),
    [topCities]
  );

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse]);

  const subCities = useMemo(
    () =>
      selectedParent
        ? cities.filter((c) => c.parent_id === selectedParent.id)
        : [],
    [selectedParent, cities]
  );

  function handleCitySelect(city: City) {
    setQuery('');
    const children = cities.filter((c) => c.parent_id === city.id);
    if (children.length > 0) {
      setSelectedParent((prev) => (prev?.id === city.id ? null : city));
    } else {
      setSelectedParent(null);
      window.open(city.url, '_blank', 'noopener,noreferrer');
    }
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    if (value.trim()) setSelectedParent(null);
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.logo}>КСЭ</div>
        <h1 className={styles.title}>Регистрация в iSpring</h1>
        <p className={styles.subtitle}>
          Выбери свой город и перейди по ссылке для регистрации
        </p>
      </header>

      <main className={styles.main}>
        {error && <p className={styles.error}>Ошибка загрузки: {error}</p>}

        {/* Кнопки Москва и МО */}
        <div className={styles.pinnedSection}>
          {loading ? (
            <>
              <div className={styles.pinnedSkeleton} />
              <div className={styles.pinnedSkeleton} />
            </>
          ) : (
            pinned.map((city) => (
              <button
                key={city.id}
                className={`${styles.pinnedBtn} ${selectedParent?.id === city.id ? styles.pinnedBtnActive : ''}`}
                onClick={() => handleCitySelect(city)}
                type="button"
              >
                <span className={styles.pinnedBtnName}>{city.name}</span>
                <span className={styles.pinnedBtnSub}>
                  {selectedParent?.id === city.id
                    ? 'Скрыть ↑'
                    : 'Выбрать подразделение →'}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Панель подразделений */}
        {selectedParent && subCities.length > 0 && (
          <SubCityPanel
            parent={selectedParent}
            subCities={subCities}
            onClose={() => setSelectedParent(null)}
          />
        )}

        {/* Разделитель */}
        <div className={styles.divider}>
          <span>или найди свой регион</span>
        </div>

        {/* Поиск */}
        <div className={styles.searchWrap}>
          <SearchBar
            value={query}
            onChange={handleQueryChange}
            suggestions={suggestions}
            onSelect={handleCitySelect}
            loading={loading}
          />
        </div>

        {/* Разделитель */}
        <div className={styles.dividerFull} />

        {/* Кнопка входа */}
        <div className={styles.loginBtnWrapper}>
          <p className={styles.loginHint}>
            Для зарегистрированных пользователей
          </p>
          <a
            href="https://cse.ispring.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.loginBtn}
          >
            Войти в iSpring →
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        Курьер Сервис Экспресс · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
