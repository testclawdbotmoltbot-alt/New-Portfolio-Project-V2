import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, ChevronDown } from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  shortDesc: string;
  image?: string;
  tech: string[];
  impact: string;
  status: string;
}

export default function ProjectsEditor() {
  const { getSectionItems, addItemToSection, updateSectionItem, deleteSectionItem } = useContent();
  const [projects, setProjects] = useState<ProjectItem[]>(getSectionItems('projects') || []);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectItem>({
    id: '',
    title: '',
    description: '',
    shortDesc: '',
    image: '',
    tech: [],
    impact: '',
    status: 'Completed',
  });

  const handleAddNew = () => {
    setFormData({
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      shortDesc: '',
      image: '',
      tech: [],
      impact: '',
      status: 'Completed',
    });
    setEditingId(null);
  };

  const handleEdit = (item: ProjectItem) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      alert('Please fill in at least title and description');
      return;
    }

    if (editingId) {
      updateSectionItem('projects', editingId, formData);
      setProjects(prev => prev.map(p => p.id === editingId ? formData : p));
    } else {
      addItemToSection('projects', formData);
      setProjects(prev => [...prev, formData]);
    }
    
    setFormData({
      id: '',
      title: '',
      description: '',
      shortDesc: '',
      image: '',
      tech: [],
      impact: '',
      status: 'Completed',
    });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this project?')) {
      deleteSectionItem('projects', id);
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-orbitron font-bold text-neon-cyan">PROJECT ITEMS</h3>
        <Button
          onClick={handleAddNew}
          className="bg-neon-cyan text-cyber-dark hover:bg-neon-cyan/80 gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      {/* Add/Edit Form */}
      {editingId === null && formData.title === '' ? (
        <div className="text-center text-muted-foreground py-4">
          Click "Add Project" to create a new entry
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-4 rounded-lg border border-neon-cyan/30 space-y-4"
        >
          <div className="grid gap-3">
            <div className="grid gap-2">
              <Label className="text-xs font-mono text-neon-cyan">PROJECT_TITLE</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-cyber-dark/50 border-neon-cyan/30"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-xs font-mono text-neon-cyan">SHORT_DESCRIPTION</Label>
              <Input
                value={formData.shortDesc}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                className="bg-cyber-dark/50 border-neon-cyan/30"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-xs font-mono text-neon-cyan">FULL_DESCRIPTION</Label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-cyber-dark/50 border border-neon-cyan/30 rounded-md text-white min-h-24 p-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label className="text-xs font-mono text-neon-cyan">STATUS</Label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="bg-cyber-dark/50 border border-neon-cyan/30 rounded-md text-white p-2"
                >
                  <option>Completed</option>
                  <option>In Progress</option>
                  <option>Planned</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label className="text-xs font-mono text-neon-cyan">IMAGE_URL</Label>
                <Input
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="bg-cyber-dark/50 border-neon-cyan/30"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label className="text-xs font-mono text-neon-cyan">IMPACT</Label>
              <Input
                value={formData.impact}
                placeholder="e.g., $2.4M savings"
                onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                className="bg-cyber-dark/50 border-neon-cyan/30"
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
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => {
                setEditingId(null);
                setFormData({ id: '', title: '', description: '', shortDesc: '', image: '', tech: [], impact: '', status: 'Completed' });
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
              {editingId ? 'Update' : 'Create'} Project
            </Button>
          </div>
        </motion.div>
      )}

      {/* Projects List */}
      <div className="space-y-2">
        <h4 className="text-sm font-mono text-neon-cyan mb-3">({projects.length}) ENTRIES</h4>
        <AnimatePresence>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-panel p-3 rounded-lg border border-neon-purple/30 hover:border-neon-purple/50 transition-colors"
            >
              <div
                onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                className="cursor-pointer flex items-start gap-3 justify-between"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-neon-cyan truncate">{project.title}</h4>
                  <p className="text-xs text-muted-foreground">{project.shortDesc}</p>
                  <p className="text-xs text-neon-purple">{project.status}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-neon-purple transition-transform flex-shrink-0 ${
                    expandedId === project.id ? 'rotate-180' : ''
                  }`}
                />
              </div>

              {expandedId === project.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-neon-purple/20 space-y-2 text-xs"
                >
                  <p className="text-foreground">{project.description}</p>
                  {project.impact && (
                    <p className="text-neon-cyan font-bold">Impact: {project.impact}</p>
                  )}
                  {project.tech.length > 0 && (
                    <div>
                      <p className="text-neon-cyan font-bold mb-1">Tech Stack:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 bg-neon-purple/20 rounded text-neon-purple">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.image && (
                    <div className="mt-2">
                      <img src={project.image} alt={project.title} className="max-h-32 rounded border border-neon-purple/20" />
                    </div>
                  )}

                  <div className="flex gap-2 justify-end mt-3 pt-2 border-t border-neon-purple/20">
                    <Button
                      onClick={() => handleEdit(project)}
                      variant="outline"
                      className="text-xs border-neon-cyan/30 hover:bg-neon-cyan/10"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(project.id)}
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
