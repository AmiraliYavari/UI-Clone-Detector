import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from '../components/Dropzone';
import { analyzeScreenshot } from '../api';
import { saveToHistory } from '../store';

export default function Home() {
  const [imgData, setImgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const analyze = async () => {
    if (!imgData) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeScreenshot(imgData);
      const entry = saveToHistory({
        previewUrl: imgData.previewUrl,
        analysis: result.analysis,
        jsx: result.jsx,
        css: result.css,
      });
      navigate(`/result/${entry.id}`);
    } catch (err) {
      setError('تحلیل تصویر با خطا مواجه شد: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="termbar-wrap">
        <div
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--border)',
            borderRadius: '10px 10px 0 0',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--mono)',
          }}
        >
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ color: 'var(--text-dim)', fontSize: 12.5, marginInlineStart: 8, direction: 'ltr' }}>
            ~/ui-cloner
          </span>
        </div>
      </div>

      <div className="hero" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: -1 }}>
        <h1>
          UI <span>Cloner</span> — از عکس تا کد
        </h1>
        <p>
          یه اسکرین‌شات از رابط کاربری گیت‌هاب (یا هر UI دیگه‌ای) بده، بک‌اند از طریق مدل هوش مصنوعی
          تحلیلش می‌کنه و کد React معادلش رو تولید می‌کنه — همراه با پیش‌نمایش زنده.
        </p>
      </div>

      <div className="grid">
        <div className="panel">
          <div className="panel-head">
            <span>ورودی — اسکرین‌شات</span>
            {imgData && <span className="badge">آماده</span>}
          </div>
          <Dropzone imgData={imgData} onFile={setImgData} />
          <div className="actions">
            <button className="btn primary" disabled={!imgData || loading} onClick={analyze}>
              {loading ? 'در حال تحلیل…' : 'تحلیل و تولید کد'}
            </button>
            {imgData && (
              <button className="btn" disabled={loading} onClick={() => setImgData(null)}>
                پاک‌کردن
              </button>
            )}
          </div>
          {loading && (
            <div className="status">
              <div className="spinner"></div> مدل داره ظاهر رابط کاربری رو تحلیل می‌کنه…
            </div>
          )}
          {error && <div className="status err">{error}</div>}
        </div>

        <div className="panel">
          <div className="panel-head">
            <span>راهنما</span>
          </div>
          <div className="status" style={{ whiteSpace: 'normal', lineHeight: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
            <p style={{ margin: 0 }}>۱. یه اسکرین‌شات از یه رابط کاربری (مثلاً صفحه‌ی گیت‌هاب) آپلود کن.</p>
            <p style={{ margin: 0 }}>۲. روی «تحلیل و تولید کد» بزن.</p>
            <p style={{ margin: 0 }}>۳. کد React و CSS تولیدشده رو ببین، کپی کن یا پیش‌نمایش زنده‌ش رو تماشا کن.</p>
            <p style={{ margin: 0 }}>۴. نتیجه در تاریخچه ذخیره می‌شه تا بعداً بتونی بهش برگردی.</p>
          </div>
        </div>
      </div>
    </>
  );
}
