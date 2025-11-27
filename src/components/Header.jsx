import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="glass border-b border-white/20 sticky top-0 z-50 shadow-premium">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative group">
              <img 
                src={logo} 
                alt="TaskFlow Logo" 
                className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  TaskFlow
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium hidden sm:block">Organize. Visualize. Achieve.</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;