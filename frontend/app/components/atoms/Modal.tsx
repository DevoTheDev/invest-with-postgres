// components/Modal.tsx
"use client";
import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative bg-gray-900 rounded-2xl p-6 shadow-2xl w-[90%] max-w-2xl max-h-[80%] overflow-y-auto text-white ring-1 ring-gray-700">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✖
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;