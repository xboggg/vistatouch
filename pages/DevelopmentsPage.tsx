
import React from 'react';
import { MOCK_DEVELOPMENTS } from '../constants';

const DevelopmentsPage: React.FC = () => {
    return (
        <div className="bg-light-gray">
            {/* Page Header */}
            <section className="bg-primary text-white py-12 text-center">
                <h1 className="text-4xl font-bold">Our Developments</h1>
                <p className="mt-2 text-lg">Shaping the future of living in Ghana.</p>
            </section>

            {/* Projects Gallery */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary text-center mb-12">Current & Upcoming Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {MOCK_DEVELOPMENTS.map(dev => (
                            <div key={dev.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="relative">
                                    <img src={dev.imageUrl} alt={dev.name} className="w-full h-56 object-cover" />
                                     <div className={`absolute top-2 left-2 text-white text-xs font-semibold px-3 py-1 rounded-full ${dev.status === 'Current' ? 'bg-green-500' : dev.status === 'Upcoming' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                                        {dev.status}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-primary">{dev.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{dev.location}</p>
                                    <p className="text-gray-600">{dev.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Construction Progress Updates</h3>
                        <p className="text-gray-600 mb-4">Follow our journey on social media for the latest updates.</p>
                        <div className="flex justify-center space-x-4">
                             <a href="#" className="text-primary hover:text-accent transition-colors"><i className="fab fa-youtube fa-2x"></i></a>
                             <a href="#" className="text-primary hover:text-accent transition-colors"><i className="fab fa-instagram fa-2x"></i></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Affordable Housing Initiative */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img src="https://placehold.co/600x400/2c3e50/ffffff?text=Community+Housing" alt="Community housing" className="rounded-lg shadow-xl" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-primary mb-4">Our Affordable Housing Initiative</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            We are proud to dedicate 20% of our new developments to affordable, means-tested properties. In partnership with local districts, we aim to provide quality housing for all, ensuring vibrant and inclusive communities.
                        </p>
                        <a href="#/contact" className="text-accent font-bold hover:underline">Learn More &rarr;</a>
                    </div>
                </div>
            </section>
            
             {/* Logistics Services */}
            <section className="py-16">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                     <div className="md:order-2">
                        <img src="https://placehold.co/600x400/c9a227/ffffff?text=Logistics" alt="Construction materials" className="rounded-lg shadow-xl" />
                    </div>
                    <div className="md:order-1">
                        <h2 className="text-3xl font-bold text-primary mb-4">Streamlined Logistics Services</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                           Our dedicated logistics division ensures the efficient acquisition and delivery of high-quality building materials for all our projects. This vertical integration allows us to maintain quality control and meet construction timelines effectively.
                        </p>
                    </div>
                </div>
            </section>

            {/* Partner with Us */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Partner With Us</h2>
                    <p className="mb-8 text-gray-300">Are you a landowner, investor, or contractor? Let's build the future together.</p>
                    <form className="space-y-4 text-left">
                        <input type="text" placeholder="Your Name / Company Name" className="w-full p-3 rounded-md text-text-dark bg-white" />
                        <input type="email" placeholder="Email Address" className="w-full p-3 rounded-md text-text-dark bg-white" />
                        <select className="w-full p-3 rounded-md text-text-dark bg-white">
                            <option>I am a...</option>
                            <option>Landowner</option>
                            <option>Investor</option>
                            <option>Contractor/Supplier</option>
                            <option>Other</option>
                        </select>
                        <textarea placeholder="Tell us about your proposal" rows={4} className="w-full p-3 rounded-md text-text-dark bg-white"></textarea>
                        <button type="submit" className="w-full bg-accent text-white p-3 rounded-md font-bold hover:bg-yellow-600 transition-colors">Submit</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default DevelopmentsPage;
