import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Palette, Type, Image, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { presetThemes, type Theme } from '@/contexts/ContentContext';

interface ThemeEditorProps {
  theme: Theme;
  onUpdate: (theme: Theme) => void;
  onApplyPreset: (themeId: string) => void;
}

const ThemeEditor = ({ theme, onUpdate, onApplyPreset }: ThemeEditorProps) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'colors' | 'fonts' | 'background'>('presets');
  const [customTheme, setCustomTheme] = useState<Theme>(theme);

  const handleColorChange = (key: keyof Theme['colors'], value: string) => {
    const updated = {
      ...customTheme,
      colors: { ...customTheme.colors, [key]: value }
    };
    setCustomTheme(updated);
    onUpdate(updated);
  };

  const handleBackgroundChange = (key: keyof Theme['background'], value: string) => {
    const updated = {
      ...customTheme,
      background: { ...customTheme.background, [key]: value }
    };
    setCustomTheme(updated);
    onUpdate(updated);
  };

  const handleBackgroundFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      handleBackgroundChange('value', ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFontChange = (key: keyof Theme['fonts'], value: string) => {
    const updated = {
      ...customTheme,
      fonts: { ...customTheme.fonts, [key]: value }
    };
    setCustomTheme(updated);
    onUpdate(updated);
  };

  const tabs = [
    { id: 'presets', label: 'Presets', icon: Palette },
    { id: 'colors', label: 'Colors', icon: RefreshCw },
    { id: 'fonts', label: 'Fonts', icon: Type },
    { id: 'background', label: 'Background', icon: Image },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
                : 'text-muted-foreground hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="font-mono text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Presets */}
      {activeTab === 'presets' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {presetThemes.map((preset) => (
            <motion.button
              key={preset.id}
              onClick={() => onApplyPreset(preset.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                theme.id === preset.id
                  ? 'border-neon-cyan shadow-glow-cyan'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {/* Preview */}
              <div
                className="h-24 rounded-lg mb-4"
                style={{
                  background: preset.background.type === 'gradient'
                    ? preset.background.value
                    : preset.background.type === 'solid'
                    ? preset.background.value
                    : `linear-gradient(135deg, ${preset.colors.primary}22, ${preset.colors.secondary}22)`
                }}
              />

              {/* Colors */}
              <div className="flex gap-2 mb-3">
                <div className="w-6 h-6 rounded-full" style={{ background: preset.colors.primary }} />
                <div className="w-6 h-6 rounded-full" style={{ background: preset.colors.secondary }} />
                <div className="w-6 h-6 rounded-full" style={{ background: preset.colors.accent }} />
              </div>

              {/* Name */}
              <div className="flex items-center justify-between">
                <span className="font-orbitron font-bold text-white">{preset.name}</span>
                {theme.id === preset.id && (
                  <div className="w-6 h-6 rounded-full bg-neon-cyan flex items-center justify-center">
                    <Check className="w-4 h-4 text-cyber-dark" />
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Colors */}
      {activeTab === 'colors' && (
        <div className="glass-panel rounded-xl border border-neon-cyan/30 p-6">
          <h3 className="font-orbitron font-bold text-white mb-6 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-neon-cyan" />
            COLOR_PALETTE
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(customTheme.colors).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="text-xs font-mono text-neon-cyan uppercase">{key}</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => handleColorChange(key as any, e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer"
                  />
                  <Input
                    value={value}
                    onChange={(e) => handleColorChange(key as any, e.target.value)}
                    className="flex-1 bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
                  />
                </div>
              </div>
            ))}
            {/* Extra color picks */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-neon-cyan uppercase">muted</label>
              <div className="flex gap-2">
                <input type="color" value={customTheme.colors.muted || '#94A3B8'} onChange={(e) => handleColorChange('muted' as any, e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer" />
                <Input value={customTheme.colors.muted || ''} onChange={(e) => handleColorChange('muted' as any, e.target.value)} className="flex-1 bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-neon-cyan uppercase">highlight</label>
              <div className="flex gap-2">
                <input type="color" value={customTheme.colors.highlight || '#FFD166'} onChange={(e) => handleColorChange('highlight' as any, e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer" />
                <Input value={customTheme.colors.highlight || ''} onChange={(e) => handleColorChange('highlight' as any, e.target.value)} className="flex-1 bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fonts */}
      {activeTab === 'fonts' && (
        <div className="glass-panel rounded-xl border border-neon-cyan/30 p-6">
          <h3 className="font-orbitron font-bold text-white mb-6 flex items-center gap-2">
            <Type className="w-5 h-5 text-neon-cyan" />
            TYPOGRAPHY
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-neon-cyan mb-2 block">HEADING_FONT</label>
              <select
                value={customTheme.fonts.heading}
                onChange={(e) => handleFontChange('heading', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-cyber-dark/50 border border-neon-cyan/30 text-white"
              >
                <option value="Orbitron">Orbitron (Sci-Fi)</option>
                <option value="Inter">Inter (Modern)</option>
                <option value="Playfair Display">Playfair Display (Elegant)</option>
                <option value="Courier New">Courier New (Terminal)</option>
                <option value="Rajdhani">Rajdhani (Tech)</option>
              </select>
              <p className="mt-2 text-2xl font-bold" style={{ fontFamily: customTheme.fonts.heading }}>
                Sample Heading
              </p>
            </div>
            <div>
              <label className="text-xs font-mono text-neon-cyan mb-2 block">BODY_FONT</label>
              <select
                value={customTheme.fonts.body}
                onChange={(e) => handleFontChange('body', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-cyber-dark/50 border border-neon-cyan/30 text-white"
              >
                <option value="Rajdhani">Rajdhani (Tech)</option>
                <option value="Inter">Inter (Modern)</option>
                <option value="Courier New">Courier New (Terminal)</option>
              </select>
              <p className="mt-2 text-base" style={{ fontFamily: customTheme.fonts.body }}>
                This is sample body text to preview your font selection.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Background */}
      {activeTab === 'background' && (
        <div className="glass-panel rounded-xl border border-neon-cyan/30 p-6">
          <h3 className="font-orbitron font-bold text-white mb-6 flex items-center gap-2">
            <Image className="w-5 h-5 text-neon-cyan" />
            BACKGROUND
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-neon-cyan mb-2 block">BACKGROUND_TYPE</label>
              <div className="flex gap-2">
                {['solid', 'gradient', 'image'].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleBackgroundChange('type', type)}
                    className={`px-4 py-2 rounded-lg font-mono text-sm uppercase transition-all duration-300 ${
                      customTheme.background.type === type
                        ? 'bg-neon-cyan text-cyber-dark'
                        : 'bg-cyber-dark/50 border border-neon-cyan/30 text-white hover:border-neon-cyan'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {customTheme.background.type === 'solid' && (
              <div>
                <label className="text-xs font-mono text-neon-cyan mb-2 block">BACKGROUND_COLOR</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customTheme.background.value}
                    onChange={(e) => handleBackgroundChange('value', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer"
                  />
                  <Input
                    value={customTheme.background.value}
                    onChange={(e) => handleBackgroundChange('value', e.target.value)}
                    className="flex-1 bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
                  />
                </div>
              </div>
            )}

            {customTheme.background.type === 'gradient' && (
              <div>
                <label className="text-xs font-mono text-neon-cyan mb-2 block">GRADIENT_CSS</label>
                <Textarea
                  value={customTheme.background.value}
                  onChange={(e) => handleBackgroundChange('value', e.target.value)}
                  rows={3}
                  className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono resize-none"
                  placeholder="linear-gradient(135deg, #000 0%, #111 100%)"
                />
              </div>
            )}

            {customTheme.background.type === 'image' && (
              <div>
                <label className="text-xs font-mono text-neon-cyan mb-2 block">IMAGE_URL</label>
                <div className="flex gap-2">
                  <Input
                    value={customTheme.background.value}
                    onChange={(e) => handleBackgroundChange('value', e.target.value)}
                    className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
                    placeholder="/background-image.jpg"
                  />
                  <label className="cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleBackgroundFile(e.target.files?.[0])} />
                    <div className="px-3 py-2 rounded-lg border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10">Upload</div>
                  </label>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-mono text-neon-cyan mb-2 block">OVERLAY_OPACITY</label>
              <Input
                value={customTheme.background.overlay || ''}
                onChange={(e) => handleBackgroundChange('overlay', e.target.value)}
                className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
                placeholder="rgba(0,0,0,0.5)"
              />
            </div>

            {/* Preview */}
            <div
              className="h-32 rounded-lg mt-4"
              style={{
                background: customTheme.background.type === 'image'
                  ? `url(${customTheme.background.value}) center/cover`
                  : customTheme.background.value,
              }}
            >
              {customTheme.background.overlay && (
                <div
                  className="w-full h-full rounded-lg"
                  style={{ background: customTheme.background.overlay }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// TextArea component for gradient input
const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={`w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all ${className}`}
    {...props}
  />
);

export default ThemeEditor;
