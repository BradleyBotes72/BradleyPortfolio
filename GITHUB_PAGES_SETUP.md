# GitHub Pages Deployment Guide
## Deploy to bradleybotes.co.za

This guide will help you deploy your Power BI portfolio to GitHub Pages with your custom domain `bradleybotes.co.za`.

---

## 📋 Prerequisites

Before you begin, make sure you have:

- ✅ A GitHub account
- ✅ Git installed on your computer
- ✅ Access to your domain DNS settings (bradleybotes.co.za)
- ✅ This project ready to deploy

---

## 🚀 Part 1: Initial Setup & First Deployment

### Step 1: Initialize Git Repository (if not already done)

Open PowerShell in your project directory and run:

```powershell
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Portfolio ready for deployment"
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `bradley-botes-bi` (or any name you prefer)
   - **Description**: "Power BI Specialist Portfolio Website"
   - **Visibility**: Public (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### Step 3: Push Code to GitHub

GitHub will show you commands to push existing code. Run these in PowerShell:

```powershell
# Add GitHub as remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/bradley-botes-bi.git

# Rename branch to main if needed
git branch -M main

# Push code to GitHub
git push -u origin main
```

**Example:**
```powershell
git remote add origin https://github.com/bradleybotes/bradley-botes-bi.git
git branch -M main
git push -u origin main
```

---

## ⚙️ Part 2: Configure GitHub Pages

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** (top menu)
3. Scroll down and click **"Pages"** (left sidebar)
4. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"**
   
5. Click **"Save"** if prompted

### Step 5: Trigger First Deployment

The GitHub Actions workflow will automatically run when you push code. To manually trigger it:

1. Go to the **"Actions"** tab in your repository
2. Click on **"Deploy to GitHub Pages"** workflow (left sidebar)
3. Click **"Run workflow"** → **"Run workflow"** (green button)
4. Wait 2-3 minutes for the build to complete
5. You'll see a green checkmark ✅ when successful

Your site is now live at: `https://YOUR_USERNAME.github.io/bradley-botes-bi/`

---

## 🌐 Part 3: Custom Domain Configuration

### Step 6: Add Custom Domain in GitHub

1. Still in **Settings → Pages**
2. Under **"Custom domain"**, enter: `bradleybotes.co.za`
3. Click **"Save"**
4. Wait a moment, then check **"Enforce HTTPS"** (appears after DNS verification)

### Step 7: Configure DNS Settings

You need to configure your domain's DNS records with your domain registrar. Here's how:

#### Option A: Apex Domain (bradleybotes.co.za) - RECOMMENDED

Add these **A Records** to point to GitHub Pages servers:

| Type | Name | Value              | TTL  |
|------|------|--------------------|------|
| A    | @    | 185.199.108.153    | 3600 |
| A    | @    | 185.199.109.153    | 3600 |
| A    | @    | 185.199.110.153    | 3600 |
| A    | @    | 185.199.111.153    | 3600 |

**Plus add a CNAME for www subdomain:**

| Type  | Name | Value                     | TTL  |
|-------|------|---------------------------|------|
| CNAME | www  | YOUR_USERNAME.github.io   | 3600 |

**Example for your domain:**
- CNAME: `www` → `bradleybotes.github.io`

#### Option B: Subdomain (www.bradleybotes.co.za)

If you prefer using `www.bradleybotes.co.za`:

| Type  | Name | Value                     | TTL  |
|-------|------|---------------------------|------|
| CNAME | www  | YOUR_USERNAME.github.io   | 3600 |

Then update the **CNAME file** in your project from:
```
bradleybotes.co.za
```
to:
```
www.bradleybotes.co.za
```

### Step 8: DNS Provider Examples

#### Common DNS Providers:

**Cloudflare:**
1. Log in to Cloudflare
2. Select your domain `bradleybotes.co.za`
3. Go to **DNS** tab
4. Click **"Add record"**
5. Add the A and CNAME records as shown above
6. Make sure "Proxy status" is **orange cloud (proxied)** for security

**GoDaddy:**
1. Log in to GoDaddy
2. Go to **My Products** → **DNS**
3. Click on your domain
4. Add the A and CNAME records

**Namecheap:**
1. Log in to Namecheap
2. Go to **Domain List** → Manage → **Advanced DNS**
3. Add the A and CNAME records

**Other Providers:**
The process is similar - look for DNS Management or DNS Settings in your domain dashboard.

---

## ✅ Part 4: Verification & Testing

### Step 9: Wait for DNS Propagation

