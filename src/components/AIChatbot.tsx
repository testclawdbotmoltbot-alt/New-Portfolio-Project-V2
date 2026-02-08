import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Greetings! I'm ARIA (Artificial Responsive Intelligence Assistant). I'm here to guide you through Alex's digital universe. What would you like to explore?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses: Record<string, string> = {
    'hello': "Hello there! Welcome to Alex's cybernetic portfolio. I can tell you about skills, projects, experience, or help you contact Alex. What interests you?",
    'hi': "Greetings, human! ARIA at your service. Ask me about Alex's skills, projects, or anything else!",
    'skills': "Alex possesses advanced capabilities in: Data Analytics (Python, SQL, Tableau), Cloud Architecture (AWS, Azure, GCP), AI/ML (TensorFlow, SageMaker), and Full-Stack Development. Which area interests you?",
    'projects': "Alex has delivered remarkable projects: Enterprise Data Platform ($2.4M savings), AI Customer Insights (92% accuracy), Cloud Migration (200+ apps), and Real-time Analytics Dashboard. Want details on any specific project?",
    'experience': "Alex has 8+ years of digital transformation experience across TechVision Solutions, DataDriven Consulting, Global Retail Corp, and StartUp Innovations. Currently Senior Digital Technology Analyst.",
    'contact': "You can reach Alex through the contact form, email at alex.morgan@email.com, or connect on LinkedIn and GitHub. Would you like me to open the contact section?",
    'about': "Alex Morgan is a Digital & Technology Analyst specializing in transforming complex data into actionable insights. 150+ projects completed, 50+ happy clients, 25M+ data points analyzed.",
    'default': "Interesting query! I can help you navigate to: Skills, Projects, Experience, About, or Contact sections. Just let me know what you'd like to explore!",
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

  return (
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
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)]"
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
    </>
  );
};

export default AIChatbot;
