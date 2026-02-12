
import React from 'react';

const amenities = [
    'High-Speed Internet', 'Premium TV Package', 'All Utilities Included', '24/7 Security',
    'Regular Housekeeping', 'Fully Equipped Kitchen', 'On-site Maintenance', 'Community Spaces'
];

const btrGallery = [
    'https://placehold.co/600x400/2c3e50/ffffff?text=Living+Area',
    'https://placehold.co/600x400/2c3e50/ffffff?text=Modern+Kitchen',
    'https://placehold.co/600x400/2c3e50/ffffff?text=Cozy+Bedroom',
    'https://placehold.co/600x400/2c3e50/ffffff?text=Sleek+Bathroom',
];

const BTRPage: React.FC = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[60vh] text-white">
                <img src="https://placehold.co/1920x1080/2c3e50/ffffff?text=BTR+Living" alt="Luxurious BTR Apartment" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-primary bg-opacity-60"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Build to Rent: The Ultimate Convenience</h1>
                    <p className="text-lg md:text-xl max-w-3xl">Premium serviced apartments designed for modern living. All bills included.</p>
                </div>
            </section>
            
            {/* "Just Bring Your Suitcase" Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-primary mb-4">Just Bring Your Suitcase. We'll Handle the Rest.</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Our Build to Rent (BTR) properties offer a hassle-free living experience. Each apartment is fully furnished and comes with an "All Bills Included" package, covering everything from high-speed internet and TV to all utilities. Enjoy the freedom and flexibility of a home without the commitment of ownership.
                        </p>
                    </div>
                     <div>
                        <img src="https://placehold.co/600x400/c9a227/ffffff?text=Move-In+Ready" alt="Stylish apartment interior" className="rounded-lg shadow-xl" />
                    </div>
                </div>
            </section>

            {/* Amenities List */}
            <section className="py-16 bg-light-gray">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-primary mb-12">Included Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {amenities.map(amenity => (
                            <div key={amenity} className="flex items-center">
                                <i className="fas fa-check-circle text-accent mr-3"></i>
                                <span className="text-gray-700">{amenity}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* BTR Gallery */}
            <section className="py-16">
                 <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary text-center mb-12">Explore Our BTR Properties</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {btrGallery.map((img, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                <img src={img} alt={`BTR Property ${index+1}`} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking/Inquiry Form */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-3xl font-bold text-center mb-8">Inquire About BTR Living</h2>
                    <p className="text-center mb-8 text-gray-300">Ready for a seamless living experience? Contact our BTR team today.</p>
                     <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Full Name" className="w-full p-3 rounded-md text-text-dark bg-white" />
                            <input type="email" placeholder="Email Address" className="w-full p-3 rounded-md text-text-dark bg-white" />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="tel" placeholder="Phone Number" className="w-full p-3 rounded-md text-text-dark bg-white" />
                            <select className="w-full p-3 rounded-md text-text-dark bg-white">
                                <option>Preferred Apartment Size</option>
                                <option>Studio</option>
                                <option>1 Bedroom</option>
                                <option>2 Bedrooms</option>
                            </select>
                        </div>
                        <textarea placeholder="Your message or preferred move-in date" rows={4} className="w-full p-3 rounded-md text-text-dark bg-white"></textarea>
                        <button type="submit" className="w-full bg-accent text-white p-3 rounded-md font-bold hover:bg-yellow-600 transition-colors">Send Inquiry</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default BTRPage;
