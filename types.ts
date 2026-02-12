
export enum PropertyType {
  Detached = 'Detached',
  SemiDetached = 'Semi-Detached',
  Terraced = 'Terraced',
  Maisonette = 'Maisonette',
  Bungalow = 'Bungalow',
  Apartment = 'Apartment',
  Penthouse = 'Penthouse',
  DuplexPenthouse = 'Duplex Penthouse'
}

export interface Amenity {
  name: string;
  type: 'school' | 'park' | 'transport' | 'shop' | 'hospital';
  distance: string; // e.g., "500m" or "5 min walk"
}

export interface PriceHistoryData {
    date: string; // e.g., "2022-01-15"
    price: number;
}

export interface Property {
  id: number;
  title: string;
  price: number;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  location: string;
  imageUrl: string;
  for: 'buy' | 'rent';
  description: string;
  galleryImages: string[];
  amenities: Amenity[];
  virtualTourUrl?: string;
  latitude: number;
  longitude: number;
  priceHistory: PriceHistoryData[];
  floorPlanUrl?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  comment: string;
  avatarUrl: string;
}

export interface Development {
    id: number;
    name: string;
    location: string;
    status: 'Current' | 'Upcoming' | 'Completed';
    description: string;
    imageUrl: string;
}
