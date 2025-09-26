import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * A custom hook that functions like `useState` but persists the value
 * in `localStorage`, automatically scoped to the currently logged-in user.
 * 
 * @param key The key for the storage item (e.g., 'streak').
 * @param defaultValue The default value if nothing is stored.
 * @returns A stateful value and a function to update it.
 */
export function useUserSpecificStorage<T>(key: string, defaultValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const { t } = useLanguage();
  
  const getStorageKey = useCallback(() => {
    if (!currentUser) return null;
    return `innerbloom-${currentUser}-${key}`;
  }, [currentUser, key]);

  const [value, setValue] = useState<T>(() => {
    const storageKey = getStorageKey();
    if (!storageKey) return defaultValue;
    try {
      const storedValue = localStorage.getItem(storageKey);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${storageKey}”:`, error);
      return defaultValue;
    }
  });

  // This effect updates the state if the user changes (e.g., login/logout)
  useEffect(() => {
    const storageKey = getStorageKey();
    if (!storageKey) {
        setValue(defaultValue);
        return;
    };
    try {
      const storedValue = localStorage.getItem(storageKey);
      setValue(storedValue ? JSON.parse(storedValue) : defaultValue);
    } catch (error) {
      console.error(`Error reading localStorage key “${storageKey}”:`, error);
      setValue(defaultValue);
    }
  }, [currentUser, getStorageKey, defaultValue]);

  const setStoredValue = (newValue: T | ((val: T) => T)) => {
    const storageKey = getStorageKey();
    if (!storageKey) {
        console.warn("Cannot set value without a logged-in user.");
        return;
    };
    try {
        const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
        localStorage.setItem(storageKey, JSON.stringify(valueToStore));
        setValue(valueToStore);
    } catch (error) {
      console.error(`Error setting localStorage key “${storageKey}”:`, error);
      addToast(t('error_storage_full'), 'error');
    }
  };

  return [value, setStoredValue];
}