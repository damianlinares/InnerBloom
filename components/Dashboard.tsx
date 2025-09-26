import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import type { View, TimeOfDay, Theme } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  streak: number;
  wellnessPoints: number;
  onNavigate: (view: View) => void;
  timeOfDay: TimeOfDay;
  isCheckinCompletedToday: boolean;
}

const ActionButton: React.FC<{ icon: string; label: string; onClick: () => void; gridSpan?: string }> = ({ icon, label, onClick, gridSpan = 'col-span-1' }) => (
  <motion.button
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-2 p-4 rounded-2xl bg-light-card dark:bg-dark-card shadow-lg hover:shadow-xl border-2 border-primary/30 dark:border-primary/50 hover:border-primary/40 dark:hover:border-primary/70 transition-all duration-300 ${gridSpan}`}
    whileHover={{ scale: 1.05, y: -4 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    aria-label={`Action: ${label}`}
  >
    <i className={`ph-fill ph-${icon} text-4xl text-primary`}></i>
    <span className="font-semibold text-sm text-text-dark dark:text-text-light">{label}</span>
  </motion.button>
);

const CollectiveRitualCard: React.FC<{onNavigate: (view: View) => void;}> = ({onNavigate}) => {
    const { t } = useLanguage();
    const [isRitualActive, setIsRitualActive] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState('00:00:00');
    const [participantCount, setParticipantCount] = useState(Math.floor(Math.random() * 150) + 50);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        const participantInterval = setInterval(() => {
            if (isMounted.current) {
                setParticipantCount(p => Math.max(20, p + Math.floor(Math.random() * 5) - 2));
            }
        }, 4000);

        const timerInterval = setInterval(() => {
            if (isMounted.current) {
                const now = new Date();
                
                const todayRitualStart = new Date(now.getTime());
                todayRitualStart.setUTCHours(19, 0, 0, 0);

                const todayRitualEnd = new Date(todayRitualStart.getTime() + 10 * 60 * 1000);

                if (now >= todayRitualStart && now <= todayRitualEnd) {
                    setIsRitualActive(true);
                } else {
                    setIsRitualActive(false);
                    let nextRitualTime = todayRitualStart;
                    if (now > todayRitualEnd) {
                        nextRitualTime.setUTCDate(nextRitualTime.getUTCDate() + 1);
                    }
                    
                    const diff = nextRitualTime.getTime() - now.getTime();
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor((diff / 1000 / 60) % 60);
                    const seconds = Math.floor((diff / 1000) % 60);
                    
                    setTimeRemaining(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
                }
            }
        }, 1000);

        return () => {
            isMounted.current = false;
            clearInterval(participantInterval);
            clearInterval(timerInterval);
        };
    }, []);

    return (
        <motion.div 
          className="p-6 rounded-3xl shadow-lg text-white text-center overflow-hidden bg-gradient-to-br from-primary to-accent-pink"
        >
          {isRitualActive ? (
                <>
                    <h3 className="text-xl font-bold mb-1">{t('dashboard_ritual_live_title')}</h3>
                    <p className="text-sm opacity-90 mb-4">{t('dashboard_ritual_live_subtitle')}</p>
                    <p className="font-semibold text-lg mb-4">{participantCount} {t('dashboard_ritual_live_participants')}</p>
                    <motion.button 
                        onClick={() => onNavigate('breathing')} 
                        className="bg-white text-primary font-bold py-2 px-6 rounded-full animate-pulse"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t('dashboard_ritual_cta')}
                    </motion.button>
                </>
            ) : (
                <>
                    <h3 className="text-xl font-bold mb-1">{t('dashboard_ritual_title')}</h3>
                    <p className="text-sm opacity-90 mb-2">{t('dashboard_ritual_subtitle')}</p>
                    <div className="my-4">
                        <p className="text-sm opacity-90">{t('dashboard_ritual_countdown_label')}</p>
                        <p className="font-mono text-3xl font-bold tracking-widest">{timeRemaining}</p>
                    </div>
                    <p className="text-sm font-semibold mb-4">{participantCount} {t('dashboard_ritual_waiting')}</p>
                    <button disabled className="bg-white/50 text-primary/70 font-bold py-2 px-6 rounded-full cursor-not-allowed">
                        {t('dashboard_ritual_waiting_cta')}
                    </button>
                </>
            )}
        </motion.div>
    );
};

const WellnessTree: React.FC<{ streak: number }> = ({ streak }) => {
    const { t } = useLanguage();
    const getTreeStage = () => {
        if (streak === 0) return { icon: 'seedling', level: t('dashboard_tree_level_sprout'), progress: 10, text: t('dashboard_tree_stage_0') };
        if (streak < 7) return { icon: 'leaf', level: t('dashboard_tree_level_seedling'), progress: (streak / 7) * 100, text: t('dashboard_tree_stage_1', 7 - streak) };
        if (streak < 30) return { icon: 'tree', level: t('dashboard_tree_level_small'), progress: (streak / 30) * 100, text: t('dashboard_tree_stage_2') };
        return { icon: 'tree-evergreen', level: t('dashboard_tree_level_flourishing'), progress: 100, text: t('dashboard_tree_stage_3') };
    };

    const stage = getTreeStage();

    return (
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-3xl shadow-lg border-2 border-primary/30 dark:border-primary/50">
            <h3 className="text-xl font-bold text-text-dark dark:text-text-light mb-4">{t('dashboard_tree_title')}</h3>
            <div className="flex items-center space-x-4">
                <motion.div 
                    key={stage.icon}
                    initial={{scale: 0.5, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{type: 'spring', stiffness: 200, damping: 10}}
                    className="text-5xl text-success"
                >
                    <i className={`ph-fill ph-${stage.icon}`}></i>
                </motion.div>
                <div className="flex-1">
                    <p className="font-semibold text-text-dark dark:text-text-light">{stage.level}</p>
                    <p className="text-sm text-text-muted">{stage.text}</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                        <motion.div 
                            className="bg-success h-2.5 rounded-full" 
                            initial={{width: 0}}
                            animate={{width: `${stage.progress}%`}}
                            transition={{duration: 1, ease: 'easeOut'}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <motion.button
        onClick={onClick}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-light-card/50 dark:bg-dark-card/50 shadow-lg backdrop-blur-sm"
        aria-label="View Profile"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
        <i className="ph-fill ph-user text-2xl text-primary"></i>
    </motion.button>
);

const SettingsButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <motion.button
        onClick={onClick}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-light-card/50 dark:bg-dark-card/50 shadow-lg backdrop-blur-sm"
        aria-label="View Settings"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
        <i className="ph-fill ph-gear text-2xl text-primary"></i>
    </motion.button>
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const Dashboard: React.FC<DashboardProps> = ({ streak, wellnessPoints, onNavigate, timeOfDay, isCheckinCompletedToday }) => {
  const { t } = useLanguage();
  const { currentUser, logout } = useAuth();
  const greetingText = {
      morning: t('dashboard_greeting_morning'),
      afternoon: t('dashboard_greeting_afternoon'),
      evening: t('dashboard_greeting_evening'),
  }[timeOfDay];

  return (
    <motion.div 
        className="space-y-6 pb-8"
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0 }}
        variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <motion.button
            onClick={logout}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-light-card/50 dark:bg-dark-card/50 shadow-lg backdrop-blur-sm"
            aria-label="Sign Out"
            whileHover={{ scale: 1.1, rotate: -15, backgroundColor: 'rgba(233, 79, 137, 0.2)' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            <i className="ph-fill ph-sign-out text-2xl text-accent-pink"></i>
        </motion.button>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-dark dark:text-text-light">
            {greetingText}, {currentUser}!
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <ProfileButton onClick={() => onNavigate('profile')} />
          <SettingsButton onClick={() => onNavigate('settings')} />
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="flex justify-center items-center space-x-6 text-md text-text-muted">
        <p className="flex items-center gap-2">
            <i className="ph-fill ph-fire text-xl text-accent-pink"></i>
            <span className="font-bold text-text-dark dark:text-text-light">{streak}</span> {t('dashboard_streak_suffix')}
        </p>
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
        <p className="flex items-center gap-2">
            <i className="ph-fill ph-star text-xl text-primary"></i>
            <span className="font-bold text-text-dark dark:text-text-light">{wellnessPoints}</span> {t('dashboard_points_suffix')}
        </p>
      </motion.div>
      
      <motion.div 
        variants={itemVariants} 
        className="bg-light-card dark:bg-dark-card p-6 rounded-3xl shadow-lg text-center space-y-4 border-2 border-primary/30 dark:border-primary/50"
      >
        <h2 className="text-2xl font-semibold text-text-dark dark:text-text-light">{t('dashboard_checkin_title')}</h2>
        <p className="text-text-muted">
            {isCheckinCompletedToday ? t('dashboard_checkin_completed_prompt') : t('dashboard_checkin_prompt')}
        </p>
        <motion.button
          onClick={() => onNavigate('checkin')}
          disabled={isCheckinCompletedToday}
          className={`w-full font-bold py-3 px-4 rounded-xl transition-colors duration-300 shadow-lg ${isCheckinCompletedToday 
            ? 'bg-success text-white cursor-not-allowed flex items-center justify-center gap-2' 
            : 'bg-primary text-white'}`}
          whileHover={!isCheckinCompletedToday ? { scale: 1.02, y: -2 } : {}}
          whileTap={!isCheckinCompletedToday ? { scale: 0.98 } : {}}
        >
          {isCheckinCompletedToday ? (
            <>
              <i className="ph-fill ph-check-circle text-xl"></i>
              {t('dashboard_checkin_completed_cta')}
            </>
          ) : (
            t('dashboard_checkin_cta')
          )}
        </motion.button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <WellnessTree streak={streak} />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-xl font-bold text-text-dark dark:text-text-light px-2">{t('dashboard_actions_title')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <ActionButton icon="wind" label={t('dashboard_action_breathe')} onClick={() => onNavigate('breathing')} />
          <ActionButton icon="users-three" label={t('dashboard_action_support')} onClick={() => onNavigate('support')} />
          <ActionButton icon="notebook" label={t('dashboard_action_journal')} onClick={() => onNavigate('journal')} gridSpan="col-span-2" />
          <ActionButton icon="brain" label={t('dashboard_action_psychoanalysis')} onClick={() => onNavigate('psychoanalysis')} gridSpan="col-span-2" />
          <ActionButton icon="chart-line-up" label={t('dashboard_action_progress')} onClick={() => onNavigate('progress')} />
          <ActionButton icon="trophy" label={t('dashboard_action_challenges')} onClick={() => onNavigate('challenges')} />
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <CollectiveRitualCard onNavigate={onNavigate} />
      </motion.div>

      <motion.footer variants={itemVariants} className="text-center pt-4 pb-2">
        <p className="text-sm text-text-muted">Made by Ronin Gang Studio</p>
      </motion.footer>

    </motion.div>
  );
};

export default Dashboard;