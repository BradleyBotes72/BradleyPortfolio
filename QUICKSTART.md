# 🚀 Quick Start Guide - Bradley Botes BI Portfolio

Get your portfolio up and running in 5 minutes!

## ⚡ Step 1: View the Site

The development server should now be running at:

**http://localhost:5173**

Open this URL in your browser to see your new portfolio!

## ✏️ Step 2: Personalize Your Content

### A. Update Contact Information

Open these files and replace placeholder info with yours:

1. **`src/components/Layout.jsx`** (lines 56-75, 181-203)
   - LinkedIn URL
   - GitHub URL
   - Email address

2. **`src/pages/Home.jsx`** (lines 140-162)
   - Social media links
   - Professional summary text

3. **`src/pages/Contact.jsx`** (lines 24, 53-74)
   - Email address
   - LinkedIn URL
   - GitHub URL

### B. Customize Your Projects

Edit **`src/data/projects.js`** to:
- Modify existing projects
- Add new projects
- Update DAX code examples
- Change technologies used

### C. Add Your Resume

1. Save your resume as `resume.pdf`
2. Place it in the `public/` folder
3. The download buttons will automatically work!

### D. Add Dashboard Screenshots

1. Create `public/images/` folder (if not exists)
2. Add your Power BI dashboard screenshots:
   - `dashboard1.png` - Invoice Automation
   - `dashboard2.png` - Budget vs Actual
   - `dashboard3.png` - Cashflow & VAT
   - `dashboard4.png` - Project Cost
   - `dashboard5.png` - Executive Overview
   - `dashboard6.png` - Sales Pipeline

**Tip**: Keep images under 500KB for fast loading

## 🎨 Step 3: Customize Colors (Optional)

Edit **`tailwind.config.js`** to change the color scheme:

```javascript
colors: {
  'ms-blue': '#0078D4',        // Your primary color
  'ms-blue-hover': '#106EBE',  // Hover state
  'dark-text': '#1B1B1B',      // Text color
  'light-bg': '#F3F3F3',       // Background color
}
```

## 🏗️ Step 4: Build & Deploy

### Test the Production Build

```bash
npm run build
npm run preview
```

Visit http://localhost:4173 to see the optimized version.

### Deploy to Vercel (Easiest)

```bash
# Push to GitHub first
git add .
git commit -m "Initial portfolio"
git push

# Then deploy via Vercel dashboard
# Visit vercel.com and import your GitHub repo
```

See **DEPLOYMENT.md** for detailed deployment instructions.

## 📝 Common Customizations

### Change the Site Title

Edit **`index.html`** (line 20):
```html
<title>Your Name - Power BI Specialist | BBBi</title>
```

### Update Meta Description

Edit **`index.html`** (line 6):
```html
<meta name="description" content="Your description here" />
```

### Modify Skills Section

Edit **`src/pages/Home.jsx`** (lines 25-32) to update your skill list and percentages.

### Change Tagline

Edit **`src/pages/Home.jsx`** (line 70):
```jsx
<p className="text-xl text-gray-600 mb-8">
  Your custom tagline here
</p>
```

## 🔍 Testing Checklist

Before deploying, make sure:

- [ ] All navigation links work
- [ ] Portfolio cards display correctly
- [ ] Project detail pages load
- [ ] Contact form opens email
- [ ] Social links go to correct profiles
- [ ] Resume download works (if added)
- [ ] Site looks good on mobile (test with browser DevTools)
- [ ] No console errors in browser

## 🛠️ Development Commands

```bash
npm run dev      # Start development server (hot reload)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Check for code issues
```

## 💡 Pro Tips

1. **Hot Reload**: Save any file and changes appear instantly in browser
2. **Mobile Testing**: Press F12 → Toggle device toolbar in Chrome
3. **Performance**: Keep total images under 5MB for fast loading
4. **SEO**: Fill in all meta tags in `index.html`
5. **Analytics**: Add Google Analytics code after deployment

## 📚 Next Steps

1. ✅ **Customize content** (you are here!)
2. 📸 **Add screenshots** of your real dashboards
3. 📄 **Upload your resume** PDF
4. 🎨 **Adjust colors** to match your brand
5. 🚀 **Deploy** to Vercel/Netlify
6. 🌐 **Add custom domain** (optional)
7. 📊 **Set up analytics** (optional)

## ❓ Need Help?

### Resources:
- **Full Documentation**: See `README.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **React Docs**: https://react.dev
- **TailwindCSS Docs**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion

### Issues?

Common fixes:
- **Port already in use**: Kill other dev servers or use `npm run dev -- --port 3000`
- **Module not found**: Run `npm install` again
- **Build fails**: Check for syntax errors, run `npm run lint`

## 📧 Contact

**Bradley Botes**
- Email: bradley@bbbi.dev
- LinkedIn: linkedin.com/in/bradleybotes
- GitHub: github.com/bradleybotes

---

**Happy Building! 🎉**

Your professional Power BI portfolio is ready to showcase your expertise!

