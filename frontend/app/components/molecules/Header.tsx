"use client";
import React, { useState } from 'react';
import Navigation from './Navigation';
import { useProfile } from '../../hooks/useProfile';
import { usePathname } from 'next/navigation';
import { formatRoute } from '@/app/utils/stringUtils';

const Header = () => {
  const { profile } = useProfile();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between ">
          <div 
          onClick={() => setSidebarOpen(true)}
          className='hover:bg-gray-500 py-1 px-3 items-center rounded-full cursor-pointer'>
          <button
            className="text-white text-2xl focus:outline-none mb-1 cursor-pointer hover:text-cyan-400 "
            >
            ☰
          </button>
            </div>
          {/* Optional: Add user avatar/info on right */}
          <div className='px-16 mt-1.5 items-center w-full flex justify-start text-xs font-extralight text-white'>Welcome, {profile?.name || "User"}</div>
          {/* <div 
          onClick={handleUserLog}
          className={`
          px-16 py-4 mx-8 rounded-xl mt-1.5 items-center w-1/5 flex 
          justify-center text-md font-extralight
           text-white hover:bg-gray-300
           `}>Log User</div> */}

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-cyan-400 text-2xl font-extrabold tracking-tight">Next</span>
              <span className="text-white text-2xl font-extrabold tracking-tight">Investment</span>
            </div>
          </div>
        </div>
        <h1 className='bg-gray-900 text-xl text-white font-light'>
          <p className='w-1/6 ml-3 p-4 text-center'>{formatRoute(pathname)}</p>
        </h1>
      </header>
      <Navigation isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
