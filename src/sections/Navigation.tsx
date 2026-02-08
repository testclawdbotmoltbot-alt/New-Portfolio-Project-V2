import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useContent } from '@/contexts/ContentContext';

const Navigation = () => {
  const { site, navigation: navConfig } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = (navConfig.items || []).filter((item) => item.isVisible !== false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sectionIds = navItems.map(item => item.href.replace('#', ''));
      for (const id of [...sectionIds].reverse()) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-cyber-dark/90 backdrop-blur-xl border-b border-neon-cyan/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-3 group"
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
              <div className="hidden sm:block">
                <div className="font-orbitron font-bold text-white group-hover:text-neon-cyan transition-colors">
                  {site.siteName || 'ALEX.MORGAN'}
                </div>
                <div className="text-xs font-mono text-neon-cyan/70">{site.tagline || 'DIGITAL_ANALYST.exe'}</div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`relative px-4 py-2 text-sm font-mono transition-all duration-300 ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-neon-cyan'
                      : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.href.replace('#', '') && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-neon-cyan shadow-glow-cyan"
                    />
                  )}
                </a>
              ))}
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-mono text-neon-purple hover:text-white transition-all duration-300 flex items-center gap-2"
                title="Admin Login"
              >
                <LogIn className="w-4 h-4" />
                {navConfig.adminLabel || 'ADMIN'}
              </Link>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-neon-cyan text-cyber-dark font-bold hover:bg-neon-cyan/80 hover:shadow-glow-cyan"
              >
                {navConfig.ctaLabel || 'INITIATE'}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg glass-panel border border-neon-cyan/50 flex items-center justify-center text-neon-cyan"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute top-0 right-0 bottom-0 w-80 bg-cyber-panel border-l border-neon-cyan/30 p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="font-orbitron font-bold text-white">NAVIGATION</div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg border border-neon-cyan/50 flex items-center justify-center text-neon-cyan"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`block px-4 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${
                      activeSection === item.href.replace('#', '')
                        ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/50'
                        : 'text-muted-foreground hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                >
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg font-mono text-sm text-neon-purple hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    <LogIn className="w-4 h-4" />
                    ADMIN_LOGIN
                  </Link>
                </motion.div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <Button
                  onClick={() => scrollToSection('#contact')}
                  className="w-full bg-neon-cyan text-cyber-dark font-bold"
                >
                  {navConfig.ctaLabel ? `${navConfig.ctaLabel}_CONNECTION` : 'INITIATE_CONNECTION'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
