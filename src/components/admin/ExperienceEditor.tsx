import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, ChevronDown, Copy } from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export default function ExperienceEditor() {
  const { getSectionItems, addItemToSection, updateSectionItem, deleteSectionItem } = useContent();
  const [experiences, setExperiences] = useState<ExperienceItem[]>(getSectionItems('experience') || []);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ExperienceItem>({
    id: '',
    title: '',
    company: '',
    location: '',
    period: '',
    type: 'FULL_TIME',
    description: '',
    achievements: [],
    tech: [],
  });

  const handleAddNew = () => {
    setFormData({
      id: `exp-${Date.now()}`,
      title: '',
      company: '',
      location: '',
      period: '',
      type: 'FULL_TIME',
      description: '',
      achievements: [],
      tech: [],
    });
    setEditingId(null);
  };

  const handleEdit = (item: ExperienceItem) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleFieldChange = (id: string, field: keyof ExperienceItem, value: any) => {
    setExperiences(prev =>
      prev.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const handleSave = () => {
    if (!formData.title) {
      alert('Please enter a job title');
      return;
    }
    if (!formData.company) {
      alert('Please enter a company name');
      return;
    }
    if (!formData.period) {
      alert('Please enter the time period');
      return;
    }

    if (editingId) {
      updateSectionItem('experience', formData.id, formData);
      setExperiences(prev => prev.map(e => e.id === editingId ? formData : e));
    } else {
      addItemToSection('experience', formData);
      setExperiences([...experiences, formData]);
    }
    setFormData({
      id: '',
      title: '',
      company: '',
      location: '',
      period: '',
      type: 'FULL_TIME',
      description: '',
      achievements: [],
      tech: [],
    });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      deleteSectionItem('experience', id);
      setExperiences(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleDuplicate = (experience: ExperienceItem) => {
    const newExperience: ExperienceItem = {
      ...experience,
      id: `exp-${Date.now()}`,
      title: `${experience.title} (Copy)`,
    };
    addItemToSection('experience', newExperience);
    setExperiences([...experiences, newExperience]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-orbitron font-bold text-neon-cyan">EXPERIENCE ITEMS</h3>
        <Button
          onClick={handleAddNew}
          className="bg-neon-cyan text-cyber-dark hover:bg-neon-cyan/80 gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      {/* Add/Edit Form */}
      {editingId === null && formData.title === '' ? (
        <div className="text-center text-muted-foreground py-4">
          Click "Add Experience" to create a new entry
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-4 rounded-lg border border-neon-cyan/30 space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label className="text-xs font-mono text-neon-cyan">JOB_TITLE</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-cyber-dark/50 border-neon-cyan/30"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-mono text-neon-cyan">COMPANY</Label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-cyber-dark/50 border-neon-cyan/30"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-mono text-neon-cyan">LOCATION</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-cyber-dark/50 border-neon-cyan/30"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-mono text-neon-cyan">PERIOD</Label>
              <Input
                value={formData.period}
                placeholder="2023 - 2024"
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="bg-cyber-dark/50 border-neon-cyan/30"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-xs font-mono text-neon-cyan">DESCRIPTION</Label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-cyber-dark/50 border border-neon-cyan/30 rounded-md text-white min-h-20 p-2"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-xs font-mono text-neon-cyan">ACHIEVEMENTS (comma-separated)</Label>
            <textarea
              value={formData.achievements.join(', ')}
              onChange={(e) => setFormData({ ...formData, achievements: e.target.value.split(',').map(a => a.trim()) })}
              className="bg-cyber-dark/50 border border-neon-cyan/30 rounded-md text-white min-h-16 p-2"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-xs font-mono text-neon-cyan">TECH_STACK (comma-separated)</Label>
            <Input
              value={formData.tech.join(', ')}
              onChange={(e) => setFormData({ ...formData, tech: e.target.value.split(',').map(t => t.trim()) })}
              className="bg-cyber-dark/50 border-neon-cyan/30"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => {
                setEditingId(null);
                setFormData({ id: '', title: '', company: '', location: '', period: '', type: 'FULL_TIME', description: '', achievements: [], tech: [] });
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
              {editingId ? 'Update' : 'Create'} Experience
            </Button>
          </div>
        </motion.div>
      )}

      {/* Experiences List */}
      <div className="space-y-2">
        <h4 className="text-sm font-mono text-neon-cyan mb-3">({experiences.length}) ENTRIES</h4>
        <AnimatePresence>
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-panel p-3 rounded-lg border border-neon-purple/30 hover:border-neon-purple/50 transition-colors"
            >
              <div
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                className="cursor-pointer flex items-start gap-3 justify-between"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-neon-cyan truncate">{exp.title}</h4>
                  <p className="text-xs text-muted-foreground">{exp.company} • {exp.location}</p>
                  <p className="text-xs text-neon-purple">{exp.period}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-neon-purple transition-transform flex-shrink-0 ${
                    expandedId === exp.id ? 'rotate-180' : ''
                  }`}
                />
              </div>

              {expandedId === exp.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-neon-purple/20 space-y-2 text-xs"
                >
                  <p className="text-foreground">{exp.description}</p>
                  {exp.achievements.length > 0 && (
                    <div>
                      <p className="text-neon-cyan font-bold mb-1">Achievements:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                        {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
                      </ul>
                    </div>
                  )}
                  {exp.tech.length > 0 && (
                    <div>
                      <p className="text-neon-cyan font-bold mb-1">Tech:</p>
                      <div className="flex flex-wrap gap-1">
                        {exp.tech.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 bg-neon-purple/20 rounded text-neon-purple">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 justify-end mt-3 pt-2 border-t border-neon-purple/20">
                    <Button
                      onClick={() => handleDuplicate(exp)}
                      variant="outline"
                      className="text-xs border-neon-cyan/30 hover:bg-neon-cyan/10 gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </Button>
                    <Button
                      onClick={() => handleEdit(exp)}
                      variant="outline"
                      className="text-xs border-neon-cyan/30 hover:bg-neon-cyan/10"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(exp.id)}
                      variant="outline"
                      className="text-xs border-red-500/30 text-red-400 hover:bg-red-500/10 gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
