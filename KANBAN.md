# Cravit Blog - Kanban Task List

## 📊 Requirements Summary
- Images ONLY for pizzerias with Franchino grade > 8.25/8.5
- BEST pizzeria (9+) gets big cover image, others get side images (left/right)
- All featured pizzerias need 4 images under Cravit graphics (PizzaReview component)
- PizzeriaInfoCard needs redesign (current one is "terrible")
- Table stays as is (they like it)

---

## 🎯 TODO

### PRIORITY 1: PizzeriaInfoCard Redesign
**Status:** ✅ COMPLETE
**Assignee:** PIT

The current card has:
- Gradient header with voto
- Address preview
- Two buttons (Maps, YouTube)
- Footer text

Problems:
- Too busy
- Visual hierarchy is unclear
- Address gets truncated awkwardly
- Buttons take too much space

**New Design Approach:**
- Cleaner, more compact layout
- Better visual hierarchy
- Full address visible or elegantly truncated
- More integrated action buttons
- Maybe card-based layout with better spacing

---

### PRIORITY 2: Complete Pizzeria Sections (Roma Sud)
**Status:** 🔴 Not Started

Current state:
- ✅ Quattro Stagioni (9+) - Full layout with cover image, narrative, card, review, gallery
- ✅ Pizza Luigi (9) - Full layout with side image, narrative, card, review, gallery  
- ✅ Sancho (8.5) - Full layout with side image, narrative, card, review, gallery
- ✅ Da Alberto (8.5) - Has side image, narrative, card, review, but only 3 images in gallery (needs 4)
- ⚠️ Pizza Max (8.5) - Missing narrative text, NO side image, NO gallery (needs full layout)
- ⚠️ Tempio della Pizza (8.5) - Missing narrative text, NO side image, NO gallery (needs full layout)
- ⚠️ Box 41 (8+) - Has narrative, card, review - needs side image + gallery
- ⚠️ Claudio & Claudio (8.5) - Has narrative, card, review - needs side image + gallery

**Task 2.1: Da Alberto - Add 4th Image** ✅
- Added 4th image (location-2.jpg) to gallery

**Task 2.2: Pizza Max - Complete Section** ✅
- Added ImageRight component with side image
- Added 4-image gallery under review

**Task 2.3: Tempio della Pizza - Complete Section** ✅
- Added ImageLeft component with side image
- Added 4-image gallery under review

**Task 2.4: Box 41 - Add Side Image + Gallery** ✅
- Added ImageRight component with side image
- Added 4-image gallery under review

**Task 2.5: Claudio & Claudio - Add Side Image + Gallery** ✅
- Added ImageLeft component with side image
- Added 4-image gallery under review

---

### PRIORITY 3: Image Layout Pattern
**Status:** ✅ IMPLEMENTED

Pattern to follow:
- **9+ (Quattro Stagioni):** `<ImageFull>` - Big cover image
- **9 (Pizza Luigi):** `<ImageLeft>` - Side image left
- **8.5 (Sancho):** `<ImageRight>` - Side image right  
- **8.5 (Da Alberto):** `<ImageLeft>` - Side image left
- **8.5 (Pizza Max):** `<ImageRight>` - Side image right
- **8.5 (Tempio):** `<ImageLeft>` - Side image left
- **8+ (Box 41):** `<ImageRight>` - Side image right
- **8.5 (Claudio):** `<ImageLeft>` - Side image left

Alternating pattern: Left, Right, Left, Right, Left, Right, Left, Right

---

### PRIORITY 4: Check Other Zones
**Status:** 🔴 NOT STARTED

Need to check:
- pizzerie-roma-nord.mdx - Has content, needs images + layout
- pizzerie-roma-est.mdx - Has content, needs images + layout  
- pizzerie-roma-ovest-centro.mdx - Status unknown

For each:
- Which pizzerias have grades > 8.25?
- Do they have complete layouts?
- Are images present?

**Note:** These files exist and have content with PizzeriaInfoCard and PizzaReview components, but lack the ImageLeft/ImageRight layouts and galleries.

---

### PRIORITY 5: Franchino Grade Data Collection
**Status:** 🔴 Not Started

Need to go through Franchino videos and extract:
- All pizzerias mentioned
- Their grades
- Key quotes/narratives

This is for building the complete table and ensuring all sections are accurate.

---

## ✅ DONE

- Read and understood current codebase
- Identified components: PizzeriaInfoCard, PizzaReview, PizzeriaTable, ImageGallery, ImageFull, ImageLeft, ImageRight
- Mapped out current state of Roma Sud
- Created this task list

---

## 📝 Notes

### Image Gallery Format
All galleries use 4 images:
```tsx
<ImageGallery layout="grid" images={[
  { src: "/blog/pizza-roma-sud/SLUG/pizza-3.jpg", alt: "..." },
  { src: "/blog/pizza-roma-sud/SLUG/pizza-2.jpg", alt: "..." },
  { src: "/blog/pizza-roma-sud/SLUG/pizza-1.jpg", alt: "..." },
  { src: "/blog/pizza-roma-sud/SLUG/suppli-1.jpg", alt: "..." },
]} />
```

### Side Image Components
Need to check if ImageLeft and ImageRight components exist in mdx-content.tsx or if they're custom components.

### File Paths
- Content: `/src/content/blog/pizzerie-roma-sud.mdx`
- Components: `/src/app/components/blog/`
