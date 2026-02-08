import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const PuppyChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 300, top: 0, bottom: 300 });
  const [actionTimer, setActionTimer] = useState(0);
  const [actionLabel, setActionLabel] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Woof! 🐶 I'm Max, your puppy guide! Drag me around or click to chat! I can help you explore Alex's portfolio.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [puppyMood, setPuppyMood] = useState<'idle' | 'happy' | 'thinking' | 'barking'>('idle');
  type PuppyActivity = 'idle' | 'running' | 'playing' | 'fetching' | 'wagging' | 'sleeping';
  const [puppyActivity, setPuppyActivity] = useState<PuppyActivity>('idle');
  const puppyRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePositionAndBounds = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 300;
      const h = typeof window !== 'undefined' ? window.innerHeight : 300;
      setPosition({ x: 20, y: Math.max(0, h - 200) });
      setDragBounds({ left: 0, right: Math.max(0, w - 100), top: 0, bottom: Math.max(0, h - 100) });
    };
    updatePositionAndBounds();
    window.addEventListener('resize', updatePositionAndBounds);
    return () => window.removeEventListener('resize', updatePositionAndBounds);
  }, []);

  // Action timer countdown
  useEffect(() => {
    if (actionTimer <= 0) return;
    const interval = setInterval(() => {
      setActionTimer(t => t - 100);
    }, 100);
    return () => clearInterval(interval);
  }, [actionTimer]);

  const botResponses: Record<string, string> = {
    'hello': "Woof! Hello there! Welcome to Alex's portfolio! 🐕",
    'hi': "Hi! I'm Max, your puppy assistant. How can I help you today? *wags tail*",
    'hey': "Hey! Ready to explore some amazing projects?",
    'skills': "Bark! Alex is a master of: Data Analytics, Cloud Architecture, AI/ML, and Full-Stack Development! Which area interests you?",
    'projects': "Woof woof! Check out the Projects section! Highlights include: Enterprise Data Platform ($2.4M savings), AI Customer Intelligence (92% accuracy), and Cloud Migration (200+ apps)!",
    'experience': "Alex has 8+ years of experience across TechVision Solutions, DataDriven Consulting, and more! Currently Senior Digital Technology Analyst. *tail wagging intensifies*",
    'contact': "You can reach Alex through the contact form or email at alex.morgan@email.com. Want me to take you there? 📧",
    'about': "Alex Morgan is a Digital Technology Analyst who transforms complex data into actionable insights. 150+ projects, 25M+ data points analyzed! *proud puppy*",
    'theme': "This portfolio uses a cyberpunk theme with neon colors! You can customize it in the admin panel if you have access. 😉",
    'admin': "The admin panel allows you to customize sections, change colors, and manage content. Need to log in?",
    'help': "I can help you navigate to: Home, About, Skills, Projects, Experience, Testimonials, or Contact. Just ask! 🐾",
    'bye': "Goodbye! Feel free to drag me around if you need help again! 👋",
    'thank': "You're welcome! I'm here to help anytime! 🐶",
    'thanks': "You're welcome! Enjoy exploring the portfolio! ✨",
    'default': "Interesting! I can help you navigate to different sections. Try asking about: Skills, Projects, Experience, or Contact!",
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    return botResponses.default;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setPuppyMood('thinking');

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: getBotResponse(userMessage.text),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      setPuppyMood('happy');
      setTimeout(() => setPuppyMood('idle'), 2000);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickReplies = ['Skills', 'Projects', 'Experience', 'Contact'];

  // Action buttons around the puppy
  const puppyActions = [
    { 
      label: 'Fetch', 
      icon: '🎾',
      desc: 'Throw a ball!',
      action: () => { 
        setPuppyActivity('fetching'); 
        setActionLabel('FETCHING');
        setActionTimer(3000);
        setShowActions(false); 
        setTimeout(() => { setPuppyActivity('idle'); setActionLabel(''); }, 3000); 
      } 
    },
    { 
      label: 'Play', 
      icon: '🎮',
      desc: 'Let\'s play!',
      action: () => { 
        setPuppyActivity('playing'); 
        setActionLabel('PLAYING');
        setActionTimer(4000);
        setShowActions(false); 
        setTimeout(() => { setPuppyActivity('idle'); setActionLabel(''); }, 4000); 
      } 
    },
    { 
      label: 'Wag', 
      icon: '📍',
      desc: 'Happy tail wags!',
      action: () => { 
        setPuppyActivity('wagging'); 
        setActionLabel('HAPPY!');
        setActionTimer(3000);
        setShowActions(false); 
        setTimeout(() => { setPuppyActivity('idle'); setActionLabel(''); }, 3000); 
      } 
    },
    { 
      label: 'Sleep', 
      icon: '😴',
      desc: 'Sleepy puppy!',
      action: () => { 
        setPuppyActivity('sleeping'); 
        setActionLabel('ZZZ');
        setActionTimer(3000);
        setShowActions(false); 
        setTimeout(() => { setPuppyActivity('idle'); setActionLabel(''); }, 3000); 
      } 
    },
    { 
      label: 'Chat', 
      icon: '💬',
      desc: 'Let\'s talk!',
      action: () => { setIsOpen(true); setShowActions(false); } 
    },
  ];

  // Calculate position for buttons around puppy in circular pattern
  const getActionButtonPosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const radius = 130;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  // Puppy face expressions
  const getPuppyFace = () => {
    switch (puppyMood) {
      case 'happy':
        return (
          <svg viewBox="0 0 60 40" className="w-full h-full">
            <ellipse cx="15" cy="20" rx="8" ry="10" fill="#8B4513" />
            <ellipse cx="45" cy="20" rx="8" ry="10" fill="#8B4513" />
            <ellipse cx="15" cy="18" rx="4" ry="4" fill="#000000" />
            <ellipse cx="45" cy="18" rx="4" ry="4" fill="#000000" />
            <circle cx="14" cy="16" r="1.5" fill="#FFFFFF" />
            <circle cx="44" cy="16" r="1.5" fill="#FFFFFF" />
            <ellipse cx="30" cy="32" rx="3" ry="2" fill="#FF69B4" />
            <path d="M 25 32 Q 30 36 35 32" stroke="#8B4513" strokeWidth="1.5" fill="none" />
          </svg>
        );
      case 'thinking':
        return (
          <svg viewBox="0 0 60 40" className="w-full h-full">
            <ellipse cx="15" cy="20" rx="8" ry="10" fill="#8B4513" />
            <ellipse cx="45" cy="20" rx="8" ry="10" fill="#8B4513" />
            <ellipse cx="15" cy="18" rx="4" ry="4" fill="#000000" />
            <ellipse cx="45" cy="18" rx="4" ry="4" fill="#000000" />
            <circle cx="14" cy="16" r="1.5" fill="#FFFFFF" />
            <circle cx="44" cy="16" r="1.5" fill="#FFFFFF" />
            <circle cx="50" cy="12" r="2.5" fill="#FFD700" className="animate-pulse" />
            <ellipse cx="30" cy="32" rx="2" ry="1.5" fill="#000000" />
          </svg>
        );
      case 'barking':
        return (
          <svg viewBox="0 0 60 40" className="w-full h-full">
            <ellipse cx="15" cy="20" rx="9" ry="11" fill="#8B4513" className="animate-pulse" />
            <ellipse cx="45" cy="20" rx="9" ry="11" fill="#8B4513" className="animate-pulse" />
            <ellipse cx="15" cy="18" rx="4" ry="4" fill="#000000" />
            <ellipse cx="45" cy="18" rx="4" ry="4" fill="#000000" />
            <circle cx="14" cy="16" r="1.5" fill="#FFFFFF" />
            <circle cx="44" cy="16" r="1.5" fill="#FFFFFF" />
            <rect x="25" y="30" width="10" height="6" fill="#000000" className="animate-pulse" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 60 40" className="w-full h-full">
            <ellipse cx="15" cy="20" rx="8" ry="10" fill="#8B4513">
              <animate attributeName="ry" values="10;8;10" dur="3s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="45" cy="20" rx="8" ry="10" fill="#8B4513">
              <animate attributeName="ry" values="10;8;10" dur="3s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="15" cy="18" rx="3.5" ry="3.5" fill="#000000" />
            <ellipse cx="45" cy="18" rx="3.5" ry="3.5" fill="#000000" />
            <circle cx="14" cy="17" r="1" fill="#FFFFFF" />
            <circle cx="44" cy="17" r="1" fill="#FFFFFF" />
            <ellipse cx="30" cy="32" rx="1.5" ry="1" fill="#000000" />
          </svg>
        );
    }
  };

  return (
    <>
      {/* Action Buttons around Puppy */}
      {showActions && puppyActions.map((action, index) => {
        const pos = getActionButtonPosition(index, puppyActions.length);
        const puppyX = position.x + dragOffset.x + 50;
        const puppyY = position.y + dragOffset.y + 50;
        const buttonX = puppyX + pos.x;
        const buttonY = puppyY + pos.y;
        
        return (
          <motion.div
            key={action.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="fixed z-[9998] pointer-events-auto"
            style={{
              left: `${buttonX}px`,
              top: `${buttonY}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.button
              onClick={action.action}
              title={action.desc}
              whileHover={{ scale: 1.25, boxShadow: '0 0 30px rgba(255, 200, 100, 0.9)' }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-700 to-amber-800 border-2 border-yellow-400 text-white font-bold text-2xl flex items-center justify-center hover:bg-yellow-600/20 transition-all shadow-[0_0_20px_rgba(255,200,100,0.6)]"
            >
              {action.icon}
            </motion.button>
          </motion.div>
        );
      })}

      {/* Draggable Puppy */}
      <motion.div
        ref={puppyRef}
        drag={!isOpen}
        dragMomentum={false}
        dragConstraints={dragBounds}
        onDragStart={() => setIsDragging(true)}
        onDrag={(_, info) => {
          setDragOffset({ x: info.offset.x, y: info.offset.y });
        }}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          setPosition(prev => ({
            x: prev.x + info.offset.x,
            y: prev.y + info.offset.y
          }));
          setDragOffset({ x: 0, y: 0 });
        }}
        onClick={() => {
          if (!isDragging && !isOpen) {
            setShowActions(true);
          }
        }}
        initial={{ x: position.x, y: position.y }}
        animate={{
          scale: isDragging ? 1.1 : 1,
          rotate: isDragging ? [0, -5, 5, 0] : 0,
        }}
        whileHover={{ scale: 1.05 }}
        className="fixed z-[9999] cursor-grab active:cursor-grabbing"
        style={{ left: 0, top: 0, touchAction: 'none' }}
      >
        <div className="relative">
          {/* Action Display Indicator */}
          {actionLabel && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-4xl font-bold"
                >
                  {actionLabel}
                </motion.div>
                {actionTimer > 0 && (
                  <motion.div className="mt-2 h-2 w-32 bg-slate-400/30 rounded-full border border-yellow-400/30 overflow-hidden">
                    <motion.div
                      animate={{ width: `${(actionTimer / 4000) * 100}%` }}
                      transition={{ duration: 0.1 }}
                      className="h-full bg-gradient-to-r from-yellow-400 to-amber-500"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Puppy Body */}
          <motion.div
            animate={{
              y: isDragging ? 0 : puppyActivity === 'running' ? [0, -15, 0] : puppyActivity === 'playing' ? [0, -12, 0] : [0, -5, 0],
              x: puppyActivity === 'playing' ? [0, 8, -8, 0] : puppyActivity === 'fetching' ? [0, 3, -3, 0] : 0,
              rotate: puppyActivity === 'playing' ? [0, -12, 12, 0] : puppyActivity === 'fetching' ? [0, 6, -6, 0] : 0,
            }}
            transition={{
              duration: puppyActivity === 'running' ? 0.25 : puppyActivity === 'playing' ? 0.6 : 2,
              repeat: Infinity,
              ease: puppyActivity === 'running' ? 'linear' : 'easeInOut',
            }}
            className="w-32 h-44 relative"
          >
            {/* Head with ears */}
            <motion.div
              animate={
                puppyActivity === 'fetching'
                  ? { rotate: [0, 20, -20, 0] }
                  : puppyActivity === 'wagging'
                  ? { y: [0, -4, 0] }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-20 rounded-2xl bg-gradient-to-b from-amber-600 to-amber-700 border-3 border-yellow-400 shadow-[0_0_30px_rgba(255,200,100,0.4)] overflow-hidden"
            >
              {/* Left ear */}
              <motion.div
                animate={{
                  rotate: puppyActivity === 'fetching' ? [0, 35, -35, 0] : [0, 15, -15, 0],
                  scaleY: puppyActivity === 'fetching' ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: puppyActivity === 'fetching' ? 1.5 : 4, repeat: Infinity }}
                className="absolute -top-2 left-2 w-4 h-8 bg-amber-700 rounded-full origin-bottom border border-yellow-400"
              />
              
              {/* Right ear */}
              <motion.div
                animate={{
                  rotate: puppyActivity === 'fetching' ? [0, -35, 35, 0] : [0, -15, 15, 0],
                  scaleY: puppyActivity === 'fetching' ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: puppyActivity === 'fetching' ? 1.5 : 4, repeat: Infinity }}
                className="absolute -top-2 right-2 w-4 h-8 bg-amber-700 rounded-full origin-bottom border border-yellow-400"
              />

              {/* Face */}
              <div className="absolute inset-1.5 rounded-lg bg-amber-800 flex items-center justify-center">
                {getPuppyFace()}
              </div>
            </motion.div>

            {/* Body */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-16 h-14 rounded-lg bg-gradient-to-b from-amber-600 to-amber-700 border-2 border-yellow-400/50 shadow-[0_0_15px_rgba(255,200,100,0.3)]">
              {/* Heart - puppy love indicator */}
              <motion.div
                animate={{
                  opacity: puppyActivity === 'playing' ? [0.2, 1, 0.2] : [0.4, 1, 0.4],
                  scale: puppyActivity === 'wagging' ? [1, 1.2, 1] : puppyActivity === 'fetching' ? [0.9, 1.1, 0.9] : 1,
                }}
                transition={{
                  duration: puppyActivity === 'playing' ? 0.15 : puppyActivity === 'wagging' ? 0.4 : 2,
                  repeat: Infinity,
                }}
                className="absolute top-3 left-1/2 -translate-x-1/2 w-6 h-6 text-red-400 flex items-center justify-center"
              >
                ❤️
              </motion.div>
            </div>

            {/* Front legs */}
            <motion.div
              animate={{
                rotate: puppyActivity === 'running' ? [-45, 45] : puppyActivity === 'playing' ? [-20, 20] : [-8, 8],
              }}
              transition={{
                duration: puppyActivity === 'running' ? 0.15 : puppyActivity === 'playing' ? 0.4 : 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute top-32 -left-2 w-3 h-8 rounded-full bg-amber-600 border border-yellow-400/40 origin-top shadow-[0_0_10px_rgba(255,200,100,0.2)]"
            />
            <motion.div
              animate={{
                rotate: puppyActivity === 'running' ? [45, -45] : puppyActivity === 'playing' ? [20, -20] : [8, -8],
              }}
              transition={{
                duration: puppyActivity === 'running' ? 0.15 : puppyActivity === 'playing' ? 0.4 : 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute top-32 -right-2 w-3 h-8 rounded-full bg-amber-600 border border-yellow-400/40 origin-top shadow-[0_0_10px_rgba(255,200,100,0.2)]"
            />

            {/* Tail - biggest difference from robot */}
            <motion.div
              animate={{
                rotate: puppyActivity === 'wagging' ? [-45, 45] : puppyActivity === 'playing' ? [-30, 30] : 
                        puppyActivity === 'sleeping' ? 0 : [-15, 15],
                opacity: puppyActivity === 'sleeping' ? 0.5 : 1,
              }}
              transition={{
                duration: puppyActivity === 'wagging' ? 0.3 : puppyActivity === 'playing' ? 0.4 : 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute bottom-2 -right-4 w-4 h-10 bg-amber-600 rounded-full origin-top border border-yellow-400/30 shadow-[0_0_15px_rgba(255,200,100,0.3)]"
            />
          </motion.div>

          {/* Speech Bubble */}
          {!isOpen && !showActions && (
            <motion.div
              key={puppyActivity}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-2 -right-28 bg-yellow-400 text-amber-900 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap"
            >
              {puppyActivity === 'running' && '🏃 Woof woof!'}
              {puppyActivity === 'playing' && '🎮 Playtime!'}
              {puppyActivity === 'fetching' && '🎾 Zoom zoom!'}
              {puppyActivity === 'wagging' && '📍 So happy!'}
              {puppyActivity === 'sleeping' && '😴 Zzz...'}
              {puppyActivity === 'idle' && 'Click me!'}
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-yellow-400 rotate-45" />
            </motion.div>
          )}
          
          {/* Action hint */}
          {showActions && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-2 -right-40 bg-amber-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap"
            >
              Choose action!
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-amber-600 rotate-45" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-6 z-[9999] w-[380px] max-w-[calc(100vw-48px)]"
          >
            <div className="glass-panel rounded-2xl overflow-hidden border border-yellow-400/50 shadow-lg"
              style={{ boxShadow: '0 0 30px rgba(255, 200, 100, 0.3)' }}>
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-amber-600/20 to-yellow-400/20 border-b border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-lg">
                      🐕
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-600">Max</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <span>🐾</span>
                        Puppy Assistant
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[350px] overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: message.type === 'bot' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-lg ${
                      message.type === 'bot' 
                        ? 'bg-amber-600/30 border border-amber-600' 
                        : 'bg-yellow-400/30 border border-yellow-400'
                    }`}>
                      {message.type === 'bot' ? '🐕' : '👤'}
                    </div>
                    <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                      message.type === 'bot'
                        ? 'bg-amber-600/10 border border-amber-600/30 text-foreground rounded-tl-none'
                        : 'bg-yellow-400/10 border border-yellow-400/30 text-foreground rounded-tr-none'
                    }`}>
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-600/30 border border-amber-600 flex items-center justify-center text-lg">
                      🐕
                    </div>
                    <div className="p-3 rounded-2xl bg-amber-600/10 border border-amber-600/30 rounded-tl-none">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="w-2 h-2 bg-amber-600 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                          className="w-2 h-2 bg-amber-600 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-amber-600 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-4 pb-4">
                <p className="text-xs font-mono text-muted-foreground mb-2">QUICK REPLIES</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => {
                        setInputValue(reply);
                        setTimeout(handleSend, 100);
                      }}
                      className="px-3 py-1 text-xs rounded-full bg-amber-600/10 border border-amber-600/30 text-amber-600 hover:bg-amber-600/20 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-yellow-400/30">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-slate-900/50 border-yellow-400/30 text-foreground placeholder:text-muted-foreground focus:border-yellow-400 focus:ring-yellow-400/20"
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-yellow-400 text-amber-900 hover:bg-yellow-300 px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PuppyChatbot;
