import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { COLLECTIONS } from '../data/collections';
import { getOptimizedSources, IMAGES } from '../data/images';
import { PRODUCTS } from '../data/products';
import { CollectionId } from '../types';
import { EditorialImage } from '../components/EditorialImage';
import { ProductCard } from '../components/ProductCard';

gsap.registerPlugin(ScrollTrigger);

const HERO_SLIDES = [
  {
    src: IMAGES.heroMain,
    alt: 'Two adult models wearing deep charcoal tailored blazer, warm ivory pleated trousers, espresso merino knit, and black wool coat in a sunlit travertine courtyard.',
    caption: 'Campaign 01 · The Quiet Form',
  },
  {
    src: IMAGES.heroAlt,
    alt: 'Adult model in sand-toned cotton gabardine trench coat carrying a black calfskin crossbody bag past dark limestone colonnades.',
    caption: 'Campaign 02 · Between Moments',
  },
];

export const HomePage: React.FC = () => {
  const { navigate } = useStore();
  const [heroIndex, setHeroIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 18,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((el) => {
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const curatedProducts = PRODUCTS.filter((p) => p.featured).slice(0, 6);

  return (
    <div ref={rootRef} className="w-full overflow-x-clip">
      {/* FULL-SCREEN CAMPAIGN HERO */}
      <section className="relative h-[92vh] min-h-[620px] w-full overflow-hidden bg-[#0E0E0E] text-[#F7F5F0]">
        {HERO_SLIDES.map((slide, idx) => {
          const sources = getOptimizedSources(slide.src);
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                idx === heroIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <picture className="block h-full w-full">
                {sources && (
                  <source type="image/webp" srcSet={sources.webpSrcSet} sizes="100vw" />
                )}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  fetchPriority={idx === 0 ? 'high' : 'low'}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center"
                />
              </picture>
            </div>
          );
        })}

        {/* Measured scrim for crisp 4.5:1+ WCAG legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/85 via-[#0E0E0E]/30 to-[#0E0E0E]/35" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-14 sm:px-8 lg:px-12 lg:pb-20">
          <div className="max-w-3xl">
            <p className="hero-stagger text-[12px] tracking-[0.18em] text-[#F7F5F0]/80 uppercase">
              ATELIER NOIR · Autumn / Winter Presentation
            </p>
            <h1 className="hero-stagger font-editorial mt-3 text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.98] font-normal tracking-[-0.01em] text-balance">
              THE ART OF BEING.
            </h1>
            <p className="hero-stagger mt-4 max-w-xl text-[16px] leading-relaxed text-[#F7F5F0]/90 sm:text-[17px]">
              Designed with intention. Made to be lived in.
            </p>

            <div className="hero-stagger mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('shop')}
                className="inline-flex min-h-[46px] items-center gap-2.5 bg-[#F7F5F0] px-7 py-3 text-[13px] font-medium tracking-[0.08em] text-[#1A1A1A] uppercase transition-colors hover:bg-[#EFECE6]"
              >
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => navigate('about')}
                className="inline-flex min-h-[46px] items-center border border-[#F7F5F0]/55 px-7 py-3 text-[13px] font-medium tracking-[0.08em] text-[#F7F5F0] uppercase transition-colors hover:border-[#F7F5F0] hover:bg-[#F7F5F0]/10"
              >
                DISCOVER OUR WORLD
              </button>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-[#F7F5F0]/20 pt-4 text-[12px] text-[#F7F5F0]/75">
            <span>{HERO_SLIDES[heroIndex].caption}</span>
            <div className="flex items-center gap-3">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.caption}
                  type="button"
                  onClick={() => setHeroIndex(idx)}
                  aria-label={`View campaign slide ${idx + 1}`}
                  className={`h-1.5 transition-all ${
                    idx === heroIndex ? 'w-8 bg-[#F7F5F0]' : 'w-4 bg-[#F7F5F0]/40 hover:bg-[#F7F5F0]/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: CURATED COLLECTIONS UNIVERSE */}
      <section className="reveal-section mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="flex flex-col justify-between gap-6 border-b border-[#1A1A1A]/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-[12px] tracking-[0.14em] text-[#6B6863] uppercase">
              Collection Universe
            </p>
            <h2 className="font-editorial mt-2 text-4xl font-normal text-[#1A1A1A] sm:text-5xl">
              Five Disciplines of Dress
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('collections')}
            className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] text-[#1A1A1A] underline-offset-4 hover:underline"
          >
            <span>View All Collections</span>
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Primary Large Feature: The Form Collection */}
          <button
            type="button"
            onClick={() => navigate('collections', { collectionId: CollectionId.FORM })}
            className="group relative overflow-hidden bg-[#E9E3DB] text-left md:col-span-6"
          >
            <div className="aspect-[4/5] w-full overflow-hidden">
              <EditorialImage
                src={COLLECTIONS[1].heroImage}
                alt={COLLECTIONS[1].heroAlt}
                className="h-full w-full transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E0E0E]/85 via-[#0E0E0E]/35 to-transparent p-6 text-[#F7F5F0] sm:p-8">
              <p className="text-[12px] tracking-[0.1em] text-[#F7F5F0]/80 uppercase">
                Architectural Tailoring
              </p>
              <h3 className="font-editorial mt-1 text-3xl font-normal">{COLLECTIONS[1].name}</h3>
              <p className="mt-1.5 max-w-md text-[14px] text-[#F7F5F0]/85">
                {COLLECTIONS[1].description}
              </p>
            </div>
          </button>

          {/* Right 4-card Editorial Mosaic */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-6">
            {[COLLECTIONS[0], COLLECTIONS[2], COLLECTIONS[3], COLLECTIONS[4]].map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => navigate('collections', { collectionId: col.id as CollectionId })}
                className="group flex flex-col border border-[#1A1A1A]/10 text-left transition-colors hover:border-[#1A1A1A]/35"
                style={{ backgroundColor: col.palette.surface }}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <EditorialImage
                    src={col.heroImage}
                    alt={col.heroAlt}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <p className="text-[11px] tracking-[0.12em] text-[#6B6863] uppercase">
                      {col.subtitle}
                    </p>
                    <h3 className="font-editorial mt-1 text-2xl text-[#1A1A1A]">{col.name}</h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {col.palette.swatchHexes.map((hex) => (
                        <span
                          key={hex}
                          className="h-2.5 w-2.5 rounded-full border border-[#1A1A1A]/15"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                    <span className="text-[12px] font-medium text-[#1A1A1A] group-hover:underline">
                      Enter
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: SELECTED SILHOUETTES (CURATED PRODUCT DISCOVERY) */}
      <section className="reveal-section border-y border-[#1A1A1A]/10 bg-[#EFECE6]/70">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="flex flex-col justify-between gap-6 pb-10 md:flex-row md:items-end">
            <div>
              <p className="text-[12px] tracking-[0.14em] text-[#6B6863] uppercase">
                Selected Silhouettes
              </p>
              <h2 className="font-editorial mt-2 text-4xl font-normal text-[#1A1A1A] sm:text-5xl">
                Key Pieces for Now
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-[13px] font-medium">
              <button
                type="button"
                onClick={() => navigate('womenswear')}
                className="text-[#6B6863] transition-colors hover:text-[#1A1A1A]"
              >
                Womenswear
              </button>
              <button
                type="button"
                onClick={() => navigate('menswear')}
                className="text-[#6B6863] transition-colors hover:text-[#1A1A1A]"
              >
                Menswear
              </button>
              <button
                type="button"
                onClick={() => navigate('accessories')}
                className="text-[#6B6863] transition-colors hover:text-[#1A1A1A]"
              >
                Footwear & Objects
              </button>
              <button
                type="button"
                onClick={() => navigate('shop')}
                className="inline-flex items-center gap-1.5 text-[#1A1A1A] underline underline-offset-4"
              >
                <span>Shop All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {curatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CAMPAIGN & LOOKBOOK FEATURE SPREAD */}
      <section className="reveal-section relative w-full bg-[#0E0E0E] text-[#F7F5F0]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <EditorialImage
                  src={IMAGES.campaignQuietForm}
                  alt="Three models standing across concrete staircase gallery in tailored charcoal, ivory, and espresso coats."
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="lg:col-span-5 lg:pl-6">
              <p className="text-[12px] tracking-[0.14em] text-[#F7F5F0]/65 uppercase">
                Editorial Campaign · The Quiet Form
              </p>
              <h2 className="font-editorial mt-3 text-4xl font-normal text-balance sm:text-5xl">
                Line, Gravity, and Silence.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#F7F5F0]/80">
                Photographed across raw cast-concrete galleries, our lookbook and campaign archive
                explore complete outfits in motion—with direct garment links inside each frame.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => navigate('lookbook')}
                  className="inline-flex min-h-[44px] items-center gap-2 bg-[#F7F5F0] px-6 py-3 text-[13px] font-medium tracking-[0.06em] text-[#1A1A1A] uppercase transition-colors hover:bg-[#EFECE6]"
                >
                  <span>Open Lookbook</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('campaigns')}
                  className="inline-flex min-h-[44px] items-center border border-[#F7F5F0]/40 px-6 py-3 text-[13px] font-medium tracking-[0.06em] text-[#F7F5F0] uppercase transition-colors hover:border-[#F7F5F0]"
                >
                  All Campaigns
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: ATELIER CRAFTSMANSHIP & JOURNAL BRIDGE */}
      <section className="reveal-section mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
          <div className="flex flex-col justify-between border border-[#1A1A1A]/10 bg-[#EFECE6] p-8 sm:p-12 lg:col-span-5">
            <div>
              <p className="text-[12px] tracking-[0.14em] text-[#6B6863] uppercase">
                The Atelier & Journal
              </p>
              <h2 className="font-editorial mt-3 text-4xl font-normal text-[#1A1A1A]">
                Material Honesty Without Excess.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#6B6863]">
                Every silhouette begins with unbleached linen draped on the stand, calibrated to
                virgin wools, double-faced cashmere, Japanese high-twist cotton, and vegetable-tanned
                calfskin.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 pt-6 border-t border-[#1A1A1A]/10">
              <button
                type="button"
                onClick={() => navigate('journal')}
                className="inline-flex min-h-[44px] items-center gap-2 bg-[#1A1A1A] px-6 py-3 text-[13px] font-medium tracking-[0.06em] text-[#F7F5F0] uppercase hover:bg-[#3E2E26]"
              >
                <span>Read the Journal</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => navigate('about')}
                className="inline-flex min-h-[44px] items-center border border-[#1A1A1A]/25 px-6 py-3 text-[13px] font-medium tracking-[0.06em] text-[#1A1A1A] uppercase hover:border-[#1A1A1A]"
              >
                House Philosophy
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="h-full min-h-[340px] overflow-hidden">
              <EditorialImage
                src={IMAGES.journalAtelierCraft}
                alt="Sunlit fashion atelier worktable with draped linen toile, folded charcoal, olive, and burgundy wool bolts, and brass tailor shears."
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
