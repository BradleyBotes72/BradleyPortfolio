# 📸 Image Setup Guide - Bradley Botes Portfolio

## Quick Start: Adding Your Photos

Your portfolio is now styled with the modern grey/charcoal and orange theme! To complete the look, you need to add your profile photo.

---

## 🎯 What You Need

### 1. Profile Photo (REQUIRED)
- **File:** `profile.jpg` or `profile.png`
- **Location:** `public/images/profile.jpg`
- **Size:** Recommended 800x800px minimum (will be displayed in portrait 3:4 ratio)
- **Style:** Professional photo, preferably black & white to match the design aesthetic

**Your Photo:** I can see you already have a great black & white professional photo! Perfect for this design.

---

## 🔧 Step-by-Step: Add Your Profile Photo

### Option 1: Using the Photo You Showed Me

1. **Save your black & white photo** as `profile.jpg`
2. **Place it in:** `public/images/profile.jpg`
3. **Update the code** in `src/pages/Home.jsx`:

Find this section (around line 183):
```jsx
<div className="aspect-[3/4] bg-gradient-to-br from-charcoal to-grey-dark relative overflow-hidden">
  {/* Placeholder */}
  <div className="w-full h-full flex items-center justify-center text-grey-light">
    ...
  </div>
</div>
```

Replace with:
```jsx
<div className="aspect-[3/4] bg-gradient-to-br from-charcoal to-grey-dark relative overflow-hidden">
  <img 
    src="/images/profile.jpg" 
    alt="Bradley Botes - Power BI Specialist" 
    className="w-full h-full object-cover grayscale"
  />
</div>
```

4. **Save the file** and refresh your browser!

---

## 📝 Code Changes Needed

### In `src/pages/Home.jsx`

**Line ~183 (Hero Section - Profile Image):**

REPLACE:
```jsx
<div className="w-full h-full flex items-center justify-center text-grey-light">
  <div className="text-center p-8">
    <div className="text-8xl text-primary-orange mb-4">👤</div>
    <p className="text-sm">Add your profile photo:</p>
    <p className="text-xs text-grey-lighter mt-2">/public/images/profile.jpg</p>
  </div>
</div>
```

WITH:
```jsx
<img 
  src="/images/profile.jpg" 
  alt="Bradley Botes - Power BI Specialist" 
  className="w-full h-full object-cover grayscale"
/>
```

---

**Line ~345 (About Section - Optional Second Image):**

This is optional, but if you want to add another photo in the About section:

REPLACE:
```jsx
<div className="w-full h-full flex items-center justify-center text-grey-light">
  <div className="text-center p-8">
    <div className="text-6xl text-primary-orange mb-4">📸</div>
    <p className="text-sm">Add another photo here</p>
    <p className="text-xs text-grey-lighter mt-2">(Optional)</p>
  </div>
</div>
```

WITH:
```jsx
<img 
  src="/images/about.jpg" 
  alt="Bradley Botes" 
  className="w-full h-full object-cover"
/>
```

---

## 🎨 Image Recommendations

### For Best Results:

1. **Format:** JPG or PNG
2. **Quality:** High resolution (at least 800x1000px)
3. **Style:** 
   - Black & white or desaturated (matches the theme)
   - Professional look
   - Clean background
4. **File Size:** Under 500KB (optimize for web)

### Your Existing Photo:
The black & white photo you showed me is PERFECT! It has:
- ✅ Professional look
- ✅ Clean background
- ✅ Black & white aesthetic
- ✅ Good lighting and composition

---

## 🖼️ Image Optimization

Before adding, optimize your images:

### Online Tools:
1. **TinyPNG** - https://tinypng.com
   - Drag and drop
   - Reduces file size by 70%+
   
2. **Squoosh** - https://squoosh.app
   - More control over quality
   - Side-by-side comparison

### Settings:
- **JPG Quality:** 80-85%
- **Dimensions:** 800-1200px width is plenty
- **File Size Target:** 200-500KB max

---

## 🚀 Quick Test Commands

After adding images:

```bash
# Make sure dev server is running
npm run dev

# Open browser to http://localhost:5173
# Check if images load
# Test on mobile view (F12 > Device toolbar)
```

---

## 📁 File Structure

