

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { getJournalPrompts } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';

interface JournalWithAIProps {
  onBack: () => void;
}

const JournalWithAI: React.FC<JournalWithAIProps> = ({ onBack }) => {
  const [entry, setEntry] = useState('');
  const [reflection, setReflection] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { language, t } = useLanguage();
  const { addToast } = useToast();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const placeholderPrompt = useMemo(() => {
    const prompts = getJournalPrompts(language);
    return prompts[Math.floor(Math.random() * prompts.length)];
  }, [language]);

  const handleGetReflection = async () => {
    setIsLoading(true);
    setReflection('');
    try {
        const { getAIPoweredReflection } = await import('../services/geminiService');
        const result = await getAIPoweredReflection(entry, language);
        if (isMounted.current) {
          setReflection(result);
        }
    } catch (error) {
        console.error("Error fetching AI reflection:", error);
        const errorMessage = error instanceof Error ? error.message.toLowerCase() : '';
        if (errorMessage.includes('api key')) {
            addToast(t('error_api_invalid_key'), 'error');
        } else {
            addToast(t('error_api_generic'), 'error');
        }
    } finally {
        if (isMounted.current) {
            setIsLoading(false);
        }
    }
  };

  return (
    <motion.div 
        className="fixed inset-0 flex flex-col calm-gradient text-white p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <header className="flex items-center justify-between w-full z-10 flex-shrink-0">
             <motion.button onClick={onBack} className="p-2 rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <i className="ph-bold ph-arrow-left text-xl"></i>
            </motion.button>
            <h1 className="text-2xl font-bold">{t('dashboard_action_journal')}</h1>
            <div className="w-10"></div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto py-4">
            <motion.div
                className="w-full max-w-2xl bg-light-card/90 dark:bg-dark-card/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col my-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
            >
                {/* User Input Area */}
                <div className="flex-1">
                    <textarea
                        value={entry}
                        onChange={(e) => setEntry(e.target.value)}
                        placeholder={t('journal_placeholder')}
                        className="w-full h-48 sm:h-56 bg-transparent resize-none focus:outline-none text-lg font-serif text-text-dark dark:text-text-light placeholder:text-text-muted/70"
                        maxLength={500}
                    />
                </div>
                
                {/* Separator and Action Bar */}
                <div className="flex justify-between items-center mt-4 border-t border-gray-200 dark:border-white/20 pt-4">
                    <span className={`font-sans font-semibold transition-colors ${entry.length > 480 ? 'text-red-500' : 'text-text-muted'}`}>{entry.length} / 500</span>
                    <motion.button
                        onClick={handleGetReflection}
                        disabled={isLoading || !entry.trim()}
                        className="bg-primary text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 shadow-lg disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center font-sans"
                        whileHover={!isLoading && !!entry.trim() ? { scale: 1.05, y: -2 } : {}}
                        whileTap={!isLoading && !!entry.trim() ? { scale: 0.95 } : {}}
                    >
                        {isLoading ? t('journal_thinking') : t('journal_reflect')}
                    </motion.button>
                </div>
                
                {/* AI Reflection Area */}
                <div className="mt-6 min-h-[100px]">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div 
                                key="loading" 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }} 
                                className="flex flex-col justify-center items-center h-full text-text-muted"
                            >
                                <i className="ph-fill ph-sparkle text-4xl animate-ping opacity-70"></i>
                                <p className="mt-3 font-semibold font-serif text-md">{t('journal_reflecting')}</p>
                            </motion.div>
                        ) : reflection ? (
                            <motion.div 
                                key="reflection" 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }}
                                className="border-l-4 border-primary/50 pl-4"
                            >
                                <h2 className="font-bold text-xl text-text-dark dark:text-text-light mb-2 font-serif">{t('journal_reflection_title')}</h2>
                                <p className="text-text-dark dark:text-text-light leading-relaxed whitespace-pre-wrap font-serif text-md">{reflection}</p>
                            </motion.div>
                        ) : (
                             <motion.div 
                                key="prompt"
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }}
                                className="flex flex-col justify-center items-center h-full text-center text-text-muted"
                             >
                                <i className="ph-fill ph-feather text-4xl mb-3"></i>
                                <p className="italic font-serif">{placeholderPrompt}</p>
                             </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    </motion.div>
  );
};

export default JournalWithAI;