import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronRight, Cpu, Database, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Section } from '@/contexts/ContentContext';

const Hero = ({ section }: { section: Section }) => {
  const content = section?.content || {};
  const [typedText, setTypedText] = useState('');
  const fullText = (content.title as string) || 'DIGITAL_TECHNOLOGY_ANALYST.exe';
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    setTypedText('');
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setGlitchActive(true), 500);
        setTimeout(() => setGlitchActive(false), 300);
      }
    }, 80);
    return () => clearInterval(timer);
  }, [fullText]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { icon: Cpu, value: '99.9%', label: 'System Uptime' },
    { icon: Database, value: '25M+', label: 'Data Points' },
    { icon: Brain, value: '92%', label: 'AI Accuracy' },
    { icon: Zap, value: '150+', label: 'Projects' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cyberpunk Background */}
      <div className="absolute inset-0">
        <img 
          src="/cyberpunk-bg.jpg" 
          alt="Cyberpunk City" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/80 via-cyber-dark/60 to-cyber-dark" />
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Scan Line Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"
        />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-cyan rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Corner HUD Elements */}
      <div className="absolute top-20 left-4 w-20 h-20 sm:w-32 sm:h-32 border-l-2 border-t-2 border-neon-cyan/50 pointer-events-none" />
      <div className="absolute top-20 right-4 w-20 h-20 sm:w-32 sm:h-32 border-r-2 border-t-2 border-neon-purple/50 pointer-events-none" />
      <div className="absolute bottom-20 left-4 w-20 h-20 sm:w-32 sm:h-32 border-l-2 border-b-2 border-neon-purple/50 pointer-events-none" />
      <div className="absolute bottom-20 right-4 w-20 h-20 sm:w-32 sm:h-32 border-r-2 border-b-2 border-neon-cyan/50 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`grid gap-12 items-center ${content.imageUrl ? 'lg:grid-cols-2' : ''}`}>
          {/* Section Image - if provided */}
          {content.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="rounded-2xl overflow-hidden border-2 border-neon-cyan/30 shadow-glow-cyan order-2 lg:order-1"
            >
              <img src={content.imageUrl} alt="Hero Section" className="w-full h-full object-cover aspect-video" />
            </motion.div>
          )}
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            {/* System Status Badge */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/50 mb-6"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-neon-green rounded-full"
              />
              <span className="text-sm text-neon-cyan font-mono">SYSTEM.ONLINE</span>
            </motion.div>

            {/* Main Title with Glitch Effect */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-4"
            >
              <span className="text-white">{(content.name as string)?.split(' ')[0]?.toUpperCase() || 'ALEX'}</span>
              <span className="text-gradient-cyber">.{(content.name as string)?.split(' ')[1]?.toUpperCase() || 'MORGAN'}</span>
            </motion.h1>

            {/* Typing Effect Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <span className={`font-mono text-xl sm:text-2xl text-neon-cyan ${glitchActive ? 'animate-glitch' : ''}`}>
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-3 h-6 bg-neon-cyan ml-1"
                />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {(content.description as string) || 'Transforming raw data into intelligent decisions. Specializing in AI-driven analytics, cloud architecture, and digital transformation strategies.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-neon-cyan to-neon-blue text-cyber-dark font-bold hover:shadow-glow-cyan transition-all duration-300 group"
              >
                <span className="flex items-center gap-2">
                  {(content.ctaPrimary as string) || 'INITIALIZE.EXPLORATION'}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="border-neon-purple text-neon-purple hover:bg-neon-purple/10 hover:shadow-glow-purple transition-all duration-300"
              >
                {(content.ctaSecondary as string) || 'ESTABLISH.CONNECTION'}
              </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-4 gap-4 mt-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  className="text-center p-3 rounded-lg bg-neon-cyan/5 border border-neon-cyan/20"
                >
                  <stat.icon className="w-5 h-5 text-neon-cyan mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - AI Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Holographic Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute pointer-events-none -z-10 w-96 h-96 max-w-[50vw] max-h-[50vh] rounded-full border-2 border-dashed border-neon-cyan/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute pointer-events-none -z-10 w-80 h-80 max-w-[50vw] max-h-[50vh] rounded-full border border-neon-purple/30"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute pointer-events-none -z-10 w-[450px] h-[450px] max-w-[50vw] max-h-[50vh] rounded-full border border-dotted border-neon-pink/20"
            />

            {/* AI Avatar */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <img
                src="/ai-avatar.png"
                alt="AI Assistant"
                className="w-80 h-80 object-contain drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]"
              />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-neon-cyan/20 blur-[60px] -z-10" />
            </motion.div>

            {/* Floating Data Points */}
            {[
              { label: 'NEURAL.NET', x: -80, y: -100 },
              { label: 'QUANTUM.CORE', x: 200, y: -50 },
              { label: 'AI.ENGINE', x: -100, y: 100 },
              { label: 'DATA.STREAM', x: 180, y: 120 },
            ].map((point, i) => (
              <motion.div
                key={point.label}
                className="absolute text-xs font-mono text-neon-cyan/70"
                style={{ left: `calc(50% + ${point.x}px)`, top: `calc(50% + ${point.y}px)` }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              >
                {point.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Data Stream */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-cyber-dark to-transparent">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-8 whitespace-nowrap text-xs font-mono text-neon-cyan/40"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i}>
              SYS.STATUS: OPERATIONAL // MEM.USAGE: 42% // NET.SPEED: 10Gbps // ENCRYPTION: AES-256 //
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
