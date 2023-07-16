import React, { ReactNode, createContext, useContext, useState } from 'react';
import Loading from '#/common/Loading/Loading';

interface LoadingContextProps {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (value: boolean) => {
    setIsLoading(value);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {isLoading && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
