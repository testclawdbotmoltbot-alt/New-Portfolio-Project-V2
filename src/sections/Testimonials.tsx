import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, Terminal, Shield, Lock } from 'lucide-react';
import type { Section } from '@/contexts/ContentContext';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  clearance: string;
  rating: number;
  verified: boolean;
}

const Testimonials = ({ section: _section }: { section: Section }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 'TST-001',
      quote: "Alex's expertise in digital transformation was instrumental in our company's successful cloud migration. The proprietary analytics framework developed reduced our project delivery time by 40% while maintaining 99.9% uptime.",
      author: 'Sarah Mitchell',
      role: 'Chief Technology Officer',
      company: 'TechCorp Industries',
      clearance: 'LEVEL_5',
      rating: 5,
      verified: true,
    },
    {
      id: 'TST-002',
      quote: "The AI-driven customer intelligence system Alex architected achieved 92% prediction accuracy. Our churn reduction of 35% directly translated to $5M in retained revenue. Exceptional technical leadership.",
      author: 'Michael Chen',
      role: 'VP of Operations',
      company: 'Global Finance Group',
      clearance: 'LEVEL_4',
      rating: 5,
      verified: true,
    },
    {
      id: 'TST-003',
      quote: "Alex led our cloud migration of 200+ applications with zero critical downtime. The infrastructure-as-code implementation and CI/CD pipelines established continue to drive our DevOps excellence.",
      author: 'Emily Rodriguez',
      role: 'Director of Digital Strategy',
      company: 'RetailMax Solutions',
      clearance: 'LEVEL_4',
      rating: 5,
      verified: true,
    },
    {
      id: 'TST-004',
      quote: "The real-time analytics dashboard transformed our logistics operations. Route efficiency improved 32% and fuel savings exceeded $1.2M annually. Alex's understanding of both technology and business is rare.",
      author: 'David Park',
      role: 'Chief Executive Officer',
      company: 'FastTrack Logistics',
      clearance: 'LEVEL_3',
      rating: 5,
      verified: true,
    },
  ];

  const currentTestimonial = testimonials[activeIndex];

  const nextTestimonial = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setIsVerifying(false);
    }, 800);
  };

  const prevTestimonial = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsVerifying(false);
    }, 800);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/10 rounded-full blur-[200px]" />

      {/* Data Stream Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xs font-mono text-neon-cyan/10 whitespace-nowrap"
            style={{
              left: `${i * 25}%`,
              top: '-10%',
            }}
            animate={{
              y: ['0%', '120%'],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          >
            {Array(50).fill('01001000 01101001 01100111 01101000 01101100 01111001 00100000 01010011 01100101 01100011 01110101 01110010 01100101 ').join('')}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-sm text-neon-purple font-mono">CLIENT_VERIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold mb-4">
            <span className="text-white">ENDORSEMENT.</span>
            <span className="text-gradient-cyber">DATABASE</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cryptographically verified testimonials from enterprise partners
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="glass-panel rounded-2xl border border-neon-purple/30 overflow-hidden">
            {/* Verification Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neon-purple/20 bg-neon-purple/5">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-neon-green" />
                <span className="text-sm font-mono text-neon-green">VERIFIED_ENDORSEMENT</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-neon-purple" />
                <span className="text-xs font-mono text-neon-purple">{currentTestimonial.clearance}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 relative">
              {/* Verification Overlay */}
              {isVerifying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-cyber-dark/95 flex items-center justify-center z-10"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-neon-green font-mono">VERIFYING_SIGNATURE...</p>
                  </div>
                </motion.div>
              )}

              {/* Quote Icon */}
              <div className="absolute top-6 left-6 w-12 h-12 rounded-xl bg-neon-purple/20 border border-neon-purple/50 flex items-center justify-center">
                <Quote className="w-6 h-6 text-neon-purple" />
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star className="w-6 h-6 fill-neon-yellow text-neon-yellow" />
                  </motion.div>
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-xl lg:text-2xl text-center text-white leading-relaxed mb-8 font-light">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center mb-4">
                  <span className="text-2xl font-orbitron font-bold text-white">
                    {currentTestimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="text-center">
                  <div className="font-orbitron font-bold text-white text-lg">
                    {currentTestimonial.author}
                  </div>
                  <div className="text-neon-cyan">{currentTestimonial.role}</div>
                  <div className="text-sm text-muted-foreground">{currentTestimonial.company}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full bg-cyber-panel border border-neon-purple/50 flex items-center justify-center text-neon-purple hover:bg-neon-purple hover:text-cyber-dark transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsVerifying(true);
                  setTimeout(() => {
                    setActiveIndex(index);
                    setIsVerifying(false);
                  }, 800);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 bg-neon-purple shadow-glow-purple'
                    : 'w-2 bg-neon-purple/30 hover:bg-neon-purple/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full bg-cyber-panel border border-neon-purple/50 flex items-center justify-center text-neon-purple hover:bg-neon-purple hover:text-cyber-dark transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">TRUSTED BY LEADING ENTERPRISES</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {['TechCorp', 'GlobalFinance', 'RetailMax', 'FastTrack', 'HealthFirst'].map((company) => (
              <span
                key={company}
                className="text-lg font-orbitron text-white/50 hover:text-neon-cyan/70 transition-colors cursor-default"
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
