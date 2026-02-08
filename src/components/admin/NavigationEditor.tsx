import { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { NavConfig, NavLink } from '@/contexts/ContentContext';

interface NavigationEditorProps {
  config: NavConfig;
  onChange: (config: Partial<NavConfig>) => void;
}

export default function NavigationEditor({ config, onChange }: NavigationEditorProps) {
  const [newLabel, setNewLabel] = useState('');
  const [newHref, setNewHref] = useState('#hero');

  const updateItem = (index: number, updates: Partial<NavLink>) => {
    const items = [...(config.items || [])];
    items[index] = { ...items[index], ...updates };
    onChange({ items });
  };

  const removeItem = (index: number) => {
    const items = config.items.filter((_, i) => i !== index);
    onChange({ items });
  };

  const addItem = () => {
    if (!newLabel.trim()) return;
    onChange({ items: [...(config.items || []), { label: newLabel.trim(), href: newHref || '#hero', isVisible: true }] });
    setNewLabel('');
    setNewHref('#hero');
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label className="text-xs font-mono text-neon-cyan">CTA BUTTON LABEL</Label>
          <Input
            value={config.ctaLabel}
            onChange={(e) => onChange({ ctaLabel: e.target.value })}
            placeholder="INITIATE"
            className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-xs font-mono text-neon-cyan">ADMIN LINK LABEL</Label>
          <Input
            value={config.adminLabel}
            onChange={(e) => onChange({ adminLabel: e.target.value })}
            placeholder="ADMIN"
            className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
          />
        </div>
      </div>

      <div>
        <Label className="text-xs font-mono text-neon-cyan mb-3 block">NAV ITEMS (drag to reorder in Sections tab if needed)</Label>
        <div className="space-y-2">
          {(config.items || []).map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 rounded-lg bg-cyber-dark/50 border border-neon-cyan/20"
            >
              <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <Input
                value={item.label}
                onChange={(e) => updateItem(index, { label: e.target.value })}
                placeholder="Label"
                className="flex-1 bg-transparent border-neon-cyan/20 text-white font-mono text-sm"
              />
              <Input
                value={item.href}
                onChange={(e) => updateItem(index, { href: e.target.value })}
                placeholder="#hero"
                className="w-28 bg-transparent border-neon-cyan/20 text-neon-cyan font-mono text-sm"
              />
              <label className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={item.isVisible !== false}
                  onChange={(e) => updateItem(index, { isVisible: e.target.checked })}
                  className="rounded border-neon-cyan/50"
                />
                Show
              </label>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 flex-shrink-0"
                onClick={() => removeItem(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <Input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="New link label"
            className="flex-1 bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono"
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
          />
          <Input
            value={newHref}
            onChange={(e) => setNewHref(e.target.value)}
            placeholder="#section"
            className="w-32 bg-cyber-dark/50 border-neon-cyan/30 text-neon-cyan font-mono"
          />
          <Button type="button" onClick={addItem} className="bg-neon-cyan text-cyber-dark hover:bg-neon-cyan/80">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
