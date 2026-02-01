# Cravit Blog - Kanban Task List

## 📊 Requirements Summary
- Images ONLY for pizzerias with Franchino grade > 8.25/8.5
- BEST pizzeria (9+) gets big cover image, others get side images (left/right)
- All featured pizzerias need 4 images under Cravit graphics (PizzaReview component)
- PizzeriaInfoCard: ✅ REDESIGNED (clear cache to see changes)
- Table stays as is (you like it)

---

## 🎯 ACTIVE TASKS

### TASK 1: Fetch Real Images from Google Maps API
**Status:** ✅ COMPLETE (with 1 exception)
**API Key:** AIzaSyDb-LLmkfV4Tb_Ftm5go5jIKR2yJ4abb_w
**Source:** REAL images from Google Maps Places API (NO AI)

**Results:**

| # | Pizzeria | Grade | Layout | Images | Status |
|---|----------|-------|--------|--------|--------|
| 1 | Quattro Stagioni | 9+ | ImageFull (cover) | 5 | ✅ Downloaded |
| 2 | Pizza Luigi | 9 | ImageLeft | 5 | ✅ Downloaded |
| 3 | Sancho | 8.5 | ImageRight | 5 | ✅ Downloaded |
| 4 | Da Alberto | 8.5 | ImageLeft | 5 | ✅ Downloaded |
| 5 | Pizza Max | 8.5 | ImageRight | 0 | ⚠️ NO PHOTOS ON GOOGLE MAPS |
| 6 | Tempio della Pizza | 8.5 | ImageLeft | 5 | ✅ Downloaded |
| 7 | Box 41 | 8+ | ImageRight | 5 | ✅ Downloaded |
| 8 | Claudio & Claudio | 8.5 | ImageLeft | 5 | ✅ Downloaded |

**Total:** 35 real images downloaded from Google Maps

**Pizza Max Issue:**
- Place exists on Google Maps: "Pizza Max - Forno a legna"
- Address confirmed: Largo Cesidio da Fossa, 38
- **Problem:** Business has 0 photos uploaded
- **Solution needed:** Manual screenshots from Franchino's video OR generic placeholder

**Image naming convention:**
- Cover/Side: `location-1.png` (for 9+) or `location-1.jpg`
- Gallery: `pizza-1.jpg`, `pizza-2.jpg`, `pizza-3.jpg`, `suppli-1.jpg`

**Output folder:** `/public/blog/pizza-roma-sud/{pizzeria-slug}/`

---

### TASK 2: Handle Pizza Max Missing Images
**Status:** 🔴 NEEDS DECISION

Options:
1. **Screenshot from YouTube:** Extract frames from Franchino's video
2. **Placeholder:** Use generic pizza/suppli images
3. **Text-only:** Remove ImageRight/ImageGallery for this pizzeria

---

### TASK 3: Clear Browser Cache & Verify
**Status:** ⏳ PENDING USER ACTION

**Action required:** Hard refresh browser (Cmd+Shift+R on Mac)

**What you should see:**
- Redesigned PizzeriaInfoCard (clean 2-row layout)
- All images loading from Google Maps
- Proper alternating left/right image layouts

---

### TASK 4: Extract All Franchino Grades
**Status:** 🔴 NOT STARTED

**Goal:** Build complete table with all pizzerias from videos

**Current status:**
- Table has 22 pizzerias
- Need to verify all grades match Franchino's actual grades
- Need to watch videos to extract grades for lower-rated pizzerias

---

### TASK 5: Apply Layouts to Other Zones
**Status:** 🔴 NOT STARTED

**Files to update:**
- `pizzerie-roma-nord.mdx` - Add ImageLeft/ImageRight + galleries
- `pizzerie-roma-est.mdx` - Add ImageLeft/ImageRight + galleries  
- `pizzerie-roma-ovest-centro.mdx` - Check status

---

## ✅ COMPLETED

- [x] PizzeriaInfoCard redesign (cleaner layout, better hierarchy)
- [x] MDX structure updated with ImageFull/ImageLeft/ImageRight
- [x] Gallery components added to all 8 pizzerias
- [x] Alternating layout pattern (Left/Right) implemented
- [x] Downloaded 35 real images from Google Maps API
- [x] KANBAN created for task tracking

---

## 📝 Technical Notes

### Google Maps API Usage
```javascript
// 1. Find Place
https://maps.googleapis.com/maps/api/place/findplacefromtext/json

// 2. Get Details  
https://maps.googleapis.com/maps/api/place/details/json

// 3. Download Photo
https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=XXX
```

### File Structure
```
public/blog/pizza-roma-sud/
├── quattro-stagioni/
│   ├── location-1.png (cover)
│   ├── pizza-1.jpg
│   ├── pizza-2.jpg
│   ├── pizza-3.jpg
│   └── suppli-1.jpg
├── luigi/
│   ├── location-1.jpg (side)
│   ├── pizza-1.jpg
│   ├── pizza-2.jpg
│   ├── pizza-3.jpg
│   └── suppli-1.jpg
├── sancho/
│   └── [5 images]
├── da-alberto/
│   ├── location-1.jpg (side)
│   ├── location-2.jpg (gallery extra)
│   ├── pizza-1.jpg
│   ├── pizza-2.jpg
│   ├── pizza-3.jpg
│   └── suppli-1.jpg
├── pizza-max/
│   └── README.md (no images available)
├── tempio-pizza/
│   └── [5 images]
├── box-41/
│   └── [5 images]
└── claudio-claudio/
    └── [5 images]
```

### Scripts Used
- `fetch-images.js` - Main download script
- `search-pizza-max.js` - Alternative search for Pizza Max
