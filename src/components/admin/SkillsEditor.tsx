import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Copy, ChevronUp, ChevronDown } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleDuplicate = (item: SkillItem) => {
    const newSkill: SkillItem = {
      ...item,
      id: `skill-${Date.now()}`,
      name: `${item.name} (Copy)`,
    };
    addItemToSection('skills', newSkill);
    setSkills(prev => [...prev, newSkill]);
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
  const filteredSkills = skills.filter(skill => 
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-orbitron font-bold text-neon-cyan mb-1">SKILL ITEMS</h3>
          <p className="text-xs text-muted-foreground">Manage technical skills and proficiency levels</p>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-neon-cyan text-cyber-dark hover:bg-neon-cyan/80 font-bold gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </div>

      {/* Search */}
      {skills.length > 3 && (
        <Input
          type="text"
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-cyber-dark/50 border-neon-cyan/30 text-white placeholder:text-muted-foreground"
        />
      )}

      {/* Add/Edit Form */}
      {editingId === null && formData.name === '' ? (
        <div className="text-center text-muted-foreground py-8">
          {skills.length === 0 ? (
            <div>
              <p className="mb-2">No skills yet. Click "Add Skill" to create one!</p>
            </div>
          ) : (
            <p>Select a skill to edit or create a new one</p>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 rounded-xl border border-neon-cyan/30 space-y-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-orbitron font-bold text-neon-cyan">{editingId ? 'EDIT SKILL' : 'NEW SKILL'}</h4>
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({ id: '', name: '', level: 75, icon: '📊', category: 'Other' });
              }}
              className="text-muted-foreground hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="grid gap-2 col-span-2 sm:col-span-2">
              <Label className="text-xs font-mono text-neon-cyan">SKILL NAME *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Python, React, AWS"
                className="bg-cyber-dark/50 border-neon-cyan/30 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-mono text-neon-cyan">LEVEL (0-100) *</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
                  className="bg-cyber-dark/50 border-neon-cyan/30 text-white"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-mono text-neon-cyan">ICON (emoji)</Label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value.slice(0, 2) })}
                className="bg-cyber-dark/50 border-neon-cyan/30 text-center text-lg"
                maxLength={2}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-xs font-mono text-neon-cyan">CATEGORY</Label>
            <select
              value={formData.category || 'Other'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bg-cyber-dark/50 border border-neon-cyan/30 rounded-md text-white p-2 text-sm"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Level preview */}
          <div className="space-y-2">
            <div className="h-2 bg-cyber-dark/50 rounded-full overflow-hidden border border-neon-cyan/30">
              <motion.div
                animate={{ width: `${formData.level}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-blue"
              />
            </div>
            <p className="text-xs text-neon-cyan text-right font-mono">{formData.level}% Proficiency</p>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button
              onClick={() => {
                setEditingId(null);
                setFormData({ id: '', name: '', level: 75, icon: '📊', category: 'Other' });
              }}
              variant="outline"
              className="border-neon-cyan/30 text-muted-foreground hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-neon-cyan text-cyber-dark hover:bg-neon-cyan/80 font-bold"
            >
              {editingId ? 'Update' : 'Create'} Skill
            </Button>
          </div>
        </motion.div>
      )}

      {/* Skills List */}
      <div className="space-y-3">
        <h4 className="text-sm font-mono text-neon-cyan">
            {filteredSkills.length > 0 && `(${filteredSkills.length}/${skills.length}) `}
          SKILLS
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="glass-panel p-4 rounded-xl border border-neon-purple/30 hover:border-neon-purple/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="text-3xl">{skill.icon}</div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleDuplicate(skill)}
                      className="p-1 hover:bg-neon-cyan/20 rounded transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3 h-3 text-neon-cyan" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="p-1 hover:bg-red-500/20 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
                  </div>
                </div>
                <h4 className="font-bold text-neon-cyan text-sm mb-1 truncate">{skill.name}</h4>
                <p className="text-xs text-neon-purple mb-3">{skill.category}</p>
                
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
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{skill.level}%</p>
                </div>

                <Button
                  onClick={() => handleEdit(skill)}
                  variant="outline"
                  className="w-full text-xs border-neon-cyan/30 hover:bg-neon-cyan/10 font-mono"
                >
                  EDIT
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
