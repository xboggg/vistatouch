
import React, { useState, useMemo } from 'react';
import { MOCK_PROPERTIES } from '../constants';
import { PropertyType } from '../types';
import PropertyCard from '../components/PropertyCard';
import { useSavedProperties } from '../hooks/useSavedProperties';
import MapView from '../components/MapView';
import SortControl from '../components/SortControl';

const ownershipSchemes = [
    { title: 'Mortgage', description: 'Flexible mortgage options with our partner banks.' },
    { title: 'Part Exchange', description: 'Use your current home as part-payment for a new one.' },
    { title: 'Shared Ownership', description: 'Buy a share of your home and pay rent on the rest.' },
    { title: 'Outright Purchase', description: 'Secure your new home by purchasing it fully.' },
];

const BuyPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [sortOrder, setSortOrder] = useState('default');
    const [filters, setFilters] = useState({
        type: 'all',
        price: 'all',
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
            if (prop.for !== 'buy') return false;
            const typeMatch = filters.type === 'all' || prop.type === filters.type;
            const priceMatch = filters.price === 'all' || (filters.price === 'under500k' && prop.price < 500000) || (filters.price === '500k-1m' && prop.price >= 500000 && prop.price <= 1000000) || (filters.price === 'over1m' && prop.price > 1000000);
            const locationMatch = filters.location === '' || prop.location.toLowerCase().includes(filters.location.toLowerCase());
            const bedroomMatch = filters.bedrooms === 'all' || prop.bedrooms >= parseInt(filters.bedrooms);
            const bathroomMatch = filters.bathrooms === 'all' || prop.bathrooms >= parseInt(filters.bathrooms);
            return typeMatch && priceMatch && locationMatch && bedroomMatch && bathroomMatch;
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
                <h1 className="text-4xl font-bold">Find Your New Home</h1>
                <p className="mt-2 text-lg">Browse our collection of properties for sale.</p>
            </section>

            {/* Filters */}
            <section className="py-4 bg-white shadow-md sticky top-20 z-30">
                <div className="container mx-auto px-4">
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
                        <select name="type" onChange={handleFilterChange} value={filters.type} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-white text-text-dark">
                            <option value="all">All Types</option>
                            {Object.values(PropertyType).map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                        <select name="price" onChange={handleFilterChange} value={filters.price} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-white text-text-dark">
                            <option value="all">All Prices</option>
                            <option value="under500k">Under GH₵ 500,000</option>
                            <option value="500k-1m">GH₵ 500,000 - 1M</option>
                            <option value="over1m">Over GH₵ 1M</option>
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
                        <input type="text" name="location" placeholder="Search by Location" onChange={handleFilterChange} value={filters.location} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent lg:col-span-2 bg-white text-text-dark" />
                    </div>
                </div>
            </section>
            
            {/* View Toggle and Results */}
            <div className="container mx-auto px-4 pt-8">
                 <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <p className="text-gray-600">{filteredProperties.length} properties found</p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <SortControl sortOrder={sortOrder} onSortChange={handleSortChange} />
                        <div className="flex items-center gap-2 bg-primary text-white p-1 rounded-full flex-shrink-0">
                            <button onClick={() => setViewMode('list')} className={`px-4 py-1 rounded-full text-sm ${viewMode === 'list' ? 'bg-accent' : ''}`}><i className="fas fa-list mr-2"></i>List</button>
                            <button onClick={() => setViewMode('map')} className={`px-4 py-1 rounded-full text-sm ${viewMode === 'map' ? 'bg-accent' : ''}`}><i className="fas fa-map-marked-alt mr-2"></i>Map</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Property Listings */}
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
            
            {/* Ownership Schemes */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-primary mb-12">Ways to Own Your Home</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {ownershipSchemes.map(scheme => (
                            <div key={scheme.title} className="p-6 border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-accent mb-2">{scheme.title}</h3>
                                <p className="text-gray-600">{scheme.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Inquiry Form */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-3xl font-bold text-center mb-8">Can't Find What You're Looking For?</h2>
                    <p className="text-center mb-8 text-gray-300">Let us know your requirements, and our team will help you find the perfect property or acquire land for your dream home.</p>
                    <form className="space-y-4">
                        <input type="text" placeholder="Full Name" className="w-full p-3 rounded-md text-text-dark bg-white" />
                        <input type="email" placeholder="Email Address" className="w-full p-3 rounded-md text-text-dark bg-white" />
                        <input type="tel" placeholder="Phone Number" className="w-full p-3 rounded-md text-text-dark bg-white" />
                        <textarea placeholder="Your requirements (property type, location, budget, etc.)" rows={4} className="w-full p-3 rounded-md text-text-dark bg-white"></textarea>
                        <button type="submit" className="w-full bg-accent text-white p-3 rounded-md font-bold hover:bg-yellow-600 transition-colors">Submit Inquiry</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default BuyPage;
