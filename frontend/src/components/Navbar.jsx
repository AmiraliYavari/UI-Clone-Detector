import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkHealth } from '../api';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [online, setOnline] = useState(null);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    checkHealth().then(setOnline);
    const timer = setInterval(() => checkHealth().then(setOnline), 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="navbar">
      <div className="brand">
        <span className="dot"></span>
        UI <span style={{ color: 'var(--green)' }}>Cloner</span>
      </div>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          {t('nav.home')}
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => (isActive ? 'active' : '')}>
          {t('nav.history')}
        </NavLink>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="lang-switch">
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
            aria-label="Switch to English"
          >
            EN
          </button>
          <button
            className={lang === 'fa' ? 'active' : ''}
            onClick={() => setLang('fa')}
            aria-label="تغییر به فارسی"
          >
            FA
          </button>
        </div>
        <div className="status">
          <span className={`led ${online ? 'on' : 'off'}`}></span>
          {online === null ? t('nav.checking') : online ? t('nav.online') : t('nav.offline')}
        </div>
      </div>
    </div>
  );
}