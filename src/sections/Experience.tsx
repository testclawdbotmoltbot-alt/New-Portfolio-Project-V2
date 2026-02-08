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

const Experience = ({ section: _section }: { section: Section }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const experiences: ExperienceItem[] = [
    {
      id: 'EXP-004',
      title: 'Senior Digital Technology Analyst',
      company: 'TechVision Solutions',
      location: 'San Francisco, CA',
      period: '2022 - PRESENT',
      type: 'FULL_TIME',
      description: 'Leading enterprise digital transformation initiatives. Architecting cloud-native solutions and implementing AI-driven analytics platforms for Fortune 500 clients.',
      achievements: [
        'Led $5M digital transformation project for Fortune 100 client',
        'Developed proprietary analytics framework reducing delivery time by 40%',
        'Established data governance standards across 12 organizations',
        'Mentored team of 8 analysts, 3 promoted to senior roles',
      ],
      tech: ['AWS', 'Python', 'TensorFlow', 'Kubernetes', 'Snowflake'],
    },
    {
      id: 'EXP-003',
      title: 'Technology Analyst',
      company: 'DataDriven Consulting',
      location: 'New York, NY',
      period: '2019 - 2022',
      type: 'FULL_TIME',
      description: 'Delivered comprehensive technology assessments and data-driven solutions across finance, healthcare, and retail verticals.',
      achievements: [
        'Designed BI solutions for 25+ enterprise clients',
        'Achieved 95% client satisfaction rate',
        'Created automated reporting saving 200+ hours monthly',
        'Awarded "Analyst of the Year" 2021',
      ],
      tech: ['Azure', 'PowerBI', 'SQL', 'Python', 'Apache Spark'],
    },
    {
      id: 'EXP-002',
      title: 'Business Intelligence Analyst',
      company: 'Global Retail Corp',
      location: 'Chicago, IL',
      period: '2017 - 2019',
      type: 'FULL_TIME',
      description: 'Built enterprise BI infrastructure, created executive dashboards, and provided strategic insights supporting $2B revenue decisions.',
      achievements: [
        'Developed real-time sales dashboard for 500+ store managers',
        'Identified $2M cost savings through supply chain analytics',
        'Implemented predictive models improving inventory accuracy 35%',
        'Trained 50+ employees on BI tools and best practices',
      ],
      tech: ['Tableau', 'R', 'SQL Server', 'Excel', 'SAP'],
    },
    {
      id: 'EXP-001',
      title: 'Junior Data Analyst',
      company: 'StartUp Innovations',
      location: 'Austin, TX',
      period: '2016 - 2017',
      type: 'FULL_TIME',
      description: 'Established foundational analytics infrastructure and developed data collection workflows for rapidly growing tech startup.',
      achievements: [
        'Built analytics infrastructure from ground up',
        'Created ETL pipelines processing 1M+ records daily',
        'Developed customer segmentation improving marketing ROI 25%',
      ],
      tech: ['Python', 'PostgreSQL', 'Pandas', 'scikit-learn'],
    },
  ];

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
            <span className="text-white">MISSION.</span>
            <span className="text-gradient-cyber">HISTORY</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chronological deployment record across enterprise environments
          </p>
        </motion.div>

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
