import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from '../components/Dropzone';
import { analyzeScreenshot, getProviders } from '../api';
import { saveToHistory } from '../store';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const [imgData, setImgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    getProviders().then(({ providers, default: def }) => {
      setProviders(providers);
      setProvider(def || providers[0]?.id || null);
    });
  }, []);

  const analyze = async () => {
    if (!imgData) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeScreenshot({ ...imgData, provider });
      const entry = saveToHistory({
        previewUrl: imgData.previewUrl,
        analysis: result.analysis,
        jsx: result.jsx,
        css: result.css,
        provider: result.provider,
      });
      navigate(`/result/${entry.id}`);
    } catch (err) {
      setError(t('home.errorPrefix') + err.message);
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
          {t('home.titlePrefix')}
          <span>{t('home.titleSpan')}</span>
          {t('home.titleSuffix')}
        </h1>
        <p>{t('home.subtitle')}</p>
      </div>

      <div className="grid">
        <div className="panel">
          <div className="panel-head">
            <span>{t('home.inputPanelTitle')}</span>
            {imgData && <span className="badge">{t('home.ready')}</span>}
          </div>
          <Dropzone imgData={imgData} onFile={setImgData} />

          {providers.length > 0 && (
            <div style={{ padding: '0 16px 12px' }}>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11.5,
                  color: 'var(--text-dim)',
                  marginBottom: 6,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {t('home.analyzerModel')}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {providers.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProvider(p.id)}
                    className="btn"
                    style={{
                      fontSize: 12.5,
                      padding: '7px 12px',
                      background: provider === p.id ? 'var(--green)' : '#21262d',
                      color: provider === p.id ? '#04170a' : 'var(--text)',
                      borderColor: provider === p.id ? 'var(--green)' : 'var(--border)',
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {providers.length === 0 && (
            <div className="status err" style={{ paddingTop: 0 }}>
              {t('home.noProvider')}
            </div>
          )}

          <div className="actions">
            <button className="btn primary" disabled={!imgData || loading || !provider} onClick={analyze}>
              {loading ? t('home.analyzing') : t('home.analyzeBtn')}
            </button>
            {imgData && (
              <button className="btn" disabled={loading} onClick={() => setImgData(null)}>
                {t('home.clearBtn')}
              </button>
            )}
          </div>
          {loading && (
            <div className="status">
              <div className="spinner"></div> {t('home.loadingStatus')}
            </div>
          )}
          {error && <div className="status err">{error}</div>}
        </div>

        <div className="panel">
          <div className="panel-head">
            <span>{t('home.guideTitle')}</span>
          </div>
          <div className="status" style={{ whiteSpace: 'normal', lineHeight: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
            <p style={{ margin: 0 }}>{t('home.guide1')}</p>
            <p style={{ margin: 0 }}>{t('home.guide2')}</p>
            <p style={{ margin: 0 }}>{t('home.guide3')}</p>
            <p style={{ margin: 0 }}>{t('home.guide4')}</p>
            <p style={{ margin: 0 }}>{t('home.guide5')}</p>
          </div>
        </div>
      </div>
    </>
  );
}