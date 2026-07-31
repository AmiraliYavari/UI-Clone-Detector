import { Link } from 'react-router-dom';
import { getHistory, clearHistory } from '../store';
import { useState } from 'react';

export default function History() {
  const [items, setItems] = useState(getHistory());

  const onClear = () => {
    clearHistory();
    setItems([]);
  };

  return (
    <>
      <div className="hero">
        <h1>
          <span>تاریخچه</span> کلون‌ها
        </h1>
        <p>لیست اسکرین‌شات‌هایی که قبلاً تحلیل کردی — همه محلی و در مرورگر خودت ذخیره می‌شن.</p>
      </div>

      <div className="panel">
        <div className="panel-head">
          <span>{items.length} مورد</span>
          {items.length > 0 && (
            <button className="copybtn" onClick={onClear}>
              پاک‌کردن همه
            </button>
          )}
        </div>
        <div style={{ padding: 16 }}>
          {items.length === 0 ? (
            <div className="empty">هنوز چیزی تحلیل نکردی.</div>
          ) : (
            <div className="historylist">
              {items.map((item) => (
                <Link key={item.id} to={`/result/${item.id}`} className="historyitem">
                  <img src={item.previewUrl} alt="" />
                  <div>
                    <div>{item.analysis?.slice(0, 90)}...</div>
                    <div className="meta">{new Date(item.createdAt).toLocaleString('fa-IR')}</div>
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
