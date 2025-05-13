import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Recallr
              </span>
            </Link>
          </div>
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`px-3 py-2 text-sm font-medium ${isActive('/') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}>
              Home
            </Link>
            <Link to="/about" className={`px-3 py-2 text-sm font-medium ${isActive('/about') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}>
              About
            </Link>
            <Link to="/pricing" className={`px-3 py-2 text-sm font-medium ${isActive('/pricing') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}>
              Pricing
            </Link>
          </nav>
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className={`block px-3 py-2 text-base font-medium ${isActive('/') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'}`} onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" className={`block px-3 py-2 text-base font-medium ${isActive('/about') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'}`} onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/pricing" className={`block px-3 py-2 text-base font-medium ${isActive('/pricing') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'}`} onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
          </div>
        </div>}
    </header>;
};
export default Header;