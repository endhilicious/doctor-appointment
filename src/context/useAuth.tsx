import React, { createContext, useContext, useEffect, useState } from 'react';
import { create } from 'zustand';
import { setCookie, parseCookies } from 'nookies';

type AuthState = {
  accessToken: any;
  isAuthLoading: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthLoading: true,
  login: (accessToken) => set({ accessToken, isAuthLoading: false }),
  logout: () => set({ accessToken: null, isAuthLoading: false }),
}));
export const AuthContext = createContext<AuthState>(useAuthStore.getState());

export const useAuth = (): AuthState => useContext(AuthContext);

const AuthProvider: React.FC<any> = ({ children }) => {
  const { accessToken, isAuthLoading, login } = useAuthStore();
  console.log('accessToken', accessToken);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const cookies = parseCookies();
    const storedAccessToken = cookies.accessToken;
    if (storedAccessToken) {
      login(storedAccessToken);
    }
    setInitializing(false);
  }, [login]);

  const handleLogin = (accessToken: string) => {
    setCookie(null, 'accessToken', accessToken, {
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    login(accessToken);
  };

  const handleLogout = () => {
    setCookie(null, 'accessToken', '', {
      maxAge: -1,
      path: '/',
    });
    useAuthStore.getState().logout();
  };

  return (
    <AuthContext.Provider value={{ accessToken, isAuthLoading, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
