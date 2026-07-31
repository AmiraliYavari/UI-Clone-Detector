import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function CodeViewer({ jsx, css }) {
  const [tab, setTab] = useState('jsx');
  const { t } = useLanguage();

  const copy = () => {
    navigator.clipboard.writeText(tab === 'jsx' ? jsx : css).catch(() => {});
  };

  return (
    <>
      <div className="tabs">
        <div className={`tab ${tab === 'jsx' ? 'active' : ''}`} onClick={() => setTab('jsx')}>
          App.jsx
        </div>
        <div className={`tab ${tab === 'css' ? 'active' : ''}`} onClick={() => setTab('css')}>
          style.css
        </div>
      </div>
      <pre className="code">{tab === 'jsx' ? jsx : css}</pre>
      <div className="copybar">
        <button className="copybtn" onClick={copy}>
          {t('code.copy')}
        </button>
      </div>
    </>
  );
}