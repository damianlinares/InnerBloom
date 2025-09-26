import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
}

// FIX: Export ToastContext to allow it to be imported in test files.
export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, message, type }]);
    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, 5000); // Auto-dismiss after 5 seconds
  }, []);
  
  const removeToast = (id: number) => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };
  
  const getIcon = (type: ToastType) => {
      switch(type) {
          case 'success': return 'check-circle';
          case 'error': return 'warning-circle';
          case 'info': return 'info';
      }
  }
  
  const getColors = (type: ToastType) => {
      switch(type) {
          case 'success': return 'bg-success text-white';
          case 'error': return 'bg-accent-pink text-white';
          case 'info': return 'bg-primary text-white';
      }
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] w-full max-w-xs space-y-2">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.5, transition: { duration: 0.2 } }}
              className={`flex items-center gap-3 p-4 rounded-lg shadow-2xl ${getColors(toast.type)}`}
            >
              <i className={`ph-fill ph-${getIcon(toast.type)} text-2xl flex-shrink-0`}></i>
              <span className="font-semibold text-sm flex-grow">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="ml-2 opacity-70 hover:opacity-100 flex-shrink-0">
                <i className="ph-bold ph-x text-lg"></i>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};