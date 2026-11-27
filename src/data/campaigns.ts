import { Campaign, CollectionId } from '../types';
import { IMAGES } from './images';

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-01',
    slug: 'the-quiet-form',
    title: 'The Quiet Form',
    subtitle: 'Architectural Tailoring in Natural Daylight',
    season: 'Fictional Campaign 01',
    direction: 'Monolithic concrete geometry paired with unforced posture and tactile Barathea wool.',
    description:
      'Photographed across raw cast-concrete galleries, The Quiet Form examines how tailored cloth interacts with space, gravity, and silence.',
    essay:
      'Rather than forcing drama through styling excess, The Quiet Form strips away ornamentation until only line, weight, and movement remain. Charcoal, ivory, and espresso wools converse directly with the surrounding stone.',
    heroImage: IMAGES.campaignQuietForm,
    heroAlt: 'Three diverse models standing across a minimalist concrete staircase in tailored charcoal, ivory, and espresso coats.',
    gallery: [
      {
        src: IMAGES.collectionForm,
        caption: 'Single-breasted espresso Barathea wool against raw concrete.',
        alt: 'Model wearing espresso blazer and trousers in concrete gallery',
      },
      {
        src: IMAGES.womensBlazer,
        caption: 'Softly canvassed shoulder architecture in deep charcoal.',
        alt: 'Model in tailored charcoal wool blazer',
      },
      {
        src: IMAGES.detailTailoring,
        caption: 'Hand-picked lapel seams and natural horn closures.',
        alt: 'Macro tailoring detail of wool weave and horn button',
      },
    ],
    relatedCollectionId: CollectionId.FORM,
    featuredProductIds: ['an-w-01', 'an-w-08', 'an-w-05'],
  },
  {
    id: 'camp-02',
    slug: 'between-moments',
    title: 'Between Moments',
    subtitle: 'Movement Through Stone & Golden Hour',
    season: 'Fictional Campaign 02',
    direction: 'Unposed street-level movement captured on medium-format film at late afternoon.',
    description:
      'Following silhouettes in transit—crossing sunlit courtyards and limestone arcades—where clothing reveals its true balance only while moving.',
    essay:
      'Clothing is rarely experienced standing still. Between Moments focuses on the sweep of cotton gabardine in a crosswind, the swing of a leather strap across the shoulder, and the calm cadence of everyday life.',
    heroImage: IMAGES.heroAlt,
    heroAlt: 'Model walking past dark limestone colonnades wearing sand trench coat and black crossbody bag.',
    gallery: [
      {
        src: IMAGES.heroMain,
        caption: 'Afternoon shadows across travertine courtyard.',
        alt: 'Two models in travertine courtyard wearing tailored blazer and black overcoat',
      },
      {
        src: IMAGES.mensJacket,
        caption: 'Dry-waxed field canvas in overcast courtyard light.',
        alt: 'Model in olive waxed field jacket and raw indigo denim',
      },
      {
        src: IMAGES.collectionObjects,
        caption: 'Daily carry instruments composed on Roman travertine.',
        alt: 'Black leather bag, tortoise sunglasses, and steel watch still life',
      },
    ],
    relatedCollectionId: CollectionId.FORM,
    featuredProductIds: ['an-w-07', 'an-a-01', 'an-m-03'],
  },
  {
    id: 'camp-03',
    slug: 'modern-heritage',
    title: 'Modern Heritage',
    subtitle: 'Timeless Codes Rewritten for Now',
    season: 'Fictional Campaign 03',
    direction: 'Mature elegance, weathered stone terraces, and rich winter tones.',
    description:
      'Honoring enduring tailoring codes—double-faced cashmere, French box-calf boots, and burgundy worsted wool—worn with quiet ease across generations.',
    essay:
      'Style deepens with lived experience. Modern Heritage celebrates garments built to transcend seasonal novelty, pairing classic English and Italian cloth weights with contemporary relaxed proportions.',
    heroImage: IMAGES.collectionSeasonal,
    heroAlt: 'Distinguished silver-haired model wearing burgundy double-faced wool-cashmere overcoat outdoors.',
    gallery: [
      {
        src: IMAGES.mensCoat,
        caption: 'Unlined midnight navy double-faced coat.',
        alt: 'Male model in midnight navy wool overcoat',
      },
      {
        src: IMAGES.womensCoat,
        caption: 'Floor-sweeping belted cashmere wrap silhouette.',
        alt: 'Model in black belted cashmere wrap coat',
      },
      {
        src: IMAGES.footwearBoot,
        caption: 'Goodyear-welted French box-calf Chelsea boots.',
        alt: 'Black leather Chelsea boots on basalt slab',
      },
    ],
    relatedCollectionId: CollectionId.SEASONAL,
    featuredProductIds: ['an-m-01', 'an-w-02', 'an-f-02'],
  },
  {
    id: 'camp-04',
    slug: 'the-new-uniform',
    title: 'The New Uniform',
    subtitle: 'Disciplined Essentials for Daily Repetition',
    season: 'Fictional Campaign 04',
    direction: 'Warm studio plaster, crisp natural light, and tonal neutrality.',
    description:
      'An exploration of effortless daily repetition—heavyweight organic cotton, high-twist merino, and pleated wool designed to simplify getting dressed.',
    essay:
      'When every element in a wardrobe shares a disciplined color language and proportion, friction disappears. The New Uniform centers on pieces you reach for three times a week without hesitation.',
    heroImage: IMAGES.heroMain,
    heroAlt: 'Two models in tailored charcoal, warm ivory, and black garments standing in sunlit courtyard.',
    gallery: [
      {
        src: IMAGES.collectionEssentials,
        caption: '290gsm organic Supima tee and charcoal wool pleats.',
        alt: 'Model wearing ivory cotton tee and charcoal pleated trousers',
      },
      {
        src: IMAGES.mensShirt,
        caption: 'High-twist cotton poplin overshirt in off-white.',
        alt: 'Model wearing crisp off-white overshirt and black pleated trousers',
      },
      {
        src: IMAGES.womensKnit,
        caption: 'Five-gauge oatmeal ribbed merino knitwear.',
        alt: 'Curvy model wearing oatmeal ribbed merino turtleneck',
      },
    ],
    relatedCollectionId: CollectionId.ESSENTIALS,
    featuredProductIds: ['an-w-06', 'an-m-02', 'an-w-04'],
  },
  {
    id: 'camp-05',
    slug: 'beyond-the-frame',
    title: 'Beyond the Frame',
    subtitle: 'Objects, Patina & Tactile Permanence',
    season: 'Fictional Campaign 05',
    direction: 'Sculptural still-life studies and behind-the-scenes atelier craftsmanship.',
    description:
      'Looking past the garment to the instruments and materials that shape it: pattern linen, vegetable-tanned hides, honed travertine, and brushed steel.',
    essay:
      'A fashion house is defined as much by its objects as its silhouettes. Beyond the Frame brings forward the leather goods, footwear, and studio materials that anchor the ATELIER NOIR universe.',
    heroImage: IMAGES.journalAtelierCraft,
    heroAlt: 'Sunlit fashion atelier worktable with linen toile, wool fabric bolts, and brass shears.',
    gallery: [
      {
        src: IMAGES.bagTote,
        caption: 'Vegetable-tanned espresso leather architecture.',
        alt: 'Espresso grained leather tote bag on limestone',
      },
      {
        src: IMAGES.footwearSneaker,
        caption: 'Sidewall-stitched Italian calfskin cupsole.',
        alt: 'Minimalist off-white leather sneakers on travertine',
      },
      {
        src: IMAGES.collectionObjects,
        caption: 'Eyewear, timepiece, and structured carry.',
        alt: 'Still life of bag, sunglasses, and watch on travertine',
      },
    ],
    relatedCollectionId: CollectionId.OBJECTS,
    featuredProductIds: ['an-a-02', 'an-f-01', 'an-a-04'],
  },
];
