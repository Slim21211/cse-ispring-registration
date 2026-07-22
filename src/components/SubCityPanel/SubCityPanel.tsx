import { City } from '../../types';
import styles from './SubCityPanel.module.css';

interface Props {
  parent: City;
  subCities: City[];
  onClose: () => void;
}

export function SubCityPanel({ parent, subCities, onClose }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.title}>📍 {parent.name}</span>
        <button className={styles.close} onClick={onClose} type="button">
          ✕
        </button>
      </div>
      <p className={styles.subtitle}>Выбери своё подразделение:</p>
      <div className={styles.list}>
        {subCities.map((city) => (
          <a
            key={city.id}
            href={city.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btn}
          >
            {city.name}
            <span className={styles.arrow}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
