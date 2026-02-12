
import { useState, useEffect } from 'react';
import { Property } from '../types';

const SAVED_PROPERTIES_KEY = 'savedProperties';

export const useSavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);

  useEffect(() => {
    try {
      const items = window.localStorage.getItem(SAVED_PROPERTIES_KEY);
      setSavedProperties(items ? JSON.parse(items) : []);
    } catch (error) {
      console.error("Error reading saved properties from localStorage", error);
      setSavedProperties([]);
    }
  }, []);

  const isPropertySaved = (propertyId: number): boolean => {
    return savedProperties.some(p => p.id === propertyId);
  };

  const toggleSaveProperty = (property: Property) => {
    setSavedProperties(prevSaved => {
      const isCurrentlySaved = prevSaved.some(p => p.id === property.id);
      let newSavedProperties;
      
      if (isCurrentlySaved) {
        newSavedProperties = prevSaved.filter(p => p.id !== property.id);
      } else {
        newSavedProperties = [...prevSaved, property];
      }

      try {
        window.localStorage.setItem(SAVED_PROPERTIES_KEY, JSON.stringify(newSavedProperties));
      } catch (error) {
        console.error("Error writing saved properties to localStorage", error);
      }
      
      return newSavedProperties;
    });
  };

  return { savedProperties, isPropertySaved, toggleSaveProperty };
};
