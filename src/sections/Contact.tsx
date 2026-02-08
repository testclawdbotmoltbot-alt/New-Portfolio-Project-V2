import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Send, Mail, MapPin, Github, Linkedin, Twitter, 
  Terminal, Cpu, CheckCircle, Loader2, AlertTriangle,
  MessageSquare, Radio, Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Section } from '@/contexts/ContentContext';

const Contact = ({ section }: { section: Section }) => {
  const content = section?.content || {};
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const heading = (content.sectionHeading as string) || 'INITIATE.TRANSMISSION';
  const headingParts = heading.split('.');
  const headingPrimary = headingParts[0] || 'INITIATE';
  const headingSecondary = headingParts.slice(1).join('.') || 'TRANSMISSION';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    { icon: Mail, label: 'EMAIL', value: (content.email as string) || 'alex.morgan@email.com', href: `mailto:${(content.email as string) || 'alex.morgan@email.com'}`, color: 'neon-cyan' },
    { icon: Phone, label: 'PHONE', value: (content.phone as string) || '+1 (555) 000-0000', href: (content.phone as string) ? `tel:${content.phone}` : '#', color: 'neon-green' },
    { icon: MapPin, label: 'LOCATION', value: (content.location as string) || 'San Francisco, CA', href: '#', color: 'neon-purple' },
    { icon: Radio, label: 'STATUS', value: 'ACCEPTING_CONTRACTS', href: '#', color: 'neon-green' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#', color: 'hover:text-white' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:text-[#0077b5]' },
    { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-[#1da1f2]' },
    { icon: MessageSquare, label: 'Discord', href: '#', color: 'hover:text-[#5865f2]' },
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[200px]" />

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
            <span className="text-sm text-neon-cyan font-mono">ESTABLISH_CONNECTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold mb-4">
            <span className="text-white">{headingPrimary}.</span>
            <span className="text-gradient-cyber">{headingSecondary}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Secure communication channel established. Transmit your inquiry.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Status Panel */}
            <div className="glass-panel rounded-xl border border-neon-green/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-neon-green"
                />
                <span className="text-neon-green font-mono text-sm">SYSTEM.ONLINE</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Communication channels are open and encrypted. Response time: &lt; 24 hours.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl glass-panel border border-${method.color}/30 hover:border-${method.color} transition-all duration-300 group`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-${method.color}/20 border border-${method.color}/50 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <method.icon className={`w-5 h-5 text-${method.color}`} />
                  </div>
                  <div>
                    <div className={`text-xs font-mono text-${method.color}`}>{method.label}</div>
                    <div className="text-white font-medium">{method.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-mono text-neon-purple mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                NETWORK_NODES
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 rounded-xl glass-panel border border-neon-cyan/30 flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-cyber-dark transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Security Notice */}
            <div className="p-4 rounded-xl bg-neon-yellow/5 border border-neon-yellow/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-neon-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-mono text-neon-yellow mb-1">SECURITY_NOTICE</div>
                  <p className="text-xs text-muted-foreground">
                    All transmissions are encrypted using AES-256. Your data is protected.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="glass-panel rounded-xl border border-neon-cyan/30 overflow-hidden">
              {/* Form Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neon-cyan/20 bg-neon-cyan/5">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-neon-cyan" />
                  <span className="text-sm font-mono text-neon-cyan">TRANSMISSION_FORM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  <span className="text-xs font-mono text-neon-green">ENCRYPTED</span>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 rounded-full bg-neon-green/20 border border-neon-green flex items-center justify-center mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-neon-green" />
                    </motion.div>
                    <h4 className="text-2xl font-orbitron font-bold text-white mb-2">
                      TRANSMISSION_SENT
                    </h4>
                    <p className="text-muted-foreground">
                      Message encrypted and transmitted. Awaiting response.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div className="relative">
                        <label className="text-xs font-mono text-neon-cyan mb-2 block">
                          IDENTIFIER
                        </label>
                        <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'shadow-glow-cyan' : ''}`}>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            required
                            placeholder="Enter your name"
                            className="bg-cyber-dark/50 border-neon-cyan/30 text-white placeholder:text-muted-foreground focus:border-neon-cyan focus:ring-0"
                          />
                          {focusedField === 'name' && (
                            <motion.div
                              layoutId="focus-indicator"
                              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-cyan"
                            />
                          )}
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <label className="text-xs font-mono text-neon-cyan mb-2 block">
                          COMMUNICATION_NODE
                        </label>
                        <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'shadow-glow-cyan' : ''}`}>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                            placeholder="your@email.com"
                            className="bg-cyber-dark/50 border-neon-cyan/30 text-white placeholder:text-muted-foreground focus:border-neon-cyan focus:ring-0"
                          />
                          {focusedField === 'email' && (
                            <motion.div
                              layoutId="focus-indicator"
                              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-cyan"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="relative">
                      <label className="text-xs font-mono text-neon-cyan mb-2 block">
                        TRANSMISSION_SUBJECT
                      </label>
                      <div className={`relative transition-all duration-300 ${focusedField === 'subject' ? 'shadow-glow-cyan' : ''}`}>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                          required
                          placeholder="What is this regarding?"
                          className="bg-cyber-dark/50 border-neon-cyan/30 text-white placeholder:text-muted-foreground focus:border-neon-cyan focus:ring-0"
                        />
                        {focusedField === 'subject' && (
                          <motion.div
                            layoutId="focus-indicator"
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-cyan"
                          />
                        )}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <label className="text-xs font-mono text-neon-cyan mb-2 block">
                        MESSAGE_PAYLOAD
                      </label>
                      <div className={`relative transition-all duration-300 ${focusedField === 'message' ? 'shadow-glow-cyan' : ''}`}>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={5}
                          placeholder="Enter your message..."
                          className="bg-cyber-dark/50 border-neon-cyan/30 text-white placeholder:text-muted-foreground focus:border-neon-cyan focus:ring-0 resize-none"
                        />
                        {focusedField === 'message' && (
                          <motion.div
                            layoutId="focus-indicator"
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-cyan"
                          />
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-neon-cyan to-neon-blue text-cyber-dark font-bold py-6 hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          ENCRYPTING & TRANSMITTING...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          INITIATE_TRANSMISSION
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
