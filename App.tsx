/**
 * Inner Bloom: Your Wellness Companion
 * Made by Ronin Gang Studio
 * 
 * Main application component. Handles view routing, state management,
 * and theme switching.
 */
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';
import DailyCheckin from './components/DailyCheckin';
import BreathingExercise from './components/BreathingExercise';
import JournalWithAI from './components/JournalWithAI';
import ProgressDashboard from './components/ProgressDashboard';
import SupportCircle from './components/SupportCircle';
import WellnessChallenges from './components/WellnessChallenges';
import Onboarding from './components/Onboarding';
import CompletionCelebration from './components/CompletionCelebration';
import PsychoanalysisSession from './components/PsychoanalysisSession';
import LanguageSelection from './components/LanguageSelection';
import Disclaimer from './components/Disclaimer';
import UserProfile from './components/UserProfile';
import Settings from './components/Settings';
import SessionHistory from './components/SessionHistory';
import type { View, MoodEntry, Theme, TimeOfDay, Language, UserSettings } from './types';
import { LanguageContext } from './contexts/LanguageContext';
import { AuthContext } from './contexts/AuthContext';
import { useUserSpecificStorage } from './hooks/useUserSpecificStorage';

const getTimeOfDay = (): TimeOfDay => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
}

const getLocalDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const { currentUser, isLoading: isAuthLoading } = useContext(AuthContext);
  const { setLanguage, isLanguageSet } = useContext(LanguageContext);

  const [streak, setStreak] = useUserSpecificStorage('streak', 0);
  const [wellnessPoints, setWellnessPoints] = useUserSpecificStorage('wellnessPoints', 0);
  const [lastCheckinDate, setLastCheckinDate] = useUserSpecificStorage('lastCheckinDate', '');
  const [userSettings, setUserSettings] = useUserSpecificStorage<UserSettings>('userSettings', {
    theme: 'system',
    notificationsEnabled: true,
  });
  
  const [isCheckinCompletedToday, setIsCheckinCompletedToday] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay());
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(() => {
    return localStorage.getItem('innerbloom-disclaimer-accepted') === 'true';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const applyTheme = (themeToApply: Theme) => {
        root.classList.remove(themeToApply === 'dark' ? 'light' : 'dark');
        root.classList.add(themeToApply);
        localStorage.setItem('innerbloom-theme', themeToApply); // For components outside React
    };

    if (userSettings.theme === 'system') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        applyTheme(mediaQuery.matches ? 'dark' : 'light');
        const handler = (e: MediaQueryListEvent) => applyTheme(e.matches ? 'dark' : 'light');
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    } else {
        applyTheme(userSettings.theme);
    }
  }, [userSettings.theme]);

  useEffect(() => {
    if (isAuthLoading) return;

    if (!isLanguageSet) {
      setCurrentView('language');
    } else if (!currentUser) {
      setCurrentView('onboarding');
    } else {
      setCurrentView('dashboard');
    }
  }, [currentUser, isLanguageSet, isAuthLoading]);
  
  useEffect(() => {
    setIsCheckinCompletedToday(lastCheckinDate === getLocalDateString());
  }, [lastCheckinDate]);

  useEffect(() => {
      const timer = setInterval(() => setTimeOfDay(getTimeOfDay()), 60000);
      return () => clearInterval(timer);
  }, []);
  
  const handleDisclaimerAccept = () => {
    localStorage.setItem('innerbloom-disclaimer-accepted', 'true');
    setIsDisclaimerAccepted(true);
  };
  
  const handleLanguageSelect = (lang: Language) => {
      setLanguage(lang);
      if (!currentUser) {
          setCurrentView('onboarding');
      } else {
          setCurrentView('dashboard');
      }
  };

  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const handleCheckinComplete = (entry: MoodEntry) => {
    console.log('New Check-in:', entry);
    const newStreak = streak + 1;
    setStreak(newStreak);
    
    const pointsEarned = 10;
    const newPoints = wellnessPoints + pointsEarned;
    setWellnessPoints(newPoints);

    setLastCheckinDate(getLocalDateString());
    handleNavigate('celebration');
  };
  
  const handleCelebrationComplete = () => {
      handleNavigate('dashboard');
  }

  const renderView = () => {
    switch (currentView) {
      case 'language':
        return <LanguageSelection key="language" onSelect={handleLanguageSelect} />;
      case 'onboarding':
        return <Onboarding key="onboarding" />;
      case 'dashboard':
        return <Dashboard key="dashboard" streak={streak} wellnessPoints={wellnessPoints} onNavigate={handleNavigate} timeOfDay={timeOfDay} isCheckinCompletedToday={isCheckinCompletedToday} />;
      case 'checkin':
        return <DailyCheckin key="checkin" onComplete={handleCheckinComplete} onBack={() => handleNavigate('dashboard')} />;
      case 'celebration':
        return <CompletionCelebration key="celebration" onComplete={handleCelebrationComplete} streak={streak} pointsEarned={10} />;
      case 'breathing':
        return <BreathingExercise key="breathing" onBack={() => handleNavigate('dashboard')} />;
      case 'journal':
        return <JournalWithAI key="journal" onBack={() => handleNavigate('dashboard')} />;
      case 'progress':
        return <ProgressDashboard key="progress" onNavigate={handleNavigate} onBack={() => handleNavigate('dashboard')} />;
      case 'support':
        return <SupportCircle key="support" onBack={() => handleNavigate('dashboard')} />;
      case 'challenges':
        return <WellnessChallenges key="challenges" onBack={() => handleNavigate('dashboard')} />;
      case 'psychoanalysis':
        return <PsychoanalysisSession key="psychoanalysis" onBack={() => handleNavigate('dashboard')} />;
      case 'profile':
        return <UserProfile key="profile" onBack={() => handleNavigate('dashboard')} streak={streak} wellnessPoints={wellnessPoints} />;
      case 'settings':
        return <Settings key="settings" onBack={() => handleNavigate('dashboard')} userSettings={userSettings} setUserSettings={setUserSettings} />;
      case 'sessionHistory':
        return <SessionHistory key="sessionHistory" onBack={() => handleNavigate('progress')} />;
      default:
        return <div/>;
    }
  };
  
  if (!isDisclaimerAccepted) {
    return (
        <div className="text-text-dark dark:text-text-light antialiased">
            <Disclaimer onAccept={handleDisclaimerAccept} />
        </div>
    );
  }

  if (isAuthLoading) {
      return null; // Or a loading spinner
  }
  
  const immersiveViews: View[] = ['breathing', 'journal', 'support', 'checkin', 'onboarding', 'celebration', 'psychoanalysis', 'language'];
  const isImmersive = immersiveViews.includes(currentView);

  return (
    <div className="text-text-dark dark:text-text-light antialiased min-h-screen flex flex-col items-center">
      <div className={`container mx-auto max-w-xl w-full ${isImmersive ? 'p-0' : 'p-4'}`}>
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;