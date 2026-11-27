export enum ProductCategory {
  WOMENSWEAR = 'Womenswear',
  MENSWEAR = 'Menswear',
  FOOTWEAR = 'Footwear',
  ACCESSORIES = 'Accessories',
  LIFESTYLE = 'Lifestyle Goods',
}

export enum CollectionId {
  ESSENTIALS = 'the-essentials',
  FORM = 'the-form',
  OFF_DUTY = 'the-off-duty',
  OBJECTS = 'the-objects',
  SEASONAL = 'the-seasonal-edit',
}

export type PageRoute =
  | 'home'
  | 'shop'
  | 'new-arrivals'
  | 'collections'
  | 'womenswear'
  | 'menswear'
  | 'accessories'
  | 'lookbook'
  | 'campaigns'
  | 'journal'
  | 'about'
  | 'product';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductImageFrame {
  src: string;
  label: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subcategory: string;
  category: ProductCategory;
  collectionId: CollectionId;
  price: number;
  isNewArrival: boolean;
  description: string;
  materials: string;
  fit: string;
  care: string;
  colors: ProductColor[];
  sizes: string[];
  images: ProductImageFrame[];
  featured?: boolean;
}

export interface Collection {
  id: CollectionId;
  name: string;
  subtitle: string;
  description: string;
  essay: string;
  palette: {
    surface: string;
    accent: string;
    textOnAccent: string;
    swatchHexes: string[];
  };
  heroImage: string;
  heroAlt: string;
  photographyDirection: string;
}

export interface LookHotspot {
  productId: string;
  xPercent: number;
  yPercent: number;
  label: string;
}

export interface LookbookEntry {
  id: string;
  number: string;
  title: string;
  collectionId: CollectionId;
  collectionName: string;
  season: string;
  location: string;
  description: string;
  image: string;
  alt: string;
  featuredProductIds: string[];
  hotspots: LookHotspot[];
}

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  season: string;
  direction: string;
  description: string;
  essay: string;
  heroImage: string;
  heroAlt: string;
  gallery: {
    src: string;
    caption: string;
    alt: string;
  }[];
  relatedCollectionId: CollectionId;
  featuredProductIds: string[];
}

export type JournalCategory =
  | 'Fashion'
  | 'Style'
  | 'Design'
  | 'Culture'
  | 'Materials'
  | 'Craftsmanship'
  | 'Lifestyle';

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: JournalCategory;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  pullQuote: string;
  heroImage: string;
  heroAlt: string;
  secondaryImage: string;
  secondaryAlt: string;
  paragraphs: string[];
}

export interface CartItem {
  productId: string;
  colorName: string;
  colorHex: string;
  size: string;
  quantity: number;
}
