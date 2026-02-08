import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Section {
  id: string;
  type: 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'testimonials' | 'contact' | 'custom';
  title: string;
  content: any;
  isVisible: boolean;
  order: number;
}

export interface NavLink {
  label: string;
  href: string;
  isVisible?: boolean;
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  logoUrl: string;
}

export interface NavConfig {
  items: NavLink[];
  ctaLabel: string;
  adminLabel: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon?: string;
}

export interface FooterStatusRow {
  label: string;
  value: string;
}

export interface FooterConfig {
  brandName: string;
  tagline: string;
  aboutText: string;
  copyrightPrefix: string;
  builtWithText: string;
  navLinks: FooterLink[];
  systemLinks: FooterLink[];
  socialLinks: SocialLink[];
  statusRows: FooterStatusRow[];
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
  };
  background: {
    type: 'solid' | 'gradient' | 'image';
    value: string;
    overlay?: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export const defaultTheme: Theme = {
  id: 'cyberpunk',
  name: 'Cyberpunk',
  colors: {
    primary: '#00FFFF',
    secondary: '#BF00FF',
    accent: '#FF00FF',
    background: '#050508',
    surface: '#0A0A14',
    text: '#FFFFFF',
    textMuted: '#94A3B8',
  },
  background: {
    type: 'image',
    value: '/cyberpunk-bg.jpg',
    overlay: 'rgba(5, 5, 8, 0.7)',
  },
  fonts: {
    heading: 'Orbitron',
    body: 'Rajdhani',
  },
};

export const presetThemes: Theme[] = [
  defaultTheme,
  {
    id: 'midnight',
    name: 'Midnight Blue',
    colors: {
      primary: '#3B82F6',
      secondary: '#6366F1',
      accent: '#8B5CF6',
      background: '#0F172A',
      surface: '#1E293B',
      text: '#F8FAFC',
      textMuted: '#94A3B8',
    },
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  },
  {
    id: 'sunset',
    name: 'Neon Sunset',
    colors: {
      primary: '#F97316',
      secondary: '#EC4899',
      accent: '#FBBF24',
      background: '#1A0A00',
      surface: '#2D1810',
      text: '#FFF7ED',
      textMuted: '#FDBA74',
    },
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #1A0A00 0%, #4A1810 100%)',
    },
    fonts: {
      heading: 'Orbitron',
      body: 'Rajdhani',
    },
  },
  {
    id: 'matrix',
    name: 'Matrix Green',
    colors: {
      primary: '#00FF41',
      secondary: '#008F11',
      accent: '#003B00',
      background: '#000000',
      surface: '#0D0208',
      text: '#00FF41',
      textMuted: '#008F11',
    },
    background: {
      type: 'solid',
      value: '#000000',
    },
    fonts: {
      heading: 'Courier New',
      body: 'Courier New',
    },
  },
  {
    id: 'elegant',
    name: 'Elegant Dark',
    colors: {
      primary: '#D4AF37',
      secondary: '#8B7355',
      accent: '#C0C0C0',
      background: '#0A0A0A',
      surface: '#1A1A1A',
      text: '#F5F5F5',
      textMuted: '#A0A0A0',
    },
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
  },
];

const defaultSiteConfig: SiteConfig = {
  siteName: 'ALEX.MORGAN',
  tagline: 'DIGITAL_ANALYST.exe',
  logoUrl: '',
};

const defaultNavConfig: NavConfig = {
  items: [
    { label: 'HOME', href: '#hero', isVisible: true },
    { label: 'PROFILE', href: '#about', isVisible: true },
    { label: 'MODULES', href: '#skills', isVisible: true },
    { label: 'ARCHIVES', href: '#projects', isVisible: true },
    { label: 'LOG', href: '#experience', isVisible: true },
    { label: 'DATA', href: '#testimonials', isVisible: true },
    { label: 'CONNECT', href: '#contact', isVisible: true },
  ],
  ctaLabel: 'INITIATE',
  adminLabel: 'ADMIN',
};

