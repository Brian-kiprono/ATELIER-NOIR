import { Collection, CollectionId } from '../types';
import { IMAGES } from './images';

export const COLLECTIONS: Collection[] = [
  {
    id: CollectionId.ESSENTIALS,
    name: 'The Essentials',
    subtitle: 'Permanent Wardrobe Foundations',
    description:
      'Clean silhouettes in heavyweight organic cotton, fine merino, and unlined wool—engineered for daily longevity.',
    essay:
      'Built on proportion rather than ornament. The Essentials distills daily dressing to its most enduring forms: high-twist jersey, crisp pleated wool, and quiet neutral tonalities that move effortlessly across seasons.',
    palette: {
      surface: '#EFECE6',
      accent: '#1A1A1A',
      textOnAccent: '#F7F5F0',
      swatchHexes: ['#F7F5F0', '#1A1A1A', '#8A8782', '#D8D3C8'],
    },
    heroImage: IMAGES.collectionEssentials,
    heroAlt:
      'Model wearing ivory heavyweight cotton tee and charcoal wide-leg pleated trousers in warm stone studio.',
    photographyDirection: 'Soft diffused studio daylight against raw plaster and travertine.',
  },
  {
    id: CollectionId.FORM,
    name: 'The Form Collection',
    subtitle: 'Architectural Contemporary Tailoring',
    description:
      'Structured blazers, wide-leg trousers, crisp poplin shirting, and fluid evening silhouettes shaped with sculptural discipline.',
    essay:
      'Tailoring treated as spatial design. Canvas-constructed shoulders, generous trouser drape, and silk-cupro linings create garments that hold posture without stiffness.',
    palette: {
      surface: '#E9E3DB',
      accent: '#3E2E26',
      textOnAccent: '#F7F5F0',
      swatchHexes: ['#3E2E26', '#1A1A1A', '#2E2D2B', '#E5DFD5'],
    },
    heroImage: IMAGES.collectionForm,
    heroAlt:
      'Model in espresso brown tailored wool blazer and matching trousers walking through a concrete architectural gallery.',
    photographyDirection: 'Brutalist museum concrete, long natural window shadows, poised motion.',
  },
  {
    id: CollectionId.OFF_DUTY,
    name: 'The Off-Duty Collection',
    subtitle: 'Relaxed Everyday Architecture',
    description:
      'Loopback heavyweight hoodies, garment-dyed overshirts, raw selvedge denim, and relaxed trousers cut for ease.',
    essay:
      'Relaxation without carelessness. The Off-Duty Collection applies tailoring rigor to casual fabrics—high-density 480gsm cotton fleece, waxed weathercloth, and Japanese selvedge denim.',
    palette: {
      surface: '#E8EAE5',
      accent: '#4E5545',
      textOnAccent: '#F7F5F0',
      swatchHexes: ['#4E5545', '#3A3D39', '#8E9189', '#1D2939'],
    },
    heroImage: IMAGES.collectionOffDuty,
    heroAlt:
      'Model wearing washed olive heavyweight hoodie, relaxed charcoal wool trousers, and off-white leather sneakers in concrete plaza.',
    photographyDirection: 'Overcast urban street-style documentary photography.',
  },
  {
    id: CollectionId.OBJECTS,
    name: 'The Objects Collection',
    subtitle: 'Leather Goods, Footwear & Daily Artifacts',
    description:
      'Full-grain Italian calfskin bags, Goodyear-welted boots, minimalist sneakers, eyewear, and tactile interior pieces.',
    essay:
      'Objects conceived to gather patina rather than age out. Uncoated brass, vegetable-tanned calfskin, sculpted acetate, and matte stoneware designed for decades of carry.',
    palette: {
      surface: '#EDE8DF',
      accent: '#6F5846',
      textOnAccent: '#F7F5F0',
      swatchHexes: ['#0E0E0E', '#4B362A', '#C6B7A1', '#7A7671'],
    },
    heroImage: IMAGES.collectionObjects,
    heroAlt:
      'Still life of black calfskin shoulder bag, tortoiseshell sunglasses, and brushed steel watch on raw travertine stone.',
    photographyDirection: 'Still-life compositions on raw travertine and basalt plinths.',
  },
  {
    id: CollectionId.SEASONAL,
    name: 'The Seasonal Edit',
    subtitle: 'Autumn / Winter Study in Deep Tone',
    description:
      'Double-faced wool-cashmere coats, bias-cut silk dresses, and ribbed merino knitwear rendered in burgundy and midnight navy.',
    essay:
      'Each season introduces a measured chromatic shift. This edit explores oxblood burgundy, deep midnight navy, and warm oatmeal against crisp winter light.',
    palette: {
      surface: '#ECE6E7',
      accent: '#5A232B',
      textOnAccent: '#F7F5F0',
      swatchHexes: ['#5A232B', '#1E293B', '#D5CBB8', '#141414'],
    },
    heroImage: IMAGES.collectionSeasonal,
    heroAlt:
      'Silver-haired model wearing a deep burgundy double-faced wool-cashmere overcoat over black turtleneck on autumn terrace.',
    photographyDirection: 'Outdoor atmospheric daylight on weathered limestone.',
  },
];
