
import React from 'react';
import { Property } from '../types';
import { Link } from 'react-router-dom';

interface MapViewProps {
  properties: Property[];
}

// Bounding box for Ghana for coordinate normalization
const MIN_LAT = 4.7, MAX_LAT = 11.1;
const MIN_LON = -3.2, MAX_LON = 1.2;

const normalizeCoordinates = (lat: number, lon: number) => {
  const top = 100 - ((lat - MIN_LAT) / (MAX_LAT - MIN_LAT)) * 100;
  const left = ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * 100;

  // Clamp values to prevent markers from going off-screen
  return {
    top: `${Math.max(0, Math.min(100, top))}%`,
    left: `${Math.max(0, Math.min(100, left))}%`,
  };
};

const MapView: React.FC<MapViewProps> = ({ properties }) => {
  return (
    <div className="w-full h-[70vh] bg-light-gray border-4 border-primary rounded-lg shadow-lg relative overflow-hidden">
      {/* Pseudo map background */}
      <div className="absolute inset-0 bg-gray-200 opacity-50"></div>
      
      {properties.map(prop => {
        const { top, left } = normalizeCoordinates(prop.latitude, prop.longitude);
        return (
          <div
            key={prop.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ top, left, zIndex: 10 }}
          >
            <Link to={`/property/${prop.id}`}>
                <i className="fas fa-map-marker-alt text-primary text-4xl cursor-pointer transform group-hover:text-accent group-hover:scale-125 transition-all"></i>
            </Link>
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-white p-2 rounded-md shadow-lg text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              <p className="font-bold text-sm text-primary truncate">{prop.title}</p>
              <p className="text-xs text-accent font-semibold">GH₵ {prop.price.toLocaleString()}</p>
            </div>
          </div>
        );
      })}
       {properties.length === 0 && (
         <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-lg text-gray-500">No properties to display on the map.</p>
         </div>
      )}
    </div>
  );
};

export default MapView;
