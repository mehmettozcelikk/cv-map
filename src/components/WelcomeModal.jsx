// src/components/WelcomeModal.jsx
import { useEffect, useCallback, useRef, useState } from 'react';

export default function WelcomeModal({ open, onClose }) {
  const backdropRef = useRef(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // ESC ile kapat
  const onKey = useCallback((e) => {
    if (e.key === 'Escape') onClose?.(dontShowAgain);
  }, [onClose, dontShowAgain]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onKey]);

  // Backdrop tıklayınca kapat
  const onBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose?.(dontShowAgain);
  };

  if (!open) return null;

  return (
    <div className="wm-backdrop" ref={backdropRef} onClick={onBackdropClick}>
      <div className="wm-modal" role="dialog" aria-modal="true" aria-label="Hoş geldin">
        <div className="wm-header">
          <div className="wm-title">Hoş Geldin 👋</div>
          <button className="wm-close" onClick={() => onClose?.(dontShowAgain)} aria-label="Kapat">✕</button>
        </div>

        <div className="wm-body">
          <p className="wm-lead">
            Yapmış olduğum bu site ile eğitim sürecimde bulunduğum konumları ve yaptığım projeleri harita üzerinden farklı bir tarzda sunmak istedim. Harita üzerinde gördüğünüz yer işaretleri okuduğum okulu ve staj yapma imkanı bulduğum şirketleri gösteriyor. Üzerine tıklayarak detayları görebilirsiniz :)
          </p>
          <ul className="wm-list">
            <li><strong>📍 Konumum:</strong> Konumunuzu bulur.</li>
            <li><strong>🗺️ Tüm Noktalar:</strong> Tüm yer işaretlerini kadraja sığdırır.</li>
            <li><strong>🧭 Yol Tarifi:</strong> Konumunuzdan seçilen noktaya gerçek rota çizer.</li>
            <li><strong>👀 :</strong> Hakkımda daha detaylı bilgi almak için tıklayabilirsin.</li>
          </ul>
          <label className="wm-checkbox">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
            Bu mesajı bir daha gösterme
          </label>
        </div>

        <div className="wm-footer">
          <button className="wm-button" onClick={() => onClose?.(dontShowAgain)}>Tamam</button>
        </div>
      </div>
    </div>
  );
}
