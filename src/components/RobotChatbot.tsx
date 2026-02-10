import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useContent } from '@/contexts/ContentContext';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const RobotChatbot = () => {
  const { site, sections } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 300, top: 0, bottom: 300 });
  const [actionTimer, setActionTimer] = useState(0);
  const [actionLabel, setActionLabel] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [robotMood, setRobotMood] = useState<'idle' | 'happy' | 'thinking' | 'talking'>('idle');
  type RobotActivity = 'idle' | 'running' | 'dancing' | 'scanning' | 'waving';
  const [robotActivity, setRobotActivity] = useState<RobotActivity>('idle');
  const robotRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages after context is available
  useEffect(() => {
    if (site.siteName && messages.length === 0) {
      setMessages([{
        id: '1',
        type: 'bot',
        text: `Greetings! I'm ARIA - your AI guide. Drag me around or click to chat! I can help you explore ${site.siteName}'s portfolio.`,
        timestamp: new Date(),
      }]);
    }
  }, [site.siteName]);

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

  // Dynamic response builders
  const getSkillsSummary = (): string => {
    const skillsSection = sections.find(s => s.type === 'skills');
    if (!skillsSection?.content?.skills || skillsSection.content.skills.length === 0) {
      return `${site.siteName} is a master of many technical skills! Which area interests you?`;
    }
    const skillsList = skillsSection.content.skills.slice(0, 3).map((s: any) => s.name).join(', ');
    return `${site.siteName} is a master of: ${skillsList}, and more! Which area interests you?`;
  };

  const getProjectsSummary = (): string => {
    const projectsSection = sections.find(s => s.type === 'projects');
    if (!projectsSection?.content?.projects || projectsSection.content.projects.length === 0) {
      return `Check out the Projects section! ${site.siteName} has delivered amazing projects!`;
    }
    const projects = projectsSection.content.projects.slice(0, 2).map((p: any) => p.title).join(', ');
    return `Check out these projects: ${projects}, and more!`;
  };

  const getExperienceSummary = (): string => {
    const expSection = sections.find(s => s.type === 'experience');
    if (!expSection?.content?.experiences || expSection.content.experiences.length === 0) {
      return `${site.siteName} has extensive professional experience!`;
    }
    const firstExp = expSection.content.experiences[0];
    return `${site.siteName} has been a ${firstExp.title} and more! Currently in an amazing role!`;
  };

  const getAboutInfo = (): string => {
    const aboutSection = sections.find(s => s.type === 'about');
    if (!aboutSection?.content?.intro) {
      return `${site.siteName} is a talented professional! Want to know more?`;
    }
    return aboutSection.content.intro;
  };

  const getContactInfo = (): string => {
    const contactSection = sections.find(s => s.type === 'contact');
    const email = contactSection?.content?.email || 'the contact form';
    return `You can reach ${site.siteName} through ${email || 'the contact form'}. Want me to take you there?`;
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello there! Welcome to ${site.siteName}'s cybernetic portfolio! 🚀`;
    }
    if (lowerMessage.includes('skill')) {
      return getSkillsSummary();
    }
    if (lowerMessage.includes('project')) {
      return getProjectsSummary();
    }
    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return getExperienceSummary();
    }
    if (lowerMessage.includes('about') || lowerMessage.includes('who')) {
      return getAboutInfo();
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
      return getContactInfo();
    }
    if (lowerMessage.includes('hey')) {
      return "Hey! Ready to explore some amazing projects?";
    }
    if (lowerMessage.includes('theme')) {
      return "This portfolio uses a cyberpunk theme with neon colors! You can customize it in the admin panel if you have access. 😉";
    }
    if (lowerMessage.includes('admin')) {
      return "The admin panel allows you to customize sections, change colors, and manage content. Need to log in?";
    }
    if (lowerMessage.includes('help')) {
      return `I can help you navigate ${site.siteName}'s portfolio sections. Try asking about: Skills, Projects, Experience, or Contact!`;
    }
    if (lowerMessage.includes('bye')) {
      return "Goodbye! Feel free to drag me around if you need help again! 👋";
    }
    if (lowerMessage.includes('thank')) {
      return "You're welcome! I'm here to help anytime! 🤖";
    }
    return "Interesting! I can help you navigate to different sections. Try asking about: Skills, Projects, Experience, or Contact!";
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
    setRobotMood('thinking');

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: getBotResponse(userMessage.text),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      setRobotMood('happy');
      setTimeout(() => setRobotMood('idle'), 2000);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickReplies = ['Skills', 'Projects', 'Experience', 'Contact'];

  // Action buttons around the robot
  const robotActions = [
    { 
      label: 'Dance', 
      icon: '💃',
      desc: 'Watch me dance!',
      action: () => { 
        setRobotActivity('dancing'); 
        setActionLabel('DANCING');
        setActionTimer(4000);
        setShowActions(false); 
        setTimeout(() => { setRobotActivity('idle'); setActionLabel(''); }, 4000); 
      } 
    },
    { 
      label: 'Run', 
      icon: '🏃',
      desc: 'Watch me run!',
      action: () => { 
        setRobotActivity('running'); 
        setActionLabel('RUNNING');
        setActionTimer(3000);
        setShowActions(false); 
        setTimeout(() => { setRobotActivity('idle'); setActionLabel(''); }, 3000); 
      } 
    },
    { 
      label: 'Scan', 
      icon: '🔍',
      desc: 'Watch me scan!',
      action: () => { 
        setRobotActivity('scanning'); 
        setActionLabel('SCANNING');
        setActionTimer(3000);
        setShowActions(false); 
        setTimeout(() => { setRobotActivity('idle'); setActionLabel(''); }, 3000); 
      } 
    },
    { 
      label: 'Wave', 
      icon: '👋',
      desc: 'Watch me wave!',
      action: () => { 
        setRobotActivity('waving'); 
        setActionLabel('WAVING');
        setActionTimer(2000);
        setShowActions(false); 
        setTimeout(() => { setRobotActivity('idle'); setActionLabel(''); }, 2000); 
      } 
    },
    { 
      label: 'Chat', 
      icon: '💬',
      desc: 'Let\'s chat!',
      action: () => { setIsOpen(true); setShowActions(false); } 
    },
  ];

  // Calculate position for buttons around robot in circular pattern - MUCH FURTHER APART
  const getActionButtonPosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const radius = 130; // Increased from 70 to spread buttons much further
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  // Robot face expressions
  const getRobotFace = () => {
    switch (robotMood) {
      case 'happy':
        return (
          <svg viewBox="0 0 60 40" className="w-full h-full">
            <ellipse cx="15" cy="20" rx="10" ry="12" fill="#00FFFF" />
            <ellipse cx="45" cy="20" rx="10" ry="12" fill="#00FFFF" />
            <path d="M 20 32 Q 30 38 40 32" stroke="#00FFFF" strokeWidth="2" fill="none" />
          </svg>
        );
      case 'thinking':
        return (
          <svg viewBox="0 0 60 40" className="w-full h-full">
            <ellipse cx="15" cy="20" rx="8" ry="10" fill="#BF00FF" />
            <ellipse cx="45" cy="20" rx="8" ry="10" fill="#BF00FF" />
            <circle cx="50" cy="12" r="3" fill="#FFFF00" />
          </svg>
        );
      case 'talking':
        return (
          <svg viewBox="0 0 60 40" className="w-full h-full">
            <ellipse cx="15" cy="20" rx="10" ry="12" fill="#00FFFF" className="animate-pulse" />
            <ellipse cx="45" cy="20" rx="10" ry="12" fill="#00FFFF" className="animate-pulse" />
            <rect x="25" y="30" width="10" height="4" fill="#00FFFF" className="animate-pulse" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 60 40" className="w-full h-full">
            <ellipse cx="15" cy="20" rx="10" ry="12" fill="#00FFFF">
              <animate attributeName="ry" values="12;10;12" dur="3s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="45" cy="20" rx="10" ry="12" fill="#00FFFF">
              <animate attributeName="ry" values="12;10;12" dur="3s" repeatCount="indefinite" />
            </ellipse>
          </svg>
        );
    }
  };

  return createPortal(
    <>
      {/* Action Buttons around Robot - Only show after user clicks */}
      {showActions && robotActions.map((action, index) => {
        const pos = getActionButtonPosition(index, robotActions.length);
        const robotX = position.x + dragOffset.x + 50;
        const robotY = position.y + dragOffset.y + 50;
        const buttonX = robotX + pos.x;
        const buttonY = robotY + pos.y;
        
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
              whileHover={{ scale: 1.25, boxShadow: '0 0 30px rgb(0, 255, 255, 0.9)' }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-cyber-dark to-cyber-dark/50 border-2 border-neon-cyan text-white font-bold text-2xl flex items-center justify-center hover:bg-neon-cyan/20 transition-all shadow-[0_0_20px_rgba(0,255,255,0.6)]"
            >
              {action.icon}
            </motion.button>
          </motion.div>
        );
      })}

      {/* Draggable Robot */}
      <motion.div
        ref={robotRef}
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
          {/* Action Display Indicator - Big text showing what robot is doing */}
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
                  className="text-5xl font-orbitron font-bold text-transparent bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text"
                >
                  {actionLabel}
                </motion.div>
                {actionTimer > 0 && (
                  <motion.div className="mt-2 h-2 w-32 bg-cyber-dark/50 rounded-full border border-neon-cyan/30 overflow-hidden">
                    <motion.div
                      animate={{ width: `${(actionTimer / (robotActivity === 'dancing' ? 4000 : robotActivity === 'running' ? 3000 : robotActivity === 'scanning' ? 3000 : 2000)) * 100}%` }}
                      transition={{ duration: 0.1 }}
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Robot Body - animations depend on activity - MUCH BIGGER */}
          <motion.div
            animate={{
              y: isDragging ? 0 : robotActivity === 'running' ? [0, -15, 0] : robotActivity === 'dancing' ? [0, -12, 0] : [0, -8, 0],
              x: robotActivity === 'dancing' ? [0, 8, -8, 0] : robotActivity === 'scanning' ? [0, 3, -3, 0] : 0,
              rotate: robotActivity === 'dancing' ? [0, -12, 12, 0] : robotActivity === 'scanning' ? [0, 8, -8, 0] : 0,
            }}
            transition={{
              duration: robotActivity === 'running' ? 0.25 : robotActivity === 'dancing' ? 0.6 : 2,
              repeat: Infinity,
              ease: robotActivity === 'running' ? 'linear' : 'easeInOut',
            }}
            className="w-32 h-44 relative"
          >
            {/* Head - Bigger */}
            <motion.div
              animate={
                robotActivity === 'scanning'
                  ? { rotate: [0, 20, -20, 0] }
                  : robotActivity === 'waving'
                  ? { y: [0, -4, 0] }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-20 rounded-2xl bg-gradient-to-b from-slate-700 to-slate-800 border-3 border-neon-cyan shadow-[0_0_30px_rgba(0,255,255,0.6)] overflow-hidden"
            >
              {/* Antenna - more active when scanning - BIGGER */}
              <motion.div
                animate={{
                  rotate: robotActivity === 'scanning' ? [0, 35, -35, 0] : [0, 15, -15, 0],
                  scaleY: robotActivity === 'scanning' ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: robotActivity === 'scanning' ? 1.5 : 4, repeat: Infinity }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-neon-cyan origin-bottom"
              >
                <motion.div
                  animate={{ opacity: robotActivity === 'scanning' ? [1, 0.3, 1] : [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute -top-2 -left-1.5 w-4 h-4 rounded-full bg-neon-cyan"
                />
              </motion.div>
              {/* Face */}
              <div className="absolute inset-1.5 rounded-lg bg-slate-900 flex items-center justify-center">
                {getRobotFace()}
              </div>
            </motion.div>

            {/* Body - Bigger */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-16 h-14 rounded-lg bg-gradient-to-b from-slate-600 to-slate-700 border-2 border-neon-cyan/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              {/* Chest Light - blinks faster when running/scanning - BIGGER */}
              <motion.div
                animate={{
                  opacity: robotActivity === 'running' || robotActivity === 'scanning' ? [0.2, 1, 0.2] : [0.4, 1, 0.4],
                  scale: robotActivity === 'scanning' ? [1, 1.2, 1] : robotActivity === 'running' ? [0.9, 1.1, 0.9] : 1,
                }}
                transition={{
                  duration: robotActivity === 'running' ? 0.15 : robotActivity === 'scanning' ? 0.4 : 2,
                  repeat: Infinity,
                }}
                className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-neon-cyan/40 border-2 border-neon-cyan shadow-[0_0_15px_rgba(0,255,255,0.6)]"
              >
                <motion.div 
                  animate={{ scale: [0.8, 1, 0.8] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="absolute inset-2 rounded-full bg-neon-cyan" 
                />
              </motion.div>
            </div>

            {/* Arms - different poses per activity - BIGGER and MORE EXAGGERATED */}
            <motion.div
              animate={{
                rotate:
                  isDragging ? [-25, 25] :
                  robotActivity === 'waving' ? [15, -85, 15] :
                  robotActivity === 'dancing' ? [-40, 40] :
                  robotActivity === 'running' ? [-35, 35] :
                  [-12, 12],
              }}
              transition={{
                duration: robotActivity === 'waving' ? 0.5 : robotActivity === 'running' ? 0.15 : 1,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute top-16 -left-3 w-4 h-10 rounded-full bg-slate-600 border-2 border-neon-cyan/40 origin-top shadow-[0_0_10px_rgba(0,255,255,0.3)]"
            />
            <motion.div
              animate={{
                rotate:
                  isDragging ? [20, -20] :
                  robotActivity === 'dancing' ? [40, -40] :
                  robotActivity === 'running' ? [35, -35] :
                  [12, -12],
              }}
              transition={{
                duration: robotActivity === 'running' ? 0.15 : 1,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute top-16 -right-3 w-4 h-10 rounded-full bg-slate-600 border-2 border-neon-cyan/40 origin-top shadow-[0_0_10px_rgba(0,255,255,0.3)]"
            />

            {/* Legs - running / walking / idle - BIGGER */}
            <motion.div
              animate={{
                rotate: robotActivity === 'running' ? [-45, 45] : robotActivity === 'dancing' ? [-20, 20] : [-8, 8],
              }}
              transition={{
                duration: robotActivity === 'running' ? 0.15 : robotActivity === 'dancing' ? 0.4 : 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute top-32 -left-1.5 w-4 h-7 rounded-full bg-slate-600 border-2 border-neon-cyan/40 origin-top shadow-[0_0_10px_rgba(0,255,255,0.2)]"
            />
            <motion.div
              animate={{
                rotate: robotActivity === 'running' ? [45, -45] : robotActivity === 'dancing' ? [20, -20] : [8, -8],
              }}
              transition={{
                duration: robotActivity === 'running' ? 0.15 : robotActivity === 'dancing' ? 0.4 : 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute top-32 -right-1.5 w-4 h-7 rounded-full bg-slate-600 border-2 border-neon-cyan/40 origin-top shadow-[0_0_10px_rgba(0,255,255,0.2)]"
            />
          </motion.div>

          {/* Speech Bubble (when not open) - changes with activity */}
          {!isOpen && !showActions && (
            <motion.div
              key={robotActivity}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-2 -right-28 bg-neon-cyan text-cyber-dark px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap"
            >
              {robotActivity === 'running' && '🏃 Beep boop, running!'}
              {robotActivity === 'dancing' && '💃 *dancing*'}
              {robotActivity === 'scanning' && '🔍 Scanning...'}
              {robotActivity === 'waving' && '👋 Hi there!'}
              {robotActivity === 'idle' && 'Click me!'}
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-neon-cyan rotate-45" />
            </motion.div>
          )}
          {/* Action hint when actions are shown */}
          {showActions && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-2 -right-40 bg-neon-purple text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap"
            >
              Choose action!
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-neon-purple rotate-45" />
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
            className="fixed bottom-28 right-6 z-[9999] w-[360px] sm:w-[380px] max-w-[calc(100vw-48px)] ml-4 mr-4 sm:mr-0"
          >
            <div className="glass-panel rounded-2xl overflow-hidden border border-neon-cyan/50 shadow-glow-cyan">
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 border-b border-neon-cyan/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                      <Bot className="w-5 h-5 text-cyber-dark" />
                    </div>
                    <div>
                      <h4 className="font-orbitron font-bold text-neon-cyan">ARIA</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-neon-yellow" />
                        AI Assistant
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'bot' 
                        ? 'bg-neon-purple/30 border border-neon-purple' 
                        : 'bg-neon-cyan/30 border border-neon-cyan'
                    }`}>
                      {message.type === 'bot' ? (
                        <Bot className="w-4 h-4 text-neon-purple" />
                      ) : (
                        <User className="w-4 h-4 text-neon-cyan" />
                      )}
                    </div>
                    <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                      message.type === 'bot'
                        ? 'bg-neon-purple/10 border border-neon-purple/30 text-foreground rounded-tl-none'
                        : 'bg-neon-cyan/10 border border-neon-cyan/30 text-foreground rounded-tr-none'
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
                    <div className="w-8 h-8 rounded-full bg-neon-purple/30 border border-neon-purple flex items-center justify-center">
                      <Bot className="w-4 h-4 text-neon-purple" />
                    </div>
                    <div className="p-3 rounded-2xl bg-neon-purple/10 border border-neon-purple/30 rounded-tl-none">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="w-2 h-2 bg-neon-purple rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                          className="w-2 h-2 bg-neon-purple rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-neon-purple rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Animation Tags */}
              <div className="px-4 pb-4">
                <p className="text-xs font-mono text-muted-foreground mb-2">QUICK_REPLIES</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => {
                        setInputValue(reply);
                        setTimeout(handleSend, 100);
                      }}
                      className="px-3 py-1 text-xs rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/20 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-neon-cyan/30">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-cyber-dark/50 border-neon-cyan/30 text-foreground placeholder:text-muted-foreground focus:border-neon-cyan focus:ring-neon-cyan/20"
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-neon-cyan text-cyber-dark hover:bg-neon-cyan/80 px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
};

export default RobotChatbot;
