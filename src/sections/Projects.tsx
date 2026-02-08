import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Terminal, Cpu, TrendingUp, ChevronLeft, ChevronRight, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Section } from '@/contexts/ContentContext';

interface Project {
  id: string;
  title: string;
  codename: string;
  classification: string;
  description: string;
  image: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  status: 'completed' | 'active' | 'classified';
  links: { demo?: string; github?: string };
}

const defaultProjects: Project[] = [
    {
      id: 'PRJ-001',
      title: 'Enterprise Data Platform',
      codename: 'PROJECT: NEXUS',
      classification: 'LEVEL_4',
      description: 'Comprehensive data analytics platform consolidating 15+ enterprise data sources. Implements real-time ETL pipelines, predictive analytics, and AI-driven insights dashboard.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      technologies: ['Python', 'AWS', 'Snowflake', 'Airflow', 'TensorFlow'],
      metrics: [
        { label: 'Processing Time', value: '-75%' },
        { label: 'Cost Savings', value: '$2.4M' },
        { label: 'Data Sources', value: '15+' },
      ],
      status: 'completed',
      links: { demo: '#', github: '#' },
    },
    {
      id: 'PRJ-002',
      title: 'AI Customer Intelligence',
      codename: 'PROJECT: ORACLE',
      classification: 'LEVEL_5',
      description: 'Advanced customer segmentation and churn prediction system using deep learning. Achieves 92% prediction accuracy with real-time model updates.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
      technologies: ['PyTorch', 'AWS SageMaker', 'React', 'PostgreSQL', 'Redis'],
      metrics: [
        { label: 'Accuracy', value: '92%' },
        { label: 'Revenue Impact', value: '+28%' },
        { label: 'Churn Reduction', value: '-35%' },
      ],
      status: 'active',
      links: { demo: '#' },
    },
    {
      id: 'PRJ-003',
      title: 'Cloud Migration Initiative',
      codename: 'PROJECT: ASCENSION',
      classification: 'LEVEL_3',
      description: 'Large-scale cloud migration of 200+ applications to AWS. Implemented Infrastructure as Code, CI/CD pipelines, and zero-downtime deployment strategies.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
      technologies: ['Terraform', 'Kubernetes', 'Docker', 'Jenkins', 'AWS'],
      metrics: [
        { label: 'Apps Migrated', value: '200+' },
        { label: 'Downtime', value: '-90%' },
        { label: 'Cost Optimization', value: '40%' },
      ],
      status: 'completed',
      links: { github: '#' },
    },
    {
      id: 'PRJ-004',
      title: 'Real-time Analytics Hub',
      codename: 'PROJECT: SENTINEL',
      classification: 'LEVEL_4',
      description: 'IoT-enabled logistics analytics platform with real-time fleet tracking, route optimization, and predictive maintenance capabilities.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
      technologies: ['Node.js', 'MongoDB', 'WebSocket', 'D3.js', 'Kafka'],
      metrics: [
        { label: 'Route Efficiency', value: '+32%' },
        { label: 'Fuel Savings', value: '$1.2M' },
        { label: 'Active Users', value: '500+' },
      ],
      status: 'active',
      links: { demo: '#', github: '#' },
    },
  ];

