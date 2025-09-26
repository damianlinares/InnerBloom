

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMoodOptions } from '../constants';
import type { MoodEntry } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface DailyCheckinProps {
  onComplete: (entry: MoodEntry) => void;
  onBack: () => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const DailyCheckin: React.FC<DailyCheckinProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [entry, setEntry] = useState<MoodEntry>({
    mood: 3,
    energy: 50,
    gratitude: ['', '', ''],
    sleep: 3,
    stress: 3, // Stress is not in the UI, but we keep it for type consistency
  });

  const { t } = useLanguage();
  const moodOptions = useMemo(() => getMoodOptions(t), [t]);
  const gratitudeInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === 2) {
      gratitudeInputsRef.current[0]?.focus();
    }
  }, [step]);


  const steps = useMemo(() => [
    { id: 'mood', title: t('checkin_step_mood') },
    { id: 'energy', title: t('checkin_step_vitals') },
    { id: 'gratitude', title: t('checkin_step_gratitude') }
  ], [t]);


  const handleUpdate = (update: Partial<MoodEntry>) => {
    setEntry(prev => ({ ...prev, ...update }));
  };
  
  const handleGratitudeChange = (index: number, value: string) => {
    const newGratitude = [...entry.gratitude] as [string, string, string];
    newGratitude[index] = value;
    handleUpdate({ gratitude: newGratitude });
  };
  
  const handleGratitudeKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < 3) {
        gratitudeInputsRef.current[nextIndex]?.focus();
      } else {
        nextStep();
      }
    }
  };

  const nextStep = () => {
    setDirection(1);
    if(step < steps.length - 1) {
        setStep(s => s + 1);
    } else {
        handleSubmit();
    }
  }

  const prevStep = () => {
    setDirection(-1);
    if(step > 0) {
        setStep(s => s - 1);
    } else {
        onBack();
    }
  }

  const handleSubmit = () => {
    onComplete(entry);
  };
  
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 calm-gradient text-white flex flex-col p-4 sm:p-6">
      <header className="flex items-center gap-4">
        <motion.button onClick={prevStep} className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <i className="ph-bold ph-arrow-left text-xl"></i>
        </motion.button>
        <div className="w-full bg-white/20 rounded-full h-2.5">
            <motion.div 
                className="bg-primary h-2.5 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
            ></motion.div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
            <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-full"
            >
                <h2 className="text-3xl font-bold text-center mb-12">{steps[step].title}</h2>

                {step === 0 && ( // Mood
                    <div className="flex justify-around items-center">
                    {moodOptions.map((option) => (
                        <motion.button key={option.value} onClick={() => handleUpdate({mood: option.value})} className={`text-6xl p-2 rounded-full transition-transform duration-200 ${entry.mood === option.value ? 'scale-125' : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'}`} whileHover={{ scale: entry.mood === option.value ? 1.3 : 1.1 }} whileTap={{ scale: 0.9 }}>
                        {option.emoji}
                        </motion.button>
                    ))}
                    </div>
                )}

                {step === 1 && ( // Energy & Sleep
                    <div className="space-y-8 px-2">
                        {/* Energy Card */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold text-lg">{t('checkin_energy')}</h3>
                                <span className="font-bold text-2xl text-accent-pink">{entry.energy}%</span>
                            </div>
                            <div className="relative h-3">
                                <div className="absolute top-0 left-0 h-full w-full bg-white/20 rounded-full"></div>
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent-pink rounded-full"
                                    animate={{ width: `${entry.energy}%` }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                />
                                <input
                                    type="range" min="0" max="100" value={entry.energy}
                                    onChange={(e) => handleUpdate({ energy: parseInt(e.target.value) })}
                                    className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                                    aria-label={t('checkin_energy')}
                                />
                            </div>
                        </div>

                        {/* Sleep Card */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                            <h3 className="font-semibold text-lg text-center">{t('checkin_sleep')}</h3>
                            <div className="flex justify-around items-center pt-2">
                                {[...Array(5)].map((_, i) => (
                                    <motion.button
                                        key={i}
                                        onClick={() => handleUpdate({ sleep: i + 1 })}
                                        className={`text-5xl transition-all duration-200 ${i < entry.sleep ? 'text-yellow-400' : 'text-white/30 hover:text-white/50'}`}
                                        whileHover={{ scale: 1.2, y: -5 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                    >
                                        <i className={`ph-${i < entry.sleep ? 'fill' : 'bold'} ph-star`}></i>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
                {step === 2 && ( // Gratitude
                    <div className="space-y-4 px-2">
                        {[...Array(3)].map((_, i) => (
                        <input
                            key={i}
                            ref={(el) => { gratitudeInputsRef.current[i] = el; }}
                            type="text"
                            placeholder={`${i + 1}.`}
                            value={entry.gratitude[i]}
                            onChange={(e) => handleGratitudeChange(i, e.target.value)}
                            onKeyDown={(e) => handleGratitudeKeyDown(e, i)}
                            className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-md rounded-lg p-3 text-lg focus:ring-primary focus:border-primary text-white placeholder:text-white/60"
                        />
                        ))}
                  </div>
                )}

            </motion.div>
        </AnimatePresence>
      </main>

      <footer className="p-4 bg-black/10 backdrop-blur-sm -mx-4 sm:-mx-6 -mb-4 sm:-mb-6">
        <motion.button
            onClick={nextStep}
            className="w-full bg-white/90 text-primary font-bold py-4 px-4 rounded-xl transition-colors duration-300 shadow-2xl text-lg"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
        >
            {step === steps.length - 1 ? t('checkin_complete') : t('checkin_next')}
        </motion.button>
      </footer>
    </div>
  );
};

export default DailyCheckin;