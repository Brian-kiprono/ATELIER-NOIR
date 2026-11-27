import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { IMAGES } from '../data/images';
import { EditorialImage } from '../components/EditorialImage';

export const AboutPage: React.FC = () => {
  const { navigate } = useStore();

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="border-b border-[#1A1A1A]/10 pb-10">
          <p className="text-[12px] tracking-[0.14em] text-[#6B6863] uppercase">
            About ATELIER NOIR
          </p>
          <h1 className="font-editorial mt-3 max-w-4xl text-4xl font-normal text-balance text-[#1A1A1A] sm:text-6xl">
            Designed with Intention. Built Beyond Seasonal Urgency.
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[#6B6863]">
            ATELIER NOIR is a fictional contemporary luxury fashion label conceived around calm
            proportion, tactile natural cloth, and objects made to remain relevant for years rather
            than weeks.
          </p>
        </div>

        {/* Studio Image */}
        <div className="mt-10 aspect-[16/9] w-full overflow-hidden bg-[#EAE6DE]">
          <EditorialImage
            src={IMAGES.journalAtelierCraft}
            alt="Sunlit ATELIER NOIR pattern studio with linen toile, wool suiting bolts, and brass tailor shears."
            priority
            className="h-full w-full"
          />
        </div>

        {/* Philosophy Pillars */}
        <div className="mt-16 grid grid-cols-1 gap-10 border-b border-[#1A1A1A]/10 pb-16 md:grid-cols-3">
          <div>
            <p className="text-[12px] tracking-[0.12em] text-[#6B6863] uppercase">
              01. Brand Philosophy
            </p>
            <h2 className="font-editorial mt-2 text-3xl text-[#1A1A1A]">Quiet Presence</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#6B6863]">
              We reject loud branding and disposable novelty. A garment should frame the person
              wearing it—offering posture, comfort, and poise without demanding attention.
            </p>
          </div>

          <div>
            <p className="text-[12px] tracking-[0.12em] text-[#6B6863] uppercase">
              02. Design Principles
            </p>
            <h2 className="font-editorial mt-2 text-3xl text-[#1A1A1A]">Line Over Ornament</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#6B6863]">
              Every pattern starts with balance between shoulder, waist, and hem. When proportion is
              exact, a piece needs no decorative hardware to feel complete.
            </p>
          </div>

          <div>
            <p className="text-[12px] tracking-[0.12em] text-[#6B6863] uppercase">
              03. Material Discipline
            </p>
            <h2 className="font-editorial mt-2 text-3xl text-[#1A1A1A]">Natural Fiber Focus</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#6B6863]">
              Our concept collections center on long-staple cotton, virgin wool, silk, linen, and
              vegetable-tanned calfskin chosen for breathability, repairability, and patina.
            </p>
          </div>
        </div>

        {/* Craftsmanship & Responsibility */}
        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#EAE6DE]">
              <EditorialImage
                src={IMAGES.detailTailoring}
                alt="Macro detail of hand-finished horn button and pick-stitched charcoal virgin wool lapel."
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="space-y-6 lg:col-span-6">
            <p className="text-[12px] tracking-[0.14em] text-[#6B6863] uppercase">
              Craftsmanship & Longevity
            </p>
            <h2 className="font-editorial text-4xl font-normal text-[#1A1A1A]">
              Responsible Making Starts With Wearing Longer
            </h2>
            <p className="text-[15px] leading-relaxed text-[#6B6863]">
              Rather than claiming external certifications or fabricated supply-chain statistics,
              ATELIER NOIR focuses on an honest design principle: the most meaningful reduction in
              waste comes from making fewer, better-constructed garments with generous seam
              allowances, resoleable footwear soles, and timeless neutral palettes.
            </p>
            <div className="border border-[#1A1A1A]/12 bg-[#EFECE6] p-5 text-[13px] text-[#1A1A1A]">
              <strong>Concept Showcase Notice:</strong> ATELIER NOIR is an original fictional
              fashion brand created as an editorial and e-commerce design demonstration. All garments,
              campaigns, and prices are illustrative.
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate('collections')}
                className="inline-flex items-center gap-2 bg-[#1A1A1A] px-6 py-3 text-[13px] font-medium tracking-[0.06em] text-[#F7F5F0] uppercase hover:bg-[#3E2E26]"
              >
                <span>Explore Collections</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => navigate('campaigns')}
                className="inline-flex items-center border border-[#1A1A1A]/25 px-6 py-3 text-[13px] font-medium tracking-[0.06em] text-[#1A1A1A] uppercase hover:border-[#1A1A1A]"
              >
                View Campaigns
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
