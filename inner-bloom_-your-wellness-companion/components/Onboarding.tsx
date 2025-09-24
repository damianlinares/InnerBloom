

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

// No props are needed as the component's side-effects are handled via context.
interface OnboardingProps {}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};


const Onboarding: React.FC<OnboardingProps> = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const { t } = useLanguage();
  const { login } = useAuth();

  const handleNext = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1 && name.trim()) {
      login(name.trim());
    }
  };
  
  const handleNameSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleNext();
  }

  return (
    <div className="fixed inset-0 bg-light-bg dark:bg-dark-bg flex flex-col justify-center items-center p-6 text-center">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-md"
          >
            <motion.div variants={itemVariants}>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, rotate: 15 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.4 }}
                  className="text-6xl mb-4 text-primary"
                >
                  <i className="ph-fill ph-brain"></i>
                </motion.div>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-text-dark dark:text-text-light mb-4">{t('onboarding_welcome_title')}</motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-text-muted mb-8">
              {t('onboarding_welcome_subtitle')}
            </motion.p>
          </motion.div>
        )}

        {step === 1 && (
           <motion.div
            key="step1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-md"
          >
            <form onSubmit={handleNameSubmit}>
                <motion.h2 variants={itemVariants} className="text-3xl font-bold text-text-dark dark:text-text-light mb-8">{t('onboarding_name_prompt')}</motion.h2>
                <motion.div variants={itemVariants} className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('onboarding_name_placeholder')}
                      className="w-full text-center text-2xl bg-transparent border-b-2 border-primary/20 focus:outline-none p-2 text-text-dark dark:text-text-light"
                      autoFocus
                    />
                    <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                </motion.div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={handleNext}
        disabled={step === 1 && !name.trim()}
        className="absolute bottom-10 bg-primary text-white font-bold py-3 px-12 rounded-full text-lg shadow-lg disabled:opacity-50"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={!(step === 1 && !name.trim()) ? { scale: 1.05, y: -2 } : {}}
        whileTap={!(step === 1 && !name.trim()) ? { scale: 0.95 } : {}}
      >
        {step === 0 ? t('onboarding_cta_start') : t('onboarding_cta_continue')}
      </motion.button>
    </div>
  );
};

export default Onboarding;