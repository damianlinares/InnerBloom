
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useUserSpecificStorage } from '../hooks/useUserSpecificStorage';
import type { SessionSummary } from '../types';

interface SessionHistoryProps {
  onBack: () => void;
}

const SummaryCard: React.FC<{ summary: SessionSummary; locale: string }> = ({ summary, locale }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const formattedDate = useMemo(() => {
        return new Date(summary.date).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }, [summary.date, locale]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-light-card dark:bg-dark-card rounded-2xl shadow-lg border-2 border-primary/20 dark:border-primary/40 overflow-hidden"
        >
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex justify-between items-center p-4 text-left"
            >
                <div className="flex-1">
                    <h3 className="font-bold text-text-dark dark:text-text-light">{summary.title}</h3>
                    <p className="text-sm text-text-muted">{formattedDate}</p>
                </div>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                    <i className="ph-bold ph-caret-down text-xl text-text-muted"></i>
                </motion.div>
            </button>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 border-t border-gray-200 dark:border-white/10">
                            <p className="text-text-dark dark:text-text-light whitespace-pre-wrap leading-relaxed">{summary.summary}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};


const SessionHistory: React.FC<SessionHistoryProps> = ({ onBack }) => {
    const { language, t } = useLanguage();
    const [summaries] = useUserSpecificStorage<SessionSummary[]>('psychoanalysisSummaries', []);
    const locale = useMemo(() => language === 'es' ? 'es-ES' : 'en-US', [language]);

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
                <h1 className="text-2xl font-bold text-text-dark dark:text-text-light">{t('session_history_title')}</h1>
                <div className="w-8"></div>
            </header>

            {summaries.length > 0 ? (
                <div className="space-y-4">
                    {summaries.map(summary => (
                        <SummaryCard key={summary.id} summary={summary} locale={locale} />
                    ))}
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20 text-text-muted"
                >
                    <i className="ph-fill ph-clock-counter-clockwise text-6xl mb-4"></i>
                    <p className="font-semibold">{t('session_history_empty')}</p>
                </motion.div>
            )}

        </motion.div>
    );
};

export default SessionHistory;