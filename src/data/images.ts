export const IMAGES = {
  heroMain: '/src/assets/images/hero_campaign_main_1795744081142.jpg',
  heroAlt: '/src/assets/images/hero_campaign_alt_1795744081653.jpg',
  collectionEssentials: '/src/assets/images/collection_essentials_1795744081944.jpg',
  collectionForm: '/src/assets/images/collection_form_1795744083081.jpg',
  collectionOffDuty: '/src/assets/images/collection_offduty_1795744083428.jpg',
  collectionObjects: '/src/assets/images/collection_objects_1795744082673.jpg',
  collectionSeasonal: '/src/assets/images/collection_seasonal_1795744084310.jpg',
  womensBlazer: '/src/assets/images/product_womens_blazer_1795744084350.jpg',
  womensCoat: '/src/assets/images/product_womens_coat_1795744085307.jpg',
  womensDress: '/src/assets/images/product_womens_dress_1795744084503.jpg',
  womensKnit: '/src/assets/images/product_womens_knit_1795744085005.jpg',
  mensCoat: '/src/assets/images/product_mens_coat_1795744085012.jpg',
  mensShirt: '/src/assets/images/product_mens_shirt_1795744085840.jpg',
  mensJacket: '/src/assets/images/product_mens_jacket_1795744147262.jpg',
  footwearSneaker: '/src/assets/images/product_footwear_sneaker_1795744146378.jpg',
  footwearBoot: '/src/assets/images/product_footwear_boot_1795744146588.jpg',
  bagTote: '/src/assets/images/product_bag_tote_1795744087577.jpg',
  detailTailoring: '/src/assets/images/product_detail_tailoring_1795744087974.jpg',
  campaignQuietForm: '/src/assets/images/campaign_quiet_form_1795744146917.jpg',
  journalAtelierCraft: '/src/assets/images/journal_atelier_craft_1795744147191.jpg',
} as const;

export interface OptimizedImageSources {
  webpSrcSet: string;
  webpFull: string;
  webpSmall: string;
  fallbackJpg: string;
}

export function getOptimizedSources(src: string): OptimizedImageSources | null {
  if (!src.startsWith('/src/assets/images/') || !src.endsWith('.jpg')) {
    return null;
  }
  const base = src.slice(0, -4);
  const webpFull = `${base}.webp`;
  const webpSmall = `${base}-sm.webp`;
  return {
    webpSrcSet: `${webpSmall} 640w, ${webpFull} 1280w`,
    webpFull,
    webpSmall,
    fallbackJpg: src,
  };
}
