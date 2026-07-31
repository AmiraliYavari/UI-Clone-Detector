import { useMemo } from 'react';

export default function PreviewFrame({ jsx, css }) {
  const srcDoc = useMemo(() => {
    return `<!DOCTYPE html><html><head><meta charset="utf-8">
      <style>*{box-sizing:border-box;margin:0;} body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}</style>
      <style>${css || ''}</style>
      </head><body>
      <div id="root"></div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>
      <script type="text/babel">
        ${jsx}
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
      </script>
      </body></html>`;
  }, [jsx, css]);

  return <iframe className="previewframe" srcDoc={srcDoc} sandbox="allow-scripts" title="live-preview" />;
}
