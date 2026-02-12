
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-white">VistaTouch</span><span className="text-accent">Homes</span>
            </h3>
            <p className="text-gray-300">Building Dreams, Creating Homes across Ghana and beyond.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-accent mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/buy" className="hover:text-accent transition-colors">Buy</Link></li>
              <li><Link to="/rent" className="hover:text-accent transition-colors">Rent</Link></li>
              <li><Link to="/developments" className="hover:text-accent transition-colors">Developments</Link></li>
              <li><Link to="/funding" className="hover:text-accent transition-colors">Funding</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-accent mb-4">Legal</h4>
            <ul className="space-y-2">
                <li><Link to="/contact" className="hover:text-accent transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-accent transition-colors"><i className="fab fa-facebook-f fa-lg"></i></a>
              <a href="#" className="hover:text-accent transition-colors"><i className="fab fa-instagram fa-lg"></i></a>
              <a href="#" className="hover:text-accent transition-colors"><i className="fab fa-linkedin-in fa-lg"></i></a>
              <a href="#" className="hover:text-accent transition-colors"><i className="fab fa-youtube fa-lg"></i></a>
               <a href="#" className="hover:text-accent transition-colors"><i className="fab fa-tiktok fa-lg"></i></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-accent mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">Stay updated with our latest properties and offers.</p>
            <form>
              <div className="flex">
                <input type="email" placeholder="Your email" className="w-full px-3 py-2 text-gray-800 rounded-l-md focus:outline-none" />
                <button type="submit" className="bg-accent px-4 py-2 rounded-r-md hover:bg-yellow-600 transition-colors">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} VistaTouch Homes Ltd. All Rights Reserved. Website by a world-class AI engineer.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
