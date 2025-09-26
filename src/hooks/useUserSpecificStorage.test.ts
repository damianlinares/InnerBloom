import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import React, { ReactNode } from 'react';
import { useUserSpecificStorage } from './useUserSpecificStorage';
import { AuthContext } from '../contexts/AuthContext';
import { ToastContext } from '../contexts/ToastContext';
import { LanguageContext } from '../contexts/LanguageContext';

const mockCurrentUser = 'testUser';
const mockAddToast = vi.fn();
const mockT = vi.fn(key => key);

// FIX: Replaced JSX with React.createElement to be compatible with a .ts file extension.
// The original JSX syntax caused numerous parsing errors.
const wrapper = ({ children }: { children: ReactNode }) => (
  React.createElement(AuthContext.Provider, { value: { currentUser: mockCurrentUser, login: vi.fn(), logout: vi.fn(), isLoading: false } },
    React.createElement(ToastContext.Provider, { value: { addToast: mockAddToast } },
      React.createElement(LanguageContext.Provider, { value: { language: 'en', setLanguage: vi.fn(), t: mockT, isLanguageSet: true } },
        children
      )
    )
  )
);


describe('useUserSpecificStorage', () => {
  
  beforeEach(() => {
    localStorage.clear();
    mockAddToast.mockClear();
  });

  it('should return the default value if nothing is in localStorage', () => {
    const { result } = renderHook(() => useUserSpecificStorage('testKey', 'defaultValue'), { wrapper });
    expect(result.current[0]).toBe('defaultValue');
  });

  it('should return the stored value from localStorage', () => {
    localStorage.setItem(`innerbloom-${mockCurrentUser}-testKey`, JSON.stringify('storedValue'));
    const { result } = renderHook(() => useUserSpecificStorage('testKey', 'defaultValue'), { wrapper });
    expect(result.current[0]).toBe('storedValue');
  });

  it('should update the value in state and localStorage', () => {
    const { result } = renderHook(() => useUserSpecificStorage('testKey', 'defaultValue'), { wrapper });
    
    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(localStorage.getItem(`innerbloom-${mockCurrentUser}-testKey`)).toBe(JSON.stringify('newValue'));
  });
  
  it('should handle functional updates', () => {
    const { result } = renderHook(() => useUserSpecificStorage('count', 0), { wrapper });
    
    act(() => {
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(localStorage.getItem(`innerbloom-${mockCurrentUser}-count`)).toBe('1');
  });
});