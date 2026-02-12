
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSavedProperties } from '../hooks/useSavedProperties';
import PropertyCard from '../components/PropertyCard';

const SavedPropertiesPage: React.FC = () => {
    const { savedProperties, isPropertySaved, toggleSaveProperty } = useSavedProperties();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProperties = useMemo(() => {
        if (!searchTerm) {
            return savedProperties;
        }
        return savedProperties.filter(prop => 
            prop.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            prop.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [savedProperties, searchTerm]);

    return (
        <div className="bg-light-gray min-h-[calc(100vh-10rem)]">
            {/* Page Header */}
            <section className="bg-primary text-white py-12 text-center">
                <h1 className="text-4xl font-bold">Your Saved Properties</h1>
                <p className="mt-2 text-lg">Review and manage the properties you're interested in.</p>
            </section>
            
            {/* Saved Properties Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {savedProperties.length > 0 ? (
                        <>
                            <div className="mb-8 max-w-lg mx-auto">
                                <input 
                                    type="text"
                                    placeholder="Search by title or location..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>

                            {filteredProperties.length > 0 ? (
                                <>
                                    <p className="mb-8 text-gray-600">{filteredProperties.length} of {savedProperties.length} properties showing</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {filteredProperties.map(prop => (
                                            <PropertyCard 
                                                key={prop.id}
                                                property={prop}
                                                isSaved={isPropertySaved(prop.id)}
                                                onToggleSave={toggleSaveProperty}
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-16">
                                    <i className="fas fa-search text-5xl text-gray-300 mb-4"></i>
                                    <h2 className="text-2xl font-semibold text-primary mb-4">No Matches Found</h2>
                                    <p className="text-gray-600">No saved properties match your search for "{searchTerm}".</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <i className="fas fa-heart-crack text-5xl text-gray-300 mb-4"></i>
                            <h2 className="text-2xl font-semibold text-primary mb-4">No Saved Properties Yet</h2>
                            <p className="text-gray-600 mb-8">Click the heart icon on any property to save it here for later.</p>
                            <div className="space-x-4">
                                <Link to="/buy" className="bg-accent text-white py-3 px-6 rounded-lg font-bold hover:bg-yellow-600 transition-colors">
                                    Browse For Sale
                                </Link>
                                <Link to="/rent" className="bg-primary text-white py-3 px-6 rounded-lg font-bold hover:bg-opacity-90 transition-colors">
                                    Browse For Rent
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default SavedPropertiesPage;
