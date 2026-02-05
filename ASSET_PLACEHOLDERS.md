# Asset Placeholders - Barra Cabanas Website

This document tracks all placeholder assets that need to be replaced with final content.

## 🎨 Branding Updates Completed

### ✅ Color Scheme Updated
- **Primary Color**: Beige (#F5E6D3)
- **Secondary Color**: Black (#1a1a1a)
- **Status**: ✅ COMPLETE - All green accents removed

**Files Updated:**
- `src/styles/variables.css` - Color variables updated
- `src/App.css` - Button styles updated
- `src/components/home/Hero.css` - Hero section colors updated

---

## 🎵 Audio Placeholders

### Background Audio (Hero Section)
**Location**: `public/audio/placeholder-happy-relaxed.mp3`  
**Status**: 🔴 PLACEHOLDER - Awaiting final audio  
**Required Vibe**: Happy / Relaxed beach atmosphere  
**Specifications**:
- Format: MP3
- Duration: 2-5 minutes (seamless loop)
- Volume: 60% (adjustable)
- Style: Happy beach vibes, gentle ambient sounds

**Replacement Instructions**:
1. Replace `placeholder-happy-relaxed.mp3` with final audio file
2. Update filename in `src/components/home/Hero.jsx` (line ~129)
3. Remove placeholder comments from Hero.jsx
4. Test audio playback and volume levels

**Documentation**: See `public/audio/README.md` for full specifications

---

## 📸 Image Placeholders

### House Features Section (Homepage)
**Component**: `src/components/home/HouseFeatures.jsx`  
**Status**: 🔴 PLACEHOLDER IMAGES - Using existing house photos temporarily

#### Feature 1: Beachfront with Pool
**Current Images** (rotating):
- `pool-deck-aerial-view.jpg`
- `infinity-pool-oceanview.jpg`
- `pool-courtyard-loungers.jpg`
- `balcony-deck-oceanview.jpg`

**Required**: Bright daylight photos of patio/pool areas

#### Feature 2: 6 Air-conditioned Bedrooms
**Current Images** (rotating):
- `bedroom-suite-02.jpg` through `bedroom-suite-11.jpg`

**Required**: Photos showing:
- Queen beds
- Single/twin beds
- Wardrobe angles

#### Feature 3: En-suite Bathrooms
**Current Images** (rotating):
- `bathroom-vanity-01.jpg`
- `bathroom-vanity-02.jpg`
- `bathroom-vanity-03.jpg`

**Required**: Photos showing:
- Bath
- Shower
- Modern fixtures

**Replacement Instructions**:
1. Add new images to `src/assets/images/Houses/` directory
2. Update image imports in `HouseFeatures.jsx` (lines 8-25)
3. Update image arrays in features data (lines 30-52)
4. Remove placeholder note from component

---

## 📄 PDF Placeholders

### Accommodation Information Sheet
**Status**: 🔴 PLACEHOLDER - No pricing version needed  
**Location**: To be added to `public/` directory  
**Requirements**:
- No prices displayed
- House features and amenities
- Activities information
- Contact details

**Files to Update**:
- `src/components/common/InfoSheetDownload.jsx` - Update PDF path

### Activities PDF
**Status**: 🔴 PENDING - Activities listing
**Location**: Activities page (`src/components/activities/ActivitiesPage.jsx`)
**Requirements**:
- Activity names
- Descriptions
- Contact details for each activity (phone, email, location)
- Pricing information (optional)

**Current Implementation**:
- Activities page created with 6 placeholder activities
- Each activity shows: name, description, contact info (phone/email/location)
- PDF download section with placeholder notice
- All contact details marked as "PLACEHOLDER"

**Replacement Instructions**:
1. Update `activities` array in ActivitiesPage.jsx with real activity data
2. Add actual PDF file to `public/pdfs/` directory
3. Update PDF download button to link to actual file
4. Remove placeholder notices and enable download button

---

## 🎨 Mini Icons / Logos

### Amenities Icons
**Status**: 🔴 PLACEHOLDER - Bullets to be replaced with mini icons
**Location**: Accommodation page amenities section
**Current**: Using beige bullet points (●) as placeholders
**Requirements**: Mini icons for:
- Air conditioning
- Pool
- Beach access
- Kitchen facilities
- Bedrooms
- Bathrooms
- Wi-Fi
- Parking

**Files to Update**:
- `src/components/services/ServicesPage.css` (line 161-169) - Replace bullet with icon implementation
- Consider using SVG icons or icon font for final implementation

---

## 🖼️ Additional Image Placeholders

### Floor Plan
**Status**: 🔴 PENDING
**Location**: Accommodation page - Floor Plan Section
**Format**: High-resolution image or PDF
**Current**: Placeholder box with dashed border
**Placement**: `src/components/services/ServicesPage.jsx` (lines 194-206)

**Replacement Instructions**:
1. Add floor plan image to `src/assets/images/` directory
2. Import image in ServicesPage.jsx
3. Replace placeholder div with `<img>` element
4. Remove placeholder text and styling

### Beach Access Gate
**Status**: 🔴 PENDING
**Description**: Photo of beach access gate/entrance
**Current**: Placeholder box with dashed border
**Placement**: `src/components/services/ServicesPage.jsx` (lines 208-228)

**Replacement Instructions**:
1. Add beach access photo to `src/assets/images/` directory
2. Import image in ServicesPage.jsx
3. Replace placeholder div with `<img>` element
4. Remove placeholder text and styling

---

## 🔗 Link Placeholders

### Social Media Links
**Status**: 🔴 PENDING

#### Facebook
- **Current**: Placeholder link (`#`)
- **Required**: Actual Facebook page URL for Barra Cabanas
- **Location**: Contact page (`src/components/contact/ContactPage.jsx` - line ~147)
- **Replacement**: Update `href="#"` with actual Facebook URL

#### Instagram
- **Current**: Placeholder link (`#`)
- **Required**: Actual Instagram profile URL for Barra Cabanas
- **Location**: Contact page (`src/components/contact/ContactPage.jsx` - line ~148)
- **Replacement**: Update `href="#"` with actual Instagram URL

### External Links

#### DriveMoz Facebook Page
- **Current**: Placeholder text mention
- **Required**: Actual Facebook group/page link
- **Location**: Border Information section

#### Google Maps
- **Current**: Placeholder link (`#`)
- **Required**: Actual Google Maps location link for Barra Cabanas
- **Location**: Contact page (`src/components/contact/ContactPage.jsx` - line ~118)
- **Replacement**: Update `href="#"` with actual Google Maps URL

---

## 🏷️ Logo Placeholder

### Main Logo
**Status**: 🔴 PENDING
**Current**: Using existing logo
**Format Required**: SVG or high-resolution PNG  
**Locations**:
- Header/Navigation
- Footer
- Favicon

**Replacement Instructions**:
1. Add logo file to `public/` directory
2. Update references in:
   - `src/components/layout/Navbar.jsx`
   - `src/components/layout/Footer.jsx`
   - `index.html` (favicon)

---

## 🔄 Simplified Booking Page

**Location:** `src/components/booking/BookingPage.jsx`
**Status:** ✅ SIMPLIFIED - Complex features removed

### Changes Made:
- ❌ Removed property selection dropdown
- ❌ Removed availability calendar
- ❌ Removed all pricing calculations
- ❌ Removed complex booking logic with Supabase integration
- ❌ Removed BookingForm modal component dependency

### Current Simple Form Includes:
- ✅ Check-in/Check-out date inputs (HTML5 date pickers)
- ✅ Guest count selector (1-12 guests)
- ✅ Full name input
- ✅ Contact number input
- ✅ Simple form submission with success message
- ✅ Info sidebar with "What Happens Next?" steps

### Backend Integration Needed:
- 🔴 Connect form submission to actual booking API
- 🔴 Replace `setTimeout` simulation (lines 52-66) with real API call
- 🔴 Add proper error handling and validation
- 🔴 Implement email notification system

**Replacement Instructions**:
1. Create booking API endpoint
2. Replace lines 52-66 in BookingPage.jsx with actual API call
3. Add error handling for failed submissions
4. Configure email notifications for new booking requests

---

## ✅ Replacement Checklist

Use this checklist when final assets arrive:

- [ ] Background audio (happy/relaxed vibe)
- [ ] House feature images (beachfront/pool)
- [ ] House feature images (bedrooms)
- [ ] House feature images (bathrooms)
- [ ] Floor plan image
- [ ] Beach access gate photo
- [ ] Accommodation info PDF (no prices)
- [ ] Activities PDF
- [ ] Mini icons for amenities
- [ ] Final logo files
- [ ] Facebook page URL
- [ ] Instagram profile URL
- [ ] DriveMoz Facebook link
- [ ] Google Maps location link

---

## 📝 Notes for Asset Replacement

### General Guidelines:
1. **Images**: Optimize for web (< 200KB per image)
2. **PDFs**: Keep file size reasonable (< 5MB)
3. **Audio**: Web-optimized MP3 format
4. **Icons**: SVG format preferred for scalability
5. **Logo**: Provide multiple sizes if possible

### Testing After Replacement:
1. Verify all images load correctly
2. Test audio playback and volume
3. Check PDF downloads work
4. Validate all links are functional
5. Test on mobile and desktop devices

---

**Last Updated**: 2026-02-05
**Status**: Awaiting final assets

