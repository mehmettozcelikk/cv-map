// src/App.jsx
import { useEffect, useState } from 'react';
import './index.css';
import MapView from './components/MapView';
import WelcomeModal from './components/WelcomeModal';

const STORAGE_KEY = 'welcome_modal_hide';

export default function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // İlk açılışta kontrol et
    const hidden = localStorage.getItem(STORAGE_KEY) === '1';
    if (!hidden) setOpen(true);
  }, []);

  const handleClose = (dontShowAgain) => {
    if (dontShowAgain) localStorage.setItem(STORAGE_KEY, '1');
    setOpen(false);
  };

  return (
    <div className="app" style={{ height: '100%' }}>
      <MapView />
      <WelcomeModal open={open} onClose={handleClose} />
    </div>
  );
}
