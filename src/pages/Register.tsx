import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Cpu, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useContent } from '@/contexts/ContentContext';
import { generateDemoData } from '@/utils/demoData';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { importData } = useContent();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showDemoOption, setShowDemoOption] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoadDemoData = () => {
    const demoData = generateDemoData();
    const success = importData(JSON.stringify(demoData));
    if (success) {
      setTimeout(() => navigate('/admin'), 500);
    } else {
      setError('Failed to load demo data');
      setShowDemoOption(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(formData.name, formData.email, formData.password);
      if (success) {
        setSuccess(true);
        setShowDemoOption(true);
        // Auto-redirect if user doesn't choose demo data
        setTimeout(() => {
          if (!showDemoOption) {
            navigate('/admin');
          }
        }, 5000);
      } else {
        setError('Email already registered.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className="min-h-screen w-full bg-cyber-dark flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/4 left-1/4 pointer-events-none -z-10 w-96 h-96 max-w-[40vw] max-h-[50vh] bg-neon-purple/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 pointer-events-none -z-10 w-96 h-96 max-w-[40vw] max-h-[50vh] bg-neon-cyan/10 rounded-full blur-[150px]" />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-purple rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-pink mb-4"
          >
            <Cpu className="w-10 h-10 text-cyber-dark" />
          </motion.div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">
            CREATE_ACCOUNT
          </h1>
          <p className="text-muted-foreground font-mono">
            Register for admin access
          </p>
        </div>

        {/* Register Form */}
        <div className="glass-panel rounded-2xl border border-neon-purple/30 p-8">
          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-xs font-mono text-neon-green">SECURE_REGISTRATION</span>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-6"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          {success && !showDemoOption && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm mb-6"
            >
              <CheckCircle className="w-4 h-4" />
              Account created! Redirecting...
            </motion.div>
          )}

          {success && showDemoOption && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 mb-6 space-y-4"
            >
              <div className="flex items-center gap-2 text-neon-cyan">
                <CheckCircle className="w-5 h-5" />
                <p className="font-mono">Account created successfully!</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Would you like to load demo portfolio data to get started quickly? You can always customize or delete it later.
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleLoadDemoData}
                  className="flex-1 bg-neon-cyan text-cyber-dark font-bold hover:bg-neon-cyan/80"
                >
                  Load Demo Data
                </Button>
                <Button
                  onClick={() => navigate('/admin')}
                  variant="outline"
                  className="flex-1 border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
                >
                  Start Fresh
                </Button>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" style={{ display: success && showDemoOption ? 'none' : 'block' }}>
            {/* Name Field */}
            <div>
              <label className="text-xs font-mono text-neon-purple mb-2 block">
                FULL_NAME
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="John Doe"
                  className="pl-10 bg-cyber-dark/50 border-neon-purple/30 text-white placeholder:text-muted-foreground focus:border-neon-purple"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="text-xs font-mono text-neon-purple mb-2 block">
                EMAIL_ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="admin@example.com"
                  className="pl-10 bg-cyber-dark/50 border-neon-purple/30 text-white placeholder:text-muted-foreground focus:border-neon-purple"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs font-mono text-neon-purple mb-2 block">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-cyber-dark/50 border-neon-purple/30 text-white placeholder:text-muted-foreground focus:border-neon-purple"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-neon-purple transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="text-xs font-mono text-neon-purple mb-2 block">
                CONFIRM_PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  placeholder="••••••••"
                  className="pl-10 bg-cyber-dark/50 border-neon-purple/30 text-white placeholder:text-muted-foreground focus:border-neon-purple"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || success}
              className="w-full bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold py-6 hover:shadow-glow-purple transition-all duration-300"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  CREATE_ACCOUNT
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have access?{' '}
              <Link to="/login" className="text-neon-cyan hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Back to Site */}
          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-muted-foreground hover:text-white transition-colors">
              ← Return to main site
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            SECURE_REGISTRATION • DATA_ENCRYPTED
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
