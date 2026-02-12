
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_PROPERTIES, MOCK_TESTIMONIALS } from '../constants';
import PropertyCard from '../components/PropertyCard';
import { PropertyType } from '../types';
import { useSavedProperties } from '../hooks/useSavedProperties';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const heroImages = [
    'https://placehold.co/1920x1080/2c3e50/ffffff?text=VistaTouch+Homes',
    'https://placehold.co/1920x1080/c9a227/ffffff?text=Building+Dreams',
    'https://placehold.co/1920x1080/333333/ffffff?text=Creating+Homes',
];

const services = [
    { icon: 'fa-solid fa-house-signal', title: 'Sales' },
    { icon: 'fa-solid fa-key', title: 'Lettings' },
    { icon: 'fa-solid fa-building-user', title: 'Developments' },
    { icon: 'fa-solid fa-city', title: 'BTR' },
    { icon: 'fa-solid fa-truck-fast', title: 'Logistics' },
];

const propertyStyles = Object.values(PropertyType);

const HomePage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const { isPropertySaved, toggleSaveProperty } = useSavedProperties();

    const servicesSectionRef = useRef<HTMLDivElement>(null);
    const isServicesVisible = useIntersectionObserver(servicesSectionRef, { threshold: 0.2 });

    useEffect(() => {
        const sliderTimer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(sliderTimer);
    }, []);
    
    useEffect(() => {
        const testimonialTimer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % MOCK_TESTIMONIALS.length);
        }, 7000);
        return () => clearInterval(testimonialTimer);
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[70vh] text-white">
                {heroImages.map((src, index) => (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                        <img src={src} alt={`Property ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    </div>
                ))}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">Building Dreams, Creating Homes</h1>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl animate-fade-in-up">Find your perfect property with VistaTouch Homes, Ghana's premier property developer.</p>
                    <div className="w-full max-w-3xl bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg">
                        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                            <input type="text" placeholder="Location (e.g., Accra)" className="p-3 rounded-md text-text-dark focus:outline-none focus:ring-2 focus:ring-accent bg-white" />
                            <select className="p-3 rounded-md text-text-dark focus:outline-none focus:ring-2 focus:ring-accent bg-white">
                                <option>Property Type</option>
                                {propertyStyles.map(style => <option key={style}>{style}</option>)}
                            </select>
                            <select className="p-3 rounded-md text-text-dark focus:outline-none focus:ring-2 focus:ring-accent bg-white">
                                <option>Price Range</option>
                                <option>Under GHS 500,000</option>
                                <option>GHS 500,000 - 1,000,000</option>
                            </select>
                            <button type="submit" className="bg-accent text-white p-3 rounded-md font-bold hover:bg-yellow-600 transition-colors">Search</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section ref={servicesSectionRef} className="py-16 bg-light-gray">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-primary mb-2">Our Services</h2>
                    <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Comprehensive real estate solutions tailored to your needs.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {services.map((service, index) => (
                            <div 
                                key={service.title} 
                                className={`bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 ease-out ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <i className={`${service.icon} text-accent text-5xl mb-4`}></i>
                                <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary text-center mb-12">Featured Properties</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {MOCK_PROPERTIES.slice(0, 6).map(prop => (
                            <PropertyCard 
                                key={prop.id} 
                                property={prop}
                                isSaved={isPropertySaved(prop.id)}
                                onToggleSave={toggleSaveProperty}
                            />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Funding Options Banner */}
            <section className="bg-primary text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Flexible Funding for Public Sector Workers</h2>
                    <p className="text-lg text-gray-300 mb-6">We offer special packages to make home ownership easier for you. T&Cs apply.</p>
                    <a href="#/funding" className="bg-accent text-white py-3 px-8 rounded-full font-bold text-lg hover:bg-yellow-600 transition-colors">Learn More</a>
                </div>
            </section>

            {/* Property Styles Showcase */}
            <section className="py-16 bg-light-gray">
                 <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-primary mb-12">Find Your Style</h2>
                     <div className="flex flex-wrap justify-center gap-4">
                         {propertyStyles.map(style => (
                             <button key={style} className="bg-white border border-gray-300 text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-colors">{style}</button>
                         ))}
                     </div>
                </div>
            </section>

            {/* About Snippet */}
            <section className="py-16">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img src="https://placehold.co/600x400/2c3e50/ffffff?text=Our+Team" alt="VistaTouch Team" className="rounded-lg shadow-xl" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-primary mb-4">About VistaTouch Homes</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            VistaTouch Homes Ltd is a leading Ghanaian property development company committed to delivering high-quality residential and commercial properties. Our mission is to build not just structures, but communities where people can thrive.
                        </p>
                        <a href="#/contact" className="text-accent font-bold hover:underline">Read More &rarr;</a>
                    </div>
                </div>
            </section>
            
            {/* Testimonials */}
             <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">What Our Clients Say</h2>
                    <div className="relative h-64 overflow-hidden">
                        {MOCK_TESTIMONIALS.map((testimonial, index) => (
                             <div key={testimonial.id} className={`absolute inset-0 transition-opacity duration-1000 flex flex-col items-center justify-center ${index === currentTestimonial ? 'opacity-100' : 'opacity-0'}`}>
                                <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-20 h-20 rounded-full mb-4 border-4 border-accent"/>
                                <p className="text-lg italic max-w-3xl mb-4">"{testimonial.comment}"</p>
                                <p className="font-bold text-accent">{testimonial.name}, <span className="font-normal text-gray-300">{testimonial.location}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
