# Cover Image Generation Summary

HTML templates have been created for all 4 cover images:

1. **pizza-roma-sud-cover.html** → pizza-roma-sud-cover.png
2. **pizza-roma-nord-cover.html** → pizza-roma-nord-cover.png
3. **pizza-roma-est-cover.html** → pizza-roma-est-cover.png
4. **pizza-roma-ovest-cover.html** → pizza-roma-ovest-cover.png

## To convert HTML to PNG:

### Option 1: Use Chrome DevTools
1. Open each HTML file in Chrome
2. Press F12 → Console tab
3. Run: `window.print()` or use Device Toolbar (Ctrl+Shift+M) set to 1200x630 and screenshot

### Option 2: Use a screenshot tool
```bash
# If you have Chrome installed
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless --screenshot=pizza-roma-sud-cover.png \
  --window-size=1200,630 \
  file:///Users/paoloauletta/Documents/cravit-landing-opecode/public/blog/pizza-roma-sud-cover.html
```

### Option 3: Use an online converter
Upload the HTML files to an HTML-to-image converter service

### Option 4: Manual creation
Use Figma, Canva, or Photoshop to create 1200x630px images with:
- Dark gradient background (#1a1a2e to #0f3460)
- "Cravit Guide" logo in #ff6900
- Zone title (Roma Sud/Nord/Est/Ovest) in white
- Subtitle with quartieri names
- "Le Migliori Pizze" badge

## Summary of Completed Tasks:

✅ **Task 1: Roma Ovest-Centro Blog Post**
- Added La Magliana section (8.5/10)
- Added Il Trullo section (8.5/10)
- Added ImageGallery for Gianni al Mattone
- Added ImageGallery for Pizzeria Franz
- Added ImageGallery for La Magliana
- Added ImageGallery for Il Trullo

✅ **Task 2: Download Images**
- Created pizza-roma-ovest/ folder structure
- Downloaded 5 images for each of 4 pizzerias:
  - gianni-al-mattone (location-1.jpg, pizza-1/2/3.jpg, suppli-1.jpg)
  - pizzeria-franz (location-1.jpg, pizza-1/2/3.jpg, suppli-1.jpg)
  - la-magliana (location-1.jpg, pizza-1/2/3.jpg, suppli-1.jpg)
  - il-trullo (location-1.jpg, pizza-1/2/3.jpg, suppli-1.jpg)

⏳ **Task 3: Cover Images**
- HTML templates created for all 4 zones
- PNG conversion pending (see options above)
