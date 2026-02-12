
import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROPERTIES } from '../constants';
import { useSavedProperties } from '../hooks/useSavedProperties';
import { Amenity } from '../types';

const PropertyDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const property = MOCK_PROPERTIES.find(p => p.id === Number(id));
    const [mainImage, setMainImage] = useState(property?.imageUrl);
    const { isPropertySaved, toggleSaveProperty } = useSavedProperties();
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const shareRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
                setIsShareOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!property) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-primary">Property Not Found</h1>
                <p className="text-gray-600 mt-4">We couldn't find the property you were looking for.</p>
                <Link to="/buy" className="mt-8 inline-block bg-accent text-white py-3 px-6 rounded-lg font-bold hover:bg-yellow-600 transition-colors">
                    Back to Listings
                </Link>
            </div>
        );
    }
    
    const allImages = [property.imageUrl, ...property.galleryImages];

    const getAmenityIcon = (type: Amenity['type']) => {
        switch (type) {
            case 'school': return 'fa-school';
            case 'park': return 'fa-tree';
            case 'transport': return 'fa-bus-alt';
            case 'shop': return 'fa-shopping-cart';
            case 'hospital': return 'fa-hospital-user';
            default: return 'fa-map-marker-alt';
        }
    };
    
    const maxPrice = Math.max(...property.priceHistory.map(p => p.price));
    const propertyUrl = window.location.href;
    const shareText = `Check out this property: ${property.title}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(propertyUrl).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    return (
        <div className="bg-light-gray">
            {/* Header */}
            <section className="bg-primary text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold">{property.title}</h1>
                    <p className="mt-1 text-lg text-gray-300 flex items-center">
                        <i className="fas fa-map-marker-alt text-accent mr-2"></i>
                        {property.location}
                    </p>
                </div>
            </section>
            
            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Images and Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <div>
                            <img src={mainImage} alt={property.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-4" />
                            <div className="grid grid-cols-4 gap-2">
                                {allImages.map((img, index) => (
                                    <img 
                                        key={index}
                                        src={img} 
                                        alt={`View ${index+1}`} 
                                        className={`w-full h-24 object-cover rounded-md cursor-pointer transition-opacity duration-300 hover:opacity-100 ${mainImage === img ? 'opacity-100 border-4 border-accent' : 'opacity-70'}`}
                                        onClick={() => setMainImage(img)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Virtual Tour Button */}
                        <div>
                            {property.virtualTourUrl ? (
                                <a href={property.virtualTourUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 w-full bg-accent text-white p-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-transform transform hover:scale-105">
                                    <i className="fas fa-vr-cardboard text-2xl"></i>
                                    Take a Virtual Tour
                                </a>
                            ) : (
                                <button disabled className="inline-flex items-center justify-center gap-3 w-full bg-gray-300 text-gray-500 p-4 rounded-lg font-bold text-lg cursor-not-allowed">
                                    <i className="fas fa-vr-cardboard text-2xl"></i>
                                    Virtual Tour Not Available
                                </button>
                            )}
                        </div>

                        {/* Description */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-primary mb-4">Property Description</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
                        </div>
                        
                        {/* Floor Plan */}
                        {property.floorPlanUrl && (
                             <div className="bg-white p-8 rounded-lg shadow-md">
                                <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-3">Floor Plan</h2>
                                <img src={property.floorPlanUrl} alt="Floor plan" className="w-full h-auto rounded-md" />
                            </div>
                        )}

                        {/* Amenities */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-3">Nearby Amenities</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                {property.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center">
                                        <i className={`fas ${getAmenityIcon(amenity.type)} text-accent text-xl w-8 text-center`}></i>
                                        <div className="ml-3">
                                            <p className="font-semibold text-gray-800">{amenity.name}</p>
                                            <p className="text-sm text-gray-500">{amenity.distance}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Street View */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-3">Location & Street View</h2>
                            <div className="aspect-video w-full rounded-lg overflow-hidden">
                                <iframe
                                    title="Google Street View"
                                    src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&hl=es;z=14&amp;output=embed&layer=c&cbll=${property.latitude},${property.longitude}&cbp=12,0,0,0,0`}
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                        
                        {/* Price History */}
                         <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-3">Price History</h2>
                            <div className="h-64 bg-light-gray p-4 rounded-lg flex items-end justify-around gap-2" aria-label="Price history chart">
                                {property.priceHistory.map((entry, index) => {
                                    const heightPercentage = maxPrice > 0 ? (entry.price / maxPrice) * 100 : 0;
                                    return (
                                        <div key={index} className="flex-1 flex flex-col items-center justify-end group text-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold p-1 bg-black bg-opacity-60 rounded-md -mt-8 mb-1">
                                                GH₵ {entry.price.toLocaleString()}
                                            </div>
                                            <div 
                                                className="w-3/4 bg-primary rounded-t-md transition-all duration-300 ease-in-out hover:bg-accent"
                                                style={{ height: `${heightPercentage}%` }}
                                                role="progressbar"
                                                aria-valuenow={entry.price}
                                                aria-valuemin={0}
                                                aria-valuemax={maxPrice}
                                            >
                                            </div>
                                            <div className="text-xs text-gray-500 mt-2">{new Date(entry.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Price, Form, Key Facts */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <p className="text-3xl font-bold text-accent">
                                    {property.for === 'buy' ? `GH₵ ${property.price.toLocaleString()}` : `GH₵ ${property.price.toLocaleString()} / month`}
                                </p>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => toggleSaveProperty(property)}
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg text-primary font-semibold hover:bg-light-gray transition-colors"
                                        aria-label={isPropertySaved(property.id) ? "Unsave property" : "Save property"}
                                    >
                                        <i className={`fa-heart text-xl ${isPropertySaved(property.id) ? 'fas text-red-500' : 'far'}`}></i>
                                        {isPropertySaved(property.id) ? 'Saved' : 'Save'}
                                    </button>
                                     <div className="relative" ref={shareRef}>
                                        <button onClick={() => setIsShareOpen(!isShareOpen)} className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg text-primary font-semibold hover:bg-light-gray transition-colors">
                                            <i className="fas fa-share-alt text-xl"></i> Share
                                        </button>
                                        {isShareOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                                                <button onClick={copyToClipboard} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                                    <i className="fas fa-link"></i> {copySuccess ? 'Copied!' : 'Copy Link'}
                                                </button>
                                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`} target="_blank" rel="noopener noreferrer" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                                    <i className="fab fa-facebook"></i> Facebook
                                                </a>
                                                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(propertyUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                                    <i className="fab fa-twitter"></i> Twitter
                                                </a>
                                                <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + propertyUrl)}`} target="_blank" rel="noopener noreferrer" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                                    <i className="fab fa-whatsapp"></i> WhatsApp
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2">Key Facts</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex justify-between"><span>Property Type:</span> <span className="font-semibold">{property.type}</span></li>
                                    <li className="flex justify-between"><span>Bedrooms:</span> <span className="font-semibold">{property.bedrooms}</span></li>
                                    <li className="flex justify-between"><span>Bathrooms:</span> <span className="font-semibold">{property.bathrooms}</span></li>
                                    <li className="flex justify-between"><span>Status:</span> <span className="font-semibold capitalize">For {property.for}</span></li>
                                </ul>
                            </div>
                            
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-primary mb-4">Enquire About This Property</h3>
                                <form className="space-y-4">
                                    <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-md bg-white text-text-dark" />
                                    <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-md bg-white text-text-dark" />
                                    <input type="tel" placeholder="Phone Number" className="w-full p-3 border rounded-md bg-white text-text-dark" />
                                    <textarea defaultValue={`I am interested in "${property.title}". Please send me more information.`} rows={4} className="w-full p-3 border rounded-md bg-white text-text-dark"></textarea>
                                    <button type="submit" className="w-full bg-accent text-white p-3 rounded-md font-bold hover:bg-yellow-600 transition-colors">Send Inquiry</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailsPage;
