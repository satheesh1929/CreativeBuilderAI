# Testing Guide - Retail Media Creative Builder

## Quick Start

1. **Open in Browser**
   - Double-click `index.html` or
   - Right-click → Open with → Browser

2. **Test on Desktop (1024px+)**
   - See full navigation with links visible
   - 3-column creative grid
   - Side-by-side editor layout

3. **Test on Tablet (768px-1023px)**
   - Hamburger menu appears
   - Sidebar narrower
   - Still side-by-side editor

4. **Test on Mobile (480px-767px)**
   - Full hamburger menu
   - Single column layout
   - Stacked editor (preview over controls)
   - Large touch targets

5. **Test on Small Phone (< 480px)**
   - Ultra-compact layout
   - Single column cards
   - Large fonts for readability
   - Optimized spacing

## Testing Checklist

### Navigation
- [ ] Hamburger menu appears on mobile
- [ ] Menu toggles open/closed
- [ ] Links navigate correctly
- [ ] Menu closes when link clicked

### Forms
- [ ] Input fields have minimum 44px height
- [ ] Font size prevents iOS zoom
- [ ] Select dropdown works on mobile
- [ ] Color picker works on touch devices
- [ ] Form groups stack properly

### Image Upload
- [ ] Click to upload works
- [ ] Drag-and-drop works
- [ ] Image preview shows
- [ ] Works on mobile browsers

### Creative Generation
- [ ] Generate button triggers loading animation
- [ ] AI workflow simulation completes
- [ ] Creatives render on canvas
- [ ] Multiple formats display (9:16, 1:1, 4:5)

### Editor Modal
- [ ] Opens without scrolling issues
- [ ] Canvas displays correctly
- [ ] Controls are accessible
- [ ] Buttons work (Edit, Save, Reset)
- [ ] Closes properly

### Download
- [ ] Download PNG button appears after generation
- [ ] Click triggers file download
- [ ] File naming is correct
- [ ] File size is reasonable

### Compliance
- [ ] Compliance check animation shows
- [ ] Success status appears
- [ ] Verification details display

## Mobile-Specific Tests

### iOS (Safari)
- [ ] Web app looks native
- [ ] Status bar is translucent
- [ ] Input doesn't trigger zoom
- [ ] Touch scrolling is smooth
- [ ] No rubber-band overscroll issues

### Android (Chrome)
- [ ] Layout is compact
- [ ] Touch targets are large enough
- [ ] Scrolling is smooth
- [ ] No layout shifts

### Orientation Changes
- [ ] Portrait layout works
- [ ] Landscape layout works
- [ ] No content overflow
- [ ] Layout reflows properly

## Performance Checks

- [ ] Page loads quickly on mobile
- [ ] No layout jank during scrolling
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Images load properly

## Screen Size Breakpoints to Test

1. **Desktop:** 1440px × 900px
2. **Laptop:** 1024px × 768px
3. **Tablet:** 768px × 1024px (portrait)
4. **Large Phone:** 667px × 812px
5. **Standard Phone:** 375px × 667px
6. **Small Phone:** 320px × 568px

## Browser DevTools Testing

### Chrome DevTools
1. Press F12
2. Click device toolbar icon
3. Select "Responsive"
4. Choose different devices
5. Test each feature

### Firefox DevTools
1. Press F12
2. Click responsive design mode
3. Set custom sizes
4. Test features

### Safari DevTools
1. Enable Developer Menu
2. Use Responsive Design Mode
3. Test on different sizes

## Common Issues & Solutions

### Issue: Hamburger menu not appearing
- **Solution:** Check viewport width is < 768px
- **Check:** Browser zoom is at 100%

### Issue: Inputs too small on mobile
- **Solution:** Font size is 16px (auto-zoom prevention)
- **Check:** Min-height is 44px

### Issue: Scrolling feels slow
- **Solution:** `-webkit-overflow-scrolling: touch` enabled
- **Check:** No heavy computations during scroll

### Issue: Modal doesn't fill screen on mobile
- **Solution:** Height is 100% with border-radius: 0
- **Check:** Modal-overlay display is flex

### Issue: Canvas rendering issues
- **Solution:** Check image loaded before drawing
- **Check:** Canvas dimensions are set correctly

## Feature Verification

### Core Features
- [x] Image Upload with Preview
- [x] Brand Configuration
- [x] Tagline Input
- [x] CTA Customization
- [x] Color Selection/Detection
- [x] Retailer Selection

### Generation Features
- [x] AI Workflow Simulation
- [x] Background Simulation
- [x] Color Detection
- [x] Layout Generation
- [x] Compliance Checking

### Creative Rendering
- [x] Instagram Story (9:16)
- [x] Instagram Feed (1:1)
- [x] Facebook Ad (4:5)
- [x] Canvas Quality
- [x] Brand Positioning

### Editor Features
- [x] Modal Opens/Closes
- [x] Brand Alignment Controls
- [x] CTA Layout Controls
- [x] CTA Style Toggle
- [x] Tagline Toggle
- [x] Preview Updates
- [x] Save/Reset/Cancel

### Download Features
- [x] Download Button Enabled
- [x] File Format (JPEG)
- [x] File Naming
- [x] File Size Optimization

## Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Focus states visible
- [ ] Color contrast sufficient
- [ ] Alt text on images
- [ ] ARIA labels present

## Notes

- All features are fully functional
- Mobile responsiveness is optimized
- Touch targets meet iOS/Android standards
- No external dependencies required
- Pure HTML/CSS/JavaScript
- Works offline after initial load

---

Happy Testing! 🚀
