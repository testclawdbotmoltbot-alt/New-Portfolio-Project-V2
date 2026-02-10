import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useContent } from '@/contexts/ContentContext';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const AIChatbot = () => {
  const { site, sections, footer } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages after context is available
  useEffect(() => {
    if (site.siteName && messages.length === 0) {
      setMessages([{
        id: '1',
        type: 'bot',
        text: `Greetings! I'm ARIA (Artificial Responsive Intelligence Assistant). I'm here to guide you through ${site.siteName}'s digital universe. What would you like to explore?`,
        timestamp: new Date(),
      }]);
    }
  }, [site.siteName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get skills summary from sections
  const getSkillsSummary = (): string => {
    const skillsSection = sections.find(s => s.type === 'skills');
    if (!skillsSection?.content?.skills || skillsSection.content.skills.length === 0) {
      return `${site.siteName} possesses advanced technical capabilities. Which skill area interests you?`;
    }
    const skillsList = skillsSection.content.skills.slice(0, 4).map((s: any) => s.name).join(', ');
    return `${site.siteName} has expertise in: ${skillsList}, and more. Which area would you like to know more about?`;
  };

  // Get projects summary from sections
  const getProjectsSummary = (): string => {
    const projectsSection = sections.find(s => s.type === 'projects');
    if (!projectsSection?.content?.projects || projectsSection.content.projects.length === 0) {
      return `${site.siteName} has delivered impressive projects. Would you like to explore them?`;
    }
    const projectCount = projectsSection.content.projects.length;
    const projects = projectsSection.content.projects.slice(0, 2).map((p: any) => p.title).join(', ');
    return `${site.siteName} has successfully delivered ${projectCount} projects including: ${projects}, and more. Want details on any specific project?`;
  };

  // Get experience summary from sections
  const getExperienceSummary = (): string => {
    const expSection = sections.find(s => s.type === 'experience');
    if (!expSection?.content?.experiences || expSection.content.experiences.length === 0) {
      return `${site.siteName} has extensive professional experience. Would you like to learn more?`;
    }
    const positions = expSection.content.experiences.slice(0, 2).map((e: any) => `${e.title} at ${e.company}`).join(', ');
    return `${site.siteName} has professional experience including: ${positions}. Interested in more details?`;
  };

  // Get about section info
  const getAboutInfo = (): string => {
    const aboutSection = sections.find(s => s.type === 'about');
    const intro = aboutSection?.content?.intro || `${site.siteName} is a talented professional.`;
    return `${intro} Would you like to know more about specific areas?`;
  };

  // Get contact info
  const getContactInfo = (): string => {
    const contactSection = sections.find(s => s.type === 'contact');
    const email = contactSection?.content?.email || 'the contact form';
    return `You can reach ${site.siteName} through ${email || 'the contact form'}, or connect through the social links. Would you like to open the contact section?`;
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('greetings')) {
      return `Hello! Welcome to ${site.siteName}'s portfolio. I can tell you about skills, projects, experience, or help you contact ${site.siteName}. What interests you?`;
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
    return `Interesting query! I can help you navigate sections like Skills, Projects, Experience, About, or Contact. What would you like to explore?`;
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

    // Simulate bot typing
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: getBotResponse(userMessage.text),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickReplies = ['Skills', 'Projects', 'Experience', 'Contact'];

  return createPortal(
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-neon-pink shadow-glow-pink' 
            : 'bg-gradient-to-r from-neon-cyan to-neon-purple shadow-glow-cyan'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <Bot className="w-7 h-7 text-white" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full"
            />
          </div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] sm:w-[380px] max-w-[calc(100vw-48px)] ml-4 mr-4 sm:mr-0"
          >
            <div className="glass-panel rounded-2xl overflow-hidden border border-neon-cyan/50 shadow-glow-cyan">
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 border-b border-neon-cyan/30">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src="/ai-avatar.png" 
                      alt="ARIA" 
                      className="w-12 h-12 rounded-full object-cover border-2 border-neon-cyan"
                    />
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-neon-green rounded-full border-2 border-cyber-dark"
                    />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-neon-cyan">ARIA</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-neon-yellow" />
                      AI Assistant Online
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[350px] overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: message.type === 'bot' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
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
    </>,
    document.body
  );
};

export default AIChatbot;
