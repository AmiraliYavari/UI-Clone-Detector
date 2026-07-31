import { Link } from 'react-router-dom';
import { getHistory, clearHistory } from '../store';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function History() {
  const [items, setItems] = useState(getHistory());
  const { t, lang } = useLanguage();

  const onClear = () => {
    clearHistory();
    setItems([]);
  };

  return (
    <>
      <div className="hero">
        <h1>
          {t('history.titlePrefix')}
          <span>{t('history.titleSpan')}</span>
          {t('history.titleSuffix')}
        </h1>
        <p>{t('history.subtitle')}</p>
      </div>

      <div className="panel">
        <div className="panel-head">
          <span>{items.length}{t('history.items')}</span>
          {items.length > 0 && (
            <button className="copybtn" onClick={onClear}>
              {t('history.clearAll')}
            </button>
          )}
        </div>
        <div style={{ padding: 16 }}>
          {items.length === 0 ? (
            <div className="empty">{t('history.empty')}</div>
          ) : (
            <div className="historylist">
              {items.map((item) => (
                <Link key={item.id} to={`/result/${item.id}`} className="historyitem">
                  <img src={item.previewUrl} alt="" />
                  <div>
                    <div>{item.analysis?.slice(0, 90)}...</div>
                    <div className="meta">
                      {new Date(item.createdAt).toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US')}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}