"use client";
import React, { useEffect, useState } from "react";
import ParticleBackground from "../backgrounds/ParticleBackground";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  styles?: ModalStyles;
};

interface ModalStyles {
  overlay?: string;
  wrapper?: string;
  closeButton?: string;
}

const defaultStyles: ModalStyles = {
  overlay: "fixed inset-0 z-50 flex w-full items-center justify-center bg-white/80 backdrop-blur-2xl",
  wrapper: "relative rounded-2xl p-6  w-2/3 overflow-y-auto text-white transition-all duration-300 ease-in-out transform",
  closeButton: "",
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, styles = {} }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOpen) {
      setShowModal(true);
    } else {
      timeout = setTimeout(() => setShowModal(false), 300); // match duration
    }
    return () => clearTimeout(timeout);
  }, [isOpen]);

  if (!showModal && !isOpen) return null;

  const mergedStyles = { ...defaultStyles, ...styles };

  return (
    <ParticleBackground flakeColor="black" flakeCount={1200} direction="down" className="h-full"> 
    <div className={`${mergedStyles.overlay} transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className={`${mergedStyles.wrapper} ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded transition">
          Close
        </button>
      </div>
    </div>
            </ParticleBackground>
  );
};

export default Modal;
