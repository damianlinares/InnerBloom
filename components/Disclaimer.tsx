import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface DisclaimerProps {
    onAccept: () => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ onAccept }) => {
    const { t } = useLanguage();
    return (
        <motion.div
            className="fixed inset-0 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div
                className="bg-light-card dark:bg-dark-card rounded-2xl shadow-2xl p-6 sm:p-8 max-w-lg w-full border-2 border-primary/20 dark:border-primary/40"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
                <div className="flex items-start gap-4">
                    <i className="ph-fill ph-info text-2xl text-primary mt-1"></i>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-text-dark dark:text-text-light mb-4">
                            {t('disclaimer_title')}
                        </h2>
                        <div className="text-text-muted mb-6 space-y-4 text-sm leading-relaxed">
                            <p>
                                {t('disclaimer_text_en')}
                            </p>
                            <hr className="border-gray-200 dark:border-white/10" />
                            <p>
                                {t('disclaimer_text_es')}
                            </p>
                        </div>
                        <div className="text-left">
                            <motion.button
                                onClick={onAccept}
                                className="bg-primary text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-colors hover:opacity-90"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('disclaimer_accept')}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Disclaimer;