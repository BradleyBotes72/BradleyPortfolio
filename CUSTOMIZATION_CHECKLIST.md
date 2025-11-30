# ✅ Customization Checklist

Use this checklist to personalize your Bradley Botes BI portfolio website.

## 📋 Essential Customizations

### 1. Personal Information

#### Contact Details
- [ ] Update email address in `src/components/Layout.jsx` (lines 61, 68, 135, 208)
- [ ] Update LinkedIn URL in `src/components/Layout.jsx` (lines 54, 128, 189)
- [ ] Update GitHub URL in `src/components/Layout.jsx` (lines 60, 134, 201)
- [ ] Update contact info in `src/pages/Home.jsx` (lines 140-162)
- [ ] Update contact info in `src/pages/Contact.jsx` (lines 48-70)

#### Profile Content
- [ ] Update name in `src/pages/Home.jsx` (line 68)
- [ ] Update tagline in `src/pages/Home.jsx` (line 70)
- [ ] Update professional summary in `src/pages/Home.jsx` (lines 72-76)
- [ ] Update experience/projects count in `src/pages/Home.jsx` (lines 125-126)

### 2. Resume & Documents

- [ ] Create or export your resume as PDF
- [ ] Name the file `resume.pdf`
- [ ] Place in `public/` folder
- [ ] Test download buttons on Home and Contact pages

### 3. Project Portfolio

#### Update Project Data (`src/data/projects.js`)

For each project, customize:
- [ ] Project ID (unique identifier)
- [ ] Title
- [ ] Short description (2-3 lines for cards)
- [ ] Tags (Power BI, Azure, etc.)
- [ ] Full description
- [ ] Business problem statement
- [ ] Technologies used
- [ ] Data sources
- [ ] DAX logic examples
- [ ] Key features list

**Projects to customize:**
- [ ] Invoice Automation Control Center
- [ ] Budget vs Actual Report
- [ ] Cashflow & VAT Analysis
- [ ] Project Cost & Obligations Dashboard
- [ ] Executive Overview Dashboard
- [ ] Sales Pipeline Analytics

### 4. Dashboard Screenshots

Create `public/images/` folder and add:
- [ ] `dashboard1.png` - Invoice Automation
- [ ] `dashboard2.png` - Budget vs Actual
- [ ] `dashboard3.png` - Cashflow & VAT
- [ ] `dashboard4.png` - Project Cost
- [ ] `dashboard5.png` - Executive Overview
- [ ] `dashboard6.png` - Sales Pipeline

**Screenshot Guidelines:**
- Format: PNG or JPG
- Dimensions: 1920x1080 (16:9 ratio)
- File size: Under 500KB each
- Optimize with TinyPNG or similar

### 5. Skills & Competencies

Edit `src/pages/Home.jsx` (lines 25-32):
- [ ] Update skill names
- [ ] Adjust proficiency levels (0-100)
- [ ] Add/remove skills as needed

Current skills:
- Power BI (95%)
- DAX & Power Query (95%)
- Azure Data Services (85%)
- Business Central (90%)
- SQL & Data Modeling (90%)
- Power Automate (85%)

## 🎨 Visual Customization

### Colors & Branding

Edit `tailwind.config.js`:
- [ ] Primary blue color (`ms-blue`)
- [ ] Hover state color (`ms-blue-hover`)
- [ ] Text color (`dark-text`)
- [ ] Background color (`light-bg`)

### Logo & Favicon

- [ ] Create custom favicon (replace `public/favicon.svg`)
- [ ] Update logo initials in header (currently "BB")
- [ ] Consider uploading actual logo image

### Typography

In `src/index.css`:
- [ ] Change font family if desired
- [ ] Adjust font weights
- [ ] Modify heading styles

## 📄 Metadata & SEO

### Update `index.html`

- [ ] Site title (line 20)
- [ ] Meta description (line 6)
- [ ] Meta keywords (line 7)
- [ ] Author name (line 8)
- [ ] Open Graph title (line 11)
- [ ] Open Graph description (line 12)
- [ ] Twitter card title (line 16)
- [ ] Twitter card description (line 17)