- DNS changes can take **15 minutes to 48 hours** to propagate worldwide
- Usually takes 10-30 minutes for most providers
- Check status: [whatsmydns.net](https://www.whatsmydns.net/)

### Step 10: Verify Deployment

1. Open your browser
2. Navigate to: `https://bradleybotes.co.za`
3. Verify:
   - ✅ Site loads correctly
   - ✅ HTTPS padlock shows (secure connection)
   - ✅ All pages work (Home, Portfolio, Contact)
   - ✅ Images load (or placeholders show)
   - ✅ Navigation works
   - ✅ Responsive on mobile (test on phone)

### Step 11: Test SSL Certificate

1. In GitHub: **Settings → Pages**
2. Check that **"Enforce HTTPS"** is enabled and checkmarked
3. If not available yet, wait 10-15 minutes after DNS propagation
4. Return and enable it

---

## 🔄 Part 5: Updating Your Site

### Making Changes and Redeploying

Every time you push code to GitHub, your site automatically rebuilds and deploys!

```powershell
# Make your changes to the code
# Then:

git add .
git commit -m "Updated portfolio content"
git push

# Wait 2-3 minutes, changes will be live!
```

### Monitoring Deployments

1. Go to **Actions** tab in your repository
2. See all deployment runs
3. Click on any run to see detailed logs
4. Green checkmark ✅ = success
5. Red X ❌ = error (click to see logs)

---

## 🛠️ Troubleshooting

### Problem: DNS not resolving

**Solution:**
- Wait longer (DNS can take up to 48 hours)
- Verify DNS records are correct
- Use [whatsmydns.net](https://www.whatsmydns.net/) to check propagation
- Clear browser cache: Ctrl + F5

### Problem: "404 - There isn't a GitHub Pages site here"

**Solution:**
- Check that GitHub Actions workflow completed successfully
- Verify Settings → Pages is configured correctly
- Ensure CNAME file contains correct domain
- Wait a few minutes and refresh

### Problem: Site shows but images are broken

**Solution:**
- Make sure images are in `public/images/` folder
- Check paths in `src/data/projects.js` start with `/`
- Rebuild and redeploy: `git commit --allow-empty -m "Rebuild" && git push`

### Problem: 404 on page refresh (Portfolio, Contact pages)

**Solution:**
This should be handled by the SPA routing in your Vite setup. If it persists:
- Verify `vercel.json` is in your repo
- GitHub Pages should respect it via the build output

### Problem: HTTPS not working

**Solution:**
- Wait 15-30 minutes after adding custom domain
- Ensure DNS is fully propagated
- Remove and re-add custom domain in GitHub Settings
- Try disabling and re-enabling "Enforce HTTPS"

### Problem: CSS not loading / site looks broken

**Solution:**
- Check browser console for errors (F12)
- Verify `base: '/'` in `vite.config.js`
- Clear browser cache
- Rebuild: `npm run build` locally to test

---

## 📊 Optional Enhancements

### Add Google Analytics

1. Create a Google Analytics 4 property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Edit `index.html` and add before `</head>`:

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

### Add Sitemap for SEO

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bradleybotes.co.za/</loc>
    <lastmod>2024-10-24</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://bradleybotes.co.za/portfolio</loc>
    <lastmod>2024-10-24</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://bradleybotes.co.za/contact</loc>
    <lastmod>2024-10-24</lastmod>
    <priority>0.7</priority>
  </url>
</urlset>
```

### Enable GitHub Pages Environment

This is automatically set up by the GitHub Actions workflow. You can see deployments in:
- **Environments** section of your repository
- Shows deployment history and status

---

## 📞 Need Help?

### Useful Resources

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Custom Domain Setup**: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- **DNS Checker**: https://www.whatsmydns.net/
- **SSL Checker**: https://www.ssllabs.com/ssltest/

### Common Commands Reference

```powershell
# Check git status
git status

# View remote URL
git remote -v

# Pull latest changes
git pull

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Force rebuild without changes
git commit --allow-empty -m "Trigger rebuild"
git push
```

---

## ✨ Success Checklist

Once everything is working, you should have:

- ✅ Code pushed to GitHub repository
- ✅ GitHub Actions workflow running successfully
- ✅ Custom domain bradleybotes.co.za configured
- ✅ DNS records added to domain registrar
- ✅ HTTPS enabled and working
- ✅ All pages accessible and working
- ✅ Site loads quickly and looks professional
- ✅ Mobile responsive
- ✅ Contact form working (mailto)
- ✅ Resume downloadable (if you added resume.pdf)

---

## 🎉 Congratulations!

Your Power BI portfolio is now live at **https://bradleybotes.co.za**!

**Next Steps:**
1. Share your portfolio URL on LinkedIn
2. Add it to your resume
3. Update your email signature
4. Keep your projects updated regularly
5. Monitor site analytics (if added)

---

**Built with ❤️ | Powered by GitHub Pages | Secured with HTTPS**


