# Cravit Blog Cleanup - Kanban

## Project Overview
Complete cleanup of all 4 Cravit blog posts (Roma Nord, Est, Ovest-Centro, Sud) with standardized formatting, image downloads, and cover image generation.

---

## Phase 1: Content Cleanup (All 4 Posts)

### Task 1.1: Roma Nord - Verify & Finalize
- [ ] Verify only pizzerias ≥8.5 have detailed paragraphs
- [ ] Verify pizzerias are ordered from highest to lowest rating
- [ ] Remove any paragraphs for pizzerias under 8.5/8.25 (keep only in table)
- [ ] Commit changes

### Task 1.2: Roma Est - Full Cleanup
- [ ] Read current state of `pizzerie-roma-est.mdx`
- [ ] List all pizzerias with ratings
- [ ] Delete paragraphs for pizzerias under 8.5/8.25
- [ ] Reorder from highest to lowest rating (lowest allowed: 8.5)
- [ ] Verify ImageGallery components are present for remaining pizzerias
- [ ] Commit changes

### Task 1.3: Roma Ovest-Centro - Full Cleanup
- [ ] Read current state of `pizzerie-roma-ovest-centro.mdx`
- [ ] **REMOVE** "Mappa del Gusto" section entirely
- [ ] Delete paragraphs for pizzerias under 8.5/8.25 (keep only in table)
- [ ] Reorder from highest to lowest rating
- [ ] Pizzerias to keep with paragraphs: Gianni al Mattone (10), Pizzeria Franz (9)
- [ ] Pizzerias to move to table only: La Magliana (8.5), Il Trullo (8.5)
- [ ] Commit changes

### Task 1.4: Roma Sud - Full Cleanup
- [ ] Read current state of `pizzerie-roma-sud.mdx`
- [ ] List all pizzerias with ratings
- [ ] Delete paragraphs for pizzerias under 8.5/8.25
- [ ] Reorder from highest to lowest rating
- [ ] Commit changes

---

## Phase 2: Image Downloads

### Task 2.1: Roma Ovest-Centro Images
- [ ] Create folder `/public/blog/pizza-roma-ovest-centro/`
- [ ] Download 5 images for **Gianni al Mattone** (10/10) - Primavalle
- [ ] Download 5 images for **Pizzeria Franz** (9/10) - Monteverde
- [ ] Download 5 images for **La Magliana** (8.5/10) - Magliana  
- [ ] Download 5 images for **Il Trullo** (8.5/10) - Trullo
- [ ] Add ImageGallery components to MDX for all 4 pizzerias
- [ ] Verify all image paths are correct
- [ ] Commit changes

### Task 2.2: Verify Existing Images (Roma Nord, Est, Sud)
- [ ] Verify all pizzerias ≥8.5 have ImageGallery components
- [ ] Verify all image files exist in `/public/blog/`
- [ ] Fix any broken image paths

---

## Phase 3: Cover Image Generation

### Task 3.1: Generate Cover Images
Generate 4 cover images with:
- Zone name (Roma Nord / Roma Est / Roma Ovest & Centro / Roma Sud)
- Title: "Le Migliori Pizze al Taglio di [Zone]"
- Subtitle: "Parere di Franchino" or "Con Franchino Er Criminale"
- Style: Appetizing pizza imagery, Roman vibe

- [ ] Generate `/blog/pizza-roma-nord-cover.png`
- [ ] Generate `/blog/pizza-roma-est-cover.png`
- [ ] Generate `/blog/pizza-roma-ovest-cover.png`
- [ ] Generate `/blog/pizza-roma-sud-cover.png`
- [ ] Update MDX frontmatter with correct coverImage paths
- [ ] Commit changes

---

## Phase 4: Final Review & Validation

### Task 4.1: Content Validation
- [ ] All 4 posts: Verify rating order (highest to lowest)
- [ ] All 4 posts: Verify lowest rating is 8.5/8.25
- [ ] All 4 posts: Verify no paragraphs exist for ratings under 8.5
- [ ] All 4 posts: Verify tables include ALL pizzerias (even low-rated ones)
- [ ] Roma Ovest-Centro: Verify Mappa del Gusto is removed

### Task 4.2: Image Validation
- [ ] All 4 posts: Verify ImageGallery components for ≥8.5 pizzerias
- [ ] All 4 posts: Verify all image files exist
- [ ] All 4 posts: Verify cover images exist and are linked

### Task 4.3: Build Test
- [ ] Run `pnpm build` to verify no errors
- [ ] Fix any MDX/component issues

### Task 4.4: Final Commit & Push
- [ ] Commit all remaining changes
- [ ] Push to origin/main

---

## Notes

### Rating Thresholds
- Keep detailed paragraphs: ≥8.5 (or 8.25 if that was the threshold used)
- Table only: <8.5
- All pizzerias must appear in the final table

### Image Requirements
- Each pizzeria: 5 images (location, pizza x3, supplì)
- Folder naming: `/public/blog/pizza-roma-[zone]/[pizzeria-name]/`

### Project Path
`/Users/paoloauletta/Documents/cravit-landing-opecode/`
