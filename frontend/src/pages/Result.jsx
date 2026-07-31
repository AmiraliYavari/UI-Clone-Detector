import { useParams, Link } from 'react-router-dom';
import { getById } from '../store';
import CodeViewer from '../components/CodeViewer';
import PreviewFrame from '../components/PreviewFrame';

export default function Result() {
  const { id } = useParams();
  const entry = getById(id);

  if (!entry) {
    return (
      <div className="panel">
        <div className="empty">
          نتیجه‌ای با این شناسه پیدا نشد.
          <br />
          <Link to="/" style={{ color: 'var(--green)' }}>
            برگشت به خانه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hero">
        <h1>
          نتیجه‌ی <span>کلون</span>
          {entry.provider && (
            <span className="badge" style={{ marginInlineStart: 12, verticalAlign: 'middle' }}>
              {entry.provider}
            </span>
          )}
        </h1>
        <p>{entry.analysis}</p>
      </div>

      <div className="grid">
        <div className="panel">
          <div className="panel-head">
            <span>اسکرین‌شات ورودی</span>
          </div>
          <div style={{ padding: 16 }}>
            <img
              src={entry.previewUrl}
              alt="input"
              style={{ maxWidth: '100%', borderRadius: 6, border: '1px solid var(--border)' }}
            />
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <span>خروجی — کد</span>
          </div>
          <CodeViewer jsx={entry.jsx} css={entry.css} />
        </div>

        <div className="panel previewwrap">
          <div className="panel-head">
            <span>پیش‌نمایش زنده</span>
          </div>
          <PreviewFrame jsx={entry.jsx} css={entry.css} />
        </div>
      </div>
    </>
  );
}