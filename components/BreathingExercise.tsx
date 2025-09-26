import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { getBreathingTechniques } from '../constants';
import type { BreathingTechnique } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface BreathingExerciseProps {
  onBack: () => void;
}

type Phase = 'inhale' | 'hold' | 'exhale' | 'holdAfter' | 'idle' | 'ready';

const PracticeView: React.FC<{ technique: BreathingTechnique, onBack: () => void }> = ({ technique, onBack }) => {
  const [phase, setPhase] = useState<Phase>('ready');
  const [count, setCount] = useState(0);
  const { t } = useLanguage();
  const isActive = phase !== 'idle' && phase !== 'ready';

  useEffect(() => {
    if (!isActive) return;

    const { inhale, hold, exhale, holdAfter } = technique.pattern;
    const sequence: { phase: Phase; duration: number }[] = [ { phase: 'inhale', duration: inhale } ];
    if (hold && hold > 0) sequence.push({ phase: 'hold', duration: hold });
    sequence.push({ phase: 'exhale', duration: exhale });
    if (holdAfter && holdAfter > 0) sequence.push({ phase: 'holdAfter', duration: holdAfter });

    let currentPhaseIndex = -1;
    let phaseTimer: ReturnType<typeof setTimeout>;
    let countdownTimer: ReturnType<typeof setInterval>;

    const nextPhase = () => {
      currentPhaseIndex = (currentPhaseIndex + 1) % sequence.length;
      const currentPhase = sequence[currentPhaseIndex];
      if (!currentPhase) return;

      setPhase(currentPhase.phase);
      setCount(currentPhase.duration);
      
      let counter = currentPhase.duration;
      countdownTimer = setInterval(() => {
        counter -= 1;
        setCount(counter);
      }, 1000);

      phaseTimer = setTimeout(() => {
        clearInterval(countdownTimer);
        nextPhase();
      }, currentPhase.duration * 1000);
    };
    
    nextPhase();

    return () => {
      clearTimeout(phaseTimer);
      clearInterval(countdownTimer);
    };
  }, [isActive, technique]);

  const toggleActive = useCallback(() => {
    if (isActive) {
      setPhase('ready');
      setCount(0);
    } else {
      setPhase('inhale');
    }
  }, [isActive]);
  
  const phaseText: Record<Phase, string> = {
    ready: t('breathing_ready'),
    idle: t('breathing_begin'),
    inhale: t('breathing_inhale'),
    hold: t('breathing_hold'),
    exhale: t('breathing_exhale'),
    holdAfter: t('breathing_hold'),
  };
  
  const ringAnimation = {
      scale: isActive ? [1, 1.3, 1] : 1,
      opacity: isActive ? [0.3, 0.7, 0.3] : 0.3,
  };

  // FIX: Replaced `reduce` with direct property access to avoid type inference issues.
  // This correctly calculates the total duration of a breathing cycle and resolves type errors.
  const { inhale, hold, exhale, holdAfter } = technique.pattern;
  const totalDuration = inhale + (hold ?? 0) + exhale + (holdAfter ?? 0);

  const ringTransition = (duration: number, delay = 0) => ({
      duration,
      delay,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: "mirror"
  } as const);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-between p-4 overflow-hidden calm-gradient text-white"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <header className="flex items-center justify-between w-full z-10">
         <motion.button onClick={onBack} className="p-2 rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <i className="ph-bold ph-arrow-left text-xl"></i>
        </motion.button>
        <div className="text-center">
            <h1 className="font-bold text-lg">{technique.name}</h1>
        </div>
        <div className="w-10"></div>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center -mt-10">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center" aria-live="polite">
          {[...Array(3)].map((_, i) => (
              <motion.div
                  key={i}
                  className="absolute border border-white/30 rounded-full"
                  style={{ width: `${100 + i * 50}px`, height: `${100 + i * 50}px` }}
                  animate={ringAnimation}
                  transition={ringTransition(totalDuration * 1.2, i * 0.5)}
              />
          ))}
          <div className="relative text-center z-10">
            <AnimatePresence mode="wait">
              <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
              >
                  <div className="text-2xl font-medium mb-2">{phaseText[phase]}</div>
                  {isActive && <div className="text-8xl font-bold tracking-tighter">{Math.ceil(count)}</div>}
              </motion.div>
            </AnimatePresence>
            {!isActive && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4">
                  <p className="text-sm opacity-80 mt-1 max-w-xs">{technique.description}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-center p-4 z-10">
        <motion.button 
            onClick={toggleActive} 
            className="bg-white/90 text-primary font-bold py-4 px-10 rounded-full hover:bg-white transition-colors duration-300 shadow-2xl backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
        >
          {isActive ? t('breathing_end_session') : t('breathing_begin')}
        </motion.button>
      </div>
    </motion.div>
  );
};

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onBack }) => {
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique | null>(null);
  const { language, t } = useLanguage();
  const techniques = useMemo(() => getBreathingTechniques(language), [language]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    exit: { opacity: 0 }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <div className="fixed inset-0 bg-light-bg dark:bg-dark-bg transition-colors duration-500">
      <AnimatePresence mode="wait">
        {selectedTechnique ? (
          <PracticeView key="practice" technique={selectedTechnique} onBack={() => setSelectedTechnique(null)} />
        ) : (
          <motion.div
            key="selection"
            className="flex flex-col h-full"
            initial="hidden" animate="visible" exit="exit" variants={containerVariants}
          >
            <header className="flex items-center gap-4 p-4">
              <motion.button onClick={onBack} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <i className="ph-bold ph-arrow-left text-xl"></i>
              </motion.button>
              <h1 className="text-2xl font-bold text-text-dark dark:text-text-light">{t('breathing_title')}</h1>
            </header>
            <div className="flex-1 overflow-y-auto p-4 pt-0">
              <motion.div 
                  className="grid grid-cols-1 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
              >
                {techniques.map((tech) => {
                    return (
                        <motion.button
                            key={tech.id}
                            variants={itemVariants}
                            onClick={() => setSelectedTechnique(tech)}
                            className="flex items-center space-x-4 p-4 rounded-2xl bg-light-card dark:bg-dark-card shadow-lg hover:shadow-xl border-2 border-primary/30 dark:border-primary/50 text-left transition-all duration-300"
                            whileHover={{ y: -2, scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            aria-label={`Select ${tech.name}`}
                        >
                            <div className="p-3 bg-primary/10 text-primary rounded-full">
                                <i className={`ph-fill ph-${tech.icon} text-3xl`}></i>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-text-dark dark:text-text-light">{tech.name}</p>
                                <p className="text-sm text-text-muted">{tech.description}</p>
                            </div>
                            <i className="ph-bold ph-caret-right text-text-muted"></i>
                        </motion.button>
                    );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BreathingExercise;