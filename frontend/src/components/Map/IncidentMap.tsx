'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Incident } from '@/types';

import 'leaflet/dist/leaflet.css';

const getMarkerIcon = (severity: string) => {
  const color = severity === 'critical' ? '#ef4444' : severity === 'high' ? '#f97316' : severity === 'medium' ? '#eab308' : '#22c55e';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

function MapCenterer({ incidents }: { incidents: Incident[] }) {
  const map = useMap();

  useEffect(() => {
    if (incidents.length > 0) {
      const bounds = L.latLngBounds(
        incidents
          .filter((i) => i.location)
          .map((i) => [i.location.latitude, i.location.longitude])
      );
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [incidents, map]);

  return null;
}

interface IncidentMapProps {
  incidents: Incident[];
}

export default function IncidentMap({ incidents }: IncidentMapProps) {
  const defaultCenter: [number, number] = [-1.2921, 36.8219];
  const defaultZoom = 6;

  return (
    <div className="h-[400px] rounded-lg overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenterer incidents={incidents} />
        {incidents
          .filter((i) => i.location)
          .map((incident) => (
            <Marker
              key={incident.id}
              position={[incident.location.latitude, incident.location.longitude]}
              icon={getMarkerIcon(incident.severity)}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold">{incident.title}</h3>
                  <p className="text-sm">{incident.description}</p>
                  <p className="text-sm mt-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      incident.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      incident.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                      incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>{incident.severity}</span>
                    <span className="ml-2 text-muted-foreground">{incident.report_count} reports</span>
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}