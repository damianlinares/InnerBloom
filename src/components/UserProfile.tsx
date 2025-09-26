import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface UserProfileProps {
    onBack: () => void;
    streak: number;
    wellnessPoints: number;
}

const StatCard: React.FC<{icon: string, label: string, value: number, color: string}> = ({icon, label, value, color}) => (
    <div className="bg-light-card dark:bg-dark-card p-4 rounded-2xl shadow-lg flex flex-col items-center text-center border-2 border-primary/20 dark:border-primary/40">
        <i className={`ph-fill ph-${icon} text-4xl mb-2 ${color}`}></i>
        <p className="text-2xl font-bold text-text-dark dark:text-text-light">{value}</p>
        <p className="text-sm text-text-muted">{label}</p>
    </div>
);


const UserProfile: React.FC<UserProfileProps> = ({ onBack, streak, wellnessPoints }) => {
    const { currentUser } = useAuth();
    const { t } = useLanguage();

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <header className="flex items-center justify-between relative z-10">
                <motion.button onClick={onBack} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <i className="ph-bold ph-arrow-left text-xl"></i>
                </motion.button>
                <h1 className="text-2xl font-bold text-text-dark dark:text-text-light">{t('profile_title')}</h1>
                <div className="w-8"></div>
            </header>
            
            <motion.div 
                className="flex flex-col items-center justify-center text-center p-8 bg-light-card dark:bg-dark-card rounded-3xl shadow-lg border-2 border-primary/30 dark:border-primary/50"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
            >
                <i className="ph-fill ph-user-circle text-8xl text-primary mb-4"></i>
                <p className="text-lg text-text-muted">{t('profile_username_label')}</p>
                <h2 className="text-4xl font-bold text-text-dark dark:text-text-light mt-1">
                    {currentUser}
                </h2>
            </motion.div>

            <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
            >
                <StatCard icon="fire" label={t('profile_stat_streak')} value={streak} color="text-accent-pink" />
                <StatCard icon="star" label={t('profile_stat_points')} value={wellnessPoints} color="text-primary" />
            </motion.div>
        </motion.div>
    );
};

export default UserProfile;