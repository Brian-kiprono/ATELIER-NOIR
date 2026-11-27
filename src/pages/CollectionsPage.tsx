import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';
import { CollectionId } from '../types';
import { EditorialImage } from '../components/EditorialImage';
import { ProductCard } from '../components/ProductCard';

export const CollectionsPage: React.FC = () => {
  const { selectedCollectionId, navigate } = useStore();
  const [activeId, setActiveId] = useState<CollectionId>(
    selectedCollectionId ?? COLLECTIONS[0].id
  );

  useEffect(() => {
    if (selectedCollectionId) {
      setActiveId(selectedCollectionId);
    }
  }, [selectedCollectionId]);

  const activeCollection =
    COLLECTIONS.find((c) => c.id === activeId) ?? COLLECTIONS[0];
  const collectionProducts = PRODUCTS.filter((p) => p.collectionId === activeCollection.id);

  return (
    <div className="pt-16">
      {/* Collection Switcher Bar */}
      <div className="border-b border-[#1A1A1A]/10 bg-[#F7F5F0]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-5 py-4 sm:px-8 lg:px-12">
          {COLLECTIONS.map((col) => {
            const active = col.id === activeCollection.id;
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => setActiveId(col.id)}
                className={`whitespace-nowrap px-4 py-2 text-[13px] font-medium transition-colors ${
                  active
                    ? 'text-[#F7F5F0]'
                    : 'border border-[#1A1A1A]/15 text-[#1A1A1A] hover:border-[#1A1A1A]/50'
                }`}
                style={active ? { backgroundColor: col.palette.accent } : undefined}
              >
                {col.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Collection Hero Atmosphere */}
      <section
        className="transition-colors duration-500"
        style={{ backgroundColor: activeCollection.palette.surface }}
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-stretch gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-20">
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-[12px] tracking-[0.14em] text-[#6B6863] uppercase">
                {activeCollection.subtitle}
              </p>
              <h1 className="font-editorial mt-3 text-5xl font-normal text-[#1A1A1A] sm:text-6xl">
                {activeCollection.name}
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#1A1A1A]/85">
                {activeCollection.essay}
              </p>
            </div>

            <div className="mt-10 space-y-6 border-t border-[#1A1A1A]/12 pt-6">
              <div>
                <p className="text-[11px] tracking-[0.12em] text-[#6B6863] uppercase">
                  Collection Palette & Direction
                </p>
                <p className="mt-1.5 text-[14px] text-[#1A1A1A]">
                  {activeCollection.photographyDirection}
                </p>
                <div className="mt-3 flex items-center gap-2.5">
                  {activeCollection.palette.swatchHexes.map((hex) => (
                    <span
                      key={hex}
                      className="h-5 w-5 rounded-full border border-[#1A1A1A]/20"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('shop', { collectionId: activeCollection.id })}
                className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-medium tracking-[0.06em] uppercase transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: activeCollection.palette.accent,
                  color: activeCollection.palette.textOnAccent,
                }}
              >
                <span>Shop {activeCollection.name}</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/5] w-full overflow-hidden">
              <EditorialImage
                src={activeCollection.heroImage}
                alt={activeCollection.heroAlt}
                priority
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collection Pieces */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-10 flex items-baseline justify-between border-b border-[#1A1A1A]/10 pb-4">
          <h2 className="font-editorial text-3xl font-normal text-[#1A1A1A]">
            Pieces in {activeCollection.name}
          </h2>
          <span className="text-[13px] tabular-nums text-[#6B6863]">
            {collectionProducts.length} silhouettes
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