const defaultFooterConfig: FooterConfig = {
  brandName: 'ALEX.MORGAN',
  tagline: 'DIGITAL_ANALYST.exe',
  aboutText: 'Transforming raw data into intelligent decisions. Specializing in AI-driven analytics and digital transformation.',
  copyrightPrefix: '©',
  builtWithText: 'BUILT_WITH REACT + TAILWIND',
  navLinks: [
    { label: 'HOME', href: '#hero' },
    { label: 'PROFILE', href: '#about' },
    { label: 'MODULES', href: '#skills' },
    { label: 'ARCHIVES', href: '#projects' },
  ],
  systemLinks: [
    { label: 'DATA_ANALYTICS', href: '#skills' },
    { label: 'CLOUD_ARCH', href: '#skills' },
    { label: 'AI_ML', href: '#skills' },
    { label: 'SECURITY', href: '#skills' },
  ],
  socialLinks: [
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'Discord', href: '#' },
  ],
  statusRows: [
    { label: 'UPTIME', value: '99.99%' },
    { label: 'LATENCY', value: '12ms' },
    { label: 'ENCRYPTION', value: 'AES-256' },
    { label: 'VERSION', value: 'v2.0.26' },
  ],
};

interface ContentContextType {
  sections: Section[];
  theme: Theme;
  site: SiteConfig;
  navigation: NavConfig;
  footer: FooterConfig;
  updateSection: (id: string, updates: Partial<Section>) => void;
  addSection: (section: Omit<Section, 'id'>) => string;
  deleteSection: (id: string) => void;
  reorderSections: (newOrder: string[]) => void;
  updateTheme: (theme: Theme) => void;
  applyPresetTheme: (themeId: string) => void;
  updateSite: (config: Partial<SiteConfig>) => void;
  updateNavigation: (config: Partial<NavConfig>) => void;
  updateFooter: (config: Partial<FooterConfig>) => void;
  exportData: () => string;
  importData: (json: string) => boolean;
}

const defaultSections: Section[] = [
  { id: 'hero', type: 'hero', title: 'Hero Section', content: {}, isVisible: true, order: 0 },
  { id: 'about', type: 'about', title: 'About Section', content: {}, isVisible: true, order: 1 },
  { id: 'skills', type: 'skills', title: 'Skills Section', content: {}, isVisible: true, order: 2 },
  { id: 'projects', type: 'projects', title: 'Projects Section', content: {}, isVisible: true, order: 3 },
  { id: 'experience', type: 'experience', title: 'Experience Section', content: {}, isVisible: true, order: 4 },
  { id: 'testimonials', type: 'testimonials', title: 'Testimonials Section', content: {}, isVisible: true, order: 5 },
  { id: 'contact', type: 'contact', title: 'Contact Section', content: {}, isVisible: true, order: 6 },
];

const ContentContext = createContext<ContentContextType | undefined>(undefined);

function readSectionsFromStorage(): Section[] {
  if (typeof window === 'undefined') return defaultSections;
  try {
    const s = localStorage.getItem('portfolio_sections');
    return s ? JSON.parse(s) : defaultSections;
  } catch {
    return defaultSections;
  }
}

function readThemeFromStorage(): Theme {
  if (typeof window === 'undefined') return defaultTheme;
  try {
    const t = localStorage.getItem('portfolio_theme');
    return t ? JSON.parse(t) : defaultTheme;
  } catch {
    return defaultTheme;
  }
}

