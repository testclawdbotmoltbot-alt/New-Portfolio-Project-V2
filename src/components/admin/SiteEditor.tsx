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
        <div className="flex items-start gap-4 mt-2">
          <p className="text-xs text-muted-foreground">Leave empty to use the default icon.</p>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => onChange({ logoUrl: ev.target?.result as string });
                  reader.readAsDataURL(file);
                }
              }}
            />
            <div className="px-3 py-2 rounded-lg border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10">Upload Logo</div>
          </label>
        </div>
        {site.logoUrl && (
          <div className="mt-3">
            <img src={site.logoUrl} alt="logo preview" className="w-28 h-12 object-contain rounded-lg border border-neon-cyan/20 bg-cyber-dark/40" />
          </div>
        )}
      </div>
    </div>
  );
}
