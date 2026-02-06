"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ModalContextType {
  isOpen: boolean;
  content: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  content: null,
  openModal: () => null,
  closeModal: () => null,
});

export function ModalProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const openModal = useCallback((content: React.ReactNode) => {
    setContent(content);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContent(null);
    document.body.style.overflow = "unset";
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-background relative w-full max-w-lg rounded-lg p-6 shadow-xl">
                <button
                  onClick={closeModal}
                  className="hover:bg-muted absolute top-4 right-4 rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
                {content}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
