import styles from './StartPage.module.css';

const LOGIN_URL = 'https://cse.ispring.ru/login?logoff=1';

export function StartPage() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <img
          src={`${import.meta.env.BASE_URL}logo-white.png`}
          alt="Курьер Сервис Экспресс"
          className={styles.logoImg}
        />
        <h1 className={styles.title}>iSpring</h1>
        <p className={styles.subtitle}>Выбери действие</p>
      </header>

      <main className={styles.main}>
        <a href={LOGIN_URL} className={`${styles.btn} ${styles.btnLogin}`}>
          Войти в iSpring
        </a>

        <a href="#/register" className={`${styles.btn} ${styles.btnRegister}`}>
          Регистрация в iSpring
        </a>
      </main>

      <footer className={styles.footer}>
        Курьер Сервис Экспресс · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
