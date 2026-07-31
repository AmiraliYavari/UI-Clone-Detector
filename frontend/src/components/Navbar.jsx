import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkHealth } from '../api';

export default function Navbar() {
  const [online, setOnline] = useState(null);

  useEffect(() => {
    checkHealth().then(setOnline);
    const t = setInterval(() => checkHealth().then(setOnline), 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="navbar">
      <div className="brand">
        <span className="dot"></span>
        UI <span style={{ color: 'var(--green)' }}>Cloner</span>
      </div>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          خانه
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => (isActive ? 'active' : '')}>
          تاریخچه
        </NavLink>
      </nav>
      <div className="status">
        <span className={`led ${online ? 'on' : 'off'}`}></span>
        {online === null ? 'در حال بررسی...' : online ? 'backend متصل' : 'backend آفلاین'}
      </div>
    </div>
  );
}
