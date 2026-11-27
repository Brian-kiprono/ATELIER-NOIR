import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { LOOKBOOK_ENTRIES } from '../data/lookbook';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/format';
import { EditorialImage } from '../components/EditorialImage';

export const LookbookPage: React.FC = () => {
  const { navigate } = useStore();
  const [lookIndex, setLookIndex] = useState(0);
  const [showMarkers, setShowMarkers] = useState(true);

  const look = LOOKBOOK_ENTRIES[lookIndex];
  const featuredProducts = look.featuredProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const goPrev = () =>
    setLookIndex((prev) => (prev - 1 + LOOKBOOK_ENTRIES.length) % LOOKBOOK_ENTRIES.length);
  const goNext = () => setLookIndex((prev) => (prev + 1) % LOOKBOOK_ENTRIES.length);

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-28 pb-24 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-[#1A1A1A]/10 pb-8 md:flex-row md:items-end">
        <div>
          <p className="text-[12px] tracking-[0.14em] text-[#6B6863] uppercase">
            Editorial Lookbook · Autumn / Winter
          </p>
          <h1 className="font-editorial mt-2 text-4xl font-normal text-[#1A1A1A] sm:text-6xl">
            Silhouettes in Sequence
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowMarkers(!showMarkers)}
            className="inline-flex h-10 items-center gap-2 border border-[#1A1A1A]/20 px-4 text-[12px] font-medium text-[#1A1A1A] hover:border-[#1A1A1A]"
          >
            {showMarkers ? (
              <>
                <EyeOff className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span>Hide Item Pins</span>
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span>Show Item Pins</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous look"
            className="flex h-10 w-10 items-center justify-center border border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-[#F7F5F0]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <span className="px-2 text-[13px] tabular-nums text-[#1A1A1A]">
            {look.number} / 0{LOOKBOOK_ENTRIES.length}
          </span>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next look"
            className="flex h-10 w-10 items-center justify-center border border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-[#F7F5F0]"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Main Magazine Look Spread */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="relative overflow-hidden bg-[#EAE6DE]">
            <div className="aspect-[4/3] w-full sm:aspect-[16/11]">
              <EditorialImage
                src={look.image}
                alt={look.alt}
                priority
                className="h-full w-full"
              />
            </div>

            {/* Subtle, non-crowded garment markers */}
            {showMarkers &&
              look.hotspots.map((spot) => (
                <button
                  key={`${look.id}-${spot.productId}-${spot.xPercent}`}
                  type="button"
                  onClick={() => navigate('product', { productId: spot.productId })}
                  style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                  aria-label={`Inspect ${spot.label}`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#F7F5F0] bg-[#0E0E0E]/65 backdrop-blur-sm transition-transform group-hover:scale-110">
                    <span className="h-2 w-2 rounded-full bg-[#F7F5F0]" />
                  </span>
                  <span className="pointer-events-none absolute top-full left-1/2 mt-1.5 hidden -translate-x-1/2 whitespace-nowrap bg-[#0E0E0E]/90 px-2.5 py-1 text-[11px] text-[#F7F5F0] group-hover:block">
                    {spot.label}
                  </span>
                </button>
              ))}
          </div>

          {/* Look Thumbnail Strip */}
          <div className="mt-4 grid grid-cols-6 gap-2.5">
            {LOOKBOOK_ENTRIES.map((entry, idx) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setLookIndex(idx)}
                aria-label={`Select Look ${entry.number}: ${entry.title}`}
                className={`overflow-hidden border transition-all ${
                  idx === lookIndex
                    ? 'border-[#1A1A1A] opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <div className="aspect-[4/3] w-full">
                  <EditorialImage src={entry.image} alt={entry.alt} className="h-full w-full" />
                </div>
                <div className="bg-[#EFECE6] py-1 text-center text-[11px] tabular-nums text-[#1A1A1A]">
                  {entry.number}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Look Details & Featured Garments */}
        <div className="flex flex-col justify-between lg:col-span-4">
          <div>
            <div className="flex items-center gap-2 text-[12px] text-[#6B6863]">
              <span>Look {look.number}</span>
              <span>·</span>
              <span>{look.season}</span>
              <span>·</span>
              <span>{look.location}</span>
            </div>
            <h2 className="font-editorial mt-2 text-3xl font-normal text-[#1A1A1A] sm:text-4xl">
              {look.title}
            </h2>
            <p className="mt-2 text-[13px] font-medium text-[#3E2E26]">{look.collectionName}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#6B6863]">{look.description}</p>

            <div className="mt-8 border-t border-[#1A1A1A]/10 pt-6">
              <p className="mb-4 text-[11px] tracking-[0.12em] text-[#6B6863] uppercase">
                Garments in This Look
              </p>
              <ul className="space-y-3">
                {featuredProducts.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => navigate('product', { productId: product.id })}
                      className="group flex w-full items-center justify-between gap-3 border border-[#1A1A1A]/10 bg-[#EFECE6]/60 p-3 text-left transition-colors hover:border-[#1A1A1A]/40 hover:bg-[#EFECE6]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-16 w-12 shrink-0 overflow-hidden bg-[#EAE6DE]">
                          <EditorialImage
                            src={product.images[0].src}
                            alt={product.images[0].alt}
                            className="h-full w-full"
                          />
                        </div>
                        <div>
                          <div className="text-[14px] font-medium text-[#1A1A1A] group-hover:underline">
                            {product.name}
                          </div>
                          <div className="mt-0.5 text-[12px] text-[#6B6863]">
                            {product.subcategory}
                          </div>
                        </div>
                      </div>
                      <span className="shrink-0 text-[13px] tabular-nums text-[#1A1A1A]">
                        {formatPrice(product.price)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-[#1A1A1A]/10 pt-5">
            <button
              type="button"
              onClick={() => navigate('collections', { collectionId: look.collectionId })}
              className="inline-flex w-full items-center justify-center gap-2 bg-[#1A1A1A] px-5 py-3 text-[13px] font-medium tracking-[0.06em] text-[#F7F5F0] uppercase hover:bg-[#3E2E26]"
            >
              <span>Explore {look.collectionName}</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
