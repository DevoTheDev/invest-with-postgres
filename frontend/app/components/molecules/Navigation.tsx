"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { formatRoute } from '../../utils/stringUtils';
import Logout from '../atoms/Logout';

const routes = ["investor", "market", "fitness", "settings", "sandbox"];

const Navigation = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-lg flex flex-col justify-between
        `}
      >
        {/* Top Section: Nav Links */}
        <div className="p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-cyan-400">Navigation</h2>
          {routes.map((route) => {
            const handleNav = () => {
              router.push(`/${route}`);
              onClose();
            };

            return (
              <button
                key={route}
                onClick={handleNav}
                className={`
                  px-4 py-2 rounded-md font-medium text-white bg-gray-800
                  hover:bg-cyan-500 transition duration-200
                  shadow hover:shadow-lg cursor-pointer
                `}
              >
                {formatRoute(route)}
              </button>
            );
          })}
        </div>

        {/* Bottom Section: Logout Button */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex justify-center">
            <Logout
              styles={`
                bg-red-500 text-white text-center
                px-4 py-2 w-full
                font-semibold text-sm 
                rounded-full border-1 border-red-500
                cursor-pointer
                hover:bg-red-600 hover:text-white
              `}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
