// src/components/MapView.jsx
import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { places } from '../data/places';
import PlacePopup from './PlacePopup';
import RoutingMachine from './RoutingMachine';
import ActionsMenu from './ActionsMenu'; // ← SAĞ ÜST MENÜ

/* --- SVG tabanlı marker ikonları --- */
function makeSvgIcon(hexColor = '#2563EB') {
  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
      <g fill="none" fill-rule="evenodd">
        <path fill="${hexColor}" d="M16 0c8.284 0 15 6.716 15 15 0 10.5-15 33-15 33S1 25.5 1 15C1 6.716 7.716 0 16 0z"/>
        <circle fill="#FFFFFF" cx="16" cy="15" r="5"/>
      </g>
    </svg>
  `);
  return L.icon({
    iconUrl: `data:image/svg+xml;charset=UTF-8,${svg}`,
    iconSize: [32, 48],
    iconAnchor: [16, 44],
    popupAnchor: [0, -40],
  });
}

const icons = {
  university: makeSvgIcon('#1900ffff'),
  government: makeSvgIcon('#3d0041ff'),
  company:    makeSvgIcon('#943e00ff'),
  company1:   makeSvgIcon('#005f73ff'),
  company2:   makeSvgIcon('#00732eff'),
  default:    makeSvgIcon('#1900ffff'),
};

/* --- “Konumum” kontrolü (map.locate kullanır) --- */
function LocateControl({ locating, onLocateRequest }) {
  const map = useMap();

  useEffect(() => {
    const control = L.control({ position: 'topleft' });
    control.onAdd = () => {
      const container = L.DomUtil.create('div', '');
      const btn = L.DomUtil.create('button', 'map-btn');
      btn.setAttribute('type', 'button');
      btn.setAttribute('title', 'Konumunu bul');
      btn.style.display = 'flex';
      btn.innerHTML = locating ? '⏳ <span>Konum alınıyor…</span>' : '📍 <span>Konumum</span>';
      btn.disabled = !!locating;
      btn.onclick = () => onLocateRequest?.(map);
      container.appendChild(btn);
      return container;
    };
    control.addTo(map);
    return () => control.remove();
  }, [map, locating, onLocateRequest]);

  return null;
}

/* --- “Tüm Noktalar” kontrolü (sol üstte) --- */
function FitAllControl({ allPositionsProvider }) {
  const map = useMap();
  useEffect(() => {
    const control = L.control({ position: 'topleft' });
    control.onAdd = () => {
      const container = L.DomUtil.create('div', '');
      const btn = L.DomUtil.create('button', 'map-btn');
      btn.setAttribute('type', 'button');
      btn.setAttribute('title', 'Tüm noktaları göster');
      btn.style.display = 'flex';
      btn.innerHTML = '🗺️ <span>Tüm Noktalar</span>';
      btn.onclick = () => {
        const pos = allPositionsProvider?.() || [];
        if (!pos.length) return;
        const bounds = L.latLngBounds(pos);
        map.fitBounds(bounds, { padding: [50, 70] });
      };
      container.appendChild(btn);
      return container;
    };
    control.addTo(map);
    return () => control.remove();
  }, [map, allPositionsProvider]);
  return null;
}

export default function MapView() {
  const center = useMemo(() => [39.9334, 32.8597], []);
  const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const ATTRIB = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>';

  const placePositions = places.map(p => [p.lat, p.lng]);

  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);

  const [userPos, setUserPos] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [routeRequestedPlace, setRouteRequestedPlace] = useState(null);
  const [locating, setLocating] = useState(false);

  const handleCreated = useCallback((map) => {
    mapRef.current = map;
    if (placePositions.length) {
      const b = L.latLngBounds(placePositions);
      map.fitBounds(b, { padding: [50, 70] });
    }
  }, [placePositions]);

  /* --- map.locate tabanlı konum alma --- */
  const requestLocate = useCallback((mapInstance) => {
    const map = mapInstance || mapRef.current;
    if (!map) return;

    setLocating(true);

    const onFound = (e) => {
      const { lat, lng } = e.latlng;
      setUserPos([lat, lng]);
      setLocating(false);
      setTimeout(() => userMarkerRef.current?.openPopup(), 0);
    };

    const onError = (err) => {
      setLocating(false);
      alert('Konum alınamadı. Lütfen izin verildiğinden ve HTTPS üzerinde olduğundan emin olun.');
      console.error('locationerror:', err);
    };

    map.on('locationfound', onFound);
    map.on('locationerror', onError);

    map.locate({
      setView: true,
      maxZoom: 16,
      enableHighAccuracy: true,
      timeout: 12000
    });

    const cleanup = () => {
      map.off('locationfound', onFound);
      map.off('locationerror', onError);
    };
    setTimeout(cleanup, 15000);
  }, []);

  // Popup → “Yol Tarifi”
  const handleRouteClick = useCallback((place) => {
    if (!userPos) {
      setRouteRequestedPlace(place);
      requestLocate(); // konum yoksa önce bul
      return;
    }
    setSelectedPlace(place);
  }, [userPos, requestLocate]);

  // Konum alındıktan sonra bekleyen rota varsa çiz
  useEffect(() => {
    if (userPos && routeRequestedPlace) {
      setSelectedPlace(routeRequestedPlace);
      setRouteRequestedPlace(null);
    }
  }, [userPos, routeRequestedPlace]);

  // “Tüm Noktalar” işlevini menüden de tetiklemek için handler
  const handleFitAll = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    const all = [...placePositions];
    if (userPos) all.push(userPos);
    if (!all.length) return;
    map.fitBounds(L.latLngBounds(all), { padding: [50, 70] });
  }, [placePositions, userPos]);

  // Menü öğeleri (sağ üst)
  const actionItems = [
    { label: 'GitHub',   href: 'https://github.com/mehmettozcelikk', 
      icon: <img src="src/assets/logos/git.png" alt="GitHub" style={{width: '16px', height: '16px'}} />},
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mehmettozcelikk/', 
      icon: <img src="src/assets/logos/linkedin.png" alt="LinkedIn" style={{width: '16px', height: '16px'}} />},
    { label: 'Medium',   href: 'https://medium.com/@mehmetozcelikk', 
      icon: '✍️' },
    { label: 'Özgeçmiş (PDF)', href: '/CV.pdf', 
      icon: '🫆' },
  ];

  const allPositionsProvider = useCallback(() => {
    const all = [...placePositions];
    if (userPos) all.push(userPos); // kullanıcı konumu dahil
    return all;
  }, [placePositions, userPos]);

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      {/* SAĞ ÜST: Aksiyon menüsü (sola açılır grid tetik) */}
      <ActionsMenu
        trigger="grid"   // "kebab" | "grid" | "fab" | "avatar"
        direction="left" // "down" → aşağı, "left" → sola açılır
        title="Bağlantılar"
        items={actionItems}
      />

      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
        whenCreated={handleCreated}
        zoomControl={false}
      >
        <TileLayer url={TILE_URL} attribution={ATTRIB} />
        <ZoomControl position="bottomright" />

        {/* Sol üst: Konumum & Tüm Noktalar (harita içi butonlar) */}
        <LocateControl locating={locating} onLocateRequest={requestLocate} />
        <FitAllControl allPositionsProvider={allPositionsProvider} />

        {/* Kullanıcı konumu */}
        {userPos && (
          <Marker ref={userMarkerRef} position={userPos} icon={makeSvgIcon('#ff0000ff')}>
            <Popup
              autoPan
              autoPanPadding={[60, 90]}
              keepInView
              closeOnClick={false}
              autoClose={false}
            >
              Mevcut konumun
            </Popup>
          </Marker>
        )}

        {/* CV noktaları */}
        {places.map(place => {
          const icon =
            (place.kind && icons[place.kind]) ||
            (place.id?.includes('gazi') && icons.university) ||
            (place.id?.includes('btk') && icons.government) ||
            (place.id?.includes('issd') && icons.company) ||
            icons.default;

          return (
            <Marker key={place.id} position={[place.lat, place.lng]} icon={icon}>
              <Popup>
                <PlacePopup place={place} onRouteClick={handleRouteClick} />
              </Popup>
            </Marker>
          );
        })}

        {/* Gerçek yol rotası */}
        {userPos && selectedPlace && (
          <RoutingMachine
            from={userPos}
            to={[selectedPlace.lat, selectedPlace.lng]}
            color="#2563EB"
          />
        )}
      </MapContainer>
    </div>
  );
}
