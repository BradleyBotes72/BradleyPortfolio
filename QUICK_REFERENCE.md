# 🚀 Quick Reference Card

## 📸 Add Your Photo (MOST IMPORTANT!)

1. Save your B&W photo as: `public/images/profile.jpg`
2. Open: `src/pages/Home.jsx`
3. Find line **~183** and replace the placeholder `<div>` with:

```jsx
<img 
  src="/images/profile.jpg" 
  alt="Bradley Botes" 
  className="w-full h-full object-cover grayscale"
/>
```

---

## 🎯 View Your Site

**Local:** http://localhost:5173 (if dev server is running)

**Start dev server:**
```bash
npm run dev
```

---

## 🚀 Deploy to GitHub Pages

```bash
# 1. Push to GitHub
git add .
git commit -m "Portfolio complete"
git push origin main

# 2. Enable GitHub Pages
# Go to: GitHub repo → Settings → Pages
# Source: GitHub Actions

# 3. Configure DNS
# Add these A records to bradleybotes.co.za:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

**Full Guide:** See `GITHUB_PAGES_SETUP.md`

---

## 🎨 What Changed

✅ **Colors:** Grey/Charcoal + Orange (was Blue)
✅ **Theme:** Dark (was Light)
✅ **Style:** Minimalistic designer (was Corporate)
✅ **Hero:** Split-screen layout
✅ **Font:** Inter (was Open Sans)
✅ **Header:** Minimal with LOGO
✅ **Footer:** 4-column modern design

---

## 📝 Important Files

- `src/pages/Home.jsx` - Main page (redesigned)
- `src/components/Layout.jsx` - Header/Footer (updated)
- `tailwind.config.js` - Colors (new orange theme)
- `src/index.css` - Global styles (dark theme)
- `public/images/profile.jpg` - YOUR PHOTO (add this!)

---

## 📞 Update Your Info

### Contact Details (in multiple files):
- Email: `bradley@bbbi.dev`
- Phone: `+27 123 456 7890`
- LinkedIn: `linkedin.com/in/bradleybotes`
- GitHub: `github.com/bradleybotes`

**Files to update:**
- `src/pages/Home.jsx`
- `src/components/Layout.jsx`
- `src/pages/Contact.jsx`

---

## 🎬 Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run deploy       # Deploy with gh-pages
```

---

## ✨ Final Checklist

- [ ] Add profile.jpg
- [ ] Update image code in Home.jsx
- [ ] Add resume.pdf
- [ ] Update contact info
- [ ] Test locally
- [ ] Push to GitHub
- [ ] Deploy to GitHub Pages
- [ ] Configure DNS
- [ ] Enable HTTPS

---

## 🆘 Need Help?

**Full Guides:**
- 📖 `IMAGE_SETUP_GUIDE.md` - Photo setup
- 📖 `GITHUB_PAGES_SETUP.md` - Deployment
- 📖 `DNS_CONFIGURATION.md` - Domain setup
- 📖 `REDESIGN_COMPLETE.md` - Full overview

---

**Your site:** bradleybotes.co.za
**Time to complete:** ~15 minutes
**Status:** 95% done (just add photo!)

🎉 **Almost there!**