Your images folder should look like:

```
public/
├── images/
│   ├── profile.jpg          ← Your main hero image (REQUIRED)
│   ├── about.jpg            ← Optional second image
│   ├── og-image.jpg         ← Optional: for social media sharing
│   ├── dashboard1.png       ← Optional: project screenshots
│   ├── dashboard2.png
│   └── IMAGE_GUIDE.md
├── resume.pdf
└── CNAME
```

---

## 🎯 Social Media Image (Optional)

For better sharing on LinkedIn, Twitter, etc:

1. Create an `og-image.jpg` (1200x630px)
2. Save to `public/images/og-image.jpg`
3. This is already configured in `index.html`

---

## ⚡ Quick Copy-Paste Code

### Full Hero Image Section (Copy & Paste Ready)

Replace the entire hero image container in `Home.jsx` (around line 178-196) with:

```jsx
<div className="relative z-10">
  <div className="relative overflow-hidden rounded-lg">
    <div className="aspect-[3/4] bg-gradient-to-br from-charcoal to-grey-dark relative overflow-hidden">
      <img 
        src="/images/profile.jpg" 
        alt="Bradley Botes - Power BI Specialist" 
        className="w-full h-full object-cover grayscale"
      />
    </div>
    
    {/* Orange accent gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-tr from-primary-orange/10 via-transparent to-transparent pointer-events-none"></div>
  </div>

  {/* Orange accent bar */}
  <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary-orange opacity-80 -z-10"></div>
  <div className="absolute -top-6 -right-6 w-32 h-2 bg-primary-orange"></div>
</div>
```

---

## 🐛 Troubleshooting

### Image doesn't show:
- ✅ Check file is in `public/images/` folder
- ✅ Check filename matches exactly (case-sensitive)
- ✅ Clear browser cache: `Ctrl + F5`
- ✅ Check browser console for errors (F12)

### Image looks blurry:
- Use higher resolution source image
- Ensure image is at least 800px wide

### Image doesn't fit properly:
- The `object-cover` class handles this
- If needed, try `object-top` or `object-center`

### Want color instead of B&W:
- Remove `grayscale` from the className:
```jsx
className="w-full h-full object-cover"
```

---

## 🎬 What's Already Done

✅ Color scheme updated (grey/charcoal + orange)
✅ Header redesigned (minimal, modern)
✅ Footer redesigned
✅ Hero section with split layout
✅ Services section with icons
✅ Skills section with circular progress
✅ About section
✅ Responsive design
✅ Smooth animations
✅ GitHub Pages deployment ready

**Only missing:** Your actual photos!

---

## 📸 Using Your Provided Photo

Since you shared your professional black & white photo:

1. **Save that image** to your computer as `profile.jpg`
2. **Copy it** to `c:\Users\bradl\bradley-botes-bi\public\images\profile.jpg`
3. **Update the code** as shown above
4. **Refresh** your browser

That's it! The design is already perfect for your photo.

---

## 🎨 Alternative: Keep the Placeholder

If you want to test the design first:
- The placeholder is functional
- You can deploy with it and add photos later
- Just update the code when ready

---

## ✨ Final Touches

After adding images:

1. **Test locally** - `npm run dev`
2. **Check mobile view** - Resize browser or F12 > Device toolbar
3. **Build for production** - `npm run build`
4. **Deploy to GitHub Pages** - Follow `GITHUB_PAGES_SETUP.md`

---

## 🆘 Need Help?

If you need help with images:

1. Drop your photo in `public/images/` folder
2. Name it `profile.jpg`
3. Update the code in `Home.jsx` as shown
4. Refresh browser

**Can't edit code?** Let me know and I'll create a pre-configured version!

---

## 📊 Image Specs Summary

| Image | Size | Location | Required |
|-------|------|----------|----------|
| Profile (Hero) | 800x1000px | `public/images/profile.jpg` | ✅ Yes |
| About (Optional) | 800x800px | `public/images/about.jpg` | ⚪ Optional |
| OG Image | 1200x630px | `public/images/og-image.jpg` | ⚪ Optional |

---

**Ready to go live!** 🚀

Once you add your profile photo and update the code, your portfolio will be complete and ready to deploy to bradleybotes.co.za!

