import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Section } from '@/contexts/ContentContext';

interface SectionEditorProps {
  section: Section;
  onClose: () => void;
  onSave: (updates: Partial<Section>) => void;
}

const SectionEditor = ({ section, onClose, onSave }: SectionEditorProps) => {
  const [content, setContent] = useState(section.content || {});
  const [title, setTitle] = useState(section.title);

  const handleSave = () => {
    onSave({ title, content });
  };

  // Default content structures for each section type
  const renderEditor = () => {
    switch (section.type) {
      case 'hero':
        return <HeroEditor content={content} onChange={setContent} />;
      case 'about':
        return <AboutEditor content={content} onChange={setContent} />;
      case 'skills':
        return <SkillsEditor content={content} onChange={setContent} />;
      case 'projects':
        return <ProjectsEditor content={content} onChange={setContent} />;
      case 'experience':
        return <ExperienceEditor content={content} />;
      case 'testimonials':
        return <TestimonialsEditor content={content} />;
      case 'contact':
        return <ContactEditor content={content} onChange={setContent} />;
      default:
        return (
          <div className="text-center py-12 text-muted-foreground">
            No editor available for this section type.
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-cyber-dark/90 backdrop-blur-xl"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-2xl border border-neon-cyan/30 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neon-cyan/20">
          <div>
            <h2 className="text-xl font-orbitron font-bold text-white">EDIT_SECTION</h2>
            <p className="text-sm text-muted-foreground font-mono">{section.type.toUpperCase()}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title Input (admin list name) */}
        <div className="p-6 border-b border-neon-cyan/10">
          <label className="text-xs font-mono text-neon-cyan mb-2 block">SECTION_TITLE (admin list)</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-cyber-dark/50 border-neon-cyan/30 text-white"
          />
        </div>
        {/* Display heading (shown on page) */}
        <div className="px-6 pb-4 border-b border-neon-cyan/10">
          <label className="text-xs font-mono text-neon-cyan mb-2 block">SECTION_HEADING (displayed on page, optional)</label>
          <Input
            value={(content?.sectionHeading as string) || ''}
            onChange={(e) => setContent((c: any) => ({ ...c, sectionHeading: e.target.value }))}
            placeholder="e.g. IDENTITY.ANALYSIS or leave empty for default"
            className="bg-cyber-dark/50 border-neon-cyan/30 text-white"
          />
        </div>

        {/* Layout & Media */}
        <div className="px-6 pb-4 border-b border-neon-cyan/10">
          <label className="text-xs font-mono text-neon-cyan mb-2 block">LAYOUT & MEDIA</label>
          <div className="grid gap-3">
<div className="space-y-3">
          <label className="text-xs font-mono text-neon-cyan mb-2 block">SECTION_IMAGE</label>
          
          {/* Image URL Input */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Paste image URL or upload file below</p>
            <Input
              value={(content?.imageUrl as string) || ''}
              onChange={(e) => setContent((c: any) => ({ ...c, imageUrl: e.target.value }))}
              placeholder="https://example.com/image.png"
              className="bg-cyber-dark/50 border-neon-cyan/30 text-white font-mono text-sm"
            />
          </div>

          {/* Upload Buttons */}
          <div className="flex items-center gap-2">
            <label className="flex-1">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      setContent((c: any) => ({ ...c, imageUrl: ev.target?.result as string }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <div className="w-full px-4 py-2 rounded-lg border border-dashed border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 flex items-center justify-center gap-2 transition-colors cursor-pointer">
                <Plus className="w-4 h-4" />
                Upload Image
              </div>
            </label>
            {content?.imageUrl && (
              <Button
                onClick={() => setContent((c: any) => ({ ...c, imageUrl: undefined }))}
                className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Image Preview */}
          {content?.imageUrl && (
            <div className="mt-4 p-3 rounded-lg bg-cyber-dark/30 border border-neon-cyan/20">
              <p className="text-xs font-mono text-muted-foreground mb-2">PREVIEW</p>
              <img src={content.imageUrl} alt="section preview" className="w-full max-h-40 object-cover rounded-lg border border-neon-cyan/20" />
              <p className="text-xs text-muted-foreground mt-2 break-all">Size: {Math.round((content.imageUrl as string).length / 1024)} KB</p>
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-3 gap-2 items-center">
              <div>
                <label className="text-xs font-mono text-neon-cyan mb-2 block">ALIGNMENT</label>
                <div className="flex gap-2">
                  {['left', 'center', 'right'].map((a) => (
                    <button
                      key={a}
                      onClick={() => setContent((c: any) => ({ ...c, alignment: a }))}
                      className={`px-3 py-2 rounded-lg text-sm font-mono transition-all ${content?.alignment === a ? 'bg-neon-cyan text-cyber-dark' : 'bg-cyber-dark/50 border border-neon-cyan/20 text-white'}`}
                    >
                      {a.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-neon-cyan mb-2 block">WIDTH</label>
                <div className="flex gap-2">
                  {['contained', 'full'].map((w) => (
                    <button
                      key={w}
                      onClick={() => setContent((c: any) => ({ ...c, width: w }))}
                      className={`px-3 py-2 rounded-lg text-sm font-mono transition-all ${content?.width === w ? 'bg-neon-cyan text-cyber-dark' : 'bg-cyber-dark/50 border border-neon-cyan/20 text-white'}`}
                    >
                      {w.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-neon-cyan mb-2 block">MOBILE CENTER</label>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!content?.mobileCenter}
                    onChange={(e) => setContent((c: any) => ({ ...c, mobileCenter: e.target.checked }))}
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-sm text-muted-foreground">Center content on small screens</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderEditor()}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-neon-cyan/20">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-muted text-muted-foreground hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-neon-cyan text-cyber-dark font-bold hover:bg-neon-cyan/80"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Hero Section Editor
const HeroEditor = ({ content, onChange }: { content: any; onChange: (c: any) => void }) => {
  const data = {
    name: content.name || 'Alex Morgan',
    title: content.title || 'Digital Technology Analyst',
    description: content.description || 'Transforming raw data into intelligent decisions.',
    ctaPrimary: content.ctaPrimary || 'INITIALIZE.EXPLORATION',
    ctaSecondary: content.ctaSecondary || 'ESTABLISH.CONNECTION',
    ...content
  };

  const update = (key: string, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-mono text-neon-cyan mb-2 block">NAME</label>
        <Input value={data.name} onChange={(e) => update('name', e.target.value)} className="bg-cyber-dark/50 border-neon-cyan/30 text-white" />
      </div>
      <div>
        <label className="text-xs font-mono text-neon-cyan mb-2 block">TITLE</label>
        <Input value={data.title} onChange={(e) => update('title', e.target.value)} className="bg-cyber-dark/50 border-neon-cyan/30 text-white" />
      </div>
      <div>
        <label className="text-xs font-mono text-neon-cyan mb-2 block">DESCRIPTION</label>
        <Textarea value={data.description} onChange={(e) => update('description', e.target.value)} rows={3} className="bg-cyber-dark/50 border-neon-cyan/30 text-white resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-mono text-neon-cyan mb-2 block">PRIMARY_CTA</label>
          <Input value={data.ctaPrimary} onChange={(e) => update('ctaPrimary', e.target.value)} className="bg-cyber-dark/50 border-neon-cyan/30 text-white" />
        </div>
        <div>
          <label className="text-xs font-mono text-neon-cyan mb-2 block">SECONDARY_CTA</label>
          <Input value={data.ctaSecondary} onChange={(e) => update('ctaSecondary', e.target.value)} className="bg-cyber-dark/50 border-neon-cyan/30 text-white" />
        </div>
      </div>
    </div>
  );
};

// About Section Editor
const AboutEditor = ({ content, onChange }: { content: any; onChange: (c: any) => void }) => {
  const data = {
    bio: content.bio || 'Digital Technology Analyst with expertise in transforming complex data ecosystems...',
    stats: content.stats || [
      { label: 'Years Experience', value: '8+' },
      { label: 'Projects Completed', value: '150+' },
      { label: 'Happy Clients', value: '50+' },
      { label: 'Data Points Analyzed', value: '25M+' },
    ],
    ...content
  };

  const updateStat = (index: number, field: string, value: string) => {
    const newStats = [...data.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    onChange({ ...data, stats: newStats });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-mono text-neon-cyan mb-2 block">BIOGRAPHY</label>
        <Textarea value={data.bio} onChange={(e) => onChange({ ...data, bio: e.target.value })} rows={5} className="bg-cyber-dark/50 border-neon-cyan/30 text-white resize-none" />
      </div>
      <div>
        <label className="text-xs font-mono text-neon-cyan mb-2 block">STATS</label>
        <div className="space-y-2">
          {data.stats.map((stat: any, index: number) => (
            <div key={index} className="flex gap-2">
              <Input value={stat.label} onChange={(e) => updateStat(index, 'label', e.target.value)} placeholder="Label" className="flex-1 bg-cyber-dark/50 border-neon-cyan/30 text-white" />
              <Input value={stat.value} onChange={(e) => updateStat(index, 'value', e.target.value)} placeholder="Value" className="w-24 bg-cyber-dark/50 border-neon-cyan/30 text-white" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Skills Section Editor
const SkillsEditor = ({ content, onChange }: { content: any; onChange: (c: any) => void }) => {
  const data = {
    categories: content.categories || [
      { name: 'Data Analytics', skills: ['Python', 'SQL', 'Tableau'] },
      { name: 'Cloud', skills: ['AWS', 'Azure', 'GCP'] },
      { name: 'AI/ML', skills: ['TensorFlow', 'PyTorch', 'Scikit-learn'] },
    ],
    ...content
  };

  const updateCategory = (catIndex: number, newName: string) => {
    const newCategories = [...data.categories];
    newCategories[catIndex] = { ...newCategories[catIndex], name: newName };
    onChange({ ...data, categories: newCategories });
  };

  const updateSkill = (catIndex: number, skillIndex: number, value: string) => {
    const newCategories = [...data.categories];
    newCategories[catIndex].skills[skillIndex] = value;
    onChange({ ...data, categories: newCategories });
  };

  const addSkill = (catIndex: number) => {
    const newCategories = [...data.categories];
    newCategories[catIndex].skills.push('New Skill');
    onChange({ ...data, categories: newCategories });
  };

  const removeSkill = (catIndex: number, skillIndex: number) => {
    const newCategories = [...data.categories];
    newCategories[catIndex].skills.splice(skillIndex, 1);
    onChange({ ...data, categories: newCategories });
  };

  return (
    <div className="space-y-6">
      {data.categories.map((category: any, catIndex: number) => (
        <div key={catIndex} className="p-4 rounded-lg bg-cyber-dark/30 border border-neon-cyan/20">
          <Input
            value={category.name}
            onChange={(e) => updateCategory(catIndex, e.target.value)}
            className="mb-3 bg-cyber-dark/50 border-neon-cyan/30 text-white font-bold"
          />
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill: string, skillIndex: number) => (
              <div key={skillIndex} className="flex items-center gap-1 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30">
                <input
                  value={skill}
                  onChange={(e) => updateSkill(catIndex, skillIndex, e.target.value)}
                  className="bg-transparent text-neon-cyan text-sm outline-none w-20"
                />
                <button onClick={() => removeSkill(catIndex, skillIndex)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addSkill(catIndex)}
              className="px-3 py-1 rounded-full border border-dashed border-neon-cyan/50 text-neon-cyan text-sm hover:bg-neon-cyan/10"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Projects Section Editor
const ProjectsEditor = ({ content, onChange }: { content: any; onChange: (c: any) => void }) => {
  const data = {
    projects: content.projects || [
      { title: 'Enterprise Data Platform', description: 'Comprehensive data analytics platform', technologies: ['Python', 'AWS'], metrics: [{ label: 'Savings', value: '$2.4M' }] },
    ],
    ...content
  };

  const updateProject = (index: number, field: string, value: string) => {
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onChange({ ...data, projects: newProjects });
  };

  return (
    <div className="space-y-4">
      {data.projects.map((project: any, index: number) => (
        <div key={index} className="p-4 rounded-lg bg-cyber-dark/30 border border-neon-cyan/20">
          <Input
            value={project.title}
            onChange={(e) => updateProject(index, 'title', e.target.value)}
            placeholder="Project Title"
            className="mb-2 bg-cyber-dark/50 border-neon-cyan/30 text-white font-bold"
          />
          <Textarea
            value={project.description}
            onChange={(e) => updateProject(index, 'description', e.target.value)}
            placeholder="Description"
            rows={2}
            className="mb-2 bg-cyber-dark/50 border-neon-cyan/30 text-white resize-none"
          />
        </div>
      ))}
    </div>
  );
};

// Experience Section Editor
const ExperienceEditor = ({ content }: { content: any }) => {
  const data = {
    experiences: content.experiences || [
      { title: 'Senior Analyst', company: 'TechVision', period: '2022 - Present', description: 'Leading digital transformation' },
    ],
    ...content
  };

  return (
    <div className="space-y-4">
      {data.experiences.map((exp: any, index: number) => (
        <div key={index} className="p-4 rounded-lg bg-cyber-dark/30 border border-neon-cyan/20">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Input value={exp.title} readOnly placeholder="Title" className="bg-cyber-dark/50 border-neon-cyan/30 text-white" />
            <Input value={exp.company} readOnly placeholder="Company" className="bg-cyber-dark/50 border-neon-cyan/30 text-white" />
          </div>
          <Input value={exp.period} readOnly placeholder="Period" className="mb-2 bg-cyber-dark/50 border-neon-cyan/30 text-white" />
          <Textarea value={exp.description} readOnly placeholder="Description" rows={2} className="bg-cyber-dark/50 border-neon-cyan/30 text-white resize-none" />
        </div>
      ))}
    </div>
  );
};

// Testimonials Section Editor
const TestimonialsEditor = ({ content }: { content: any }) => {
  const data = {
    testimonials: content.testimonials || [
      { quote: 'Exceptional work!', author: 'John Doe', role: 'CEO', company: 'TechCorp' },
    ],
    ...content
  };

  return (
    <div className="space-y-4">
      {data.testimonials.map((testimonial: any, index: number) => (
        <div key={index} className="p-4 rounded-lg bg-cyber-dark/30 border border-neon-cyan/20">
          <Textarea value={testimonial.quote} readOnly placeholder="Quote" rows={3} className="mb-2 bg-cyber-dark/50 border-neon-cyan/30 text-white resize-none" />
          <div className="grid grid-cols-3 gap-2">
            <Input value={testimonial.author} readOnly placeholder="Author" className="bg-cyber-dark/50 border-neon-cyan/30 text-white" />
            <Input value={testimonial.role} readOnly placeholder="Role" className="bg-cyber-dark/50 border-neon-cyan/30 text-white" />
            <Input value={testimonial.company} readOnly placeholder="Company" className="bg-cyber-dark/50 border-neon-cyan/30 text-white" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Contact Section Editor
const ContactEditor = ({ content, onChange }: { content: any; onChange: (c: any) => void }) => {
  const data = {
    email: content.email || 'alex.morgan@email.com',
    location: content.location || 'San Francisco, CA',
    phone: content.phone || '+1 (555) 123-4567',
    ...content
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-mono text-neon-cyan mb-2 block">EMAIL</label>
        <Input value={data.email} onChange={(e) => onChange({ ...data, email: e.target.value })} className="bg-cyber-dark/50 border-neon-cyan/30 text-white" />
      </div>
      <div>
        <label className="text-xs font-mono text-neon-cyan mb-2 block">LOCATION</label>
        <Input value={data.location} onChange={(e) => onChange({ ...data, location: e.target.value })} className="bg-cyber-dark/50 border-neon-cyan/30 text-white" />
      </div>
      <div>
        <label className="text-xs font-mono text-neon-cyan mb-2 block">PHONE</label>
        <Input value={data.phone} onChange={(e) => onChange({ ...data, phone: e.target.value })} className="bg-cyber-dark/50 border-neon-cyan/30 text-white" />
      </div>
    </div>
  );
};

export default SectionEditor;
