import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

interface AuthContextType {
  currentUser: string | null;
  login: (username: string) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('innerbloom-currentUser');
      if (storedUser) {
        setCurrentUser(storedUser);
      }
    } catch (e) {
      console.error("Failed to read from localStorage", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((username: string) => {
    try {
        localStorage.setItem('innerbloom-currentUser', username);
        setCurrentUser(username);
    } catch (e) {
        console.error("Failed to write to localStorage", e);
    }
  }, []);

  const logout = useCallback(() => {
    try {
        // Clear all user-specific data to simulate a clean logout
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(`innerbloom-${currentUser}-`)) {
                localStorage.removeItem(key);
            }
        });
        localStorage.removeItem('innerbloom-currentUser');
        setCurrentUser(null);
    } catch (e) {
        console.error("Failed to write to localStorage", e);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);