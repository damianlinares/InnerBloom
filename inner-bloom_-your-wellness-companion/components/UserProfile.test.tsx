import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import UserProfile from './UserProfile';
import { AuthContext } from '../contexts/AuthContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../translations';

const mockT = (key) => translations.en[key];

const mockAuthContext = {
    currentUser: 'Ronin',
    login: vi.fn(),
    logout: vi.fn(),
    isLoading: false,
};

const mockLangContext = {
    language: 'en',
    setLanguage: vi.fn(),
    t: mockT,
    isLanguageSet: true,
};

describe('UserProfile', () => {
  it('renders user information correctly', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LanguageContext.Provider value={mockLangContext}>
          <UserProfile onBack={vi.fn()} streak={10} wellnessPoints={250} />
        </LanguageContext.Provider>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Ronin')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('250')).toBeInTheDocument();
    expect(screen.getByText('Day Streak')).toBeInTheDocument();
    expect(screen.getByText('Wellness Points')).toBeInTheDocument();
  });
});