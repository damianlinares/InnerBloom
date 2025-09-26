import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import type { UserSettings, ThemeSetting, Language } from '../types';

interface SettingsProps {
    onBack: () => void;
    userSettings: UserSettings;
    setUserSettings: (value: UserSettings | ((val: UserSettings) => UserSettings)) => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack, userSettings, setUserSettings }) => {
    const { language, setLanguage, t } = useLanguage();

    const handleThemeChange = (theme: ThemeSetting) => {
        setUserSettings(prev => ({ ...prev, theme }));
    };

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
    };

    const handleNotificationToggle = () => {
        setUserSettings(prev => ({ ...prev, notificationsEnabled: !prev.notificationsEnabled }));
    };
    
    const Section: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
        <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring' }}
        >
            <h2 className="text-xl font-bold text-text-dark dark:text-text-light">{title}</h2>
            <div className="bg-light-card dark:bg-dark-card p-4 rounded-2xl shadow-lg border-2 border-primary/20 dark:border-primary/40 space-y-4">
                {children}
            </div>
        </motion.div>
    );

    const ToggleSwitch: React.FC<{ label: string; enabled: boolean; onToggle: () => void; }> = ({ label, enabled, onToggle }) => (
        <div className="flex justify-between items-center">
            <span className="font-semibold text-text-dark dark:text-text-light">{label}</span>
            <button onClick={onToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <motion.span layout className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );

    const SegmentedControl: React.FC<{
        label: string;
        options: { label: string; value: string }[];
        selectedValue: string;
        onChange: (value: any) => void;
    }> = ({ label, options, selectedValue, onChange }) => (
        <div>
            <label className="font-semibold text-text-dark dark:text-text-light block mb-2">{label}</label>
            <div className="flex w-full bg-light-bg dark:bg-dark-bg p-1 rounded-lg">
                {options.map(opt => (
                    <button key={opt.value} onClick={() => onChange(opt.value)} className={`relative flex-1 py-2 text-sm font-semibold rounded-md transition-colors focus:outline-none ${selectedValue === opt.value ? 'text-white' : 'text-text-muted hover:bg-black/5 dark:hover:bg-white/5'}`}>
                        {selectedValue === opt.value && <motion.div layoutId="segmented-control-active-pill" className="absolute inset-0 bg-primary rounded-md z-0" />}
                        <span className="relative z-10">{opt.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const themeOptions = [
        { label: t('settings_theme_light'), value: 'light' },
        { label: t('settings_theme_dark'), value: 'dark' },
        { label: t('settings_theme_system'), value: 'system' }
    ];

    const languageOptions = [
        { label: 'English', value: 'en' },
        { label: 'Español', value: 'es' }
    ];

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, staggerChildren: 0.1 }}
            exit={{ opacity: 0 }}
        >
            <header className="flex items-center justify-between relative z-10">
                <motion.button onClick={onBack} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <i className="ph-bold ph-arrow-left text-xl"></i>
                </motion.button>
                <h1 className="text-2xl font-bold text-text-dark dark:text-text-light">{t('settings_title')}</h1>
                <div className="w-8"></div>
            </header>

            <Section title={t('settings_section_appearance')}>
                <SegmentedControl label={t('settings_theme_label')} options={themeOptions} selectedValue={userSettings.theme} onChange={handleThemeChange} />
            </Section>

            <Section title={t('settings_section_general')}>
                <SegmentedControl label={t('settings_language_label')} options={languageOptions} selectedValue={language} onChange={handleLanguageChange} />
            </Section>
            
            <Section title={t('settings_section_notifications')}>
                <ToggleSwitch label={t('settings_notifications_label')} enabled={userSettings.notificationsEnabled} onToggle={handleNotificationToggle} />
            </Section>

        </motion.div>
    );
};

export default Settings;