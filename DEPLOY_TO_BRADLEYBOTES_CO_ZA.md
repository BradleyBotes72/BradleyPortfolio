# 🚀 Deploy to bradleybotes.co.za - Complete Guide

This guide will help you deploy your Power BI portfolio to your custom domain **bradleybotes.co.za**.

---

## ⚡ Quick Start - Choose Your Platform

### Option 1: Vercel (Recommended - Easiest) ⭐

**Why Vercel?**
- ✅ Automatic deployments on git push
- ✅ Free SSL certificate
- ✅ Fast global CDN
- ✅ Zero configuration needed
- ✅ Already configured in your project

#### Step-by-Step:

**1. Push to GitHub (if not already done)**
```powershell
# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/bradley-botes-bi.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**2. Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import your `bradley-botes-bi` repository
5. Vercel auto-detects settings (no changes needed)
6. Click **"Deploy"**
7. Wait 1-2 minutes ⏱️

**Your site is now live!** (at a Vercel URL like `bradley-botes-bi.vercel.app`)

**3. Add Custom Domain**
1. In Vercel dashboard → Your Project → **Settings** → **Domains**
2. Click **"Add"** and enter: `bradleybotes.co.za`
3. Click **"Add"**
4. Vercel will show DNS instructions

**4. Configure DNS at Your Domain Registrar**

Add these DNS records:

**A Records** (for bradleybotes.co.za):
```
Type: A    Name: @    Value: 76.76.21.21
```

**CNAME Record** (for www):
```
Type: CNAME    Name: www    Value: cname.vercel-dns.com
```

**OR** (if Vercel shows different values, use those instead)

**5. Wait for DNS Propagation**
- Usually takes 5-30 minutes
- Check status: [whatsmydns.net](https://www.whatsmydns.net/)
- Enter: `bradleybotes.co.za`

**6. Enable HTTPS**
- Vercel automatically provisions SSL certificate
- HTTPS will be enabled automatically once DNS propagates

**✅ Done!** Visit https://bradleybotes.co.za

---

### Option 2: GitHub Pages (Free, Good for GitHub Users)

**Why GitHub Pages?**
- ✅ Completely free
- ✅ Integrated with GitHub
- ✅ Good for static sites
- ✅ Already configured in your project

#### Step-by-Step:

**1. Push to GitHub** (same as Vercel Step 1)

**2. Enable GitHub Pages**
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **"Build and deployment"**:
   - Source: **GitHub Actions**
4. Click **Save**

**3. Trigger Deployment**
1. Go to **Actions** tab
2. Click **"Deploy to GitHub Pages"** workflow
3. Click **"Run workflow"** → **"Run workflow"**
4. Wait 2-3 minutes for build

**4. Add Custom Domain**
1. Still in **Settings** → **Pages**
2. Under **"Custom domain"**: enter `bradleybotes.co.za`
3. Click **Save**
4. Check **"Enforce HTTPS"** (appears after DNS verification)

**5. Configure DNS**

Add these DNS records at your domain registrar:

**A Records** (4 records needed):
```
Type: A    Name: @    Value: 185.199.108.153
Type: A    Name: @    Value: 185.199.109.153
Type: A    Name: @    Value: 185.199.110.153
Type: A    Name: @    Value: 185.199.111.153
```

**CNAME Record**:
```
Type: CNAME    Name: www    Value: YOUR_USERNAME.github.io
```
(Replace YOUR_USERNAME with your GitHub username)

**6. Wait for DNS Propagation**
- Usually 15-60 minutes
- Check: [whatsmydns.net](https://www.whatsmydns.net/)

**✅ Done!** Visit https://bradleybotes.co.za

---

### Option 3: Netlify (Alternative)

**Why Netlify?**
- ✅ Drag-and-drop deployment option
- ✅ Free tier with custom domains
- ✅ Good performance

#### Step-by-Step:

**1. Build Your Project**
```powershell
npm run build
```

**2. Deploy to Netlify**

**Method A - Drag & Drop:**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `dist` folder to the drop zone
3. Your site is live!

**Method B - Git Integration:**
1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose GitHub and select your repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Deploy site"**

**3. Add Custom Domain**
1. Site Settings → **Domain Management** → **Add custom domain**
2. Enter: `bradleybotes.co.za`
3. Follow DNS instructions

**4. Configure DNS**

Netlify will provide specific DNS values. Typically:

**A Record**:
```
Type: A    Name: @    Value: [Netlify IP - shown in dashboard]
```

**CNAME**:
```
Type: CNAME    Name: www    Value: [Netlify domain - shown in dashboard]
```

---

## 🔄 Updating Your Site

After initial deployment, updates are automatic:

**For Vercel/Netlify (Git Integration):**
```powershell
git add .
git commit -m "Updated portfolio"
git push
# Automatic deployment happens!
```

**For GitHub Pages:**
```powershell
git add .
git commit -m "Updated portfolio"
git push
# GitHub Actions automatically rebuilds and deploys
```

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads at https://bradleybotes.co.za
- [ ] HTTPS padlock shows (secure connection)
- [ ] All pages work (Home, Portfolio, Contact)
- [ ] Navigation works smoothly
- [ ] Project detail pages open correctly
- [ ] Images load correctly
- [ ] Contact form opens email client
- [ ] Resume download link works
- [ ] Mobile responsive (test on phone)
- [ ] Social media links work

---

## 🐛 Troubleshooting

### Domain Not Working

**Check DNS:**
```powershell
# In PowerShell
nslookup bradleybotes.co.za
# Should show your hosting provider's IPs
```

**Wait Time:**
- DNS can take 15-60 minutes to propagate
- Check status: [whatsmydns.net](https://www.whatsmydns.net/)

### 404 Errors on Page Refresh

**Solution:** Your `vercel.json` file handles this. If using GitHub Pages, ensure routing is configured.

### Images Not Loading

**Solution:**
- Ensure images are in `public/images/` folder
- Check paths in `src/data/projects.js` start with `/`
- Rebuild: `npm run build`

### HTTPS Not Working

**Solution:**
- Wait 15-30 minutes after DNS propagation
- Enable "Enforce HTTPS" in your hosting dashboard
- Clear browser cache: `Ctrl + F5`

---

## 📊 Recommended: Vercel

**I recommend Vercel** because:
- ✅ Already configured (`vercel.json` exists)
- ✅ Fastest setup (5 minutes)
- ✅ Automatic SSL
- ✅ Best performance
- ✅ Free tier is generous

---

## 🎯 Quick Command Reference

```powershell
# Build locally to test
npm run build

# Preview build locally
npm run preview

# Check git status
git status

# Push updates
git add .
git commit -m "Update description"
git push
```

---

## 📞 Need Help?

**Useful Resources:**
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **DNS Checker**: https://www.whatsmydns.net/
- **SSL Checker**: https://www.ssllabs.com/ssltest/

---

## 🎉 Success!

Once deployed, your portfolio will be live at:

### 🌐 https://bradleybotes.co.za

**Next Steps:**
1. Share your portfolio URL on LinkedIn
2. Add it to your resume
3. Update your email signature
4. Monitor site performance

---

**Good luck with your deployment! 🚀**

