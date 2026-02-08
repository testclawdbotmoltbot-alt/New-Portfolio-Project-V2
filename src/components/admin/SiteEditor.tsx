import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { SiteConfig } from '@/contexts/ContentContext';

interface SiteEditorProps {
  site: SiteConfig;
  onChange: (config: Partial<SiteConfig>) => void;
}

export default function SiteEditor({ site, onChange }: SiteEditorProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-2">
        <Label className="text-xs font-mono text-neon-cyan">SITE_NAME / LOGO TEXT</Label>
        <Input
          value={site.siteName}
          onChange={(e) => onChange({ siteName: e.target.value })}
          placeholder="ALEX.MORGAN"
          className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
        />
      </div>
      <div className="grid gap-2">
        <Label className="text-xs font-mono text-neon-cyan">TAGLINE</Label>
        <Input
          value={site.tagline}
          onChange={(e) => onChange({ tagline: e.target.value })}
          placeholder="DIGITAL_ANALYST.exe"
          className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
        />
      </div>
      <div className="grid gap-2">
        <Label className="text-xs font-mono text-neon-cyan">LOGO IMAGE URL (optional)</Label>
        <Input
          value={site.logoUrl}
          onChange={(e) => onChange({ logoUrl: e.target.value })}
          placeholder="https://... or /logo.png"
          className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
        />
        <p className="text-xs text-muted-foreground">Leave empty to use the default icon.</p>
      </div>
    </div>
  );
}
