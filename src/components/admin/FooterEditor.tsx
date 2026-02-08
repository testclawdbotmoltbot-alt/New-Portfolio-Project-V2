import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { FooterConfig } from '@/contexts/ContentContext';

interface FooterEditorProps {
  config: FooterConfig;
  onChange: (config: Partial<FooterConfig>) => void;
}

function LinkList({
  title,
  items,
  onUpdate,
  onAdd,
  onRemove,
  linkLabel = true,
}: {
  title: string;
  items: { label: string; href: string }[];
  onUpdate: (index: number, field: 'label' | 'href', value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  linkLabel?: boolean;
}) {
  return (
    <div>
      <Label className="text-xs font-mono text-neon-cyan mb-2 block">{title}</Label>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item.label}
              onChange={(e) => onUpdate(index, 'label', e.target.value)}
              placeholder="Label"
              className="flex-1 bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono text-sm"
            />
            {linkLabel && (
              <Input
                value={item.href}
                onChange={(e) => onUpdate(index, 'href', e.target.value)}
                placeholder="# or url"
                className="w-36 bg-cyber-dark/50 border-neon-cyan/30 text-neon-cyan font-mono text-sm"
              />
            )}
            <Button type="button" variant="ghost" size="icon" className="text-red-400 h-8 w-8 flex-shrink-0" onClick={() => onRemove(index)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" className="mt-2 border-neon-cyan/30 text-neon-cyan" onClick={onAdd}>
        <Plus className="w-4 h-4 mr-1" /> Add
      </Button>
    </div>
  );
}

export default function FooterEditor({ config, onChange }: FooterEditorProps) {
  const updateNavLinks = (index: number, field: 'label' | 'href', value: string) => {
    const navLinks = [...(config.navLinks || [])];
    navLinks[index] = { ...navLinks[index], [field]: value };
    onChange({ navLinks });
  };
  const updateSystemLinks = (index: number, field: 'label' | 'href', value: string) => {
    const systemLinks = [...(config.systemLinks || [])];
    systemLinks[index] = { ...systemLinks[index], [field]: value };
    onChange({ systemLinks });
  };
  const updateSocialLinks = (index: number, field: 'label' | 'href', value: string) => {
    const socialLinks = [...(config.socialLinks || [])];
    socialLinks[index] = { ...socialLinks[index], [field]: value };
    onChange({ socialLinks });
  };
  const updateStatusRows = (index: number, field: 'label' | 'value', value: string) => {
    const statusRows = [...(config.statusRows || [])];
    statusRows[index] = { ...statusRows[index], [field]: value };
    onChange({ statusRows });
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label className="text-xs font-mono text-neon-cyan">BRAND NAME</Label>
          <Input
            value={config.brandName}
            onChange={(e) => onChange({ brandName: e.target.value })}
            className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-xs font-mono text-neon-cyan">TAGLINE</Label>
          <Input
            value={config.tagline}
            onChange={(e) => onChange({ tagline: e.target.value })}
            className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-xs font-mono text-neon-cyan">ABOUT TEXT</Label>
          <Textarea
            value={config.aboutText}
            onChange={(e) => onChange({ aboutText: e.target.value })}
            rows={3}
            className="bg-cyber-dark/50 border-neon-cyan/30 text-white resize-none"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label className="text-xs font-mono text-neon-cyan">COPYRIGHT PREFIX</Label>
            <Input
              value={config.copyrightPrefix}
              onChange={(e) => onChange({ copyrightPrefix: e.target.value })}
              placeholder="©"
              className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-xs font-mono text-neon-cyan">BUILT WITH TEXT</Label>
            <Input
              value={config.builtWithText}
              onChange={(e) => onChange({ builtWithText: e.target.value })}
              placeholder="BUILT_WITH REACT + TAILWIND"
              className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <LinkList
          title="NAVIGATION LINKS"
          items={config.navLinks || []}
          onUpdate={updateNavLinks}
          onAdd={() => onChange({ navLinks: [...(config.navLinks || []), { label: 'NEW', href: '#' }] })}
          onRemove={(i) => onChange({ navLinks: config.navLinks.filter((_, idx) => idx !== i) })}
        />
        <LinkList
          title="SYSTEMS LINKS"
          items={config.systemLinks || []}
          onUpdate={updateSystemLinks}
          onAdd={() => onChange({ systemLinks: [...(config.systemLinks || []), { label: 'NEW', href: '#' }] })}
          onRemove={(i) => onChange({ systemLinks: config.systemLinks.filter((_, idx) => idx !== i) })}
        />
      </div>

      <div>
        <LinkList
          title="SOCIAL LINKS (use label: GitHub, LinkedIn, Twitter, Discord for icons)"
          items={config.socialLinks || []}
          onUpdate={updateSocialLinks}
          onAdd={() => onChange({ socialLinks: [...(config.socialLinks || []), { label: 'GitHub', href: '#' }] })}
          onRemove={(i) => onChange({ socialLinks: config.socialLinks.filter((_, idx) => idx !== i) })}
        />
      </div>

      <div>
        <Label className="text-xs font-mono text-neon-cyan mb-2 block">STATUS ROWS (label + value)</Label>
        <div className="space-y-2">
          {(config.statusRows || []).map((row, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={row.label}
                onChange={(e) => updateStatusRows(index, 'label', e.target.value)}
                placeholder="UPTIME"
                className="flex-1 bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono text-sm"
              />
              <Input
                value={row.value}
                onChange={(e) => updateStatusRows(index, 'value', e.target.value)}
                placeholder="99.99%"
                className="w-28 bg-cyber-dark/50 border-neon-cyan/30 text-neon-cyan font-mono text-sm"
              />
              <Button type="button" variant="ghost" size="icon" className="text-red-400 h-8 w-8 flex-shrink-0" onClick={() => onChange({ statusRows: config.statusRows.filter((_, i) => i !== index) })}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2 border-neon-cyan/30 text-neon-cyan"
          onClick={() => onChange({ statusRows: [...(config.statusRows || []), { label: 'NEW', value: '-' }] })}
        >
          <Plus className="w-4 h-4 mr-1" /> Add row
        </Button>
      </div>
    </div>
  );
}
