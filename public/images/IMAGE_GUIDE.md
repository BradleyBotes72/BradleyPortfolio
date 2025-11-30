# Image Guide for Portfolio

This guide will help you add your personal photos and workspace images to complete the portfolio design.

---

## 📸 Required Images

### 1. Profile Photo (`profile.jpg`)

**Purpose:** Your professional headshot on the left side of the hero section

**Specifications:**
- **Filename:** `profile.jpg` or `profile.png`
- **Location:** `/public/images/profile.jpg`
- **Dimensions:** 800x800px minimum (square aspect ratio)
- **Format:** JPG or PNG
- **File Size:** Under 500KB (optimize for web)
- **Style:** Professional headshot, clear face, good lighting

**Tips:**
- Use a professional photo with good lighting
- Neutral or slightly blurred background
- Business casual or professional attire
- Smiling and approachable
- High contrast works well with the dark theme

**How to Add:**
1. Save your photo as `profile.jpg`
2. Place it in `/public/images/` folder
3. The code will automatically display it

---

### 2. Workspace/Laptop Dashboard Image (`workspace.jpg`)

**Purpose:** Shows your Power BI dashboard on a laptop/desktop setup on the right side of hero

**Specifications:**
- **Filename:** `workspace.jpg` or `workspace.png`
- **Location:** `/public/images/workspace.jpg`
- **Dimensions:** 1920x1080px (16:9 aspect ratio recommended)
- **Format:** JPG or PNG
- **File Size:** Under 800KB
- **Style:** Professional workspace with laptop showing dashboard

**Content Ideas:**

#### Option A: Laptop with Dashboard (Recommended)
- Take a photo of your laptop on your desk
- Display a Power BI dashboard on the screen
- Dashboard should have:
  - **Black/dark background**
  - **Orange accents/charts** (to match the theme)
  - Visible charts, graphs, and KPIs
  - Professional look
- Good lighting, clean desk
- Angle: slightly from above

#### Option B: Screenshot of Dashboard
- Take a screenshot of your Power BI dashboard
- Use a dark theme (black background)
- Use orange color scheme for:
  - Charts and graphs
  - KPIs and metrics
  - Accent colors
- Include elements like:
  - Bar charts
  - Line graphs
  - KPI cards
  - Tables or matrices
  
#### Option C: Mockup/Composite
- Use a mockup generator to place your dashboard on a laptop
- Sites like:
  - [Smartmockups.com](https://smartmockups.com)
  - [Mockuper.net](https://mockuper.net)
  - [Placeit.net](https://placeit.net)

**How to Add:**
1. Save your image as `workspace.jpg`
2. Place it in `/public/images/` folder
3. The code will automatically display it

---

## 🎨 Creating a Matching Dashboard

If you need to create or modify a dashboard to match the theme:

### Power BI Theme Settings

Use these colors in your Power BI theme:

```json
{
  "name": "Portfolio Theme",
  "dataColors": [
    "#FF6B35",
    "#E85A2A",
    "#FF8555",
    "#FFA075",
    "#FFBB95"
  ],
  "background": "#0D0D0D",
  "foreground": "#F5F5F5",
  "tableAccent": "#FF6B35"
}
```

**Color Palette:**
- Primary Orange: `#FF6B35`
- Darker Orange: `#E85A2A`
- Background: `#0D0D0D` (almost black)
- Text: `#F5F5F5` (light grey)
- Accents: Shades of grey

---

## 🖼️ Image Optimization

Before adding images, optimize them:

### Online Tools:
1. **TinyPNG** - https://tinypng.com
   - Reduces file size without quality loss
   - Drag and drop interface

2. **Squoosh** - https://squoosh.app
   - Advanced optimization
   - Compare quality settings

3. **ImageOptim** (Mac) or **FileOptimizer** (Windows)
   - Desktop apps for batch optimization

### Recommended Settings:
- **JPG Quality:** 80-85%
- **PNG:** 8-bit if possible
- **Resolution:** Web resolution (72 DPI)

---

## 📁 File Structure

After adding images, your structure should look like:

```
public/
├── images/
│   ├── profile.jpg          ← Your professional photo
│   ├── workspace.jpg        ← Dashboard workspace image
│   ├── dashboard1.png       ← Project screenshots (optional)
│   ├── dashboard2.png
│   └── IMAGE_GUIDE.md       ← This file
├── resume.pdf
└── vite.svg
```

---

## 🎯 What Happens After Adding Images

Once you add the images:

1. **Profile Photo:**
   - Update `Home.jsx` line 80-81:
   ```jsx
   {/* Replace the placeholder div with: */}
   <img 
     src="/images/profile.jpg" 
     alt="Bradley Botes" 
     className="w-full h-full object-cover" 
   />
   ```

2. **Workspace Image:**
   - Update `Home.jsx` line 113:
   ```jsx
   {/* Replace the mockup div with: */}
   <img 
     src="/images/workspace.jpg" 
     alt="Power BI Dashboard Workspace" 
     className="w-full h-full object-cover" 
   />
   ```

---

## 🎨 Alternative: Using Placeholders

If you don't have images ready, you can use high-quality placeholders:

### For Profile Photo:
- [This Person Does Not Exist](https://thispersondoesnotexist.com) (AI-generated faces)
- [Unsplash](https://unsplash.com/s/photos/professional-portrait)

### For Workspace:
- [Unsplash](https://unsplash.com/s/photos/laptop-workspace)
- Search: "laptop desk dashboard" or "data analytics workspace"

---

## ✅ Checklist

Before deploying:

- [ ] Profile photo added (`profile.jpg`)
- [ ] Profile photo optimized (under 500KB)
- [ ] Profile photo looks good in circular frame
- [ ] Workspace image added (`workspace.jpg`)
- [ ] Workspace image optimized (under 800KB)
- [ ] Dashboard colors match theme (orange/black)
- [ ] Images display correctly in browser
- [ ] Code updated to use actual images instead of placeholders
- [ ] Test on mobile to ensure images look good

---

## 🎬 Quick Start Commands

After adding images, test locally:

```bash
# Start development server
npm run dev

# Open browser to http://localhost:5173
# Check if images load correctly
# Test responsive design (resize browser)
```

---

## 📸 Screenshot Example Locations

For dashboard screenshots:

1. **Power BI Service:**
   - Open dashboard in browser
   - Press `F12` > `Ctrl + Shift + P` > "Capture screenshot"

2. **Power BI Desktop:**
   - View > Full Screen
   - Use Windows Snipping Tool (`Win + Shift + S`)

3. **High Quality:**
   - Set dashboard to fullscreen
   - Use ShareX (free tool) for high-quality captures
   - Or Lightshot

---

## 💡 Pro Tips

1. **Consistency:** Use the same style/lighting for all photos
2. **Branding:** Ensure dashboard colors match the orange/charcoal theme
3. **Mobile:** Test images on mobile - they should look good at all sizes
4. **Loading:** Optimize images to ensure fast page load times
5. **Backup:** Keep original high-res versions before optimization

---

## 🆘 Troubleshooting

**Image not displaying:**
- Check file path is correct
- Ensure filename matches exactly (case-sensitive on Linux)
- Check file is in `/public/images/` folder
- Clear browser cache (`Ctrl + F5`)

**Image looks blurry:**
- Use higher resolution source image
- Don't upscale small images
- Ensure image is at least the minimum dimensions

**File too large:**
- Use TinyPNG or similar tool
- Reduce dimensions if necessary
- Convert PNG to JPG if no transparency needed

---

**Happy Portfolio Building! 🚀**

For questions, see the main README.md or GITHUB_PAGES_SETUP.md

