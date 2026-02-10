import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SiteConfig } from '@/contexts/ContentContext';

interface SiteEditorProps {
  site: SiteConfig;
  onChange: (config: Partial<SiteConfig>) => void;
}

export default function SiteEditor({ site, onChange }: SiteEditorProps) {
  const handleLogoUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange({ logoUrl: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Site Name */}
      <div className="grid gap-2">
        <Label className="text-xs font-mono text-neon-cyan">SITE NAME</Label>
        <Input
          value={site.siteName || ''}
          onChange={(e) => onChange({ siteName: e.target.value })}
          placeholder="e.g., ALEX.MORGAN"
          className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
        />
        <p className="text-xs text-muted-foreground">Used as primary title throughout the site</p>
      </div>

      {/* Tagline */}
      <div className="grid gap-2">
        <Label className="text-xs font-mono text-neon-cyan">TAGLINE</Label>
        <Input
          value={site.tagline || ''}
          onChange={(e) => onChange({ tagline: e.target.value })}
          placeholder="e.g., DIGITAL_ANALYST.exe"
          className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
        />
        <p className="text-xs text-muted-foreground">Subtitle or brief description</p>
      </div>

      {/* Logo */}
      <div className="border-t border-neon-cyan/20 pt-6">
        <Label className="text-xs font-mono text-neon-cyan mb-3 block">LOGO UPLOAD</Label>
        <div className="p-4 rounded-lg bg-cyber-dark/50 border border-neon-cyan/20">
          {site.logoUrl && (
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                <img 
                  src={site.logoUrl} 
                  alt="Logo preview" 
                  className="max-w-xs h-auto max-h-32 rounded-lg border border-neon-cyan/30"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {Math.round((site.logoUrl.length / 1024) * 10) / 10} KB
                </p>
              </div>
              <Button
                onClick={() => onChange({ logoUrl: '' })}
                className="bg-red-500/20 text-red-400 hover:bg-red-500/30 h-8 w-8 p-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
          <label className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-dashed border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleLogoUpload(e.target.files?.[0])}
              className="hidden"
            />
            <Upload className="w-4 h-4" />
            <span className="text-sm">Choose Logo Image</span>
          </label>
          <p className="text-xs text-muted-foreground mt-2">PNG, JPG, or SVG recommended</p>
        </div>
      </div>

      {/* Layout Defaults */}
      <div className="border-t border-neon-cyan/20 pt-6 space-y-4">
        <h3 className="text-sm font-bold text-neon-cyan mb-4">LAYOUT DEFAULTS</h3>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label className="text-xs font-mono text-neon-cyan">DEFAULT ALIGNMENT</Label>
            <div className="flex gap-2">
              {['left', 'center', 'right'].map((value) => (
                <button
                  key={value}
                  onClick={() => onChange({ 
                    layoutDefaults: { ...(site.layoutDefaults || {}), alignment: value as 'left' | 'center' | 'right' } 
                  })}
                  className={`px-3 py-2 rounded-lg text-xs font-mono transition-all flex-1 ${
                    site.layoutDefaults?.alignment === value 
                      ? 'bg-neon-cyan text-cyber-dark' 
                      : 'bg-cyber-dark/50 border border-neon-cyan/30 text-white hover:bg-neon-cyan/20'
                  }`}
                >
                  {value.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-xs font-mono text-neon-cyan">DEFAULT WIDTH</Label>
            <div className="flex gap-2">
              {['contained', 'full'].map((value) => (
                <button
                  key={value}
                  onClick={() => onChange({ 
                    layoutDefaults: { ...(site.layoutDefaults || {}), width: value as 'contained' | 'full' } 
                  })}
                  className={`px-3 py-2 rounded-lg text-xs font-mono transition-all flex-1 ${
                    site.layoutDefaults?.width === value 
                      ? 'bg-neon-cyan text-cyber-dark' 
                      : 'bg-cyber-dark/50 border border-neon-cyan/30 text-white hover:bg-neon-cyan/20'
                  }`}
                >
                  {value.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-3 rounded-lg bg-cyber-dark/50 border border-neon-cyan/30 cursor-pointer hover:bg-neon-cyan/10 transition-colors">
            <input
              type="checkbox"
              checked={!!site.layoutDefaults?.fullHeight}
              onChange={(e) => onChange({ 
                layoutDefaults: { ...(site.layoutDefaults || {}), fullHeight: e.target.checked } 
              })}
              className="rounded border-neon-cyan/50 w-4 h-4"
            />
            <span className="text-sm text-muted-foreground">Full Height Sections</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg bg-cyber-dark/50 border border-neon-cyan/30 cursor-pointer hover:bg-neon-cyan/10 transition-colors">
            <input
              type="checkbox"
              checked={!!site.layoutDefaults?.mobileCenter}
              onChange={(e) => onChange({ 
                layoutDefaults: { ...(site.layoutDefaults || {}), mobileCenter: e.target.checked } 
              })}
              className="rounded border-neon-cyan/50 w-4 h-4"
            />
            <span className="text-sm text-muted-foreground">Mobile Center Content</span>
          </label>
        </div>
      </div>
    </div>
  );
}
