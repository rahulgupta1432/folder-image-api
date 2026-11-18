// ─────────────────────────────────────────────────────────────
//  All business content lives here so it can be edited in one place.
//  Values marked PLACEHOLDER were not available publicly and must be
//  confirmed with Groom2B before going live.
// ─────────────────────────────────────────────────────────────
import pattuCouple from './assets/look-pattu-couple.webp';
import ivoryPancha from './assets/look-ivory-pancha.webp';
import templeSherwani from './assets/look-temple-sherwani.webp';
import hlAccessories from './assets/hl-accessories.webp';
import hlDhoti from './assets/hl-dhoti.webp';
import hlTuxedo from './assets/hl-tuxedo.webp';
import hlPeddamma from './assets/hl-peddamma.webp';

export const business = {
  name: 'Groom2B',
  tagline: 'Celebrating Grooms for Every Occasion',
  category: 'Groom Wear',
  instagram: 'https://www.instagram.com/groom.2b/',
  instagramHandle: '@groom.2b',
  instagramFollowers: '28.1K',
  instagramPosts: '696',
  reach: 'Across India & USA',
  address: 'Opposite Peddammathalli Temple, Jubilee Hills, Hyderabad 500033',
  mapsQuery: 'Groom2B, Peddammathalli Temple, Jubilee Hills, Hyderabad 500033',
  // PLACEHOLDER: add the real WhatsApp/phone number in international format, digits only (e.g. '9198xxxxxxxx').
  whatsapp: '',
  phoneDisplay: '+91 ·· ···· ····',
  // PLACEHOLDER: confirm store timings.
  hours: [
    ['Mon – Sun', 'Store hours to be confirmed'],
  ],
};

export const waLink = (text) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;

export const photos = {
  pattuCouple: { webp: pattuCouple, alt: 'Groom and bride in coordinated gold silk Pattu Pancha and saree' },
  ivoryPancha: { webp: ivoryPancha, alt: 'Groom in an ivory embroidered kurta with pancha and angavastram' },
  templeSherwani: { webp: templeSherwani, alt: 'Groom in an ivory sherwani with a maroon dupatta at a temple' },
};

export const highlights = { accessories: hlAccessories, dhoti: hlDhoti, tuxedo: hlTuxedo, peddamma: hlPeddamma };

// The eight categories listed on Groom2B's Instagram bio.
export const collections = [
  { name: 'Pattu Pancha', note: 'Silk & zari', text: 'Pure silk panchas with rich zari borders, paired with kurtas and angavastrams for the sacred rituals.', photo: 'pattuCouple', occasions: ['Wedding', 'Dhoti Function'] },
  { name: 'Sherwani', note: 'The ceremony', text: 'Regal silhouettes and heritage embroidery for the moment you take your vows.', photo: 'templeSherwani', occasions: ['Wedding', 'Engagement'] },
  { name: 'Wedding Suits', note: 'Sharp tailoring', text: 'Clean, confident suits in rich fabrics, cut for engagements and receptions.', occasions: ['Engagement', 'Reception'] },
  { name: 'Tuxedos', note: 'Black tie', text: 'Satin lapels, crisp lines, evening elegance. Made for your grand entrance.', image: 'tuxedo', occasions: ['Reception'] },
  { name: 'Jodhpuri', note: 'Royal structure', text: 'The bandhgala, reimagined: structured, dignified and timeless.', occasions: ['Engagement', 'Reception'] },
  { name: 'Indo-Western', note: 'Modern heritage', text: 'Contemporary cuts with Indian craft for sangeet and cocktail nights.', occasions: ['Sangeet', 'Reception'] },
  { name: 'Kurta', note: 'Festive ease', text: 'Light, festive kurtas that move with you through haldi, mehendi and poojas.', photo: 'ivoryPancha', occasions: ['Haldi', 'Mehendi', 'Dhoti Function'] },
  { name: 'Sadri', note: 'The finishing layer', text: 'A statement waistcoat that turns any kurta into an occasion look.', occasions: ['Mehendi', 'Sangeet'] },
];

// Used by the wardrobe planner.
export const occasions = [
  { id: 'dhoti', name: 'Dhoti Function', when: 'Pre-wedding ritual', looks: ['Pattu Pancha', 'Kurta'], hint: 'Ivory & gold kurta-pancha with angavastram' },
  { id: 'engagement', name: 'Engagement', when: 'The beginning', looks: ['Jodhpuri', 'Wedding Suits'], hint: 'A tailored Jodhpuri in a jewel tone' },
  { id: 'haldi', name: 'Haldi', when: 'Morning celebration', looks: ['Kurta'], hint: 'A light kurta you can celebrate in' },
  { id: 'mehendi', name: 'Mehendi', when: 'Colour & music', looks: ['Kurta', 'Sadri'], hint: 'Kurta layered with an embroidered sadri' },
  { id: 'sangeet', name: 'Sangeet', when: 'Evening of dance', looks: ['Indo-Western', 'Sadri'], hint: 'An Indo-Western look with movement' },
  { id: 'wedding', name: 'Wedding', when: 'The muhurtham', looks: ['Pattu Pancha', 'Sherwani'], hint: 'Silk Pattu Pancha or an heirloom-style sherwani' },
  { id: 'reception', name: 'Reception', when: 'The grand entrance', looks: ['Tuxedos', 'Wedding Suits'], hint: 'A black-tie tuxedo or a sharp suit' },
];

// From the Instagram story highlights.
export const finishing = [
  { title: 'Accessories', text: 'Cufflinks, brooches, malas and safas chosen to complete each look.', image: 'accessories' },
  { title: 'Dhoti Function', text: 'Silk panchas and traditional sets prepared for the ritual.', image: 'dhoti' },
  { title: 'Tuxedo', text: 'Evening wear with the finishing details done right.', image: 'tuxedo' },
];

// PLACEHOLDER: replace with real client reviews (with permission). None are invented here.
export const testimonials = [];
