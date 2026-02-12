
import React, { useState } from 'react';
import { Property } from '../types';

interface SavePropertyButtonProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (property: Property) => void;
}

const SavePropertyButton: React.FC<SavePropertyButtonProps> = ({ property, isSaved, onToggleSave }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    onToggleSave(property);
    setIsClicked(true);
    // Reset animation class after it completes
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className="text-2xl text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-full p-1"
      aria-label={isSaved ? `Unsave ${property.title}` : `Save ${property.title}`}
      aria-pressed={isSaved}
    >
      <i 
        className={`fa-heart transition-transform duration-300 ease-in-out ${isSaved ? 'fas text-red-500' : 'far'} ${isClicked ? 'transform scale-150' : ''}`}
      ></i>
    </button>
  );
};

export default SavePropertyButton;
