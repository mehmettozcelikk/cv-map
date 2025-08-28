// src/components/RoutingMachine.jsx
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

/**
 * from: [lat, lng]  (kullanıcının mevcut konumu)
 * to:   [lat, lng]  (seçilen marker)
 */
export default function RoutingMachine({ from, to, color = '#2563EB' }) {
  const map = useMap();
  const controlRef = useRef(null);

  useEffect(() => {
    // from/to yoksa rota oluşturma
    if (!from || !to) return;

    // Var olan routing kontrolünü temizle
    if (controlRef.current) {
      map.removeControl(controlRef.current);
      controlRef.current = null;
    }

    // OSRM demo server ile routing
    const control = L.Routing.control({
      waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
      router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
      lineOptions: {
        styles: [{ color, weight: 5, opacity: 0.9 }]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      show: false,                 // paneli gizli tut
      fitSelectedRoutes: true,     // rotayı kadraja sığdır
      showAlternatives: false
    }).addTo(map);

    controlRef.current = control;

    return () => {
      if (controlRef.current) {
        map.removeControl(controlRef.current);
        controlRef.current = null;
      }
    };
  }, [from, to, color, map]);

  return null;
}
