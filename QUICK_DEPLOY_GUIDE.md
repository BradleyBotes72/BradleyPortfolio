# 🚀 Quick Deploy Guide - GitHub Pages
## Get bradleybotes.co.za live in 5 steps!

---

## ⚡ 5-Minute Setup

### Step 1: Push to GitHub (2 min)

```powershell
# Replace YOUR_USERNAME with your GitHub username
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bradley-botes-bi.git
git push -u origin main
```

### Step 2: Enable GitHub Pages (30 seconds)

1. Go to your repo → **Settings** → **Pages**
2. Under "Build and deployment" → Source: **GitHub Actions**
3. Click Save

### Step 3: Trigger Deployment (30 seconds)

1. Go to **Actions** tab
2. Click **"Deploy to GitHub Pages"**
3. Click **"Run workflow"** → **"Run workflow"**
4. Wait 2-3 minutes ⏱️

**Site is now live at:** `https://YOUR_USERNAME.github.io/bradley-botes-bi/`

### Step 4: Add Custom Domain (30 seconds)

1. Go back to **Settings** → **Pages**
2. Under "Custom domain": enter `bradleybotes.co.za`
3. Click **Save**

### Step 5: Configure DNS (1 min + wait time)

**Add these DNS records at your domain registrar:**

**A Records** (for bradleybotes.co.za):
```
Type: A    Name: @    Value: 185.199.108.153
Type: A    Name: @    Value: 185.199.109.153
Type: A    Name: @    Value: 185.199.110.153
Type: A    Name: @    Value: 185.199.111.153
```

**CNAME Record** (for www):
```
Type: CNAME    Name: www    Value: YOUR_USERNAME.github.io
```

**Wait 15-60 minutes for DNS to propagate**, then visit:
### 🎉 https://bradleybotes.co.za

---

## 🔄 Update Your Site Later

Every time you make changes:

```powershell
git add .
git commit -m "Updated content"
git push
```

**That's it!** GitHub Actions automatically rebuilds and deploys.

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 Error | Wait 5 mins, check Actions tab for green checkmark |
| Domain not working | Wait 30-60 mins for DNS, check whatsmydns.net |
| No HTTPS option | Wait 15 mins after DNS propagates, then enable |
| Images broken | Ensure images in `public/images/` folder |

---

## 📱 Alternative: Manual Deploy with gh-pages

If GitHub Actions isn't working, use this method:

```powershell
npm run deploy
```

This command:
1. Builds your site
2. Pushes to `gh-pages` branch
3. Deploys automatically

**Then go to Settings → Pages and select:**
- Source: **Deploy from branch**
- Branch: **gh-pages** / root

---

## ✅ Final Checklist

- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled (Actions method)
- [ ] Workflow ran successfully (green checkmark)
- [ ] Custom domain added in GitHub
- [ ] DNS records configured
- [ ] Wait 15-60 mins for DNS
- [ ] Visit https://bradleybotes.co.za
- [ ] Enable "Enforce HTTPS" in Settings
- [ ] Test on mobile

---

## 📚 Full Instructions

For detailed step-by-step guide with screenshots and troubleshooting:
👉 See **GITHUB_PAGES_SETUP.md**

---

**Questions?** Open an issue on GitHub or check the full guide!

**Good luck! 🚀**

