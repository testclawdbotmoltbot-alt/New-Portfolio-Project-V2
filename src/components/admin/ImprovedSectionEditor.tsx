import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Plus, Trash2, Upload, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Section } from '@/contexts/ContentContext';

interface ImprovedSectionEditorProps {
  section: Section;
  onClose: () => void;
  onSave: (updates: Partial<Section>) => void;
}

const ImprovedSectionEditor = ({ section, onClose, onSave }: ImprovedSectionEditorProps) => {
  const [content, setContent] = useState(section.content || {});
  const [title, setTitle] = useState(section.title);

  const handleSave = () => {
    onSave({ title, content });
    onClose();
  };

  const updateField = (key: string, value: any) => {
    setContent((c: any) => ({ ...c, [key]: value }));
  };

  const addArrayItem = (key: string, defaultItem: any = {}) => {
    setContent((c: any) => ({
      ...c,
      [key]: [...(c?.[key] || []), defaultItem]
    }));
  };

  const removeArrayItem = (key: string, index: number) => {
    setContent((c: any) => ({
      ...c,
      [key]: c?.[key]?.filter((_: any, i: number) => i !== index) || []
    }));
  };

  const updateArrayItem = (key: string, index: number, field: string, value: any) => {
    setContent((c: any) => ({
      ...c,
      [key]: c?.[key]?.map((item: any, i: number) => 
        i === index ? { ...item, [field]: value } : item
      ) || []
    }));
  };

  // HERO SECTION
  const renderHeroEditor = () => (
    <div className="space-y-4">
      <FormField label="Your Name" required>
        <Input value={content.name || ''} onChange={(e) => updateField('name', e.target.value)} placeholder="Alex Morgan" />
      </FormField>
      <FormField label="Your Title/Role" required>
        <Input value={content.title || ''} onChange={(e) => updateField('title', e.target.value)} placeholder="Digital Technology Analyst" />
      </FormField>
      <FormField label="Description" required>
        <Textarea value={content.description || ''} onChange={(e) => updateField('description', e.target.value)} placeholder="A brief description about yourself" rows={3} />
      </FormField>
      <FormField label="Primary Button Text">
        <Input value={content.ctaPrimary || ''} onChange={(e) => updateField('ctaPrimary', e.target.value)} placeholder="Explore My Work" />
      </FormField>
      <FormField label="Secondary Button Text">
        <Input value={content.ctaSecondary || ''} onChange={(e) => updateField('ctaSecondary', e.target.value)} placeholder="Get In Touch" />
      </FormField>
      <ImageUploadField label="Hero Background Image" value={content.imageUrl} onChange={(url) => updateField('imageUrl', url)} />
    </div>
  );

  // ABOUT SECTION
  const renderAboutEditor = () => (
    <div className="space-y-6">
      <div>
        <FormField label="Bio/Summary" required>
          <Textarea value={content.bio || ''} onChange={(e) => updateField('bio', e.target.value)} placeholder="Tell your professional story..." rows={4} />
        </FormField>
      </div>

      <div className="border-t border-neon-cyan/20 pt-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-neon-cyan">Statistics</h3>
          <Button onClick={() => addArrayItem('stats', { label: 'New Stat', value: '0' })} className="bg-neon-cyan/20 text-neon-cyan px-2 py-1 h-auto text-xs">
            <Plus className="w-3 h-3 mr-1" />Add
          </Button>
        </div>
        <div className="space-y-2">
          {(content.stats || []).map((stat: any, idx: number) => (
            <div key={idx} className="flex gap-2 p-2 rounded bg-cyber-dark/30 border border-neon-cyan/10">
              <Input value={stat.label || ''} onChange={(e) => updateArrayItem('stats', idx, 'label', e.target.value)} placeholder="Label" className="flex-1 text-xs h-8" />
              <Input value={stat.value || ''} onChange={(e) => updateArrayItem('stats', idx, 'value', e.target.value)} placeholder="Value" className="w-16 text-xs h-8" />
              <Button onClick={() => removeArrayItem('stats', idx)} className="bg-red-500/20 text-red-400 p-1 h-8 w-8">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <ImageUploadField label="Profile Picture" value={content.profileImage} onChange={(url) => updateField('profileImage', url)} />
    </div>
  );

  // SKILLS SECTION
  const renderSkillsEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-neon-cyan">Skill Categories ({(content.categories || []).length})</h3>
        <Button onClick={() => addArrayItem('categories', { name: 'New Category', skills: [] })} className="bg-neon-cyan/20 text-neon-cyan px-2 py-1 h-auto text-xs">
          <Plus className="w-3 h-3 mr-1" />Add Category
        </Button>
      </div>
      <div className="space-y-3">
        {(content.categories || []).map((cat: any, catIdx: number) => (
          <CollapsibleItem key={catIdx} title={cat.name || 'Unnamed'}>
            <div className="space-y-2 p-3 bg-cyber-dark/20 rounded">
              <Input value={cat.name || ''} onChange={(e) => updateArrayItem('categories', catIdx, 'name', e.target.value)} placeholder="Category name" className="text-xs" />
              <div className="flex flex-wrap gap-2">
                {(cat.skills || []).map((skill: string, skillIdx: number) => (
                  <div key={skillIdx} className="flex items-center gap-1 px-2 py-1 rounded bg-neon-cyan/10 border border-neon-cyan/30 text-xs">
                    <input 
                      value={skill} 
                      onChange={(e) => updateArrayItem('categories', catIdx, 'skills', (cat.skills || []).map((s: string, i: number) => i === skillIdx ? e.target.value : s))} 
                      className="bg-transparent text-neon-cyan outline-none w-20 text-xs" 
                    />
                    <button onClick={() => {
                      const newSkills = cat.skills.filter((_: string, i: number) => i !== skillIdx);
                      updateArrayItem('categories', catIdx, 'skills', newSkills);
                    }} className="text-red-400 hover:text-red-300">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button onClick={() => updateArrayItem('categories', catIdx, 'skills', [...(cat.skills || []), 'New Skill'])} className="px-2 py-1 rounded border border-dashed border-neon-cyan/50 text-neon-cyan text-xs hover:bg-neon-cyan/10">
                  +
                </button>
              </div>
              <Button onClick={() => removeArrayItem('categories', catIdx)} className="bg-red-500/20 text-red-400 text-xs h-7 w-full">
                <Trash2 className="w-3 h-3 mr-1" />Delete Category
              </Button>
            </div>
          </CollapsibleItem>
        ))}
      </div>
    </div>
  );

  // PROJECTS SECTION
  const renderProjectsEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-neon-cyan">Projects ({(content.projects || []).length})</h3>
        <Button onClick={() => addArrayItem('projects', { title: '', description: '', technologies: [] })} className="bg-neon-cyan/20 text-neon-cyan px-2 py-1 h-auto text-xs">
          <Plus className="w-3 h-3 mr-1" />Add
        </Button>
      </div>
      <div className="space-y-3">
        {(content.projects || []).map((project: any, idx: number) => (
          <CollapsibleItem key={idx} title={project.title || 'Untitled Project'}>
            <div className="space-y-2 p-3 bg-cyber-dark/20 rounded">
              <FormField label="Title" required>
                <Input value={project.title || ''} onChange={(e) => updateArrayItem('projects', idx, 'title', e.target.value)} placeholder="Project Name" className="text-xs" />
              </FormField>
              <FormField label="Description">
                <Textarea value={project.description || ''} onChange={(e) => updateArrayItem('projects', idx, 'description', e.target.value)} placeholder="Project description..." rows={2} />
              </FormField>
              <FormField label="Technologies (comma-separated)">
                <Input value={(project.technologies || []).join(', ')} onChange={(e) => updateArrayItem('projects', idx, 'technologies', e.target.value.split(',').map(t => t.trim()))} placeholder="React, TypeScript, Tailwind" className="text-xs" />
              </FormField>
              <ImageUploadField label="Project Image" value={project.image} onChange={(url) => updateArrayItem('projects', idx, 'image', url)} />
              <Button onClick={() => removeArrayItem('projects', idx)} className="bg-red-500/20 text-red-400 text-xs h-7 w-full">
                <Trash2 className="w-3 h-3 mr-1" />Delete Project
              </Button>
            </div>
          </CollapsibleItem>
        ))}
      </div>
    </div>
  );

  // EXPERIENCE SECTION
  const renderExperienceEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-neon-cyan">Work Experience ({(content.experiences || []).length})</h3>
        <Button onClick={() => addArrayItem('experiences', { title: '', company: '', period: '', description: '' })} className="bg-neon-cyan/20 text-neon-cyan px-2 py-1 h-auto text-xs">
          <Plus className="w-3 h-3 mr-1" />Add
        </Button>
      </div>
      <div className="space-y-3">
        {(content.experiences || []).map((exp: any, idx: number) => (
          <CollapsibleItem key={idx} title={`${exp.title || 'Untitled'} at ${exp.company || 'Company'}`}>
            <div className="space-y-2 p-3 bg-cyber-dark/20 rounded">
              <FormField label="Job Title" required>
                <Input value={exp.title || ''} onChange={(e) => updateArrayItem('experiences', idx, 'title', e.target.value)} placeholder="Senior Analyst" className="text-xs" />
              </FormField>
              <FormField label="Company">
                <Input value={exp.company || ''} onChange={(e) => updateArrayItem('experiences', idx, 'company', e.target.value)} placeholder="Company Name" className="text-xs" />
              </FormField>
              <FormField label="Period">
                <Input value={exp.period || ''} onChange={(e) => updateArrayItem('experiences', idx, 'period', e.target.value)} placeholder="2022 - Present" className="text-xs" />
              </FormField>
              <FormField label="Description">
                <Textarea value={exp.description || ''} onChange={(e) => updateArrayItem('experiences', idx, 'description', e.target.value)} placeholder="What did you do?" rows={2} />
              </FormField>
              <Button onClick={() => removeArrayItem('experiences', idx)} className="bg-red-500/20 text-red-400 text-xs h-7 w-full">
                <Trash2 className="w-3 h-3 mr-1" />Delete Experience
              </Button>
            </div>
          </CollapsibleItem>
        ))}
      </div>
    </div>
  );

  // TESTIMONIALS SECTION
  const renderTestimonialsEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-neon-cyan">Testimonials ({(content.testimonials || []).length})</h3>
        <Button onClick={() => addArrayItem('testimonials', { quote: '', author: '', role: '', company: '' })} className="bg-neon-cyan/20 text-neon-cyan px-2 py-1 h-auto text-xs">
          <Plus className="w-3 h-3 mr-1" />Add
        </Button>
      </div>
      <div className="space-y-3">
        {(content.testimonials || []).map((testimonial: any, idx: number) => (
          <CollapsibleItem key={idx} title={`"${testimonial.quote?.substring(0, 40) || 'Testimonial'}..."`}>
            <div className="space-y-2 p-3 bg-cyber-dark/20 rounded">
              <FormField label="Quote" required>
                <Textarea value={testimonial.quote || ''} onChange={(e) => updateArrayItem('testimonials', idx, 'quote', e.target.value)} placeholder="What did they say?" rows={2} />
              </FormField>
              <FormField label="Author Name">
                <Input value={testimonial.author || ''} onChange={(e) => updateArrayItem('testimonials', idx, 'author', e.target.value)} placeholder="John Doe" className="text-xs" />
              </FormField>
              <FormField label="Role">
                <Input value={testimonial.role || ''} onChange={(e) => updateArrayItem('testimonials', idx, 'role', e.target.value)} placeholder="CEO" className="text-xs" />
              </FormField>
              <FormField label="Company">
                <Input value={testimonial.company || ''} onChange={(e) => updateArrayItem('testimonials', idx, 'company', e.target.value)} placeholder="Company Name" className="text-xs" />
              </FormField>
              <Button onClick={() => removeArrayItem('testimonials', idx)} className="bg-red-500/20 text-red-400 text-xs h-7 w-full">
                <Trash2 className="w-3 h-3 mr-1" />Delete Testimonial
              </Button>
            </div>
          </CollapsibleItem>
        ))}
      </div>
    </div>
  );

  // CONTACT SECTION
  const renderContactEditor = () => (
    <div className="space-y-4">
      <FormField label="Email Address" required>
        <Input type="email" value={content.email || ''} onChange={(e) => updateField('email', e.target.value)} placeholder="your@email.com" />
      </FormField>
      <FormField label="Phone Number">
        <Input value={content.phone || ''} onChange={(e) => updateField('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
      </FormField>
      <FormField label="Location">
        <Input value={content.location || ''} onChange={(e) => updateField('location', e.target.value)} placeholder="City, Country" />
      </FormField>
    </div>
  );

  const getEditorForSection = () => {
    switch (section.type) {
      case 'hero': return renderHeroEditor();
      case 'about': return renderAboutEditor();
      case 'skills': return renderSkillsEditor();
      case 'projects': return renderProjectsEditor();
      case 'experience': return renderExperienceEditor();
      case 'testimonials': return renderTestimonialsEditor();
      case 'contact': return renderContactEditor();
      default: return <div className="text-center text-muted-foreground">No editor for this section type</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl glass-panel rounded-2xl border border-neon-cyan/30 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-cyber-panel/95 backdrop-blur border-b border-neon-cyan/20 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-orbitron font-bold text-white">Editing: {title}</h2>
            <p className="text-sm text-muted-foreground font-mono mt-1">{section.type.toUpperCase()} Section</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Section Title */}
          <div className="mb-6">
            <FormField label="Section Name" required>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Hero Section" className="text-sm font-bold" />
            </FormField>
          </div>

          {/* Section Heading */}
          <div className="mb-6">
            <FormField label="Section Heading (displayed on page)">
              <Input value={content.sectionHeading || ''} onChange={(e) => updateField('sectionHeading', e.target.value)} placeholder="e.g., MY SKILLS or leave empty" className="text-xs" />
            </FormField>
          </div>

          {/* Main Editor */}
          <div className="mt-6">
            {getEditorForSection()}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-cyber-panel/95 backdrop-blur border-t border-neon-cyan/20 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-mono">💡 All changes are automatically saved</p>
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="border-muted text-muted-foreground hover:text-white">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-neon-cyan text-cyber-dark font-bold hover:bg-neon-cyan/80 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save & Publish
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Reusable Components
const FormField = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div className="mb-3">
    <label className="text-xs font-mono text-neon-cyan mb-2 block">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
  </div>
);

const ImageUploadField = ({ label, value, onChange }: { label: string; value?: string; onChange: (url: string) => void }) => (
  <div className="p-3 rounded-lg bg-cyber-dark/50 border border-neon-cyan/20">
    {label && <p className="text-xs font-mono text-neon-cyan mb-2">{label}</p>}
    <div className="flex gap-2 mb-2">
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
                onChange(ev.target?.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <div className="w-full px-3 py-2 rounded-lg border border-dashed border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs">
          <Upload className="w-3 h-3" />
          Upload Image
        </div>
      </label>
      {value && <Button onClick={() => onChange('')} className="bg-red-500/20 text-red-400 p-2 h-9 w-9">
        <Trash2 className="w-3 h-3" />
      </Button>}
    </div>
    {value && (
      <div className="mt-2">
        <img src={value} alt="preview" className="w-full max-h-40 object-cover rounded-lg border border-neon-cyan/20" />
        <p className="text-xs text-muted-foreground mt-1">{Math.round((value.length / 1024))} KB</p>
      </div>
    )}
  </div>
);

const CollapsibleItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded border border-neon-cyan/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-cyber-dark/50 hover:bg-cyber-dark/70 transition-colors"
      >
        <span className="text-sm font-mono text-neon-cyan truncate">{title}</span>
        <ChevronDown className={`w-4 h-4 text-neon-cyan transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="p-0">{children}</div>}
    </div>
  );
};

export default ImprovedSectionEditor;