const Projects = ({ section }: { section: Section }) => {
  const content = section?.content || {};
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeProject, setActiveProject] = useState(0);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const cmsProjects = Array.isArray(content.items) ? content.items : null;
  const fallbackImages = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
  ];
  const projects: Project[] =
    cmsProjects && cmsProjects.length > 0
      ? cmsProjects.map(
          (
            item: {
              id?: string;
              title?: string;
              description?: string;
              shortDesc?: string;
              image?: string;
              tech?: string[];
              impact?: string;
              status?: string;
            },
            index: number
          ) => {
            const status = (item.status || 'Completed').toLowerCase();
            const mappedStatus: Project['status'] =
              status.includes('progress') ? 'active' : status.includes('plan') ? 'classified' : 'completed';
            const impactMetric = item.impact
              ? [{ label: 'Impact', value: item.impact }]
              : [{ label: 'Status', value: item.status || 'Completed' }];
            const techMetric = item.tech?.length
              ? [{ label: 'Stack', value: `${item.tech.length}+` }]
              : [];
            const metrics = [...impactMetric, ...techMetric].slice(0, 3);
            while (metrics.length < 3) {
              metrics.push({ label: `Metric_${metrics.length + 1}`, value: '—' });
            }
            return {
              id: item.id || `PRJ-${String(index + 1).padStart(3, '0')}`,
              title: item.title || `Project ${index + 1}`,
              codename: (item.shortDesc || `PROJECT_${index + 1}`).toUpperCase().replace(/\s/g, '_'),
              classification: status.includes('plan') ? 'LEVEL_3' : status.includes('progress') ? 'LEVEL_4' : 'LEVEL_5',
              description: item.description || 'Project details coming soon.',
              image: item.image || fallbackImages[index % fallbackImages.length],
              technologies: item.tech || [],
              metrics,
              status: mappedStatus,
              links: {},
            };
          }
        )
      : defaultProjects;

  const currentProject = projects[activeProject];
  const heading = (content.sectionHeading as string) || 'CLASSIFIED.DOSSIERS';
  const headingParts = heading.split('.');
  const headingPrimary = headingParts[0] || 'CLASSIFIED';
  const headingSecondary = headingParts.slice(1).join('.') || 'DOSSIERS';

  useEffect(() => {
    if (projects.length === 0) return;
    if (activeProject >= projects.length) {
      setActiveProject(0);
    }
  }, [activeProject, projects.length]);

  const handleDecrypt = () => {
    setIsDecrypting(true);
    setTimeout(() => setIsDecrypting(false), 1500);
  };

  const nextProject = () => {
    if (!projects.length) return;
    setActiveProject((prev) => (prev + 1) % projects.length);
    handleDecrypt();
  };

  const prevProject = () => {
    if (!projects.length) return;
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
    handleDecrypt();
  };

  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-30" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[200px] -translate-y-1/2" />

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
            <span className="text-sm text-neon-purple font-mono">PROJECT_ARCHIVES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold mb-4">
            <span className="text-white">{headingPrimary}.</span>
            <span className="text-gradient-cyber">{headingSecondary}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access restricted project documentation. Decryption required for full details.
          </p>
        </motion.div>

        {projects.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-xl border border-neon-purple/30">
            <p className="text-muted-foreground font-mono">No projects yet. Add entries from the admin panel.</p>
          </div>
        )}

        {/* Project Navigation */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-3 mb-8 flex-wrap"
          >
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => {
                  setActiveProject(index);
                  handleDecrypt();
                }}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                  index === activeProject
                    ? 'bg-neon-purple text-cyber-dark shadow-glow-purple'
                    : 'bg-cyber-panel border border-neon-purple/30 text-neon-purple hover:border-neon-purple'
                }`}
              >
                {project.id}
              </button>
            ))}
          </motion.div>
        )}

        {/* Main Project Display */}
        {projects.length > 0 && currentProject && (
          <motion.div
            key={activeProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Project Visual */}
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden border border-neon-purple/30 group">
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1 ${
                    currentProject.status === 'active' 
                      ? 'bg-neon-green/20 text-neon-green border border-neon-green/50' 
                      : 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${currentProject.status === 'active' ? 'bg-neon-green animate-pulse' : 'bg-neon-cyan'}`} />
                    {currentProject.status.toUpperCase()}
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-mono bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/50 flex items-center gap-1">
                    {currentProject.classification === 'LEVEL_5' ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    {currentProject.classification}
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-[300px] lg:h-[400px]">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/50 to-transparent" />
                  
                  {/* Decryption Overlay */}
                  {isDecrypting && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-cyber-dark/90 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-16 h-16 border-4 border-neon-purple border-t-transparent rounded-full mx-auto mb-4"
                        />
                        <p className="text-neon-purple font-mono">DECRYPTING...</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevProject}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cyber-dark/80 border border-neon-purple/50 flex items-center justify-center text-neon-purple hover:bg-neon-purple hover:text-cyber-dark transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextProject}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cyber-dark/80 border border-neon-purple/50 flex items-center justify-center text-neon-purple hover:bg-neon-purple hover:text-cyber-dark transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-neon-purple">{currentProject.codename}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-orbitron font-bold text-white mb-4">
                  {currentProject.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {currentProject.description}
                </p>
              </div>

            {/* Technologies */}
            <div>
              <h4 className="text-sm font-mono text-neon-cyan mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                TECH_STACK
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div>
              <h4 className="text-sm font-mono text-neon-green mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                PERFORMANCE_METRICS
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {currentProject.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="p-4 rounded-lg glass-panel border border-neon-green/30 text-center"
                  >
                    <div className="text-2xl font-orbitron font-bold text-neon-green">{metric.value}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {currentProject.links.demo && (
                <Button className="bg-neon-cyan text-cyber-dark hover:bg-neon-cyan/80 font-bold">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  ACCESS_DEMO
                </Button>
              )}
              {currentProject.links.github && (
                <Button variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple/10">
                  <Github className="w-4 h-4 mr-2" />
                  VIEW_SOURCE
                </Button>
              )}
            </div>
          </div>
          </motion.div>
        )}

        {/* Progress Indicators */}
        {projects.length > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveProject(index);
                  handleDecrypt();
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === activeProject 
                    ? 'w-8 bg-neon-purple shadow-glow-purple' 
                    : 'w-2 bg-neon-purple/30 hover:bg-neon-purple/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
