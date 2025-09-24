import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import React from 'react';
import Dashboard from './Dashboard';
import { AuthContext } from '../contexts/AuthContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../translations';

const mockT = (key, ...args) => {
    const translation = translations.en[key];
    if (typeof translation === 'function') {
        return translation(...args);
    }
    return translation;
};

const mockAuthContext = {
    currentUser: 'Tester',
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

describe('Dashboard', () => {
  it('navigates to check-in when "Start Check-in" button is clicked', async () => {
    const handleNavigate = vi.fn();
    const user = userEvent.setup();

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LanguageContext.Provider value={mockLangContext}>
          <Dashboard
            streak={5}
            wellnessPoints={100}
            onNavigate={handleNavigate}
            timeOfDay="morning"
            isCheckinCompletedToday={false}
          />
        </LanguageContext.Provider>
      </AuthContext.Provider>
    );
    
    const checkinButton = screen.getByRole('button', { name: /Start Check-in/i });
    await user.click(checkinButton);
    
    expect(handleNavigate).toHaveBeenCalledWith('checkin');
  });
});