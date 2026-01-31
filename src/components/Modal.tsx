import React from "react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pb-80"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-6 pb-2 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex">
            <h1 className="text-2xl mb-4 flex-1">{title}</h1>
            <div onClick={onClose} className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
        <div className="mb-3">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
