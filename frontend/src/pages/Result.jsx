import { useParams, Link } from 'react-router-dom';
import { getById } from '../store';
import CodeViewer from '../components/CodeViewer';
import PreviewFrame from '../components/PreviewFrame';
import { useLanguage } from '../context/LanguageContext';

export default function Result() {
  const { id } = useParams();
  const entry = getById(id);
  const { t } = useLanguage();

  if (!entry) {
    return (
      <div className="panel">
        <div className="empty">
          {t('result.notFound')}
          <br />
          <Link to="/" style={{ color: 'var(--green)' }}>
            {t('result.backHome')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hero">
        <h1>
          {t('result.titlePrefix')}
          <span>{t('result.titleSpan')}</span>
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
            <span>{t('result.inputScreenshot')}</span>
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
            <span>{t('result.outputCode')}</span>
          </div>
          <CodeViewer jsx={entry.jsx} css={entry.css} />
        </div>

        <div className="panel previewwrap">
          <div className="panel-head">
            <span>{t('result.livePreview')}</span>
          </div>
          <PreviewFrame jsx={entry.jsx} css={entry.css} />
        </div>
      </div>
    </>
  );
}