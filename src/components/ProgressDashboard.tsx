

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { getMilestones, MOCK_DAILY_LOGS } from '../constants';
import type { Milestone, DailyLog, View } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ProgressDashboardProps {
  onBack: () => void;
  onNavigate: (view: View) => void;
}

const ChartSkeleton: React.FC = () => (
    <div className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-4"></div>
        <div className="flex justify-between items-end h-40 space-x-2">
            {[...Array(7)].map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-md" style={{ height: `${Math.random() * 80 + 20}%`}}></div>
                </div>
            ))}
        </div>
    </div>
);

const AchievementGallerySkeleton: React.FC = () => (
    <div className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-start space-x-4 p-4 bg-light-bg dark:bg-dark-bg rounded-xl">
                    <div className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full w-12 h-12"></div>
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

interface StatChartProps {
  title: string;
  data: DailyLog[];
  dataKey: keyof Pick<DailyLog, 'mood' | 'energy' | 'sleep'>;
  maxValue: number;
  unit: string;
  colorClass: string;
  hoverColorClass: string;
  locale: string;
}

const StatChart: React.FC<StatChartProps> = ({ title, data, dataKey, maxValue, unit, colorClass, hoverColorClass, locale }) => {
    const getDay = (dateString: string) => new Date(dateString).toLocaleDateString(locale, { weekday: 'short' });
    const [activeDay, setActiveDay] = useState<DailyLog | null>(data.length > 0 ? data[data.length - 1] : null);

    const activeValue = activeDay ? activeDay[dataKey] : null;
    const headerText = activeDay
        ? `${new Date(activeDay.date).toLocaleDateString(locale, { month: 'long', day: 'numeric' })}: `
        : title;

    return (
        <motion.div
            className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-lg border-2 border-primary/30 dark:border-primary/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseLeave={() => setActiveDay(data.length > 0 ? data[data.length - 1] : null)}
        >
            <h3 className="font-semibold text-lg text-text-dark dark:text-text-light mb-4 transition-colors h-6">
                {headerText}
                {activeValue !== null && <span className={`font-bold ${hoverColorClass}`}>{activeValue}{unit}</span>}
            </h3>
            <div className="flex justify-between items-end h-40 space-x-2">
                {data.map(day => {
                    const value = day[dataKey];
                    const height = `${(value / maxValue) * 100}%`;
                    return (
                        <div key={day.date} className="flex-1 flex flex-col items-center justify-end text-center" onMouseEnter={() => setActiveDay(day)}>
                            <motion.div
                                title={`${value}${unit}`}
                                className={`w-full rounded-t-md transition-all duration-200 ${colorClass}`}
                                style={{ height }}
                                whileHover={{scaleY: 1.05, y: -2}}
                                initial={{height: 0}}
                                animate={{height}}
                                transition={{type: 'spring', stiffness: 200, damping: 20}}
                            >
                            </motion.div>
                            <span className="text-xs text-text-muted mt-2">{getDay(day.date)}</span>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};

const galleryVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const MilestonesGallery: React.FC<{ milestones: Milestone[] }> = ({ milestones }) => {
    const { t } = useLanguage();
    return (
    <motion.div 
        className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-lg border-2 border-primary/30 dark:border-primary/50"
        variants={galleryVariants}
        initial="hidden"
        animate="show"
    >
        <h3 className="font-semibold text-lg text-text-dark dark:text-text-light mb-4">{t('progress_milestones_title')}</h3>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {milestones.map(milestone => (
                 <motion.div 
                    variants={itemVariants} 
                    key={milestone.id} 
                    className="relative flex items-start space-x-4 p-4 bg-light-bg dark:bg-dark-bg rounded-xl group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                 >
                    <div className="p-2 bg-primary/20 text-primary rounded-full transition-transform duration-300 group-hover:scale-110">
                       <i className={`ph-fill ph-${milestone.icon} text-2xl`}></i>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-text-dark dark:text-text-light">{milestone.title}</h4>
                        <p className="text-sm text-text-muted">{milestone.description}</p>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    </motion.div>
    )
};

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ onBack, onNavigate }) => {
  const { language, t } = useLanguage();
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);
  
  const locale = useMemo(() => language === 'es' ? 'es-ES' : 'en-US', [language]);

  useEffect(() => {
    isMounted.current = true;
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setDailyLogs(MOCK_DAILY_LOGS);
        setMilestones(getMilestones(language));
        setIsLoading(false);
      }
    }, 1500);

    return () => {
        isMounted.current = false;
        clearTimeout(timer);
    };
  }, [language]);

  return (
    <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { staggerChildren: 0.1 } }}
        exit={{ opacity: 0 }}
    >
      <header className="flex items-center justify-between relative z-10">
        <motion.button onClick={onBack} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <i className="ph-bold ph-arrow-left text-xl"></i>
        </motion.button>
        <h1 className="text-2xl font-bold text-text-dark dark:text-text-light">{t('progress_title')}</h1>
        <div className="w-8"></div>
      </header>

      {isLoading ? (
        <>
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
            <AchievementGallerySkeleton />
        </>
      ) : (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.button
                    onClick={() => onNavigate('sessionHistory')}
                    className="w-full flex items-center justify-center gap-2 text-center bg-light-card dark:bg-dark-card font-semibold py-3 px-4 rounded-xl transition-colors duration-300 shadow-lg border-2 border-primary/30 dark:border-primary/50 text-primary"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <i className="ph-fill ph-clock-counter-clockwise"></i>
                    {t('progress_session_history_cta')}
                </motion.button>
            </motion.div>
            <StatChart title={t('progress_mood_chart_title')} data={dailyLogs} dataKey="mood" maxValue={5} unit="/5" colorClass="bg-primary" hoverColorClass="text-primary" locale={locale} />
            <StatChart title={t('progress_energy_chart_title')} data={dailyLogs} dataKey="energy" maxValue={100} unit="%" colorClass="bg-accent-pink" hoverColorClass="text-accent-pink" locale={locale} />
            <StatChart title={t('progress_sleep_chart_title')} data={dailyLogs} dataKey="sleep" maxValue={5} unit="/5" colorClass="bg-success" hoverColorClass="text-success" locale={locale} />
            <MilestonesGallery milestones={milestones} />
        </>
      )}

    </motion.div>
  );
};

export default ProgressDashboard;