# Deployment Guide - Bradley Botes BI Portfolio

This guide covers multiple deployment options for your Power BI portfolio website.

## 🚀 Quick Start Checklist

Before deploying, make sure you've:

- ✅ Added your resume PDF to `public/resume.pdf`
- ✅ Added dashboard screenshots to `public/images/`
- ✅ Updated personal information (email, LinkedIn, GitHub)
- ✅ Customized project data in `src/data/projects.js`
- ✅ Tested locally with `npm run dev`
- ✅ Built successfully with `npm run build`

## Option 1: Vercel (Recommended) ⭐

**Why Vercel?**
- Automatic deployments on git push
- Built-in CI/CD
- Excellent performance with CDN
- Zero configuration needed
- Free tier is generous

### Deployment Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/bradley-botes-bi.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your `bradley-botes-bi` repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"
   - Done! Your site is live 🎉

3. **Custom Domain (Optional)**
   - In Vercel dashboard, go to project settings
   - Navigate to "Domains"
   - Add your custom domain (e.g., `bradleybotes.dev`)
   - Follow DNS configuration instructions

### Auto-Deploy on Updates:
Every time you push to GitHub, Vercel automatically rebuilds and deploys!

```bash
git add .
git commit -m "Updated portfolio"
git push
```

---

## Option 2: Netlify

**Why Netlify?**
- Drag-and-drop deployment option
- Great for beginners
- Free tier with custom domains
- Built-in form handling

### Method A: Drag & Drop

1. Build your project:
   ```bash
   npm run build
   ```

2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)

3. Drag the `dist` folder to the drop zone

4. Your site is live!

### Method B: Git Integration

1. Push code to GitHub (same as Vercel method)

2. Go to [netlify.com](https://netlify.com)

3. Click "Add new site" → "Import an existing project"

4. Choose GitHub and select your repository

5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

6. Click "Deploy site"

### Method C: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

---

## Option 3: GitHub Pages

**Why GitHub Pages?**
- Free hosting for public repos
- Easy if you're already using GitHub
- Good for simple static sites

### Setup Steps:

1. **Update `vite.config.js`**:
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/bradley-botes-bi/', // Replace with your repo name
   })
   ```

2. **Install gh-pages**:
   ```bash
   npm install -D gh-pages
   ```

3. **Add deploy script to `package.json`**:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: `gh-pages` branch
   - Save

6. Your site will be at: `https://YOUR_USERNAME.github.io/bradley-botes-bi/`

---

## Option 4: Azure Static Web Apps

**Why Azure?**
- Great if you're already in the Microsoft ecosystem
- Free tier available
- Integrates well with Azure DevOps

### Deployment Steps:

1. **Install Azure CLI** (if not already installed)
   ```bash
   winget install Microsoft.AzureCLI
   ```

2. **Login to Azure**:
   ```bash
   az login
   ```

3. **Create Static Web App**:
   - Go to [Azure Portal](https://portal.azure.com)
   - Create new "Static Web App"
   - Connect to your GitHub repo
   - Build preset: Custom
   - App location: `/`
   - API location: (leave empty)
   - Output location: `dist`

4. Azure automatically sets up GitHub Actions for CI/CD

---

## Option 5: Traditional Web Hosting

**For cPanel, shared hosting, etc.**

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload files**:
   - Use FTP/SFTP client (FileZilla, WinSCP)
   - Upload contents of `dist` folder to your web root
   - Usually `public_html` or `www`

3. **Configure routing** (important!):
   - Create `.htaccess` file in root:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## 🔧 Post-Deployment Checklist

After deploying, verify:

- ✅ All pages load correctly (Home, Portfolio, Contact)
- ✅ Navigation works smoothly
- ✅ Project detail pages open correctly
- ✅ Images load (or placeholders show)
- ✅ Resume download link works (if PDF uploaded)
- ✅ Contact form opens email client
- ✅ Social media links go to correct profiles
- ✅ Mobile responsiveness (test on phone)
- ✅ Page load speed is good

### Testing Tools:

- **Lighthouse** (Chrome DevTools): Performance, SEO, Accessibility
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **GTmetrix**: https://gtmetrix.com/

---

## 🌐 Custom Domain Setup

### For Vercel:
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add domain and follow DNS instructions

### For Netlify:
1. Site Settings → Domain Management → Add custom domain
2. Configure DNS with your provider

### DNS Records (typical):
```
Type: A
Name: @
Value: [Provided by hosting]

Type: CNAME  
Name: www
Value: [Provided by hosting]
```

---

## 📊 Analytics Setup (Optional)

### Google Analytics:

1. Create GA4 property
2. Get Measurement ID
3. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Vercel Analytics:

Simply enable in Vercel dashboard - no code needed!

---

## 🔄 Continuous Deployment Workflow

Recommended workflow after initial deployment:

```bash
# Make changes to your site
code .

# Test locally
npm run dev

# Build and verify
npm run build
npm run preview

# Commit and push
git add .
git commit -m "Update: [describe changes]"
git push

# Automatic deployment happens!
```

---

## 🐛 Troubleshooting

### Issue: Blank page after deployment
**Solution**: Check browser console for errors. Often a path issue.
- Verify `base` in `vite.config.js`
- Check asset paths in code

### Issue: 404 on page refresh
**Solution**: Configure routing on your host
- Vercel/Netlify: Use `vercel.json` (already included)
- Others: Add `.htaccess` or equivalent

### Issue: Images not loading
**Solution**:
- Ensure images are in `public/images/`
- Check paths in `projects.js` start with `/`
- Verify images uploaded with deployment

### Issue: Contact form not working
**Solution**: 
- Contact form uses `mailto:` - client-side only
- For backend form handling, integrate with:
  - Netlify Forms
  - FormSpree
  - Web3Forms
  - Your own API

---

## 📞 Support

Need help with deployment?

**Bradley Botes**
- Email: bradley@bbbi.dev
- LinkedIn: [linkedin.com/in/bradleybotes](https://linkedin.com/in/bradleybotes)

---

**Happy Deploying! 🚀**

