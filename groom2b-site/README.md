# Groom2B · Website Concept Preview

A personalised website concept for **Groom2B** (groom wear, Jubilee Hills, Hyderabad),
built to share with the business for feedback. Not the official Groom2B website.

## Quick look
Open `groom2b-preview.html`. It is a single self-contained file that can be opened directly or shared.

## Develop
```bash
npm install
npm run dev           # local dev server
npm run build         # production build → dist/
npm run build:single  # build + pack into dist/groom2b-preview.html
```
Stack: React 18 + Vite, plain modern CSS (no UI libraries).

## Sections
Hero · Story · Collections (8 categories from their Instagram bio) · Wedding Wardrobe Planner ·
Peddamma Collection · Complete the Look · Lookbook (with lightbox) · Reviews placeholder ·
Visit (Google Map) · Booking (store visit / video call → WhatsApp + calendar file) · Footer.

## Before going live: confirm with Groom2B
All editable content is in `src/content.js`.
- `whatsapp`: real WhatsApp number (WhatsApp links currently open with no recipient)
- `hours`: store timings
- `SLOTS` in `src/components/Booking.jsx`: real appointment times
- `testimonials`: real client reviews (none are invented; a placeholder is shown)
- Photos: current images are low-resolution crops from Instagram. Replace them with originals.
- Copy describing the Peddamma Collection and video consultations should be checked with the owner.
