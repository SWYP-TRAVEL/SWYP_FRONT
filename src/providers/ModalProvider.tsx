'use client'

import { createContext, useContext, useState, type ReactNode } from 'react';

type ModalElement = ReactNode;

interface ModalContextType {
  openModal: (modal: ModalElement) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<ModalElement[]>([]);

  const openModal = (modal: ModalElement) => {
    setModals((prev) => [...prev, modal]);
  };

  const closeModal = () => {
    setModals((prev) => prev.slice(0, -1));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modals.map((ModalComponent, index) => (
        <div key={index} className="fixed inset-0 z-[1000 + index]">
          {ModalComponent}
        </div>
      ))}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModalContext must be used within a ModalProvider');
  return context;
}
