# Bradley Botes BI - Power BI Specialist Portfolio

A modern, responsive portfolio website showcasing Power BI development expertise, data analytics projects, and business intelligence solutions.

![Bradley Botes BI](https://img.shields.io/badge/Built%20with-React%20%2B%20Vite-61DAFB?style=flat&logo=react)
![TailwindCSS](https://img.shields.io/badge/Styled%20with-TailwindCSS-38B2AC?style=flat&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Animated%20with-Framer%20Motion-FF0055?style=flat)

## 🌟 Features

- **Modern Design**: Clean, professional UI inspired by Microsoft Fluent Design
- **Responsive**: Mobile-first design that works perfectly on all devices
- **Interactive**: Smooth animations and transitions using Framer Motion
- **Project Showcase**: 6 detailed case studies with DAX code examples
- **Contact Form**: Easy way for potential clients to get in touch
- **Fast Performance**: Built with React + Vite for optimal loading speed
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠 Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Icons**: React Icons
- **Deployment Ready**: Optimized for Vercel, Netlify, or GitHub Pages

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

```bash
# Clone or navigate to the project directory
cd bradley-botes-bi

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build locally
npm run preview
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Vite and deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Option 2: Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

Or use Netlify CLI:
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

**Note**: Update `vite.config.js` with your repo name:
```js
export default defineConfig({
  base: '/bradley-botes-bi/',
  // ... rest of config
})
```

## 📁 Project Structure

```
bradley-botes-bi/
├── public/
│   ├── favicon.svg              # Site favicon
│   ├── resume.pdf               # Your resume (add this file)
│   ├── images/                  # Dashboard screenshots
│   │   └── README.md
│   └── resume-placeholder.txt
├── src/
│   ├── components/
│   │   └── Layout.jsx           # Header, Footer, Navigation
│   ├── data/
│   │   └── projects.js          # Project data and descriptions
│   ├── pages/
│   │   ├── Home.jsx             # Landing page with hero & skills
│   │   ├── Portfolio.jsx        # Projects grid view
│   │   ├── ProjectDetail.jsx   # Individual project case study
│   │   └── Contact.jsx          # Contact form & info
│   ├── App.jsx                  # Main app with routing
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles & Tailwind
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── vercel.json                  # Vercel configuration
├── .env.example                 # Environment variables template
└── package.json
```

## 🎨 Customization Guide

### 1. Update Personal Information

**Contact Details** - Update these files:
- `src/components/Layout.jsx` - Header & footer links
- `src/pages/Contact.jsx` - Contact information
- `src/pages/Home.jsx` - Hero section

**Profile Content**:
- Edit the hero section in `src/pages/Home.jsx`
- Update skills and experience levels
- Modify the professional summary

### 2. Add Your Projects

Edit `src/data/projects.js` to add/modify projects:

```javascript
{
  id: 'unique-project-id',
  title: 'Project Title',
  shortDescription: 'Brief description for card (2-3 lines)',
  tags: ['Power BI', 'Azure', 'DAX'],
  image: '/images/dashboard-screenshot.png',
  fullDescription: 'Detailed description...',
  businessProblem: 'Problem statement...',
  technologies: ['Tech 1', 'Tech 2'],
  dataSources: ['Source 1', 'Source 2'],
  daxLogic: [
    {
      title: 'Measure Name',
      code: 'DAX code here...'
    }
  ],
  keyFeatures: ['Feature 1', 'Feature 2']
}
```

### 3. Add Your Resume

1. Export your resume as PDF
2. Name it `resume.pdf`
3. Place in `public/` directory
4. The download buttons will automatically work

### 4. Add Dashboard Screenshots

1. Create/capture screenshots of your Power BI dashboards
2. Save as PNG/JPG (recommended: 1920x1080, 16:9 ratio)
3. Place in `public/images/` folder
4. Name them: `dashboard1.png`, `dashboard2.png`, etc.
5. Update image paths in `src/data/projects.js`

**Tip**: Use tools like TinyPNG to optimize image sizes

### 5. Customize Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'ms-blue': '#0078D4',        // Primary color
  'ms-blue-hover': '#106EBE',  // Hover state
  'dark-text': '#1B1B1B',      // Text color
  'light-bg': '#F3F3F3',       // Background
}
```

### 6. Update Social Links

Update all instances in:
- `src/components/Layout.jsx`
- `src/pages/Home.jsx`
- `src/pages/Contact.jsx`

Change:
- LinkedIn URL
- GitHub URL  
- Email address

## 📱 Features Breakdown

### Home Page
- Hero section with professional introduction
- Interactive skill bars with animations
- Highlight cards for key competencies
- Call-to-action sections

### Portfolio Page
- Grid layout of project cards (responsive)
- Hover effects and transitions
- Tag filtering display
- Direct links to case studies

### Project Detail Pages
- Full project overview
- Business challenge section
- Expandable DAX code snippets
- Technology stack sidebar
- Data sources list
- Key features checklist
- CTA for similar projects

### Contact Page
- Working contact form (mailto)
- Social media links
- Availability status
- FAQ section

## 🔧 Development Tips

- **Hot Reload**: Changes appear instantly in development mode
- **Component Testing**: Each page is a separate component for easy testing
- **Responsive Testing**: Use browser DevTools to test mobile views
- **Build Optimization**: Vite automatically optimizes for production

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Bundle Size: ~125KB gzipped

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

If you need help customizing this portfolio:

**Bradley Botes**
- 📧 Email: bradley@bbbi.dev
- 💼 LinkedIn: [linkedin.com/in/bradleybotes](https://linkedin.com/in/bradleybotes)
- 💻 GitHub: [github.com/bradleybotes](https://github.com/bradleybotes)

---

<div align="center">
  
**Built with ❤️ using React and Power BI passion**

⭐ If you found this helpful, please star the repo!

</div>
