import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Terminal, User, Code, Globe, Shield, Zap } from 'lucide-react';
import type { Section } from '@/contexts/ContentContext';

const About = ({ section }: { section: Section }) => {
  const content = section?.content || {};
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  const terminalCommands = [
    '> initializing_profile_scan...',
    '> loading_biographical_data...',
    '> NAME: Alex Morgan',
    '> ROLE: Digital Technology Analyst',
    '> EXPERIENCE: 8+ Years',
    '> SPECIALIZATION: AI/ML, Cloud Architecture',
    '> STATUS: Available for contracts',
    '> profile_loaded_successfully',
  ];

  useEffect(() => {
    if (isInView && currentLine < terminalCommands.length) {
      const timer = setTimeout(() => {
        setTerminalLines(prev => [...prev, terminalCommands[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView, currentLine]);

  const capabilities = [
    { icon: Code, title: 'Code Architecture', desc: 'Building scalable systems with cutting-edge technologies', color: 'neon-cyan' },
    { icon: Globe, title: 'Cloud Infrastructure', desc: 'Deploying resilient cloud-native solutions', color: 'neon-purple' },
    { icon: Shield, title: 'Data Security', desc: 'Implementing enterprise-grade security protocols', color: 'neon-pink' },
    { icon: Zap, title: 'AI Integration', desc: 'Leveraging machine learning for intelligent automation', color: 'neon-green' },
  ];

  const defaultStats = [
    { label: 'Projects Delivered', value: '150+', suffix: '' },
    { label: 'Data Processed', value: '25', suffix: 'M+' },
    { label: 'Client Satisfaction', value: '98', suffix: '%' },
    { label: 'Uptime Achieved', value: '99.9', suffix: '%' },
  ];
  const stats = Array.isArray(content.stats) && content.stats.length
    ? content.stats.map((s: { label?: string; value?: string; suffix?: string }) => ({ label: s.label ?? '', value: s.value ?? '', suffix: s.suffix ?? '' }))
    : defaultStats;

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-50" />
      <div className="absolute top-1/4 left-0 pointer-events-none -z-10 w-96 h-96 max-w-[45vw] max-h-[50vh] bg-neon-purple/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 pointer-events-none -z-10 w-96 h-96 max-w-[45vw] max-h-[50vh] bg-neon-cyan/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/50 mb-4">
            <Terminal className="w-4 h-4 text-neon-purple" />
            <span className="text-sm text-neon-purple font-mono">SYSTEM.PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold mb-4">
            {(content.sectionHeading as string) ? (
              <>
                <span className="text-white">{(content.sectionHeading as string).split('.')[0]}.</span>
                <span className="text-gradient-cyber">{(content.sectionHeading as string).split('.').slice(1).join('.') || 'ANALYSIS'}</span>
              </>
            ) : (
              <>
                <span className="text-white">IDENTITY.</span>
                <span className="text-gradient-cyber">ANALYSIS</span>
              </>
            )}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel rounded-xl overflow-hidden border border-neon-cyan/30"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-cyber-panel border-b border-neon-cyan/20">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-sm text-muted-foreground font-mono">user@alex-morgan:~</span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm min-h-[300px]">
              {terminalLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`mb-2 ${
                    line.includes('SUCCESS') || line.includes('successfully')
                      ? 'text-neon-green'
                      : line.startsWith('>')
                      ? 'text-neon-cyan'
                      : 'text-neon-purple'
                  }`}
                >
                  {line}
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-neon-cyan mt-2"
              />
            </div>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Bio */}
            <div className="glass-panel p-6 rounded-xl border border-neon-purple/30">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-neon-purple" />
                <h3 className="text-xl font-orbitron font-bold text-white">BIOGRAPHICAL_DATA</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {(content.bio as string) || 'Digital Technology Analyst with expertise in transforming complex data ecosystems into intelligent, actionable insights. Specializing in AI-driven analytics, cloud-native architectures, and enterprise digital transformation strategies.'}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Proven track record of delivering 150+ successful projects, processing 25M+ data points, and achieving 99.9% system uptime across Fortune 500 clients and innovative startups.
              </p>
            </div>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-2 gap-4">
              {capabilities.map((cap, index) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className={`p-4 rounded-lg bg-${cap.color}/5 border border-${cap.color}/30 hover:border-${cap.color} transition-all duration-300 group`}
                >
                  <cap.icon className={`w-8 h-8 text-${cap.color} mb-3 group-hover:scale-110 transition-transform`} />
                  <h4 className="font-orbitron font-bold text-white text-sm mb-1">{cap.title}</h4>
                  <p className="text-xs text-muted-foreground">{cap.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
        >
          {stats.map((stat: { label: string; value: string; suffix: string }, index: number) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
              className="glass-panel p-6 rounded-xl border border-neon-cyan/20 text-center group hover:border-neon-cyan/50 transition-all duration-300"
            >
              <div className="text-3xl lg:text-4xl font-orbitron font-bold text-gradient-cyber mb-2">
                {stat.value}<span className="text-lg">{stat.suffix}</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
