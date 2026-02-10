import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, Terminal, Cpu, Database } from 'lucide-react';
import type { Section } from '@/contexts/ContentContext';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  tech: string[];
}

const Experience = ({ section }: { section: Section }) => {
  const content = section?.content || {};
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const cmsExperiences = Array.isArray(content.items) ? content.items : null;
  const experiences: ExperienceItem[] =
    cmsExperiences && cmsExperiences.length > 0
      ? cmsExperiences.map((item: ExperienceItem, index: number) => ({
          ...item,
          id: item.id || `EXP-${String(index + 1).padStart(3, '0')}`,
          achievements: Array.isArray(item.achievements) ? item.achievements : [],
          tech: Array.isArray(item.tech) ? item.tech : [],
          description: item.description || 'Experience details coming soon.',
          location: item.location || 'Remote',
          period: item.period || 'TBD',
          type: item.type || 'FULL_TIME',
        }))
      : [];
  const heading = (content.sectionHeading as string) || 'MISSION.HISTORY';
  const headingParts = heading.split('.');
  const headingPrimary = headingParts[0] || 'MISSION';
  const headingSecondary = headingParts.slice(1).join('.') || 'HISTORY';

  return (
    <section id="experience" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[150px]" />

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
            <Terminal className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-neon-cyan font-mono">CAREER_LOG</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold mb-4">
            <span className="text-white">{headingPrimary}.</span>
            <span className="text-gradient-cyber">{headingSecondary}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chronological deployment record across enterprise environments
          </p>
        </motion.div>

        {experiences.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-xl border border-neon-cyan/30">
            <p className="text-muted-foreground font-mono">No experience entries yet. Add them in the admin panel.</p>
          </div>
        )}

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent" />

          {/* Experience Items */}
          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const isExpanded = expandedItem === exp.id;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className={`relative flex flex-col lg:flex-row gap-8 ${isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neon-cyan border-4 border-cyber-dark z-10">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-neon-cyan"
                    />
                  </div>

                  {/* Content Card */}
                  <div className={`ml-12 lg:ml-0 lg:w-5/12 ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div 
                      onClick={() => setExpandedItem(isExpanded ? null : exp.id)}
                      className="glass-panel rounded-xl border border-neon-cyan/20 hover:border-neon-cyan/50 cursor-pointer transition-all duration-300 overflow-hidden"
                    >
                      {/* Card Header */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 border border-neon-cyan/50 flex items-center justify-center">
                              <Briefcase className="w-5 h-5 text-neon-cyan" />
                            </div>
                            <div>
                              <span className="text-xs font-mono text-neon-purple">{exp.id}</span>
                              <h3 className="font-orbitron font-bold text-white">{exp.title}</h3>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            className="text-neon-cyan"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </motion.div>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Database className="w-4 h-4 text-neon-purple" />
                            {exp.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-neon-purple" />
                            {exp.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-neon-purple" />
                            {exp.period}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                      </div>

                      {/* Expanded Content */}
                      <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? 'auto' : 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-neon-cyan/20">
                          {/* Achievements */}
                          <div className="mt-4">
                            <h4 className="text-sm font-mono text-neon-green mb-3 flex items-center gap-2">
                              <Cpu className="w-4 h-4" />
                              KEY_ACHIEVEMENTS
                            </h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, achIndex) => (
                                <motion.li
                                  key={achIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={isExpanded ? { opacity: 1, x: 0 } : {}}
                                  transition={{ delay: achIndex * 0.05 }}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <ChevronRight className="w-4 h-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                                  {achievement}
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Tech Stack */}
                          <div className="mt-4">
                            <h4 className="text-sm font-mono text-neon-cyan mb-3">TECH_DEPLOYED</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.tech.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-1 text-xs rounded bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 font-mono"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden lg:block lg:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
