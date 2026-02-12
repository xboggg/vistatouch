
import React, { useState } from 'react';
import { Property } from '../types';
import { Link } from 'react-router-dom';
import SavePropertyButton from './SavePropertyButton';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isSaved, onToggleSave }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const cardId = `property-card-${property.id}`;

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2"
      role="group"
      aria-labelledby={`${cardId}-title`}
    >
      <div className="relative">
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        <Link to={`/property/${property.id}`} tabIndex={-1} aria-hidden="true">
            <img 
              loading="lazy" 
              className="w-full h-56 object-cover" 
              src={property.imageUrl} 
              alt={property.title} 
              onLoad={() => setIsImageLoading(false)}
            />
        </Link>
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full pointer-events-none">
          For {property.for === 'buy' ? 'Sale' : 'Rent'}
        </div>
        <div className="absolute top-2 right-2 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-md pointer-events-none">
          {property.type}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 id={`${cardId}-title`} className="text-xl font-bold text-primary truncate pr-2">
              <Link to={`/property/${property.id}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-accent rounded">
                {property.title}
              </Link>
            </h3>
            <SavePropertyButton 
              property={property}
              isSaved={isSaved}
              onToggleSave={onToggleSave}
            />
        </div>
        <p className="text-sm text-gray-500 mb-4 flex items-center">
          <i className="fas fa-map-marker-alt text-accent mr-2"></i>
          {property.location}
        </p>
        <p className="text-2xl font-bold text-accent mb-4">
          {property.for === 'buy' ? `GH₵ ${property.price.toLocaleString()}` : `GH₵ ${property.price.toLocaleString()} / month`}
        </p>
        <div className="flex justify-start items-center gap-4 text-gray-600 border-t pt-4">
          <span className="flex items-center" aria-label={`${property.bedrooms} bedrooms`}>
            <i className="fas fa-bed text-primary mr-2" aria-hidden="true"></i> {property.bedrooms} Beds
          </span>
          <span className="flex items-center" aria-label={`${property.bathrooms} bathrooms`}>
            <i className="fas fa-bath text-primary mr-2" aria-hidden="true"></i> {property.bathrooms} Baths
          </span>
          {property.floorPlanUrl && (
            <span className="flex items-center" title="Floor plan available" aria-label="Floor plan available">
              <i className="fas fa-ruler-combined text-primary" aria-hidden="true"></i>
            </span>
          )}
        </div>
         <div className="mt-auto pt-4 flex gap-2">
             <Link to={`/property/${property.id}`} className="flex-1 text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                View Details
            </Link>
            <Link to="/contact" className="flex-1 text-center bg-white text-primary border border-primary py-2 px-4 rounded-lg hover:bg-light-gray transition-colors text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                Enquire Now
            </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
