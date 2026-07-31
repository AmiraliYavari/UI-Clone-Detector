import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Result from './pages/Result';
import History from './pages/History';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { t } = useLanguage();
  return (
    <div className="shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <div className="footnote">{t('footer.text')}</div>
    </div>
  );
}