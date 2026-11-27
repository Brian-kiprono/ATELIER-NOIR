import { CollectionId, LookbookEntry } from '../types';
import { IMAGES } from './images';

export const LOOKBOOK_ENTRIES: LookbookEntry[] = [
  {
    id: 'look-01',
    number: '01',
    title: 'Architectural Contrast',
    collectionId: CollectionId.FORM,
    collectionName: 'The Form Collection',
    season: 'Autumn / Winter',
    location: 'Travertine Courtyard',
    description:
      'Double-breasted charcoal virgin wool layered over wide-leg warm ivory pleated trousers, paired alongside an espresso merino knit and full-length black coat.',
    image: IMAGES.heroMain,
    alt: 'Two models standing in sunlit travertine courtyard wearing charcoal blazer, ivory wide-leg trousers, and black wool overcoat.',
    featuredProductIds: ['an-w-01', 'an-w-05', 'an-m-01', 'an-m-07'],
    hotspots: [
      { productId: 'an-w-01', xPercent: 41, yPercent: 42, label: 'Solis Tailored Blazer' },
      { productId: 'an-w-05', xPercent: 40, yPercent: 72, label: 'Marais Wide Trouser' },
      { productId: 'an-m-07', xPercent: 57, yPercent: 39, label: 'Espresso Merino Knit' },
      { productId: 'an-f-02', xPercent: 56, yPercent: 86, label: 'Basalt Chelsea Boot' },
    ],
  },
  {
    id: 'look-02',
    number: '02',
    title: 'Gallery Monograph',
    collectionId: CollectionId.FORM,
    collectionName: 'The Form Collection',
    season: 'Permanent Edit',
    location: 'Concrete Atrium',
    description:
      'Three tonal studies in charcoal, ivory, and deep espresso tailored outerwear worn across raw cast concrete.',
    image: IMAGES.campaignQuietForm,
    alt: 'Three diverse models on concrete museum staircase wearing charcoal, warm ivory, and espresso tailored coats.',
    featuredProductIds: ['an-w-08', 'an-w-01', 'an-a-02'],
    hotspots: [
      { productId: 'an-w-01', xPercent: 43, yPercent: 36, label: 'Charcoal Wool Tailoring' },
      { productId: 'an-w-05', xPercent: 53, yPercent: 60, label: 'Ivory Pleated Suiting' },
      { productId: 'an-w-08', xPercent: 66, yPercent: 44, label: 'Monolith Espresso Set' },
      { productId: 'an-a-02', xPercent: 71, yPercent: 66, label: 'Atelier Leather Bag' },
    ],
  },
  {
    id: 'look-03',
    number: '03',
    title: 'Colonnade Transit',
    collectionId: CollectionId.FORM,
    collectionName: 'The Form Collection',
    season: 'Mid-Season',
    location: 'Limestone Arcade',
    description:
      'Fluid sand cotton gabardine trench coat worn in motion with the Cadre full-grain calfskin crossbody bag.',
    image: IMAGES.heroAlt,
    alt: 'Model walking past dark limestone colonnades wearing sand trench coat and black leather crossbody bag.',
    featuredProductIds: ['an-w-07', 'an-a-01'],
    hotspots: [
      { productId: 'an-w-07', xPercent: 44, yPercent: 38, label: 'Colonnade Trench' },
      { productId: 'an-a-01', xPercent: 41, yPercent: 50, label: 'Cadre Calfskin Bag' },
    ],
  },
  {
    id: 'look-04',
    number: '04',
    title: 'Essential Proportion',
    collectionId: CollectionId.ESSENTIALS,
    collectionName: 'The Essentials',
    season: 'Core Permanent',
    location: 'Plaster Studio',
    description:
      'Heavyweight 290gsm organic ivory cotton paired with high-rise charcoal tropical wool trousers—minimalism anchored by weight and cut.',
    image: IMAGES.collectionEssentials,
    alt: 'Model wearing ivory heavyweight cotton T-shirt and charcoal pleated wool trousers.',
    featuredProductIds: ['an-w-06', 'an-w-05'],
    hotspots: [
      { productId: 'an-w-06', xPercent: 48, yPercent: 33, label: 'Serene Heavyweight Tee' },
      { productId: 'an-w-05', xPercent: 48, yPercent: 64, label: 'Marais Wool Trouser' },
    ],
  },
  {
    id: 'look-05',
    number: '05',
    title: 'Urban Off-Duty',
    collectionId: CollectionId.OFF_DUTY,
    collectionName: 'The Off-Duty Collection',
    season: 'Autumn / Winter',
    location: 'Concrete Plaza',
    description:
      'Enzyme-washed 480gsm olive loopback hoodie paired with relaxed wool-flannel trousers and stitched Italian calfskin sneakers.',
    image: IMAGES.collectionOffDuty,
    alt: 'Male model wearing washed olive hoodie, charcoal wool trousers, and off-white sneakers.',
    featuredProductIds: ['an-m-04', 'an-m-05', 'an-f-01'],
    hotspots: [
      { productId: 'an-m-04', xPercent: 50, yPercent: 35, label: 'Loopback Hoodie' },
      { productId: 'an-m-05', xPercent: 49, yPercent: 64, label: 'Flannel Trouser' },
      { productId: 'an-f-01', xPercent: 48, yPercent: 88, label: 'Forma Calfskin Sneaker' },
    ],
  },
  {
    id: 'look-06',
    number: '06',
    title: 'Autumn Chroma',
    collectionId: CollectionId.SEASONAL,
    collectionName: 'The Seasonal Edit',
    season: 'Autumn / Winter',
    location: 'Stone Terrace',
    description:
      'Deep burgundy double-faced wool-cashmere overcoat worn open over fine black merino knitwear and slate flannel tailoring.',
    image: IMAGES.collectionSeasonal,
    alt: 'Distinguished silver-haired model wearing burgundy wool-cashmere coat and black turtleneck.',
    featuredProductIds: ['an-m-01', 'an-m-05'],
    hotspots: [
      { productId: 'an-m-01', xPercent: 48, yPercent: 46, label: 'Double-Faced Coat' },
      { productId: 'an-m-05', xPercent: 52, yPercent: 78, label: 'Wool-Flannel Trouser' },
    ],
  },
];
