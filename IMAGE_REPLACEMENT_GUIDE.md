# Barra Cabanas - Image Replacement Guide

This document lists all placeholder images that should be replaced with actual Barra Cabanas property photos.

## Priority 1: Main Property Images (CRITICAL)

### Services Page (src/components/services/ServicesPage.jsx)
**Line 92**: Main accommodation image
- Current: `https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop`
- Replace with: Main exterior photo of the 6-bedroom beachfront house
- Recommended size: 600x400px minimum

**Line 115**: Premium services image
- Current: `https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=600&h=400&fit=crop`
- Replace with: Photo of amenities/services (pool, braai area, or interior)
- Recommended size: 600x400px minimum

**Line 131**: Seasonal pricing image
- Current: `https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop`
- Replace with: Seasonal beach view or calendar-themed property photo
- Recommended size: 600x400px minimum

### Services CTA Background Slider (src/components/services/ServicesPage.jsx)
**Lines 206-219**: Scrolling background images (12 images total)
- Replace with: Various property photos (exterior, interior, pool, beach views, sunset, rooms)
- Recommended size: 400x300px each
- Suggested photos:
  1. Beachfront exterior view
  2. Living room with Smart TV
  3. Kitchen with gas stove
  4. Master bedroom
  5. En-suite bathroom
  6. Pool area
  7. Braai/veranda area
  8. Beach view from property
  9. Sunset from veranda
  10. Dining area
  11. Twin bedroom
  12. Ocean view

## Priority 2: Homepage Images

### Hero Section (src/components/home/Hero.jsx)
- Check for hero background image
- Replace with: Stunning beachfront property photo at sunset/sunrise
- Recommended size: 1920x1080px minimum (full HD)

### Featured Projects (src/components/home/FeaturedProjects.jsx)
**Lines 12, 20, 28**: Three featured house images
- Current: Generic beach house photos from Unsplash
- Replace with: 3 best photos of the Barra Cabanas property from different angles
- Recommended size: 600x400px each

### Contact CTA Background (src/components/home/ContactCTA.jsx)
**Lines 27-39**: Scrolling background images (12 images total)
- Same as Services CTA - use property photos
- Recommended size: 400x300px each

## Priority 3: About Page Images

### About Hero Background (src/components/about/AboutPage.css)
**Line 9**: Hero section background
- Current: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop`
- Replace with: Wide beachfront property photo
- Recommended size: 1920x1080px minimum

### About Page Gallery (src/components/about/AboutPage.jsx)
**Lines 141, 147, 153, 159**: Story gallery images (4 images)
- Replace with: Property photos showing different aspects
- Sizes: 1 large (600x400px), 3 small (300x300px)

### Team Section (src/components/about/AboutPage.jsx)
**Lines 208-213**: Founder information
- Currently shows "Jaco Ligthelm" - needs to be updated to "Anname Louw"
- Consider adding actual photo of Anname if available
- Update bio text to reflect new management

## Priority 4: Portfolio/Gallery Page

### Portfolio Items (src/components/portfolio/PortfolioPage.jsx)
**Lines 12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92, 100**: 12 gallery items
- Replace with: Comprehensive property photo gallery
- Recommended size: 600x400px each
- Suggested categories:
  - Exterior views (3-4 photos)
  - Interior rooms (3-4 photos)
  - Amenities (pool, braai, kitchen) (2-3 photos)
  - Beach/ocean views (2-3 photos)

## Image Storage Recommendations

### Option 1: Local Storage (Recommended for Production)
1. Create folder: `src/assets/images/property/`
2. Organize subfolders:
   - `exterior/` - Outside views of the house
   - `interior/` - Room photos (bedrooms, living room, kitchen)
   - `amenities/` - Pool, braai, facilities
   - `views/` - Beach and ocean views
   - `hero/` - Large hero/banner images

### Option 2: Cloud Storage (Recommended for Performance)
- Use a CDN service (Cloudflare Images, AWS S3, etc.)
- Optimize images before upload (WebP format recommended)
- Implement lazy loading (already in place with OptimizedImage component)

## Image Specifications

### Recommended Formats:
- **WebP**: Best compression and quality (preferred)
- **JPEG**: Good for photos, widely supported
- **PNG**: For images requiring transparency

### Recommended Sizes:
- **Hero images**: 1920x1080px (Full HD)
- **Featured images**: 600x400px
- **Gallery thumbnails**: 400x300px
- **Background sliders**: 400x300px

### Optimization:
- Compress images to reduce file size (aim for <200KB per image)
- Use responsive images with srcset for different screen sizes
- Implement lazy loading (already configured in OptimizedImage component)

## Next Steps

1. **Collect Photos**: Gather high-quality photos of the Barra Cabanas property
2. **Organize**: Sort photos by category (exterior, interior, amenities, views)
3. **Optimize**: Resize and compress images to recommended specifications
4. **Upload**: Place images in `src/assets/images/property/` or upload to CDN
5. **Update Code**: Replace Unsplash URLs with actual image paths
6. **Test**: Verify all images load correctly on different devices

## Additional Notes

- The website currently uses Unsplash placeholder images which are free to use
- All placeholder images should be replaced before going live
- Consider hiring a professional photographer for best results
- Ensure you have rights to use all images on the website
- Add proper alt text for accessibility when replacing images

