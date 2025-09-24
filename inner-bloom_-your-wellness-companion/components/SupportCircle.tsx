

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { getSupportMessages } from '../constants';
import type { SupportMessage, Reaction } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface SupportCircleProps {
  onBack: () => void;
}

type SupportRoom = 'Anxiety' | 'Stress' | 'General';

const EMPATHY_REACTIONS = ['🤗', '🙏', '❤️', '✨'];

const MessageBubble: React.FC<{ 
    message: SupportMessage; 
    onReact: (messageId: string, emoji: string) => void;
    onReward: (messageId: string) => void;
}> = ({ message, onReact, onReward }) => {
  const isSelf = message.sender === 'self';
  const [showReactions, setShowReactions] = useState(false);
  const { t } = useLanguage();

  const bubbleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: { opacity: 0, scale: 0.5 }
  };
  
  const reactionButtonVariants = {
      hover: { scale: 1.3, rotate: [0, -15, 15, -15, 0] },
      tap: { scale: 0.9 }
  }

  return (
    <motion.div
        layout
        variants={bubbleVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`flex items-end gap-2 group ${isSelf ? 'justify-end' : 'justify-start'}`}
    >
      {!isSelf && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center opacity-80">
          <i className="ph-fill ph-user text-white"></i>
        </div>
      )}
      <div className="relative">
        <motion.div 
          className={`max-w-xs md:max-w-md px-4 py-3 rounded-3xl shadow-lg ${isSelf ? 'bg-indigo-600 text-white rounded-br-lg' : 'bg-dark-card text-white rounded-bl-lg'}`}
          whileHover={{ y: -2 }}
          onClick={() => !isSelf && setShowReactions(prev => !prev)}
          role="button"
          tabIndex={isSelf ? -1 : 0}
          aria-haspopup="true"
          aria-expanded={showReactions}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
          <p className={`text-xs mt-2 opacity-70 ${isSelf ? 'text-right' : 'text-left'}`}>{message.timestamp}</p>
          
          <AnimatePresence>
          {showReactions && (
            <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                className="absolute -top-10 left-0 bg-dark-card/80 backdrop-blur-lg border border-white/10 rounded-full shadow-xl flex space-x-1 p-1"
                onClick={(e) => e.stopPropagation()} // Prevent bubble click from closing palette
            >
              {EMPATHY_REACTIONS.map(emoji => (
                <motion.button key={emoji} onClick={() => onReact(message.id, emoji)} className="text-2xl p-1" variants={reactionButtonVariants} whileHover="hover" whileTap="tap">
                  {emoji}
                </motion.button>
              ))}
            </motion.div>
          )}
          </AnimatePresence>
        </motion.div>

        {message.reactions.length > 0 && (
            <div className={`flex space-x-1 mt-1.5 ${isSelf ? 'justify-end' : 'justify-start pl-2'}`}>
                {message.reactions.map(r => (
                     <motion.div 
                        key={r.emoji} 
                        className="bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs flex items-center space-x-1 text-white"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span>{r.emoji}</span>
                        <span className="font-semibold">{r.count}</span>
                    </motion.div>
                ))}
            </div>
        )}
      </div>
      {!isSelf && (
         <motion.button 
            onClick={() => onReward(message.id)} 
            className={`p-1.5 rounded-full transition-all duration-300 ${message.isRewarded ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
            title={message.isRewarded ? t('support_rewarded_tooltip') : t('support_reward_tooltip')}
            disabled={message.isRewarded}
            variants={reactionButtonVariants}
            whileHover="hover"
            whileTap="tap"
            style={{ opacity: message.isRewarded ? 1 : 0 }}
            animate={{ opacity: showReactions || message.isRewarded ? 1 : 0 }}
          >
            <i className={`ph-fill ph-star text-lg ${message.isRewarded ? 'animate-pulse' : ''}`}></i>
         </motion.button>
      )}
    </motion.div>
  );
};

const SupportCircle: React.FC<SupportCircleProps> = ({ onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [activeRoom, setActiveRoom] = useState<SupportRoom>('Anxiety');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<SupportMessage[]>(() => getSupportMessages(language));

  useEffect(() => {
    setMessages(getSupportMessages(language));
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg: SupportMessage = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'self',
      reactions: [],
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(prevMessages => prevMessages.map(msg => {
        if (msg.id === messageId) {
            const newReactions = [...msg.reactions];
            const existingReaction = newReactions.find(r => r.emoji === emoji);
            if(existingReaction) {
                existingReaction.count++;
            } else {
                newReactions.push({ emoji, count: 1 });
            }
            return { ...msg, reactions: newReactions };
        }
        return msg;
    }));
  };

  const handleReward = (messageId: string) => {
     setMessages(prevMessages => prevMessages.map(msg => 
        msg.id === messageId ? { ...msg, isRewarded: true } : msg
    ));
  }

  return (
    <motion.div 
        className="fixed inset-0 flex flex-col calm-gradient text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
      <header className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm z-10">
        <motion.button onClick={onBack} className="p-2 rounded-full text-white hover:bg-white/20 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <i className="ph-bold ph-arrow-left text-xl"></i>
        </motion.button>
        <h1 className="text-xl font-bold text-white">{t('support_title')}</h1>
        <div className="w-8"></div>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <AnimatePresence>
            {messages.map(msg => (
              <MessageBubble key={msg.id} message={msg} onReact={handleReaction} onReward={handleReward} />
            ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <motion.form 
        onSubmit={handleSendMessage} 
        className="p-4 bg-black/20 backdrop-blur-sm z-10"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30}}
      >
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t('support_placeholder')}
            className="flex-1 w-full bg-dark-card text-white placeholder-text-muted border-white/20 border rounded-full py-3 px-5 focus:ring-primary focus:border-primary focus:ring-2 transition-all"
          />
          <motion.button 
            type="submit" 
            className="bg-primary text-white rounded-full p-3.5 flex items-center justify-center hover:opacity-90 transition-colors shadow-lg disabled:opacity-50" 
            disabled={!newMessage.trim()}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="ph-fill ph-paper-plane-tilt text-2xl"></i>
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default SupportCircle;