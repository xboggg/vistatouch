
import React, { useState, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import { MOCK_PROPERTIES } from '../constants';
import { useSavedProperties } from '../hooks/useSavedProperties';
import MapView from '../components/MapView';
import { PropertyType } from '../types';
import SortControl from '../components/SortControl';

const rentalOptions = [
    { icon: 'fa-suitcase', title: 'Short-term Lettings', description: 'Perfect for business trips, holidays, or temporary stays.' },
    { icon: 'fa-airbnb', brand: true, title: 'Airbnb-style Rentals', description: 'Fully-furnished homes with hotel-like amenities.' },
    { icon: 'fa-file-signature', title: 'Assured Shorthold Tenancy', description: 'Secure long-term rentals for stable, comfortable living.' },
];

const RentPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [sortOrder, setSortOrder] = useState('default');
    const [filters, setFilters] = useState({
        type: 'all',
        location: '',
        bedrooms: 'all',
        bathrooms: 'all',
    });

    const { isPropertySaved, toggleSaveProperty } = useSavedProperties();
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
    };

    const filteredProperties = useMemo(() => {
        let properties = MOCK_PROPERTIES.filter(prop => {
            if (prop.for !== 'rent') return false;
            const typeMatch = filters.type === 'all' || prop.type === filters.type;
            const locationMatch = filters.location === '' || prop.location.toLowerCase().includes(filters.location.toLowerCase());
            const bedroomMatch = filters.bedrooms === 'all' || prop.bedrooms >= parseInt(filters.bedrooms);
            const bathroomMatch = filters.bathrooms === 'all' || prop.bathrooms >= parseInt(filters.bathrooms);
            return typeMatch && locationMatch && bedroomMatch && bathroomMatch;
        });

        switch (sortOrder) {
            case 'price-asc':
                properties.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                properties.sort((a, b) => b.price - a.price);
                break;
            default:
                properties.sort((a, b) => a.id - b.id);
                break;
        }

        return properties;
    }, [filters, sortOrder]);


    return (
        <div className="bg-light-gray">
            {/* Page Header */}
            <section className="bg-primary text-white py-12 text-center">
                <h1 className="text-4xl font-bold">Your Ideal Rental Home Awaits</h1>
                <p className="mt-2 text-lg">Discover our premium selection of properties available for rent.</p>
            </section>

             {/* Filters */}
            <section className="py-4 bg-white shadow-md sticky top-20 z-30">
                <div className="container mx-auto px-4">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                        <select name="type" onChange={handleFilterChange} value={filters.type} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-white text-text-dark">
                            <option value="all">All Types</option>
                            {Object.values(PropertyType).map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                        <select name="bedrooms" onChange={handleFilterChange} value={filters.bedrooms} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-white text-text-dark">
                            <option value="all">Any Beds</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                        </select>
                        <select name="bathrooms" onChange={handleFilterChange} value={filters.bathrooms} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-white text-text-dark">
                            <option value="all">Any Baths</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                        </select>
                        <input type="text" name="location" placeholder="Search by Location" onChange={handleFilterChange} value={filters.location} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-white text-text-dark" />
                    </div>
                </div>
            </section>
            
            {/* Rental Options */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-primary mb-12">Flexible Rental Solutions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {rentalOptions.map(option => (
                            <div key={option.title} className="p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                                <i className={`text-accent text-4xl mb-4 ${option.brand ? 'fab' : 'fas'} ${option.icon}`}></i>
                                <h3 className="text-xl font-semibold text-primary mb-2">{option.title}</h3>
                                <p className="text-gray-600">{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* View Toggle and Results */}
            <div className="container mx-auto px-4 pt-8">
                 <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">Available for Rent ({filteredProperties.length})</h2>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <SortControl sortOrder={sortOrder} onSortChange={handleSortChange} />
                        <div className="flex items-center gap-2 bg-primary text-white p-1 rounded-full flex-shrink-0">
                            <button onClick={() => setViewMode('list')} className={`px-4 py-1 rounded-full text-sm ${viewMode === 'list' ? 'bg-accent' : ''}`}><i className="fas fa-list mr-2"></i>List</button>
                            <button onClick={() => setViewMode('map')} className={`px-4 py-1 rounded-full text-sm ${viewMode === 'map' ? 'bg-accent' : ''}`}><i className="fas fa-map-marked-alt mr-2"></i>Map</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rental Listings */}
            <section className="pb-16">
                <div className="container mx-auto px-4">
                    {viewMode === 'list' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {filteredProperties.length > 0 ? (
                            filteredProperties.map(prop => (
                                <PropertyCard 
                                    key={prop.id} 
                                    property={prop}
                                    isSaved={isPropertySaved(prop.id)}
                                    onToggleSave={toggleSaveProperty}
                                />
                            ))
                            ) : (
                                <p className="text-center col-span-full text-lg py-16">No properties match your criteria.</p>
                            )}
                        </div>
                    ) : (
                        <MapView properties={filteredProperties} />
                    )}
                </div>
            </section>

            {/* Booking Inquiry Form */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-3xl font-bold text-center mb-8">Book Your Stay</h2>
                    <p className="text-center mb-8 text-gray-300">Interested in one of our rental properties? Fill out the form below and our lettings team will be in touch.</p>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Full Name" className="w-full p-3 rounded-md text-text-dark bg-white" />
                            <input type="email" placeholder="Email Address" className="w-full p-3 rounded-md text-text-dark bg-white" />
                        </div>
                        <input type="text" placeholder="Property of Interest (e.g., Modern Apartment Downtown)" className="w-full p-3 rounded-md text-text-dark bg-white" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 text-sm">Check-in Date</label>
                                <input type="date" className="w-full p-3 rounded-md text-text-dark bg-white" />
                            </div>
                             <div>
                                <label className="block mb-1 text-sm">Check-out Date</label>
                                <input type="date" className="w-full p-3 rounded-md text-text-dark bg-white" />
                            </div>
                        </div>
                        <textarea placeholder="Any additional questions or requests?" rows={4} className="w-full p-3 rounded-md text-text-dark bg-white"></textarea>
                        <button type="submit" className="w-full bg-accent text-white p-3 rounded-md font-bold hover:bg-yellow-600 transition-colors">Submit Booking Inquiry</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default RentPage;
