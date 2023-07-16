import React, { createContext, useContext, useState } from 'react';

type SnackbarType = 'default' | 'success' | 'error' | 'warning';

type SnackbarContextType = {
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarType: SnackbarType;
  snackbarPosition: 'top' | 'bottom';
  openSnackbar: (message: string, type?: SnackbarType, position?: 'top' | 'bottom') => void;
  closeSnackbar: () => void;
};

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

interface SnackbarProviderProps {
  children: React.ReactNode;
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<SnackbarType>('default');
  const [snackbarPosition, setSnackbarPosition] = useState<'top' | 'bottom'>('bottom');

  const openSnackbar = (
    message: string,
    type: SnackbarType = 'default',
    position: 'top' | 'bottom' = 'bottom'
  ) => {
    setSnackbarOpen(true);
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarPosition(position);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
    setSnackbarType('default');
    setSnackbarPosition('bottom');
  };

  const contextValue: SnackbarContextType = {
    snackbarOpen,
    snackbarMessage,
    snackbarType,
    snackbarPosition,
    openSnackbar,
    closeSnackbar,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
