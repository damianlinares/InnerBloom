import React from 'react';
import { motion, Variants } from 'framer-motion';
import type { Language } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSelectionProps {
    onSelect: (lang: Language) => void;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2 + 0.3,
      type: 'spring',
      stiffness: 100
    }
  })
};

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onSelect }) => {
  const { t } = useLanguage();
  return (
    <motion.div
      className="fixed inset-0 bg-light-bg dark:bg-dark-bg flex flex-col justify-center items-center p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div custom={0} initial="hidden" animate="visible" variants={variants}>
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
            className="text-6xl mb-4 text-primary"
        >
            <i className="ph-fill ph-brain"></i>
        </motion.div>
        <h2 className="text-3xl font-bold text-text-dark dark:text-text-light mb-4">{t('language_welcome_title')}</h2>
      </motion.div>

      <motion.p 
        className="text-lg text-text-muted mb-8"
        custom={1} initial="hidden" animate="visible" variants={variants}
      >
        {t('language_select_prompt')}
      </motion.p>

      <motion.div 
        className="flex flex-col sm:flex-row gap-4"
        custom={2} initial="hidden" animate="visible" variants={variants}
      >
        <motion.button
          onClick={() => onSelect('en')}
          className="bg-primary text-white font-bold py-3 px-12 rounded-full text-lg shadow-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          English
        </motion.button>
        <motion.button
          onClick={() => onSelect('es')}
          className="bg-success text-white font-bold py-3 px-12 rounded-full text-lg shadow-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Español
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default LanguageSelection;