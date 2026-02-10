# Portfolio CMS - Complete Setup & Feature Guide

A fully functional **Headless CMS** for managing your portfolio website with a cyberpunk-themed admin interface.

## 🎯 Quick Start

### Creating Your Account

1. **Register**: Navigate to `/register` and create a new account
   - Enter your name, email, and password
   - After registration, you'll be offered to load demo data (recommended for first-time users)
   - Choose either "Load Demo Data" to explore with sample content or "Start Fresh" for a blank portfolio

2. **Login**: Go to `/login` with your credentials
   - You'll be directed to the admin dashboard after successful login

3. **Start Editing**: Access the admin dashboard to manage your portfolio

---

## 📊 Dashboard Tabs Explained

### Tab 1: SITE & LOGO 🌍
Manage your portfolio's core identity:
- **Site Name**: Main title (appears in navigation and footer)
- **Tagline**: Subtitle or professional description
- **Logo Upload**: Add your logo image
- **Layout Controls**:
  - Content alignment (left/center/right)
  - Container width (contained/full)
  - Enable full-height sections
  - Mobile-specific adjustments

**Best Practices**:
- Keep site name short and memorable
- Use high-quality logo files (PNG with transparency or SVG)
- Test layout changes on mobile preview

### Tab 2: NAVIGATION 📍
Control your site's navigation:
- **CTA Button**: Call-to-action button text (e.g., "INITIATE")
- **Admin Label**: Link text for admin access
- **Navigation Items**: Add/edit/remove menu links
  - Links use hash navigation (#hero, #about) or external URLs
  - Toggle visibility for each item
  - Reorder using drag-and-drop in the Sections tab

**Example Navigation**:
- HOME → #hero
- PROFILE → #about
- MODULES → #skills
- CONNECT → #contact

### Tab 3: FOOTER 📍
Comprehensive footer management:
- **Brand Information**: Name, tagline, about text, copyright
- **Navigation Links**: Footer menu links
- **System Links**: Technical/category links
- **Social Links**: GitHub, LinkedIn, Twitter, Discord, etc.
- **Status Rows**: Display metrics (uptime, latency, encryption, version)

**Customization Ideas**:
- Update social media links to your profiles
- Add relevant system information for your portfolio
- Modify status rows to show your metrics

### Tab 4: PAGE SECTIONS 📑
Manage all content sections:

#### Available Section Types:
1. **Hero Section** - Your introduction
2. **About Section** - Your background story
3. **Skills Section** - Technical expertise
4. **Projects Section** - Your work/portfolio
5. **Experience Section** - Work history
6. **Testimonials Section** - Client feedback
7. **Contact Section** - Contact information

#### Section Management Features:
- **Drag to Reorder**: Customize the order sections appear
- **Toggle Visibility**: Hide sections without deleting
- **Edit Content**: Add/edit section-specific items
- **Delete Sections**: Remove sections permanently

#### Editing Specific Sections:

**Hero Section**:
- Your name
- Professional title
- Introduction text
- Button labels (CTAs)
- Background image

**About Section**:
- Biography/professional summary
- Achievement statistics
- Profile picture

**Skills Section**:
- Skill name and proficiency level
- Skill category
- Emoji/icon for visual representation
- Organize by categories

**Projects Section**:
- Project title and descriptions
- Technologies used
- Project impact/metrics
- Project status
- Project image
- Short and full descriptions

**Experience Section**:
- Job title
- Company name and location
- Employment period
- Job description
- Key achievements
- Technologies used
- Employment type

**Testimonials Section**:
- Client quote
- Client name
- Role/position
- Company name

**Contact Section**:
- Email address
- Phone number
- Location

### Tab 5: THEME 🎨
Customize visual appearance:

#### Theme Presets
- Cyberpunk (neon cyan/purple)
- Ocean (cool blues)
- Sunset (warm oranges)
- Forest (greens)
- And more...

#### Custom Theming
- **Colors**: Primary, secondary, accent, background, text
- **Fonts**: Heading and body text fonts
- **Background**: Solid, gradient, or image backgrounds

**Tips**:
- Test presets to find your style
- Use high contrast for readability
- Match colors with your brand

### Tab 6: SETTINGS ⚙️
Essential management tools:

#### Data Management
- **Export Data**: Backup your entire portfolio as JSON
  - Useful for backup and transfer
  - Download happens automatically
  - Includes all sections, theme, site config
- **Import Data**: Restore from a JSON backup
  - Select a .json file from your computer
  - Replaces current configuration

#### Quick Actions
- **View Website**: Open your portfolio in a new tab
- **Logout**: Sign out of the admin panel

#### Layout & Viewport Settings
- Default section alignment
- Default content width
- Full-height section behavior
- Mobile centering

---

## 📋 Workflow Examples

### Creating Your First Portfolio

1. **Load Demo Data** during registration (optional but recommended)
2. **Edit Site Information**:
   - Change site name to your name
   - Add your tagline
   - Upload your logo
3. **Update Navigation**:
   - Customize menu items if needed
4. **Edit Hero Section**:
   - Add your name and title
   - Write your introduction
   - Add hero background image
5. **Update Skills Section**:
   - Add your technical skills
   - Organize by categories
6. **Add Projects**:
   - Create 3-5 featured projects
   - Add descriptions and technologies
7. **Add Experience**:
   - List your work history
   - Include achievements
8. **Customize Theme**:
   - Choose a preset or customize colors
9. **Update Footer**:
   - Add social media links
   - Update social profiles

### Managing Content Updates

**Adding a New Project**:
1. Go to Page Sections tab
2. Find and edit Projects section
3. Click "Add Project"
4. Fill in project details
5. Click "Create Project"
6. Changes auto-save

**Hiding a Section**:
1. Find the section in Page Sections
2. Click the eye icon to toggle visibility
3. Section disappears from public site instantly

**Reordering Sections**:
1. Hover over section in list
2. Click and drag the grip handle
3. Drop in new position
4. Order updates automatically

---

## 🔄 Data Persistence & Backups

### How Data is Saved
- **Auto-save**: Changes save immediately to browser localStorage
- **Per-browser**: Each browser/device has separate storage
- **Persistent**: Data survives browser restarts

### Creating Backups
1. Go to Settings tab
2. Click "Export Data"
3. JSON file downloads automatically
4. Save to secure location

### Restoring from Backup
1. Go to Settings tab
2. Click "Import Data"
3. Select your backup .json file
4. Confirm import
5. All data restored

### Cross-Device Sync
Since data uses browser storage:
- Data is **not** automatically synced between devices
- Use Export/Import to transfer between devices
- Consider regular backups for security

---

## 💡 Pro Tips & Best Practices

### Content Tips
- **Hero Section**: Make it compelling - this is what visitors see first
- **Skills**: Include both technical and soft skills
- **Projects**: Show before/after or impact metrics
- **Experience**: Highlight achievements over duties
- **About**: Tell your story, not just list facts

### Design Tips
- Keep color palette consistent (usually 2-3 colors)
- Use readable fonts for body text
- Maintain adequate spacing between elements
- Test on mobile devices regularly

### SEO Tips
- Use descriptive text, not just keywords
- Include relevant technologies and skills
- Update portfolio regularly
- Use high-quality images

### Performance Tips
- Compress images before uploading
- Keep descriptions concise
- Avoid too many large images
- Test page load time

---

## 🐛 Troubleshooting

### "My changes didn't save"
**Solution**:
- Check if localStorage is enabled in browser
- Verify you clicked outside the field (auto-save)
- Try exporting to confirm data exists
- Restart browser and log back in

### "I'm locked out of my account"
**Solution**:
- Make sure you're using correct email/password
- Verify you registered first
- Clear browser cookies and try again
- Data is stored per-browser, not per device

### "Lost data after browser update"
**Solution**:
- Browser updates shouldn't affect localStorage
- If data missing, restore from your backup JSON
- Always keep regular backups
- Use Export feature monthly

### "Images not showing"
**Solution**:
- Ensure image is fully uploaded
- Check image format (PNG, JPG, SVG recommended)
- Verify file size isn't too large
- Try uploading a smaller image

### "Navigation not working"
**Solution**:
- Verify href values are correct (#section-name)
- Check that sections with those IDs exist
- Ensure button/link isn't hidden via visibility toggle

---

## 🔐 Security & Privacy

### Data Storage
- All data stored locally in browser
- No server uploads (unless you add API)
- Complete privacy on your device
- Data not shared with third parties

### Backup Security
- Export JSON contains all settings
- Don't share exported JSON with untrusted parties
- Keep backups in secure location
- Consider encrypting sensitive backup files

### Account Security
- Use strong passwords (8+ characters, mixed case)
- Don't share login credentials
- Log out when done editing
- Use unique passwords if deploying publicly

---

## 📱 Mobile & Responsive Features

### Mobile Admin Interface
- Fully responsive design
- Touch-friendly buttons and controls
- Mobile-optimized forms
- Tab navigation adapts to small screens

### Mobile Content Preview
- Use "Preview" button to test on different sizes
- Check how sections appear on mobile
- Test navigation and buttons
- Verify image scaling

### Mobile Layout Settings
- Enable "Mobile Center" for centered content
- Adjust alignment for mobile readability
- Use responsive font sizes
- Test with real devices when possible

---

## 🚀 Advanced Features

### Theme Customization
- Mix and match preset themes
- Override individual colors
- Use custom gradients
- Upload background images

### Section Ordering
- Drag-and-drop to reorder
- Can change order anytime
- Doesn't delete content
- Reordering affects live site immediately

### Visibility Control
- Hide sections without deleting
- Show/hide menu items
- Perfect for seasonal content
- Can toggle visibility anytime

### Data Export/Import
- Full ecosystem backup
- Transfer between computers
- Share portfolio setup with others
- Version control your portfolio

---

## 📞 Getting Started Checklist

- [ ] Create account (register)
- [ ] Load demo data (optional first step)
- [ ] Customize site name and logo
- [ ] Update hero section with your info
- [ ] Add your skills
- [ ] Create 3-5 projects
- [ ] Add work experience
- [ ] Customize theme colors
- [ ] Update footer and social links
- [ ] Preview website
- [ ] Export and backup your data
- [ ] Test on mobile device
- [ ] Share your portfolio!

---

## 🎓 Learning Resources

### Understanding CMS Concepts
- **Sections**: Reusable content containers
- **Items**: Individual entries within sections
- **Theme**: Visual styling system
- **Navigation**: Menu and routing system
- **Footer**: Footer/meta information
- **Export/Import**: Data management

### Next Steps
- Explore different theme presets
- Create custom projects to showcase
- Add testimonials from satisfied clients
- Keep portfolio updated monthly
- Use analytics to track visitors

---

## 📝 Feature Summary

| Feature | Description | Location |
|---------|-------------|----------|
| Site Branding | Name, tagline, logo | Settings → Site & Logo |
| Navigation | Menu items, CTA buttons | Settings → Navigation |
| Hero Section | Introduction & CTAs | Page Sections → Hero |
| About Section | Bio & statistics | Page Sections → About |
| Skills | Technical expertise | Page Sections → Skills |
| Projects | Portfolio showcase | Page Sections → Projects |
| Experience | Work history | Page Sections → Experience |
| Testimonials | Client feedback | Page Sections → Testimonials |
| Contact Info | Email, phone, location | Page Sections → Contact |
| Footer | Footer content & links | Settings → Footer |
| Theme | Colors & fonts | Theme tab |
| Visibility | Show/hide sections | Page Sections controls |
| Reordering | Change section order | Drag-and-drop in Sections |
| Export | Backup data | Settings → Export |
| Import | Restore data | Settings → Import |

---

**Happy Portfolio Building! 🚀**

For real-time questions and updates, check the dashboard notifications and success messages.
