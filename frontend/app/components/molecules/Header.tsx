"use client";
import React, { useState } from 'react';
import Navigation from './Navigation';
import { useUser } from '../../hooks/useUser';

const Header = () => {
  const { profile } = useUser();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white text-2xl focus:outline-none hover:text-cyan-400"
            >
              ☰
            </button>
          {/* Optional: Add user avatar/info on right */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-cyan-400 text-2xl font-extrabold tracking-tight">Next</span>
              <span className="text-white text-2xl font-extrabold tracking-tight">Investment</span>
            </div>
          </div>
        </div>
      </header>

      <Navigation isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
