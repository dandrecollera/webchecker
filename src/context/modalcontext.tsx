import React, { createContext, useState, useContext, ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  isLoading: boolean;
  modalContent: ReactNode | null;
  modalTitle: string;
  openModal: (content: ReactNode, title: string) => void;
  closeModal: () => void;
  setLoading: (loading: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (content: ReactNode, title: string) => {
    setModalContent(content);
    setModalTitle(title);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsLoading(false);
    setModalContent(null);
    setModalTitle("");
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, isLoading, modalContent, modalTitle, openModal, closeModal, setLoading }}
    >
      {children}
    </ModalContext.Provider>
  );
};
