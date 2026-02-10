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

const Testimonials = ({ section }: { section: Section }) => {
  const content = section?.content || {};
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  const cmsTestimonials = Array.isArray(content.testimonials) ? content.testimonials : null;
  const testimonials: Testimonial[] =
    cmsTestimonials && cmsTestimonials.length > 0
      ? cmsTestimonials.map((item: Testimonial, index: number) => ({
          ...item,
          id: item.id || `TST-${String(index + 1).padStart(3, '0')}`,
          quote: item.quote || 'Testimonial coming soon.',
          author: item.author || 'Anonymous',
          role: item.role || 'Client',
          company: item.company || '',
          clearance: item.clearance || 'LEVEL_3',
          rating: item.rating || 5,
          verified: item.verified ?? true,
        }))
      : [];
  const heading = (content.sectionHeading as string) || 'ENDORSEMENT.DATABASE';
  const headingParts = heading.split('.');
  const headingPrimary = headingParts[0] || 'ENDORSEMENT';
  const headingSecondary = headingParts.slice(1).join('.') || 'DATABASE';

  const currentTestimonial = testimonials[activeIndex];

  const nextTestimonial = () => {
    if (!testimonials.length) return;
    setIsVerifying(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setIsVerifying(false);
    }, 800);
  };

  const prevTestimonial = () => {
    if (!testimonials.length) return;
    setIsVerifying(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsVerifying(false);
    }, 800);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    if (activeIndex >= testimonials.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, testimonials.length]);

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 pointer-events-none -z-10 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] max-w-[70vw] max-h-[70vh] bg-neon-purple/10 rounded-full blur-[200px]" />

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
            <span className="text-white">{headingPrimary}.</span>
            <span className="text-gradient-cyber">{headingSecondary}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cryptographically verified testimonials from enterprise partners
          </p>
        </motion.div>

        {testimonials.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-xl border border-neon-purple/30">
            <p className="text-muted-foreground font-mono">No testimonials yet. Add them in the admin editor.</p>
          </div>
        )}

        {/* Main Testimonial Display */}
        {testimonials.length > 0 && currentTestimonial && (
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
                  <span className="text-sm font-mono text-neon-green">
                    {currentTestimonial.verified ? 'VERIFIED_ENDORSEMENT' : 'UNVERIFIED_ENDORSEMENT'}
                  </span>
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
        )}

        {/* Navigation */}
        {testimonials.length > 0 && (
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
        )}

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
