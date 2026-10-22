import { useEffect, useState } from 'react';
import { StartPage } from './pages/StartPage';
import { RegistrationPage } from './pages/RegistrationPage';

// Маршрутизация через hash: GitHub Pages — статический хостинг,
// обычные пути (/register) при обновлении страницы дали бы 404.
//   reg.cse-hr.ru/            → стартовая страница (Войти / Регистрация)
//   reg.cse-hr.ru/#/register  → выбор города и подразделения
function readRoute(): 'start' | 'register' {
  return window.location.hash === '#/register' ? 'register' : 'start';
}

export function App() {
  const [route, setRoute] = useState<'start' | 'register'>(readRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(readRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route === 'register' ? <RegistrationPage /> : <StartPage />;
}
