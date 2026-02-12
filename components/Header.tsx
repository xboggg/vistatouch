
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { useSavedProperties } from '../hooks/useSavedProperties';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { savedProperties } = useSavedProperties();

  const activeLinkStyle = {
    color: '#c9a227',
    borderBottom: '2px solid #c9a227'
  };

  const SavedPropertiesLink = ({ isMobile = false }) => (
    <NavLink
      to="/saved"
      onClick={() => isMobile && setIsOpen(false)}
      style={({ isActive }) => (isActive ? (isMobile ? { color: '#c9a227', backgroundColor: '#374f68' } : activeLinkStyle) : {})}
      className={isMobile 
        ? "block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white" 
        : "relative px-3 py-2 rounded-md text-sm font-medium hover:text-accent transition-colors"}
    >
      <div className="flex items-center gap-2">
        <i className="fa-solid fa-heart"></i>
        <span>Saved</span>
        {savedProperties.length > 0 && (
          <span className="bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {savedProperties.length}
          </span>
        )}
      </div>
    </NavLink>
  );

  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold">
              <span className="text-white">VistaTouch</span><span className="text-accent">Homes</span>
            </NavLink>
          </div>

          <div className="hidden md:flex items-center">
            <nav className="ml-10 flex items-baseline space-x-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  style={({ isActive }) => isActive ? activeLinkStyle : {}}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-accent transition-colors flex items-center gap-2"
                >
                  {link.icon && <i className={link.icon}></i>}
                  {link.name}
                </NavLink>
              ))}
            </nav>
            <div className="ml-6">
              <SavedPropertiesLink />
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                 style={({ isActive }) => isActive ? { color: '#c9a227', backgroundColor: '#374f68' } : {}}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white flex items-center gap-2"
              >
                {link.icon && <i className={link.icon}></i>}
                {link.name}
              </NavLink>
            ))}
            <SavedPropertiesLink isMobile={true} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
