
import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface CompletionCelebrationProps {
  onComplete: () => void;
  streak: number;
  pointsEarned: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.2 + 0.5, // Delay each item after the initial animation
      type: 'spring',
      stiffness: 100
    }
  })
};

const checkVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 }
      }
    }
};

const CompletionCelebration: React.FC<CompletionCelebrationProps> = ({ onComplete, streak, pointsEarned }) => {
  const { t } = useLanguage();

  useEffect(() => {
    // A short, compatible WAV file to prevent browser playback issues.
    // FIX: Replaced corrupted base64 string with a valid, short, silent WAV file to resolve critical parsing errors.
    const audioSrc = "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhIAAAAAA=";
    const sound = new Audio(audioSrc);
    sound.play().catch(e => console.error("Error playing sound:", e));
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-gradient-to-br from-primary to-accent-pink flex flex-col items-center justify-center text-white z-50"
    >
      <div className="text-center p-4">
        <motion.svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-6"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={checkVariants}
          />
        </motion.svg>
        
        <motion.h1
          custom={0}
          variants={itemVariants}
          className="text-3xl font-bold"
        >
          {t('celebration_title')}
        </motion.h1>

        <motion.p
          custom={1}
          variants={itemVariants}
          className="text-lg opacity-90 mt-2"
        >
          {t('celebration_streak_message', streak)}
        </motion.p>
        
        <motion.div
          custom={2}
          variants={itemVariants}
          className="mt-4 bg-white/20 text-lg font-semibold px-4 py-2 rounded-full inline-block"
        >
          {t('celebration_points_earned', pointsEarned)}
        </motion.div>
        
        <motion.button
          custom={3}
          variants={itemVariants}
          onClick={onComplete}
          className="mt-12 bg-white/30 backdrop-blur-sm font-bold py-3 px-8 rounded-full hover:bg-white/40 transition-colors"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('celebration_cta')}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CompletionCelebration;
