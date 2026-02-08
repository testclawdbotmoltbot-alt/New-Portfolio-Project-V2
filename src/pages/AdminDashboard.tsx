import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Palette, Layers, Settings, LogOut, 
  Eye, EyeOff, Trash2, GripVertical,
  Download, Upload, CheckCircle,
  Menu, X, Globe, PanelTop, PanelBottom, Bot, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useContent, type Section } from '@/contexts/ContentContext';
import SectionEditor from '@/components/admin/SectionEditor';
import ThemeEditor from '@/components/admin/ThemeEditor';
import SiteEditor from '@/components/admin/SiteEditor';
import NavigationEditor from '@/components/admin/NavigationEditor';
import FooterEditor from '@/components/admin/FooterEditor';

type AdminTab = 'site' | 'navigation' | 'footer' | 'sections' | 'theme' | 'settings';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { 
    sections, 
    theme, 
    site,
    navigation,
    footer,
    updateSection, 
    deleteSection, 
    reorderSections,
    updateTheme,
    applyPresetTheme,
    updateSite,
    updateNavigation,
    updateFooter,
    exportData,
    importData 
  } = useContent();
  
  const [activeTab, setActiveTab] = useState<AdminTab>('site');
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleToggleVisibility = (section: Section) => {
    updateSection(section.id, { isVisible: !section.isVisible });
    showSaveMessage(`Section "${section.title}" ${!section.isVisible ? 'shown' : 'hidden'}`);
  };

  const handleDelete = (section: Section) => {
    if (confirm(`Are you sure you want to delete "${section.title}"?`)) {
      deleteSection(section.id);
      showSaveMessage(`Section "${section.title}" deleted`);
    }
  };

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetId) {
      const newOrder = [...sections.map(s => s.id)];
      const draggedIndex = newOrder.indexOf(draggedItem);
      const targetIndex = newOrder.indexOf(targetId);
      
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedItem);
      
      reorderSections(newOrder);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    showSaveMessage('Section order updated');
  };

  const showSaveMessage = (message: string) => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showSaveMessage('Data exported successfully');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const success = importData(event.target?.result as string);
        if (success) {
          showSaveMessage('Data imported successfully');
        } else {
          alert('Invalid data format');
        }
      };
      reader.readAsText(file);
    }
  };

  const tabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: 'site', label: 'Site & Logo', icon: Globe },
    { id: 'navigation', label: 'Navigation', icon: PanelTop },
    { id: 'footer', label: 'Footer', icon: PanelBottom },
    { id: 'sections', label: 'Sections', icon: Layers },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cyber-dark flex relative overflow-hidden">
      {/* Sci-fi scan line overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)] h-full" />
      {/* Subtle grid */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-cyber-panel/95 backdrop-blur border-r border-neon-cyan/20 transform transition-transform duration-300 ${
        showMobileMenu ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo + ARIA vibe */}
        <div className="p-6 border-b border-neon-cyan/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center ring-2 ring-neon-cyan/30">
              <Bot className="w-5 h-5 text-cyber-dark" />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-neon-green"
              />
            </div>
            <div>
              <div className="font-orbitron font-bold text-white">CONTROL_PANEL</div>
              <div className="text-xs font-mono text-neon-cyan/70 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                ARIA_SYNC
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setShowMobileMenu(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-mono text-sm ${
                activeTab === tab.id
                  ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_12px_rgba(0,255,255,0.15)]'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-5 h-5 flex-shrink-0" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neon-cyan/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-neon-purple/20 border border-neon-purple/50 flex items-center justify-center">
              <span className="text-neon-purple font-bold">{user.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white truncate">{user.name}</div>
              <div className="text-xs text-muted-foreground truncate">{user.email}</div>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 relative z-10">
        {/* Header with ARIA status HUD */}
        <header className="sticky top-0 z-40 bg-cyber-dark/95 backdrop-blur-xl border-b border-neon-cyan/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden w-10 h-10 rounded-lg glass-panel border border-neon-cyan/30 flex items-center justify-center text-neon-cyan"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="text-xl font-orbitron font-bold text-white">
                {tabs.find(t => t.id === activeTab)?.label.toUpperCase()}
              </h1>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-neon-green/10 border border-neon-green/30">
                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-neon-green" />
                <span className="text-xs font-mono text-neon-green">SYSTEM_ONLINE</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Save Message */}
              <AnimatePresence>
                {saveMessage && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-green/10 border border-neon-green/30 text-neon-green text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {saveMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Preview Button */}
              <Button
                onClick={() => window.open('/', '_blank')}
                variant="outline"
                className="hidden sm:flex border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Site & Logo Tab */}
          {activeTab === 'site' && (
            <div className="glass-panel rounded-xl border border-neon-cyan/30 p-6 max-w-2xl">
              <h2 className="font-orbitron font-bold text-neon-cyan mb-2 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                BRANDING_AND_LOGO
              </h2>
              <p className="text-sm text-muted-foreground mb-6 font-mono">Site name, tagline, and logo used in header and footer.</p>
              <SiteEditor site={site} onChange={updateSite} />
            </div>
          )}

          {/* Navigation Tab */}
          {activeTab === 'navigation' && (
            <div className="glass-panel rounded-xl border border-neon-cyan/30 p-6 max-w-3xl">
              <h2 className="font-orbitron font-bold text-neon-cyan mb-2 flex items-center gap-2">
                <PanelTop className="w-5 h-5" />
                NAV_MENU
              </h2>
              <p className="text-sm text-muted-foreground mb-6 font-mono">Links, CTA label, and admin button. Add, remove, or hide items.</p>
              <NavigationEditor config={navigation} onChange={updateNavigation} />
            </div>
          )}

          {/* Footer Tab */}
          {activeTab === 'footer' && (
            <div className="glass-panel rounded-xl border border-neon-cyan/30 p-6 max-w-4xl">
              <h2 className="font-orbitron font-bold text-neon-cyan mb-2 flex items-center gap-2">
                <PanelBottom className="w-5 h-5" />
                FOOTER_CONTENT
              </h2>
              <p className="text-sm text-muted-foreground mb-6 font-mono">Brand, links, social, status rows, and copyright. Full control.</p>
              <FooterEditor config={footer} onChange={updateFooter} />
            </div>
          )}

          {/* Sections Tab */}
          {activeTab === 'sections' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Drag to reorder sections. Click to edit content.
                </p>
              </div>

              <div className="space-y-3">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    layout
                    draggable
                    onDragStart={() => handleDragStart(section.id)}
                    onDragOver={(e) => handleDragOver(e, section.id)}
                    onDragEnd={handleDragEnd}
                    className={`glass-panel rounded-xl border ${
                      section.isVisible ? 'border-neon-cyan/30' : 'border-muted/30 opacity-60'
                    } cursor-move transition-all duration-300 hover:border-neon-cyan/50`}
                  >
                    <div className="flex items-center gap-4 p-4">
                      {/* Drag Handle */}
                      <div className="text-muted-foreground">
                        <GripVertical className="w-5 h-5" />
                      </div>

                      {/* Section Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-neon-cyan">#{index + 1}</span>
                          <h3 className="font-orbitron font-bold text-white">{section.title}</h3>
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-muted-foreground uppercase">
                            {section.type}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleVisibility(section)}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            section.isVisible
                              ? 'bg-neon-green/20 text-neon-green hover:bg-neon-green/30'
                              : 'bg-muted/20 text-muted-foreground hover:bg-muted/30'
                          }`}
                          title={section.isVisible ? 'Hide section' : 'Show section'}
                        >
                          {section.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => setEditingSection(section)}
                          className="w-10 h-10 rounded-lg bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 flex items-center justify-center transition-colors"
                          title="Edit section"
                        >
                          <Settings className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(section)}
                          className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                          title="Delete section"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Theme Tab */}
          {activeTab === 'theme' && (
            <ThemeEditor 
              theme={theme} 
              onUpdate={updateTheme}
              onApplyPreset={applyPresetTheme}
            />
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Export/Import */}
              <div className="glass-panel rounded-xl border border-neon-cyan/30 p-6">
                <h3 className="font-orbitron font-bold text-white mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-neon-cyan" />
                  DATA_MANAGEMENT
                </h3>
                <p className="text-muted-foreground mb-6">
                  Export your portfolio data for backup or import previously saved data.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={handleExport}
                    className="bg-neon-cyan text-cyber-dark font-bold hover:bg-neon-cyan/80"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                    <div className="px-4 py-2 rounded-lg border border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10 flex items-center gap-2 transition-colors">
                      <Upload className="w-4 h-4" />
                      Import Data
                    </div>
                  </label>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-panel rounded-xl border border-neon-purple/30 p-6">
                <h3 className="font-orbitron font-bold text-white mb-4 flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-neon-purple" />
                  QUICK_ACTIONS
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => window.open('/', '_blank')}
                    variant="outline"
                    className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Website
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Section Editor Modal */}
      <AnimatePresence>
        {editingSection && (
          <SectionEditor
            section={editingSection}
            onClose={() => setEditingSection(null)}
            onSave={(updates) => {
              updateSection(editingSection.id, updates);
              setEditingSection(null);
              showSaveMessage(`Section "${editingSection.title}" updated`);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
