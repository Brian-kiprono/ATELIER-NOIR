import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CAMPAIGNS } from '../data/campaigns';
import { COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';
import { EditorialImage } from '../components/EditorialImage';
import { ProductCard } from '../components/ProductCard';

export const CampaignsPage: React.FC = () => {
  const { selectedCampaignId, navigate } = useStore();
  const [activeId, setActiveId] = useState<string>(selectedCampaignId ?? CAMPAIGNS[0].id);

  useEffect(() => {
    if (selectedCampaignId) {
      setActiveId(selectedCampaignId);
    }
  }, [selectedCampaignId]);

  const campaign = CAMPAIGNS.find((c) => c.id === activeId) ?? CAMPAIGNS[0];
  const relatedCollection = COLLECTIONS.find((c) => c.id === campaign.relatedCollectionId);
  const featuredProducts = campaign.featuredProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="pt-16">
      {/* Campaign Selector Bar */}
      <div className="border-b border-[#1A1A1A]/10 bg-[#F7F5F0]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-5 py-4 sm:px-8 lg:px-12">
          {CAMPAIGNS.map((camp) => {
            const active = camp.id === campaign.id;
            return (
              <button
                key={camp.id}
                type="button"
                onClick={() => setActiveId(camp.id)}
                className={`whitespace-nowrap px-4 py-2 text-[13px] font-medium transition-colors ${
                  active
                    ? 'bg-[#1A1A1A] text-[#F7F5F0]'
                    : 'border border-[#1A1A1A]/15 text-[#1A1A1A] hover:border-[#1A1A1A]/50'
                }`}
              >
                {camp.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Campaign Hero Spread */}
      <section className="relative bg-[#0E0E0E] text-[#F7F5F0]">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="aspect-[16/9] w-full overflow-hidden">
            <EditorialImage
              src={campaign.heroImage}
              alt={campaign.heroAlt}
              priority
              className="h-full w-full"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-[#F7F5F0]/15 pt-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-[12px] tracking-[0.14em] text-[#F7F5F0]/65 uppercase">
                {campaign.season} · Original Brand Concept
              </p>
              <h1 className="font-editorial mt-2 text-4xl font-normal sm:text-6xl">
                {campaign.title}
              </h1>
              <p className="mt-2 text-[16px] text-[#F7F5F0]/80">{campaign.subtitle}</p>
            </div>

            <div className="space-y-4 lg:col-span-6">
              <p className="text-[15px] leading-relaxed text-[#F7F5F0]/85">{campaign.essay}</p>
              <p className="text-[13px] text-[#F7F5F0]/60">
                Visual Direction: {campaign.direction}
              </p>
              {relatedCollection && (
                <button
                  type="button"
                  onClick={() =>
                    navigate('collections', { collectionId: relatedCollection.id })
                  }
                  className="inline-flex items-center gap-2 pt-2 text-[13px] font-medium text-[#F7F5F0] underline underline-offset-4 hover:opacity-80"
                >
                  <span>Related Collection: {relatedCollection.name}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Triptych Gallery */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <p className="text-[12px] tracking-[0.14em] text-[#6B6863] uppercase">
          Photography Series
        </p>
        <h2 className="font-editorial mt-1 text-3xl font-normal text-[#1A1A1A]">
          Frames from {campaign.title}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {campaign.gallery.map((frame) => (
            <figure key={frame.caption} className="flex flex-col">
              <div className="aspect-[3/4] w-full overflow-hidden bg-[#EAE6DE]">
                <EditorialImage src={frame.src} alt={frame.alt} className="h-full w-full" />
              </div>
              <figcaption className="mt-3 text-[13px] text-[#6B6863]">
                {frame.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Selected Campaign Pieces */}
        <div className="mt-20 border-t border-[#1A1A1A]/10 pt-14">
          <div className="flex items-baseline justify-between">
            <h2 className="font-editorial text-3xl font-normal text-[#1A1A1A]">
              Featured in This Campaign
            </h2>
            <button
              type="button"
              onClick={() => navigate('shop')}
              className="text-[13px] font-medium text-[#1A1A1A] underline underline-offset-4"
            >
              Shop Full Catalog
            </button>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
