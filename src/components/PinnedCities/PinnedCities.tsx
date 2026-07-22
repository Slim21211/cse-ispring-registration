import { City } from '../../types';
import styles from './PinnedCities.module.css';

interface Props {
  cities: City[];
  onSelect: (city: City) => void;
}

export function PinnedCities({ cities, onSelect }: Props) {
  if (cities.length === 0) return null;

  return (
    <div className={styles.root}>
      <p className={styles.label}>📍 Закреплённые регионы</p>
      <div className={styles.list}>
        {cities.map((city) => (
          <button
            key={city.id}
            className={styles.card}
            onClick={() => onSelect(city)}
            type="button"
          >
            <span className={styles.name}>{city.name}</span>
            <span className={styles.sub}>Зарегистрироваться →</span>
          </button>
        ))}
      </div>
    </div>
  );
}
