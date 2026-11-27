import { JournalArticle } from '../types';
import { IMAGES } from './images';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'jour-01',
    slug: 'grammar-of-the-unforced-shoulder',
    title: 'The Grammar of the Unforced Shoulder',
    category: 'Craftsmanship',
    date: 'November 2026',
    readTime: '4 min read',
    author: 'Claire Moreau, Pattern Studio',
    excerpt:
      'How floating horsehair canvas and soft sleeve heads replace rigid padding with architectural grace.',
    pullQuote:
      'True tailoring does not impose geometry onto the body; it reveals the natural composure already there.',
    heroImage: IMAGES.journalAtelierCraft,
    heroAlt: 'Tailoring atelier worktable with draped linen toile on dress form and folded wool bolts.',
    secondaryImage: IMAGES.detailTailoring,
    secondaryAlt: 'Close-up of pick-stitched virgin wool lapel and horn button.',
    paragraphs: [
      'When a jacket feels effortless to wear for twelve continuous hours, the secret is rarely visible from three paces away. It resides between the outer Barathea wool and the cupro lining, where bias-cut canvas flexes with every movement of the collarbone.',
      'In the ATELIER NOIR pattern room, every blazer begins as unbleached Belgian linen pinned directly on the stand. By minimizing shoulder wadding and lengthening the armhole pitch slightly forward, the sleeve drapes cleanly without pulling across the upper back.',
      'Pick-stitching along the lapel edge serves a practical purpose before an aesthetic one: it stabilizes the roll of the wool so the collar settles softly around the neck rather than lying flat and lifeless.',
    ],
  },
  {
    id: 'jour-02',
    slug: 'study-in-mineral-neutrals',
    title: 'A Study in Mineral Neutrals',
    category: 'Design',
    date: 'October 2026',
    readTime: '3 min read',
    author: 'Henrik Lindqvist, Colour Direction',
    excerpt:
      'Why warm ivory, travertine stone, and espresso replace stark optical white in contemporary dress.',
    pullQuote:
      'Optical white belongs to screens; unbleached ivory and limestone belong to daylight and skin.',
    heroImage: IMAGES.campaignQuietForm,
    heroAlt: 'Three models wearing monochrome charcoal, warm ivory, and espresso tailoring in concrete gallery.',
    secondaryImage: IMAGES.collectionEssentials,
    secondaryAlt: 'Model in warm ivory tee and charcoal wool trousers.',
    paragraphs: [
      'Harsh bleached whites create visual glare under natural daylight and flatten subtle textile weave. Our foundational palette draws instead from architectural stone: Roman travertine, raw plaster, weathered basalt, and roasted espresso.',
      'When muted hues sit adjacent to one another—charcoal wool against warm ivory poplin, or deep burgundy beside slate flannel—the eye registers texture rather than loud contrast.',
      'This chromatic restraint allows garments acquired years apart to integrate seamlessly inside one coherent wardrobe.',
    ],
  },
  {
    id: 'jour-03',
    slug: 'weight-and-drape-of-double-faced-wool',
    title: 'The Weight & Drape of Double-Faced Cloth',
    category: 'Materials',
    date: 'October 2026',
    readTime: '4 min read',
    author: 'Sofia Benedetti, Textile Archive',
    excerpt:
      'Inside the hand-split seam technique that allows winter overcoats to drape without heavy lining.',
    pullQuote:
      'Removing the lining reveals the honesty of the weave on both sides of the garment.',
    heroImage: IMAGES.collectionSeasonal,
    heroAlt: 'Silver-haired model wearing burgundy double-faced wool-cashmere overcoat.',
    secondaryImage: IMAGES.womensCoat,
    secondaryAlt: 'Full-length black belted double-faced cashmere wrap coat.',
    paragraphs: [
      'Double-faced cloth is woven as two tightly interlocked layers of fine virgin wool and cashmere joined by microscopic binder threads. Because both faces are equally finished, an overcoat requires no synthetic interior lining.',
      'To assemble a seam cleanly, tailors peel apart the two textile layers by roughly twelve millimeters along every edge, fold the raw fibers inward, and close the seam with invisible hand-blind stitches.',
      'The result is an overcoat with remarkable thermal warmth and fluid movement—wrapping the wearer in structure that feels closer to a heavy blanket than armor.',
    ],
  },
  {
    id: 'jour-04',
    slug: 'dressing-between-cities',
    title: 'Dressing Between Cities: Rhythm Over Trend',
    category: 'Lifestyle',
    date: 'September 2026',
    readTime: '3 min read',
    author: 'Marcus Vance, Editorial Desk',
    excerpt:
      'Reflections on travel-ready layers, breathable natural fibers, and packing one coherent uniform.',
    pullQuote:
      'A considered garment earns its place in a carry-on by working equally well at eight in the morning and ten at night.',
    heroImage: IMAGES.heroAlt,
    heroAlt: 'Model walking past colonnades in sand trench coat and crossbody leather bag.',
    secondaryImage: IMAGES.bagTote,
    secondaryAlt: 'Architectural espresso grained leather tote on limestone plinth.',
    paragraphs: [
      'Modern life rarely stays confined to a single room or climate zone. A morning flight demands breathable knitwear and soft waistbands; an afternoon gallery walk asks for sharp outerwear that shakes off creases.',
      'High-twist tropical wool and dry-waxed cotton canvas answer this friction gracefully—resisting wrinkles while maintaining crisp architectural poise from transit lounge to dinner table.',
    ],
  },
  {
    id: 'jour-05',
    slug: 'architecture-of-patina',
    title: 'The Architecture of Patina',
    category: 'Culture',
    date: 'September 2026',
    readTime: '4 min read',
    author: 'Kenji Takahashi, Objects Studio',
    excerpt:
      'Vegetable-tanned calfskin, raw selvedge indigo, and honed travertine grow richer through daily use.',
    pullQuote:
      'Nothing worthwhile looks better sealed in plastic than it does after five years of honest wear.',
    heroImage: IMAGES.collectionObjects,
    heroAlt: 'Still life of black calfskin shoulder bag, tortoiseshell sunglasses, and steel watch on travertine.',
    secondaryImage: IMAGES.footwearBoot,
    secondaryAlt: 'Black box-calf leather Chelsea boots on basalt slab.',
    paragraphs: [
      'Surface coatings hide character; full-grain vegetable-tanned leather invites it. Over months of sunlight and touch, espresso calfskin deepens in luster while softening along natural fold lines.',
      'The same principle guides our 14oz unwashed selvedge denim and Goodyear-welted boots—pieces designed to record the habits of their owner rather than resist time.',
    ],
  },
  {
    id: 'jour-06',
    slug: 'proportion-in-off-duty-dress',
    title: 'Proportion in Off-Duty Dress',
    category: 'Fashion',
    date: 'August 2026',
    readTime: '3 min read',
    author: 'Nadia Okafor, Creative Direction',
    excerpt:
      'Balancing relaxed 480gsm cotton fleece with tailored wool trousers for understated everyday composure.',
    pullQuote:
      'Relaxed dressing succeeds when casual volumes are grounded by disciplined trouser lines.',
    heroImage: IMAGES.collectionOffDuty,
    heroAlt: 'Model in washed olive hoodie, relaxed charcoal trousers, and off-white sneakers.',
    secondaryImage: IMAGES.footwearSneaker,
    secondaryAlt: 'Minimalist off-white Italian calfskin sneakers on travertine.',
    paragraphs: [
      'Too often, off-duty dressing abandons structure altogether. Pairing a heavy enzyme-washed cotton hoodie with pleated carded wool trousers creates an immediate dialogue between ease and rigor.',
      'Finished with unbranded Italian calfskin low-tops, the silhouette stays grounded, intentional, and unmistakably contemporary.',
    ],
  },
];
