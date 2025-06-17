// components/Modal.tsx
"use client";
import React from "react";
import XButton from "../molecules/XButton";

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
  overlay: "fixed inset-0 z-50 flex items-center justify-center bg-opacity-20 backdrop-blur-md",
  wrapper: "relative bg-gray-900 rounded-2xl p-6 shadow-2xl w-[90%] max-w-2xl max-h-[80%] overflow-y-auto text-white ring-1 ring-gray-700",
  closeButton: "",
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, styles = {} }) => {
  if (!isOpen) return null;

  const mergedStyles = { ...defaultStyles, ...styles };

  return (
    <div
      className={mergedStyles.overlay}
    >
      <div
        className={mergedStyles.wrapper}>
        {children}
      </div>
      <button
        onClick={onClose}
        className="bg-red-400 px2 py-1 rounded-md"  >Close</button>
    </div>
  );
};

export default Modal;
