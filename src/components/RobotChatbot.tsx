import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const RobotChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 300, top: 0, bottom: 300 });
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Greetings! I'm ARIA - your AI guide. Drag me around or click to chat! I can help you explore Alex's portfolio.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [robotMood, setRobotMood] = useState<'idle' | 'happy' | 'thinking' | 'talking'>('idle');
  type RobotActivity = 'idle' | 'running' | 'dancing' | 'scanning' | 'waving';
  const [robotActivity, setRobotActivity] = useState<RobotActivity>('idle');
  const robotRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePositionAndBounds = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 300;
      const h = typeof window !== 'undefined' ? window.innerHeight : 300;
      setPosition({ x: Math.max(0, w - 120), y: Math.max(0, h - 150) });
      setDragBounds({ left: 0, right: Math.max(0, w - 100), top: 0, bottom: Math.max(0, h - 100) });
      setMounted(true);
    };
    updatePositionAndBounds();
    window.addEventListener('resize', updatePositionAndBounds);
    return () => window.removeEventListener('resize', updatePositionAndBounds);
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cycle through robot activities when idle (running, dancing, scanning, waving)
  useEffect(() => {
    if (isDragging || isOpen) {
      setRobotActivity('idle');
      return;
    }
    const activities: RobotActivity[] = ['idle', 'running', 'dancing', 'scanning', 'waving'];
    let index = 0;
    const interval = setInterval(() => {
      if (isDragging || isOpen) return;
      index = (index + 1) % activities.length;
      setRobotActivity(activities[index]);
    }, 6000);
    return () => clearInterval(interval);
  }, [isDragging, isOpen]);

  // Reset mood to idle when not typing
  useEffect(() => {
    const t = setInterval(() => {
      if (!isDragging && !isOpen) setRobotMood('idle');
    }, 3000);
    return () => clearInterval(t);
  }, [isDragging, isOpen]);

  const botResponses: Record<string, string> = {
    'hello': "Hello there! Welcome to Alex's cybernetic portfolio! 🚀",
    'hi': "Greetings! I'm ARIA, your AI assistant. How can I help you today?",
    'hey': "Hey! Ready to explore some amazing projects?",
    'skills': "Alex is a master of: Data Analytics, Cloud Architecture, AI/ML, and Full-Stack Development! Which area interests you?",
    'projects': "Check out the Projects section! Highlights include: Enterprise Data Platform ($2.4M savings), AI Customer Intelligence (92% accuracy), and Cloud Migration (200+ apps)!",
    'experience': "Alex has 8+ years of experience across TechVision Solutions, DataDriven Consulting, and more! Currently Senior Digital Technology Analyst.",
    'contact': "You can reach Alex through the contact form or email at alex.morgan@email.com. Want me to take you there?",
    'about': "Alex Morgan is a Digital Technology Analyst who transforms complex data into actionable insights. 150+ projects, 25M+ data points analyzed!",
    'theme': "This portfolio uses a cyberpunk theme with neon colors! You can customize it in the admin panel if you have access. 😉",
    'admin': "The admin panel allows you to customize sections, change colors, and manage content. Need to log in?",
    'help': "I can help you navigate to: Home, About, Skills, Projects, Experience, Testimonials, or Contact. Just ask!",
    'bye': "Goodbye! Feel free to drag me around if you need help again! 👋",
    'thank': "You're welcome! I'm here to help anytime! 🤖",
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

  if (!mounted) return null;

  return (
    <>
      {/* Draggable Robot */}
      <motion.div
        ref={robotRef}
        drag={!isOpen}
        dragMomentum={false}
        dragConstraints={dragBounds}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onClick={() => !isDragging && setIsOpen(true)}
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
          {/* Robot Body - animations depend on activity */}
          <motion.div
            animate={{
              y: isDragging ? 0 : robotActivity === 'running' ? [0, -8, 0] : robotActivity === 'dancing' ? [0, -6, 0] : [0, -5, 0],
              x: robotActivity === 'dancing' ? [0, 4, -4, 0] : robotActivity === 'scanning' ? [0, 2, -2, 0] : 0,
              rotate: robotActivity === 'dancing' ? [0, -8, 8, 0] : robotActivity === 'scanning' ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              duration: robotActivity === 'running' ? 0.25 : robotActivity === 'dancing' ? 0.6 : 2,
              repeat: Infinity,
              ease: robotActivity === 'running' ? 'linear' : 'easeInOut',
            }}
            className="w-20 h-28 relative"
          >
            {/* Head */}
            <motion.div
              animate={
                robotActivity === 'scanning'
                  ? { rotate: [0, 15, -15, 0] }
                  : robotActivity === 'waving'
                  ? { y: [0, -2, 0] }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-14 rounded-xl bg-gradient-to-b from-slate-700 to-slate-800 border-2 border-neon-cyan shadow-glow-cyan overflow-hidden"
            >
              {/* Antenna - more active when scanning */}
              <motion.div
                animate={{
                  rotate: robotActivity === 'scanning' ? [0, 25, -25, 0] : [0, 10, -10, 0],
                  scaleY: robotActivity === 'scanning' ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: robotActivity === 'scanning' ? 1.5 : 4, repeat: Infinity }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-4 bg-neon-cyan origin-bottom"
              >
                <motion.div
                  animate={{ opacity: robotActivity === 'scanning' ? [1, 0.4, 1] : [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-neon-cyan"
                />
              </motion.div>
              {/* Face */}
              <div className="absolute inset-1 rounded-lg bg-slate-900 flex items-center justify-center">
                {getRobotFace()}
              </div>
            </motion.div>

            {/* Body */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-12 h-10 rounded-lg bg-gradient-to-b from-slate-600 to-slate-700 border border-neon-cyan/50">
              {/* Chest Light - blinks faster when running/scanning */}
              <motion.div
                animate={{
                  opacity: robotActivity === 'running' || robotActivity === 'scanning' ? [0.3, 1, 0.3] : [0.5, 1, 0.5],
                  scale: robotActivity === 'scanning' ? [1, 1.15, 1] : 1,
                }}
                transition={{
                  duration: robotActivity === 'running' ? 0.2 : robotActivity === 'scanning' ? 0.5 : 2,
                  repeat: Infinity,
                }}
                className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-neon-cyan/30 border border-neon-cyan"
              >
                <div className="absolute inset-1 rounded-full bg-neon-cyan" />
              </motion.div>
            </div>

            {/* Arms - different poses per activity */}
            <motion.div
              animate={{
                rotate:
                  isDragging ? [-20, 20] :
                  robotActivity === 'waving' ? [10, -70, 10] :
                  robotActivity === 'dancing' ? [-30, 30] :
                  robotActivity === 'running' ? [-25, 25] :
                  [-10, 10],
              }}
              transition={{
                duration: robotActivity === 'waving' ? 0.5 : robotActivity === 'running' ? 0.2 : 1,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute top-12 -left-2 w-3 h-8 rounded-full bg-slate-600 border border-neon-cyan/30 origin-top"
            />
            <motion.div
              animate={{
                rotate:
                  isDragging ? [20, -20] :
                  robotActivity === 'dancing' ? [30, -30] :
                  robotActivity === 'running' ? [25, -25] :
                  [10, -10],
              }}
              transition={{
                duration: robotActivity === 'running' ? 0.2 : 1,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute top-12 -right-2 w-3 h-8 rounded-full bg-slate-600 border border-neon-cyan/30 origin-top"
            />

            {/* Legs - running / walking / idle */}
            <motion.div
              animate={{
                rotate: robotActivity === 'running' ? [-35, 35] : robotActivity === 'dancing' ? [-15, 15] : [-5, 5],
              }}
              transition={{
                duration: robotActivity === 'running' ? 0.15 : robotActivity === 'dancing' ? 0.4 : 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute top-[6rem] -left-0.5 w-2.5 h-5 rounded-full bg-slate-600 border border-neon-cyan/30 origin-top"
            />
            <motion.div
              animate={{
                rotate: robotActivity === 'running' ? [35, -35] : robotActivity === 'dancing' ? [15, -15] : [5, -5],
              }}
              transition={{
                duration: robotActivity === 'running' ? 0.15 : robotActivity === 'dancing' ? 0.4 : 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute top-[6rem] -right-0.5 w-2.5 h-5 rounded-full bg-slate-600 border border-neon-cyan/30 origin-top"
            />
          </motion.div>

          {/* Speech Bubble (when not open) - changes with activity */}
          {!isOpen && (
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

              {/* Quick Replies */}
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => {
                        setInputValue(reply);
                        setTimeout(handleSend, 100);
                      }}
                      className="px-3 py-1 text-xs rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
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
    </>
  );
};

export default RobotChatbot;
