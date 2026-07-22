import { City } from '../../types'
import styles from './PinnedCities.module.css'

interface Props {
  cities: City[]
}

export function PinnedCities({ cities }: Props) {
  if (cities.length === 0) return null

  return (
    <div className={styles.root}>
      <p className={styles.label}>📍 Закреплённые регионы</p>
      <div className={styles.list}>
        {cities.map((city) => (
          <a
            key={city.id}
            href={city.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <span className={styles.name}>{city.name}</span>
            <span className={styles.sub}>Зарегистрироваться →</span>
          </a>
        ))}
      </div>
    </div>
  )
}
