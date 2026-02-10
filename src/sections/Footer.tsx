import { motion } from 'framer-motion';
import { Cpu, Github, Linkedin, Twitter, MessageSquare, ArrowUp, Heart, Terminal } from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: Github,
  Github: Github,
  LinkedIn: Linkedin,
  Linkedin: Linkedin,
  Twitter: Twitter,
  Discord: MessageSquare,
  MessageSquare: MessageSquare,
};

const Footer = () => {
  const { site, footer: footerConfig } = useContent();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const navLinks = footerConfig.navLinks || [];
  const systemLinks = footerConfig.systemLinks || [];
  const socialLinks = footerConfig.socialLinks || [];
  const statusRows = footerConfig.statusRows || [];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.replace('#', ''));
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent" />
      <div className="absolute bottom-0 left-1/2 pointer-events-none -z-10 -translate-x-1/2 w-[800px] h-96 max-w-[80vw] max-h-[50vh] bg-neon-cyan/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              className="flex items-center gap-3 mb-4 group"
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                {site.logoUrl ? (
                  <img src={site.logoUrl} alt={site.siteName} className="w-full h-full rounded-lg object-contain border-2 border-neon-cyan/50" />
                ) : (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 rounded-lg border-2 border-neon-cyan/50"
                    />
                    <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-cyber-dark" />
                    </div>
                  </>
                )}
              </div>
              <div>
                <div className="font-orbitron font-bold text-white group-hover:text-neon-cyan transition-colors">
                  {footerConfig.brandName || site.siteName || 'ALEX.MORGAN'}
                </div>
                <div className="text-xs font-mono text-neon-cyan/70">{footerConfig.tagline || site.tagline || 'DIGITAL_ANALYST.exe'}</div>
              </div>
            </a>
            <p className="text-muted-foreground text-sm mb-6">
              {footerConfig.aboutText || 'Transforming raw data into intelligent decisions. Specializing in AI-driven analytics and digital transformation.'}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIconMap[social.label] || Cpu;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg glass-panel border border-neon-cyan/30 flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-cyber-dark transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-orbitron font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-neon-cyan" />
              NAVIGATION
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-muted-foreground hover:text-neon-cyan transition-colors text-sm font-mono"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Systems */}
          <div>
            <h4 className="font-orbitron font-bold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-neon-purple" />
              SYSTEMS
            </h4>
            <ul className="space-y-2">
              {systemLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-muted-foreground hover:text-neon-purple transition-colors text-sm font-mono"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <h4 className="font-orbitron font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              SYSTEM_STATUS
            </h4>
            <div className="space-y-3 text-sm">
              {statusRows.map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-muted-foreground font-mono">{row.label}</span>
                  <span className="text-neon-cyan font-mono">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neon-cyan/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-mono flex items-center gap-2 flex-wrap">
              <span>{footerConfig.copyrightPrefix} {currentYear} {footerConfig.brandName || site.siteName || 'ALEX.MORGAN'}</span>
              <span className="hidden md:inline">|</span>
              <span className="flex items-center gap-1">
                {footerConfig.builtWithText || 'BUILT_WITH'} <Heart className="w-4 h-4 text-neon-pink fill-neon-pink" />
              </span>
            </p>
            
            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-lg glass-panel border border-neon-cyan/30 flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-cyber-dark transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