### Add Social Media Images (Optional)

- [ ] Create og-image.png (1200x630px)
- [ ] Place in `public/`
- [ ] Add to meta tags in `index.html`

## 🔧 Functional Customization

### Navigation

Edit `src/components/Layout.jsx` (lines 26-30):
- [ ] Add/remove navigation links
- [ ] Reorder menu items
- [ ] Add dropdown menus (if needed)

### Home Page Highlights

Edit `src/pages/Home.jsx` (lines 11-24):
- [ ] Update highlight card titles
- [ ] Change descriptions
- [ ] Replace icons
- [ ] Add/remove cards

### Footer Content

Edit `src/components/Layout.jsx` (lines 176-227):
- [ ] Update footer text
- [ ] Add additional links
- [ ] Modify copyright notice
- [ ] Add privacy/terms links

### Contact Form

Current setup uses `mailto:` - To integrate with a backend:
- [ ] Sign up for Formspree, Web3Forms, or similar
- [ ] Update form action in `src/pages/Contact.jsx`
- [ ] Add success/error handling

## 🚀 Pre-Deployment

### Final Testing

- [ ] Test all navigation links
- [ ] Verify all pages load correctly
- [ ] Test project detail pages
- [ ] Check mobile responsiveness
- [ ] Test contact form email
- [ ] Verify resume download
- [ ] Check social media links
- [ ] Test on multiple browsers
- [ ] Run Lighthouse audit
- [ ] Check console for errors

### Build Check

```bash
npm run build
npm run preview
```

- [ ] Build completes successfully
- [ ] Preview works at localhost:4173
- [ ] No console errors
- [ ] Images load correctly
- [ ] Routing works properly

### Performance Optimization

- [ ] Compress images (TinyPNG)
- [ ] Total image size under 5MB
- [ ] Remove unused dependencies
- [ ] Check bundle size
- [ ] Test load speed

## 📊 Optional Enhancements

### Analytics

- [ ] Set up Google Analytics
- [ ] Add tracking code to `index.html`
- [ ] Enable Vercel Analytics (if using Vercel)
- [ ] Set up conversion tracking

### Additional Features

- [ ] Add dark mode toggle
- [ ] Implement search functionality
- [ ] Add blog section
- [ ] Create case study templates
- [ ] Add testimonials section
- [ ] Implement filtering for projects
- [ ] Add loading animations
- [ ] Create 404 page

### Integrations

- [ ] Connect to Power BI Embedded (show live dashboards)
- [ ] Add calendar scheduling (Calendly)
- [ ] Integrate CRM for lead capture
- [ ] Add live chat widget
- [ ] Connect to newsletter service

## 🌐 Post-Deployment

### Domain & Hosting

- [ ] Deploy to Vercel/Netlify
- [ ] Test live URL
- [ ] Set up custom domain
- [ ] Configure SSL certificate
- [ ] Set up redirects (www to non-www)

### SEO & Indexing

- [ ] Submit to Google Search Console
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Submit to Bing Webmaster
- [ ] Register with LinkedIn

### Marketing

- [ ] Share on LinkedIn
- [ ] Add to resume
- [ ] Include in email signature
- [ ] Share on Twitter/X
- [ ] Update GitHub profile

### Maintenance

- [ ] Set up monitoring (UptimeRobot)
- [ ] Schedule regular content updates
- [ ] Keep dependencies updated
- [ ] Back up project files
- [ ] Monitor analytics monthly

## 📝 Notes Section

Use this space to track your customizations:

```
Date: __________
Changes made:
- 
- 
- 

Next steps:
- 
- 
- 
```

---

## ✨ Completion

Once you've checked off all essential items:

**🎉 Congratulations! Your portfolio is ready to impress!**

Share it with:
- Potential employers
- Clients
- Your professional network
- Power BI community

---

**Need help?** Email: bradley@bbbi.dev

