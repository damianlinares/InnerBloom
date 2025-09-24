
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getChallenges } from '../constants';
import type { WellnessChallenge } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface WellnessChallengesProps {
  onBack: () => void;
}

const ChallengeCard: React.FC<{ 
    challenge: WellnessChallenge;
}> = ({ challenge }) => {
    const isCompleted = challenge.status === 'completed';
    const { t } = useLanguage();

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="relative overflow-hidden bg-light-card dark:bg-dark-card p-4 rounded-2xl shadow-lg border-2 border-primary/30 dark:border-primary/50"
        >
            <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full ${isCompleted ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                    <i className={`ph-fill ph-${challenge.icon} text-2xl`}></i>
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-text-dark dark:text-text-light">{challenge.title}</h4>
                    <p className="text-sm text-text-muted mt-1">{challenge.description}</p>
                    <div className="flex justify-between items-center mt-3">
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary text-white">
                           {t('challenges_reward_prefix')}: {challenge.reward}
                        </span>
                        {!isCompleted && <span className="text-sm font-bold text-text-dark dark:text-text-light">{challenge.progress}%</span>}
                    </div>
                    {!isCompleted && (
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${challenge.progress}%` }}></div>
                        </div>
                    )}
                    {isCompleted && (
                        <div className="mt-3 text-center bg-light-bg dark:bg-dark-bg text-text-muted font-semibold py-2 rounded-lg">
                            <i className="ph-fill ph-check-circle mr-2 text-success"></i>
                            {t('challenges_completed_text')}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};


const WellnessChallenges: React.FC<WellnessChallengesProps> = ({ onBack }) => {
  const [challenges, setChallenges] = useState<WellnessChallenge[]>([]);
  const { language, t } = useLanguage();

  useEffect(() => {
    const initialChallenges = getChallenges(language);
    const sortedChallenges = initialChallenges.sort((a, b) => {
        if (a.status === 'active' && b.status === 'completed') return -1;
        if (a.status === 'completed' && b.status === 'active') return 1;
        return 0;
    });
    setChallenges(sortedChallenges);
  }, [language]);

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
        <h1 className="text-2xl font-bold text-text-dark dark:text-text-light">{t('challenges_title')}</h1>
        <div className="w-8"></div>
      </header>

      <div className="space-y-4">
        {challenges.length > 0 ? (
            <AnimatePresence>
                {challenges.map(challenge => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
            </AnimatePresence>
        ) : (
            <div className="text-center py-10">
                <p className="text-text-muted">
                    {t('challenges_no_challenges')}
                </p>
            </div>
        )}
      </div>

    </motion.div>
  );
};

export default WellnessChallenges;
