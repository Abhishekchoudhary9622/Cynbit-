import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Initiate Architecture');
  const [modalType, setModalType] = useState('general'); // 'general', 'bitelevate', 'career', 'demo'
  const [prefillData, setPrefillData] = useState(null);

  const openModal = (title = 'Initiate Architecture', type = 'general', prefill = null) => {
    setModalTitle(title);
    setModalType(type);
    setPrefillData(prefill);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPrefillData(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalTitle, modalType, prefillData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}

