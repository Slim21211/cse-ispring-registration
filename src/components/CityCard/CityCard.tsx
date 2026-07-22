import { City } from '../../types'
import styles from './CityCard.module.css'

interface Props {
  city: City
}

export function CityCard({ city }: Props) {
  return (
    <a
      href={city.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <span className={styles.name}>{city.name}</span>
      <span className={styles.btn}>Зарегистрироваться →</span>
    </a>
  )
}
