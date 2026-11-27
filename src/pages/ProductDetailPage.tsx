import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, ChevronDown, Heart, Maximize2, Ruler, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { COLLECTIONS } from '../data/collections';
import { getOptimizedSources } from '../data/images';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/format';
import { EditorialImage } from '../components/EditorialImage';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { selectedProductId, navigate, addToBag, isWishlisted, toggleWishlist } = useStore();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) ?? PRODUCTS[0];
  const collection = COLLECTIONS.find((c) => c.id === product.collectionId);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [openSection, setOpenSection] = useState<'materials' | 'fit' | 'care' | null>('materials');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    setActiveImageIdx(0);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
    setAddedFeedback(false);
  }, [product]);

  const saved = isWishlisted(product.id);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.collectionId === product.collectionId || p.category === product.category)
  ).slice(0, 3);

  const handleAddToBag = () => {
    addToBag({
      productId: product.id,
      colorName: selectedColor.name,
      colorHex: selectedColor.hex,
      size: selectedSize,
      quantity: 1,
    });
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1800);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-24 pb-24 sm:px-8 lg:px-12">
      {/* Breadcrumb Back */}
      <div className="mb-8 flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4">
        <button
          type="button"
          onClick={() => navigate('shop')}
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[#6B6863] transition-colors hover:text-[#1A1A1A]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          <span>Back to Catalog</span>
        </button>
        <div className="text-[12px] text-[#6B6863]">
          <span>{product.category}</span>
          <span className="mx-2">·</span>
          <span>{collection?.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left Gallery */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAE6DE]">
            <EditorialImage
              src={product.images[activeImageIdx]?.src ?? product.images[0].src}
              alt={product.images[activeImageIdx]?.alt ?? product.name}
              priority
              className="h-full w-full"
            />
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="Inspect full-screen photograph"
              className="absolute right-4 bottom-4 flex h-10 items-center gap-2 bg-[#F7F5F0]/90 px-3.5 text-[12px] font-medium text-[#1A1A1A] hover:bg-[#F7F5F0]"
            >
              <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span>Zoom</span>
            </button>
          </div>

          {/* Multi-angle thumbnails */}
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((frame, idx) => (
              <button
                key={`${frame.src}-${idx}`}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                className={`group overflow-hidden border text-left transition-all ${
                  idx === activeImageIdx
                    ? 'border-[#1A1A1A]'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <div className="aspect-[3/4] w-full">
                  <EditorialImage src={frame.src} alt={frame.alt} className="h-full w-full" />
                </div>
                <p className="truncate bg-[#EFECE6] px-2 py-1.5 text-[11px] text-[#1A1A1A]">
                  {frame.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Sticky Purchase Module */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <p className="text-[12px] tracking-[0.12em] text-[#6B6863] uppercase">
              {collection?.name} · {product.subcategory}
            </p>
            <h1 className="font-editorial mt-2 text-4xl font-normal text-[#1A1A1A] sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-2xl font-medium tabular-nums text-[#1A1A1A]">
              {formatPrice(product.price)}
            </p>

            <p className="mt-5 text-[15px] leading-relaxed text-[#6B6863]">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mt-8 border-t border-[#1A1A1A]/10 pt-6">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-[#1A1A1A]">Colour</span>
                <span className="text-[#6B6863]">{selectedColor.name}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const active = color.name === selectedColor.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select colour ${color.name}`}
                      className={`flex items-center gap-2 border px-3 py-2 text-[12px] transition-colors ${
                        active
                          ? 'border-[#1A1A1A] bg-[#EFECE6] font-medium text-[#1A1A1A]'
                          : 'border-[#1A1A1A]/15 text-[#6B6863] hover:border-[#1A1A1A]/40'
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-[#1A1A1A]/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-[#1A1A1A]">Size</span>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1.5 text-[12px] text-[#6B6863] underline-offset-4 hover:text-[#1A1A1A] hover:underline"
                >
                  <Ruler className="h-3.5 w-3.5" strokeWidth={1.5} />
                  <span>Size & Fit Guide</span>
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const active = size === selectedSize;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-h-[42px] min-w-[48px] border px-3.5 text-[13px] font-medium transition-colors ${
                        active
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#F7F5F0]'
                          : 'border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Actions */}
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={handleAddToBag}
                className="flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-[#1A1A1A] px-6 py-3.5 text-[13px] font-medium tracking-[0.08em] text-[#F7F5F0] uppercase transition-colors hover:bg-[#3E2E26]"
              >
                {addedFeedback ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={1.75} />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={saved ? 'Remove from saved pieces' : 'Save to wishlist'}
                className={`flex min-h-[48px] w-12 shrink-0 items-center justify-center border transition-colors ${
                  saved
                    ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#F7F5F0]'
                    : 'border-[#1A1A1A]/25 text-[#1A1A1A] hover:border-[#1A1A1A]'
                }`}
              >
                <Heart className="h-4 w-4" strokeWidth={1.5} fill={saved ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className="mt-3 text-[12px] text-[#6B6863]">
              Concept demonstration piece — stored locally in your demonstration shopping bag.
            </p>

            {/* Detail Accordions */}
            <div className="mt-8 divide-y divide-[#1A1A1A]/12 border-y border-[#1A1A1A]/12">
              {[
                { key: 'materials' as const, title: 'Materials & Composition', content: product.materials },
                { key: 'fit' as const, title: 'Fit & Silhouette', content: product.fit },
                { key: 'care' as const, title: 'Care & Longevity', content: product.care },
              ].map((sec) => {
                const isOpen = openSection === sec.key;
                return (
                  <div key={sec.key}>
                    <button
                      type="button"
                      onClick={() => setOpenSection(isOpen ? null : sec.key)}
                      className="flex w-full items-center justify-between py-4 text-left text-[13px] font-medium text-[#1A1A1A]"
                    >
                      <span>{sec.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-4 text-[14px] leading-relaxed text-[#6B6863]">
                        {sec.content}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-24 border-t border-[#1A1A1A]/10 pt-14">
        <p className="text-[12px] tracking-[0.14em] text-[#6B6863] uppercase">
          Curated Pairings
        </p>
        <h2 className="font-editorial mt-1 text-3xl font-normal text-[#1A1A1A]">
          Complete the Silhouette
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E0E0E]/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Full screen product image"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close zoom view"
            className="fixed top-5 right-5 flex h-11 w-11 items-center justify-center border border-[#F7F5F0]/30 text-[#F7F5F0] hover:bg-[#F7F5F0] hover:text-[#1A1A1A]"
          >
            <X className="h-5 w-5" />
          </button>
          <picture className="flex max-h-[90vh] max-w-[90vw] items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const activeSrc = product.images[activeImageIdx]?.src ?? product.images[0].src;
              const opt = getOptimizedSources(activeSrc);
              return opt ? <source type="image/webp" srcSet={opt.webpFull} /> : null;
            })()}
            <img
              src={product.images[activeImageIdx]?.src ?? product.images[0].src}
              alt={product.images[activeImageIdx]?.alt ?? product.name}
              decoding="async"
              referrerPolicy="no-referrer"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </picture>
        </div>
      )}

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E0E0E]/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Size and Fit Guide"
          onClick={() => setSizeGuideOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-[#F7F5F0] p-6 text-[#1A1A1A] shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4">
              <h3 className="font-editorial text-2xl">Atelier Fit & Proportions</h3>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(false)}
                className="flex h-9 w-9 items-center justify-center border border-[#1A1A1A]/15"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-[14px] text-[#6B6863]">{product.fit}</p>
            <table className="mt-5 w-full border-collapse text-left text-[13px] tabular-nums">
              <thead>
                <tr className="border-b border-[#1A1A1A]/15 text-[#6B6863]">
                  <th className="py-2">Size</th>
                  <th className="py-2">Chest (cm)</th>
                  <th className="py-2">Waist (cm)</th>
                  <th className="py-2">EU Equiv.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]/10">
                {[
                  ['XS', '84–88', '66–70', '34 / 44'],
                  ['S', '88–94', '71–76', '36 / 46'],
                  ['M', '95–101', '77–83', '38 / 48'],
                  ['L', '102–108', '84–90', '40 / 50'],
                  ['XL', '109–116', '91–98', '42 / 52'],
                ].map(([sz, ch, wa, eu]) => (
                  <tr key={sz}>
                    <td className="py-2.5 font-medium">{sz}</td>
                    <td className="py-2.5">{ch}</td>
                    <td className="py-2.5">{wa}</td>
                    <td className="py-2.5">{eu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
