import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillItem {
  id: string;
  name: string;
  level: number;
  icon: string;
  category?: string;
}

export default function SkillsEditor() {
  const { getSectionItems, addItemToSection, updateSectionItem, deleteSectionItem } = useContent();
  const [skills, setSkills] = useState<SkillItem[]>(getSectionItems('skills') || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<SkillItem>({
    id: '',
    name: '',
    level: 75,
    icon: '📊',
    category: 'Other',
  });

  const handleAddNew = () => {
    setFormData({
      id: `skill-${Date.now()}`,
      name: '',
      level: 75,
      icon: '📊',
      category: 'Other',
    });
    setEditingId(null);
  };

  const handleEdit = (item: SkillItem) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleSave = () => {
    if (!formData.name) {
      alert('Please enter a skill name');
      return;
    }

    if (editingId) {
      updateSectionItem('skills', editingId, formData);
      setSkills(prev => prev.map(s => s.id === editingId ? formData : s));
    } else {
      addItemToSection('skills', formData);
      setSkills(prev => [...prev, formData]);
    }
    
    setFormData({
      id: '',
      name: '',
      level: 75,
      icon: '📊',
      category: 'Other',
    });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this skill?')) {
      deleteSectionItem('skills', id);
      setSkills(prev => prev.filter(s => s.id !== id));
    }
  };

  const categories = ['Analytics', 'Cloud', 'AI/ML', 'Development', 'Database', 'Tools', 'Other'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-orbitron font-bold text-neon-cyan">SKILL ITEMS</h3>
        <Button
          onClick={handleAddNew}
          className="bg-neon-cyan text-cyber-dark hover:bg-neon-cyan/80 gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </div>

      {/* Add/Edit Form */}
      {editingId === null && formData.name === '' ? (
        <div className="text-center text-muted-foreground py-4">
          Click "Add Skill" to create a new entry
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-4 rounded-lg border border-neon-cyan/30 space-y-4"
        >
          <div className="grid grid-cols-3 gap-3">
            <div className="grid gap-2">
              <Label className="text-xs font-mono text-neon-cyan">SKILL_NAME</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-cyber-dark/50 border-neon-cyan/30"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-mono text-neon-cyan">LEVEL (0-100)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                className="bg-cyber-dark/50 border-neon-cyan/30"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-mono text-neon-cyan">ICON (emoji)</Label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="bg-cyber-dark/50 border-neon-cyan/30 text-center"
                maxLength={2}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-xs font-mono text-neon-cyan">CATEGORY</Label>
            <select
              value={formData.category || 'Other'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bg-cyber-dark/50 border border-neon-cyan/30 rounded-md text-white p-2"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => {
                setEditingId(null);
                setFormData({ id: '', name: '', level: 75, icon: '📊', category: 'Other' });
              }}
              variant="outline"
              className="border-neon-cyan/30"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-neon-cyan text-cyber-dark hover:bg-neon-cyan/80"
            >
              {editingId ? 'Update' : 'Create'} Skill
            </Button>
          </div>
        </motion.div>
      )}

      {/* Skills List - Grid Layout */}
      <div className="space-y-4">
        <h4 className="text-sm font-mono text-neon-cyan mb-3">({skills.length}) TOTAL SKILLS</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <AnimatePresence>
            {skills.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="glass-panel p-4 rounded-lg border border-neon-purple/30 hover:border-neon-purple/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-3xl">{skill.icon}</div>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
                <h4 className="font-bold text-neon-cyan text-sm mb-1">{skill.name}</h4>
                <p className="text-xs text-neon-purple mb-2">{skill.category}</p>
                
                {/* Level Bar */}
                <div className="mb-3">
                  <div className="h-2 bg-cyber-dark/50 rounded-full overflow-hidden border border-neon-purple/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{skill.level}%</p>
                </div>

                <Button
                  onClick={() => handleEdit(skill)}
                  variant="outline"
                  className="w-full text-xs border-neon-cyan/30 hover:bg-neon-cyan/10"
                >
                  Edit
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
