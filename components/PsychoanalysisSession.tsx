

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { getAIMessages } from '../translations';
import { useUserSpecificStorage } from '../hooks/useUserSpecificStorage';
import { useToast } from '../contexts/ToastContext';
import type { SessionSummary } from '../types';

interface PsychoanalysisSessionProps {
  onBack: () => void;
}

type SessionState = 'intro' | 'active';
type Message = {
  sender: 'user' | 'ai';
  text: string;
};
type DialogType = 'exit' | 'timesUp' | null;

const SESSION_DURATION = 40 * 60; // 40 minutes in seconds

const PsychoanalysisSession: React.FC<PsychoanalysisSessionProps> = ({ onBack }) => {
  const [sessionState, setSessionState] = useState<SessionState>('intro');
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<any | null>(null);
  const [dialogType, setDialogType] = useState<DialogType>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const { addToast } = useToast();
  const aiMessages = getAIMessages(language);
  const isMounted = useRef(true);
  
  const [, setSessionSummaries] = useUserSpecificStorage<SessionSummary[]>('psychoanalysisSummaries', []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const generateAndSaveSummary = useCallback(async (finalMessages: Message[]) => {
    if (finalMessages.length < 2) return; // Don't summarize very short/empty sessions

    const transcript = finalMessages
      .map(m => `${m.sender === 'user' ? 'User' : 'AI'}: ${m.text}`)
      .join('\n');
    
    try {
      const { getAIPoweredSessionSummary } = await import('../services/geminiService');
      const summaryData = await getAIPoweredSessionSummary(transcript, language);

      if (summaryData) {
        const newSummary: SessionSummary = {
          id: Date.now(),
          date: new Date().toISOString(),
          title: summaryData.title,
          summary: summaryData.summary,
        };
        setSessionSummaries(prev => [newSummary, ...prev]);
      }
    } catch (error) {
      // Catch errors from the service call, but don't show a toast for this background task.
      console.error("Failed to generate and save session summary:", error);
    }
  }, [language, setSessionSummaries]);

  const handleEndSession = useCallback(() => {
    generateAndSaveSummary(messages); // Fire-and-forget
    onBack();
  }, [messages, generateAndSaveSummary, onBack]);


  useEffect(() => {
    if (sessionState !== 'active' || dialogType) return;

    if (timeLeft <= 0) {
      if (isMounted.current) {
        setDialogType('timesUp');
      }
      return;
    }

    const timer = setInterval(() => {
      if (isMounted.current) {
        setTimeLeft(t => t - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, sessionState, dialogType]);

  const startSession = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const { GoogleGenAI } = await import('@google/genai');
      if (!process.env.API_KEY) {
          throw new Error("API key not configured");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const newChat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction: aiMessages.psychoanalystSystemInstruction },
      });
      if (!isMounted.current) return;
      setChat(newChat);
      setMessages([{ sender: 'ai', text: '' }]);
      
      const response = await newChat.sendMessageStream({ message: aiMessages.psychoanalystStartPrompt });
      
      let fullText = '';
      for await (const chunk of response) {
        if (!isMounted.current) return;
        fullText += chunk.text;
        setMessages([{ sender: 'ai', text: fullText }]);
      }
      if (isMounted.current) {
        setSessionState('active');
      }
    } catch (error) {
        console.error("Failed to start psychoanalysis session:", error);
        const errorMessage = error instanceof Error ? error.message.toLowerCase() : '';
        if (errorMessage.includes('api key')) {
            addToast(t('error_api_invalid_key'), 'error');
        } else {
            addToast(t('error_api_generic'), 'error');
        }
        onBack(); // Go back to dashboard on failure
    } finally {
        if (isMounted.current) {
            setIsLoading(false);
        }
    }
  }, [aiMessages, language, addToast, t, onBack]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chat) return;

    const userMessageText = userInput;
    setUserInput('');
    
    setMessages(prev => [
        ...prev, 
        { sender: 'user', text: userMessageText },
        { sender: 'ai', text: '' }
    ]);
    
    setIsLoading(true);

    try {
        const responseStream = await chat.sendMessageStream({ message: userMessageText });
        
        for await (const chunk of responseStream) {
            if (!isMounted.current) return;
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text += chunk.text;
                return newMessages;
            });
        }
    } catch (error) {
        console.error("Error sending message:", error);
        addToast(t('error_api_generic'), 'error');
        if (isMounted.current) {
            setMessages(prev => prev.slice(0, -1)); // Remove the empty AI message bubble
        }
    } finally {
        if (isMounted.current) {
            setIsLoading(false);
        }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderContent = () => {
    switch (sessionState) {
      case 'intro':
        return (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-white w-full">
             <motion.button onClick={onBack} className="absolute top-4 left-4 p-2 rounded-full text-white hover:bg-white/20 transition-colors z-10" whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                <i className="ph-bold ph-x text-xl"></i>
            </motion.button>
            <i className="ph-fill ph-brain text-7xl mb-6"></i>
            <h1 className="text-3xl font-bold mb-4">{t('psycho_title')}</h1>
            <p className="max-w-md mx-auto mb-8 opacity-90 px-4">{t('psycho_intro')}</p>
            <motion.button 
                onClick={startSession}
                disabled={isLoading}
                className="bg-white/90 text-primary font-bold py-3 px-10 rounded-full hover:bg-white transition-colors duration-300 shadow-2xl"
                whileHover={!isLoading ? { scale: 1.05, y: -2 } : {}} whileTap={!isLoading ? { scale: 0.95 } : {}}>
              {isLoading ? t('psycho_loading') : t('psycho_begin')}
            </motion.button>
          </motion.div>
        );
      case 'active':
        return (
          <div key="active" className="h-full flex flex-col">
            <header className="flex items-center justify-between p-4 bg-dark-bg/50 backdrop-blur-sm z-10 text-white">
              <motion.button onClick={() => setDialogType('exit')} className="p-2 rounded-full hover:bg-white/20 transition-colors" whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                <i className="ph-bold ph-x text-xl"></i>
              </motion.button>
              <div className="font-mono text-xl font-bold tracking-wider">{formatTime(timeLeft)}</div>
              <div className="w-8"></div>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`max-w-sm md:max-w-md px-4 py-2.5 rounded-2xl whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-lg' : 'bg-dark-card text-white rounded-bl-lg'}`}>
                    {msg.text}
                    {isLoading && msg.sender === 'ai' && index === messages.length - 1 && <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse rounded-sm" />}
                  </motion.div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 bg-dark-bg/50 backdrop-blur-sm z-10">
              <div className="flex items-center space-x-2">
                <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)}
                  placeholder={t('psycho_placeholder')}
                  className="flex-1 w-full bg-dark-card text-white placeholder-text-muted border-white/20 border rounded-full py-3 px-5 focus:ring-primary focus:border-primary focus:ring-2 transition-all"/>
                <motion.button type="submit" disabled={!userInput.trim() || isLoading}
                  className="bg-primary text-white rounded-full p-3.5 flex items-center justify-center hover:opacity-90 transition-colors shadow-lg disabled:opacity-50"
                  whileHover={!(!userInput.trim() || isLoading) ? { scale: 1.1, y: -2 } : {}}
                  whileTap={!(!userInput.trim() || isLoading) ? { scale: 0.9 } : {}}>
                  <i className="ph-fill ph-paper-plane-tilt text-2xl"></i>
                </motion.button>
              </div>
            </form>
          </div>
        );
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col justify-center calm-gradient"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
      
      <AnimatePresence>
        {dialogType && (
          <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
          >
              <motion.div
                  className="bg-dark-card rounded-2xl shadow-xl p-6 sm:p-8 max-w-sm w-full text-center text-white"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                  {dialogType === 'exit' && (
                    <>
                      <i className="ph-fill ph-warning-circle text-5xl text-accent-pink mb-4"></i>
                      <h2 className="text-2xl font-bold mb-3">
                          {t('psycho_exit_confirm_title')}
                      </h2>
                      <p className="text-white/80 mb-6">
                          {t('psycho_exit_confirm_body')}
                      </p>
                      <div className="flex gap-4">
                          <motion.button
                              onClick={() => setDialogType(null)}
                              className="flex-1 bg-white/20 font-bold py-3 px-4 rounded-xl transition-colors duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                          >
                              {t('psycho_exit_confirm_cancel')}
                          </motion.button>
                            <motion.button
                              onClick={handleEndSession}
                              className="flex-1 bg-accent-pink text-white font-bold py-3 px-4 rounded-xl transition-colors duration-300 shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                          >
                              {t('psycho_exit_confirm_confirm')}
                          </motion.button>
                      </div>
                    </>
                  )}
                  {dialogType === 'timesUp' && (
                     <motion.div>
                        <i className="ph-fill ph-timer text-5xl text-primary mb-4"></i>
                        <h2 className="text-2xl font-bold mb-3">
                            {t('psycho_times_up_title')}
                        </h2>
                        <p className="text-white/80 mb-6">
                            {t('psycho_times_up_body')}
                        </p>
                        <motion.button
                            onClick={handleEndSession}
                            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl transition-colors duration-300 shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {t('psycho_times_up_confirm')}
                        </motion.button>
                    </motion.div>
                  )}
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PsychoanalysisSession;