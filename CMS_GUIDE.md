# Portfolio CMS - Complete User Guide

Welcome to the **Portfolio CMS** - a cyberpunk-themed content management system for managing your portfolio website.

## 🚀 Getting Started

### 1. Creating a New Account

1. Navigate to `/register` on your site
2. Fill in your details:
   - **Name**: Your display name
   - **Email**: Your login email
   - **Password**: Secure password (minimum 6 characters)
   - **Confirm Password**: Re-enter to verify
3. Click "CREATE_ACCOUNT"
4. You'll be automatically logged in and redirected to the admin dashboard

### 2. Logging In

1. Go to `/login`
2. Enter your registered email and password
3. Click "INITIATE LOGIN"
4. You'll have full access to manage your portfolio

## 📋 Admin Dashboard Features

The admin dashboard is organized into six main tabs for comprehensive portfolio management:

### **1. SITE & LOGO** (Globe icon)
Edit your portfolio's core branding:
- **Site Name**: Your portfolio's main title (appears in header/footer)
- **Tagline**: Short description or tagline
- **Logo Upload**: Add your logo image (PNG, JPG, or SVG recommended)
- **Layout Defaults**:
  - Alignment: left, center, or right
  - Width: contained (max-width) or full (100%)
  - Full Height Sections: Allow sections to use full viewport height
  - Mobile Center: Center content on small screens

### **2. NAVIGATION** (Top Panel icon)
Manage your site navigation menu:
- **CTA Button Label**: Text for the main call-to-action button
- **Admin Button Label**: Text for the admin access link
- **Add/Edit/Remove Nav Items**: Manage navigation menu links
  - Each item has a label, href (e.g., #hero, #about), and visibility toggle
  - Use drag-and-drop in the Sections tab to reorder

### **3. FOOTER** (Bottom Panel icon)
Manage footer content and links:
- **Branding Info**:
  - Brand Name
  - Tagline
  - About Text (brief description)
  - Copyright Prefix
  - Built With Text
- **Navigation Links**: Footer menu links
- **System Links**: Technical/category links
- **Social Links**: Social media and external profiles
- **Status Rows**: System metrics (uptime, latency, encryption, etc.)

### **4. PAGE SECTIONS** (Layers icon)
Manage and edit all content sections of your portfolio:

#### Available Sections:
- **Hero Section**: Your introduction with name, title, description, and CTAs
- **About Section**: Your bio, statistics, and profile picture
- **Skills Section**: Technical skills with categories
- **Projects Section**: Showcase your work/projects
- **Experience Section**: Work history and achievements
- **Testimonials Section**: Client/peer testimonials
- **Contact Section**: Contact information

#### Section Controls:
- **Drag to Reorder**: Hover over section and drag by the grip handle to change order
- **Visibility Toggle**: Eye icon to hide/show sections
- **Edit**: Pencil icon to open the section editor
- **Delete**: Trash icon to remove a section (use with caution)

#### Editing Section Content:
Click the edit icon to open a modal where you can:
- Edit section name and heading
- Manage section-specific content (items, text, images)
- Add/remove items (for experience, projects, skills, testimonials)
- Upload images where applicable
- All changes are automatically tracked

### **5. THEME** (Palette icon)
Customize the visual appearance of your portfolio:

#### Presets
- **Cyberpunk**: Neon cyan/purple/pink colors (default)
- **Ocean**: Cool blue tones
- **Sunset**: Warm orange/red tones
- **Forest**: Green nature-inspired theme
- **Plus more**: Additional preset themes available

#### Custom Colors
Fine-tune individual color values:
- Primary color
- Secondary color
- Accent color
- Background color
- Text color
- And more...

#### Fonts
Select typography:
- Heading font
- Body text font

#### Background
Set your site background:
- Solid colors
- Gradients
- Background images

### **6. SETTINGS** (Settings icon)

#### Data Management
- **Export Data**: Download your entire portfolio configuration as JSON backup
- **Import Data**: Restore from a previously exported JSON file

#### Quick Actions
- **View Website**: Preview your live portfolio
- **Logout**: Sign out of the admin panel

#### Layout & Viewports
Configure default section behavior:
- Default alignment
- Default width behavior
- Full-height section support
- Mobile centering

## 📝 Editing Different Content Types

### Hero Section
Edit your introduction:
- Your name
- Your title/role
- A description about yourself
- Primary and secondary button text
- Background image

### About Section
Showcase your background:
- Bio/professional summary
- Statistics (years of experience, projects completed, etc.)
- Profile picture

### Skills Section
Organize your technical expertise:
- Skill categories (Analytics, Cloud, AI/ML, etc.)
- Skills within each category
- Level/proficiency for each skill
- Visual icons (emojis)

### Projects Section
Highlight your work:
- Project title
- Short description
- Full description
- Technologies used
- Project impact/results
- Project status (Completed, In Progress, Planned)
- Project image

### Experience Section
Document your career:
- Job title
- Company name
- Location
- Time period
- Job description
- Key achievements
- Technologies used in the role
- Employment type (Full-time, Contract, etc.)

### Testimonials Section
Feature client/peer feedback:
- Quote text
- Author name
- Author role/title
- Company name

### Contact Section
Share contact information:
- Email address
- Phone number
- Location

## 💾 Saving & Data Persistence

- **Automatic Saving**: All changes are automatically saved to browser localStorage
- **Backup**: Use the Export function regularly to backup your data
- **Restore**: Use Import to restore from a backup JSON file

## 🔒 Security & Authentication

- **Secure Login**: Your password is stored locally in browser storage
- **Session Management**: You remain logged in until you click Logout
- **Data Storage**: All portfolio data is stored in browser localStorage (client-side)

## ⚙️ Tips & Best Practices

1. **Regular Backups**: Export your data weekly to have secure backups
2. **Image Quality**: Use optimized images (compressed) for faster load times
3. **Mobile Preview**: Use the Preview button to check mobile appearance
4. **Consistent Branding**: Keep colors and fonts consistent across sections
5. **Clear Descriptions**: Write clear, concise descriptions for projects and experience
6. **Update Regularly**: Keep your portfolio current with recent projects and achievements

## 🐛 Troubleshooting

### Lost Data?
1. Check browser localStorage (different browsers have separate storage)
2. Try importing from your backup JSON file
3. Data persists across browser sessions

### Login Issues?
1. Make sure email and password are correct
2. Check if you've registered an account first
3. Clear browser cookies and try again

### Changes Not Saving?
1. Check browser console for errors
2. Verify you have localStorage enabled
3. Try exporting to verify data exists

## 📱 Mobile & Responsive Design

The CMS is fully responsive:
- Mobile-touch friendly interface
- All features accessible on smaller screens
- Mobile navigation for menu on small devices
- Test responsiveness using the Preview button

## 🎨 Customization

### Colors
Colors use CSS custom properties that update in real-time:
- Primary: `--neon-cyan`
- Secondary: `--neon-purple`
- Accent: `--neon-pink`
- And more color variables...

### Fonts
Supports Google Fonts and system fonts through Tailwind CSS

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review validation error messages in forms
3. Use the Export/Import feature to backup/restore data
4. Check browser developer console for technical errors

---

**Happy Portfolio Building! 🚀**

For more information about the portfolio design, see the main README.md.