function readGlobalFromStorage(): { site: SiteConfig; navigation: NavConfig; footer: FooterConfig } {
  if (typeof window === 'undefined') return { site: defaultSiteConfig, navigation: defaultNavConfig, footer: defaultFooterConfig };
  try {
    const g = localStorage.getItem('portfolio_global');
    if (!g) return { site: defaultSiteConfig, navigation: defaultNavConfig, footer: defaultFooterConfig };
    const parsed = JSON.parse(g);
    return {
      site: { ...defaultSiteConfig, ...parsed.site },
      navigation: { ...defaultNavConfig, ...parsed.navigation, items: Array.isArray(parsed.navigation?.items) ? parsed.navigation.items : defaultNavConfig.items },
      footer: {
        ...defaultFooterConfig,
        ...parsed.footer,
        navLinks: Array.isArray(parsed.footer?.navLinks) ? parsed.footer.navLinks : defaultFooterConfig.navLinks,
        systemLinks: Array.isArray(parsed.footer?.systemLinks) ? parsed.footer.systemLinks : defaultFooterConfig.systemLinks,
        socialLinks: Array.isArray(parsed.footer?.socialLinks) ? parsed.footer.socialLinks : defaultFooterConfig.socialLinks,
        statusRows: Array.isArray(parsed.footer?.statusRows) ? parsed.footer.statusRows : defaultFooterConfig.statusRows,
      },
    };
  } catch {
    return { site: defaultSiteConfig, navigation: defaultNavConfig, footer: defaultFooterConfig };
  }
}

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<Section[]>(readSectionsFromStorage);
  const [theme, setTheme] = useState<Theme>(readThemeFromStorage);
  const [global, setGlobal] = useState(readGlobalFromStorage);
  const site = global.site;
  const navigation = global.navigation;
  const footer = global.footer;

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'portfolio_sections' && e.newValue) {
        try { setSections(JSON.parse(e.newValue)); } catch (_) {}
      }
      if (e.key === 'portfolio_theme' && e.newValue) {
        try { setTheme(JSON.parse(e.newValue)); } catch (_) {}
      }
      if (e.key === 'portfolio_global' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setGlobal(prev => ({ ...prev, ...parsed, site: { ...defaultSiteConfig, ...parsed.site }, navigation: { ...defaultNavConfig, ...parsed.navigation }, footer: { ...defaultFooterConfig, ...parsed.footer } }));
        } catch (_) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio_sections', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('portfolio_theme', JSON.stringify(theme));
    applyThemeToCSS(theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('portfolio_global', JSON.stringify({ site, navigation, footer }));
  }, [site, navigation, footer]);

  const applyThemeToCSS = (theme: Theme) => {
    const root = document.documentElement;
    root.style.setProperty('--neon-cyan', theme.colors.primary);
    root.style.setProperty('--neon-purple', theme.colors.secondary);
    root.style.setProperty('--neon-pink', theme.colors.accent);
    root.style.setProperty('--cyber-dark', theme.colors.background);
    root.style.setProperty('--cyber-panel', theme.colors.surface);
  };

  const updateSection = (id: string, updates: Partial<Section>) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const addSection = (section: Omit<Section, 'id'>): string => {
    const id = uuidv4();
    const newSection = { ...section, id };
    setSections(prev => [...prev, newSection]);
    return id;
  };

  const deleteSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const reorderSections = (newOrder: string[]) => {
    setSections(prev => {
      const reordered = newOrder.map((id, index) => {
        const section = prev.find(s => s.id === id);
        return section ? { ...section, order: index } : null;
      }).filter(Boolean) as Section[];
      return reordered;
    });
  };

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const applyPresetTheme = (themeId: string) => {
    const preset = presetThemes.find(t => t.id === themeId);
    if (preset) setTheme(preset);
  };

  const updateSite = (config: Partial<SiteConfig>) => {
    setGlobal(prev => ({ ...prev, site: { ...prev.site, ...config } }));
  };

  const updateNavigation = (config: Partial<NavConfig>) => {
    setGlobal(prev => ({ ...prev, navigation: { ...prev.navigation, ...config } }));
  };

  const updateFooter = (config: Partial<FooterConfig>) => {
    setGlobal(prev => ({ ...prev, footer: { ...prev.footer, ...config } }));
  };

  const exportData = (): string => {
    return JSON.stringify({ sections, theme, site, navigation, footer }, null, 2);
  };

  const importData = (json: string): boolean => {
    try {
      const data = JSON.parse(json);
      if (data.sections && data.theme) {
        setSections(data.sections);
        setTheme(data.theme);
        if (data.site) setGlobal(prev => ({ ...prev, site: { ...defaultSiteConfig, ...data.site } }));
        if (data.navigation) setGlobal(prev => ({ ...prev, navigation: { ...defaultNavConfig, ...data.navigation } }));
        if (data.footer) setGlobal(prev => ({ ...prev, footer: { ...defaultFooterConfig, ...data.footer } }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <ContentContext.Provider value={{
      sections,
      theme,
      site,
      navigation,
      footer,
      updateSection,
      addSection,
      deleteSection,
      reorderSections,
      updateTheme,
      applyPresetTheme,
      updateSite,
      updateNavigation,
      updateFooter,
      exportData,
      importData,
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
