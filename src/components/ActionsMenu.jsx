import { useEffect, useRef, useState } from "react";

/**
 * Props:
 * - trigger: "kebab" | "grid" | "fab" | "avatar"
 * - direction: "down" | "left"   // menü açılma yönü
 * - items: [{label, href, onClick, icon}]  // icon: emoji ya da küçük svg
 * - title?: string
 */
export default function ActionsMenu({
  trigger = "kebab",
  direction = "down",
  items = [],
  title = "Bağlantılar"
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Dışarı tıkla → kapat
  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const renderTrigger = () => {
    switch (trigger) {
      case "grid":
        // Emoji/ikonlu mavi kare buton (kare span'lar kaldırıldı)
        return (
          <button
            className="am-btn"
            title="Menü"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            👀
          </button>
        );
      case "fab":
        return (
          <button
            className="am-btn am-fab"
            title="Linkler"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            ＋
          </button>
        );
      case "avatar":
        return (
          <button
            className="am-btn am-avatar"
            title="Ben"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <span>M</span>
          </button>
        );
      case "kebab":
      default:
        return (
          <button
            className="am-btn am-kebab"
            title="Menü"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            ⋮
          </button>
        );
    }
  };

  return (
    <div className={`am-wrap ${direction}`} ref={ref}>
      {renderTrigger()}
      <div className={`am-menu ${open ? "open" : ""} ${direction}`} role="menu">
        {title && <div className="am-title">{title}</div>}
        <ul>
          {items.map((it, i) => (
            <li key={i}>
              {it.href ? (
                <a href={it.href} target="_blank" rel="noreferrer" role="menuitem">
                  <span className="am-icon">{it.icon ?? "🔗"}</span>
                  {it.label}
                </a>
              ) : (
                <button onClick={it.onClick} role="menuitem">
                  <span className="am-icon">{it.icon ?? "➡️"}</span>
                  {it.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
