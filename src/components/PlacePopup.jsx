// src/components/PlacePopup.jsx
export default function PlacePopup({ place, onRouteClick }) {
  if (!place) return null;
  const { title, subtitle, role, period, highlights = [], skills = [], links = {}, mapsUrl, address, logo } = place;

  return (
    <div className="pp-wrap">
      <div className="pp-head">
        {logo && <img className="pp-logo" src={logo} alt={title} />}
        <div className="pp-titles">
          <div className="pp-title">{title}</div>
          {subtitle && <div className="pp-sub">{subtitle}</div>}
        </div>
      </div>

      {(role || period) && (
        <div className="pp-badges">
          {role && <span className="pp-badge">{role}</span>}
          {period && <span className="pp-badge pp-badge-soft">{period}</span>}
        </div>
      )}

      {highlights.length > 0 && (
        <ul className="pp-list">
          {highlights.slice(0, 3).map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      )}

      {skills.length > 0 && (
        <div className="pp-chips">
          {skills.slice(0, 6).map((s, i) => <span className="pp-chip" key={i}>{s}</span>)}
        </div>
      )}

      {(address || mapsUrl) && (
        <div className="pp-address">
          {address && <span>{address}</span>}
          {mapsUrl && <a href={mapsUrl} target="_blank" rel="noreferrer">Haritada aç</a>}
        </div>
      )}

      <div className="pp-actions">
        {links.website && (
          <a className="pp-btn" href={links.website} target="_blank" rel="noreferrer">Website</a>
        )}
        {links.github && (
          <a className="pp-btn" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
        )}
        {links.linkedin && (
          <a className="pp-btn" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        )}
        <button className="pp-btn primary" onClick={() => onRouteClick?.(place)}>
          Yol Tarifi
        </button>
      </div>
    </div>
  );
}
