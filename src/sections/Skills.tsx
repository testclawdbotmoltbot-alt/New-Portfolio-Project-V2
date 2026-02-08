import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Cpu, Database, Cloud, Shield, Brain, ChevronRight, Sparkles } from 'lucide-react';
import type { Section } from '@/contexts/ContentContext';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillModule {
  title: string;
  icon: React.ElementType;
  color: string;
  skills: Skill[];
  description: string;
}

const defaultModules: SkillModule[] = [
    {
      title: 'DATA_ANALYTICS',
      icon: Database,
      color: 'neon-cyan',
      description: 'Advanced data processing and visualization capabilities',
      skills: [
        { name: 'Python/Pandas', level: 98, category: 'Core' },
        { name: 'SQL/NoSQL', level: 95, category: 'Database' },
        { name: 'Tableau/PowerBI', level: 92, category: 'Viz' },
        { name: 'R Programming', level: 88, category: 'Stats' },
        { name: 'Apache Spark', level: 85, category: 'Big Data' },
      ],
    },
    {
      title: 'CLOUD_ARCHITECTURE',
      icon: Cloud,
      color: 'neon-purple',
      description: 'Enterprise cloud infrastructure and DevOps expertise',
      skills: [
        { name: 'AWS Services', level: 95, category: 'Platform' },
        { name: 'Azure/GCP', level: 90, category: 'Platform' },
        { name: 'Kubernetes', level: 88, category: 'Orchestration' },
        { name: 'Terraform', level: 92, category: 'IaC' },
        { name: 'Docker', level: 95, category: 'Container' },
      ],
    },
    {
      title: 'AI_ML_SYSTEMS',
      icon: Brain,
      color: 'neon-pink',
      description: 'Machine learning model development and deployment',
      skills: [
        { name: 'TensorFlow/PyTorch', level: 90, category: 'Framework' },
        { name: 'Scikit-Learn', level: 93, category: 'ML' },
        { name: 'NLP/LLMs', level: 87, category: 'AI' },
        { name: 'Computer Vision', level: 85, category: 'AI' },
        { name: 'MLOps', level: 82, category: 'Pipeline' },
      ],
    },
    {
      title: 'SECURITY_PROTOCOLS',
      icon: Shield,
      color: 'neon-green',
      description: 'Cybersecurity and compliance implementation',
      skills: [
        { name: 'Encryption/AES', level: 92, category: 'Crypto' },
        { name: 'OAuth/JWT', level: 90, category: 'Auth' },
        { name: 'GDPR/CCPA', level: 95, category: 'Compliance' },
        { name: 'Penetration Testing', level: 85, category: 'Security' },
        { name: 'SIEM Tools', level: 88, category: 'Monitoring' },
      ],
    },
  ];

const Skills = ({ section }: { section: Section }) => {
  const content = section?.content || {};
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const icons = [Database, Cloud, Brain, Shield];
  const colors = ['neon-cyan', 'neon-purple', 'neon-pink', 'neon-green'];
  const descriptions = [
    'Advanced data processing and visualization capabilities',
    'Enterprise cloud infrastructure and DevOps expertise',
    'Machine learning model development and deployment',
    'Cybersecurity and compliance implementation',
  ];
  const skillModules: SkillModule[] =
    Array.isArray(content.categories) && content.categories.length > 0
      ? content.categories.map((cat: { name?: string; skills?: string[] }, i: number) => ({
          title: (cat.name as string)?.toUpperCase().replace(/\s/g, '_') || defaultModules[i]?.title || 'CATEGORY',
          icon: icons[i] || Database,
          color: colors[i] || 'neon-cyan',
          description: descriptions[i] || '',
          skills: (cat.skills as string[] || []).map((name) => ({ name, level: 90, category: 'Custom' })),
        }))
      : defaultModules;

  const getColorClass = (color: string) => {
    const colorMap: Record<string, { text: string; bg: string; border: string; glow: string }> = {
      'neon-cyan': { text: 'text-neon-cyan', bg: 'bg-neon-cyan', border: 'border-neon-cyan', glow: 'shadow-glow-cyan' },
      'neon-purple': { text: 'text-neon-purple', bg: 'bg-neon-purple', border: 'border-neon-purple', glow: 'shadow-glow-purple' },
      'neon-pink': { text: 'text-neon-pink', bg: 'bg-neon-pink', border: 'border-neon-pink', glow: 'shadow-glow-pink' },
      'neon-green': { text: 'text-neon-green', bg: 'bg-neon-green', border: 'border-neon-green', glow: 'shadow-[0_0_20px_#00FF80]' },
    };
    return colorMap[color] || colorMap['neon-cyan'];
  };

  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/50 mb-4">
            <Cpu className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-neon-cyan font-mono">SKILL_MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold mb-4">
            <span className="text-white">CAPABILITY.</span>
            <span className="text-gradient-cyber">MODULES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced technological competencies optimized for next-generation digital solutions
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {skillModules.map((module, moduleIndex) => {
            const colors = getColorClass(module.color);
            const isActive = activeModule === moduleIndex;

            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + moduleIndex * 0.1 }}
                onClick={() => setActiveModule(isActive ? null : moduleIndex)}
                className={`relative glass-panel rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  isActive ? `${colors.glow}` : ''
                }`}
              >
                {/* Module Header */}
                <div className={`p-6 border-b ${colors.border}/30 ${isActive ? `bg-${module.color}/10` : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg ${colors.bg}/20 border ${colors.border} flex items-center justify-center`}>
                        <module.icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className={`font-orbitron font-bold text-lg ${colors.text}`}>
                          {module.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">{module.description}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isActive ? 90 : 0 }}
                      className={colors.text}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.div>
                  </div>
                </div>

                {/* Skills List */}
                <motion.div
                  initial={false}
                  animate={{ height: isActive ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    {module.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isActive ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                        className="space-y-2"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles className={`w-3 h-3 ${hoveredSkill === skill.name ? colors.text : 'text-muted-foreground'}`} />
                            <span className="text-sm text-white font-mono">{skill.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs ${colors.text}`}>{skill.level}%</span>
                            <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-white/5">
                              {skill.category}
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-cyber-dark rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isActive ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 0.8, delay: 0.2 + skillIndex * 0.1 }}
                            className={`h-full rounded-full ${colors.bg}`}
                            style={{
                              boxShadow: `0 0 10px currentColor`,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Collapsed Preview */}
                {!isActive && (
                  <div className="p-4 flex flex-wrap gap-2">
                    {module.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill.name}
                        className={`px-3 py-1 text-xs rounded-full ${colors.bg}/10 ${colors.border} ${colors.text} border`}
                      >
                        {skill.name.split('/')[0]}
                      </span>
                    ))}
                    <span className="px-3 py-1 text-xs rounded-full bg-neon-yellow/10 text-neon-yellow border border-neon-yellow/30">
                      +{module.skills.length - 3}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <h3 className="text-lg font-orbitron font-bold text-white mb-6">
            <span className="text-neon-cyan">{'<'}</span>
            ADDITIONAL_PROTOCOLS
            <span className="text-neon-cyan">{'/>'}</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Git', 'Jenkins', 'Apache Kafka', 'Redis', 'Elasticsearch',
              'GraphQL', 'REST APIs', 'Microservices', 'Serverless', 'Blockchain'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1 + index * 0.05 }}
                className="px-4 py-2 rounded-lg glass-panel border border-neon-cyan/20 text-neon-cyan text-sm font-mono hover:border-neon-cyan hover:shadow-glow-cyan transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
