import React from 'react';
import { useStore } from '../context/StoreContext';
import { COLLECTIONS } from '../data/collections';
import { CollectionId, PageRoute } from '../types';

export const Footer: React.FC = () => {
  const { navigate, setIsWishlistOpen, setIsBagOpen } = useStore();

  return (
    <footer className="border-t border-[#1A1A1A]/12 bg-[#0E0E0E] text-[#F7F5F0]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Statement */}
          <div className="lg:col-span-4">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="font-editorial text-2xl font-medium tracking-[0.16em] uppercase"
            >
              ATELIER NOIR
            </button>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[#F7F5F0]/70">
              Contemporary luxury. Refined essentials. Modern individuality. Designed with
              intention and made to be lived in.
            </p>
            <p className="mt-6 text-[12px] leading-relaxed text-[#F7F5F0]/55">
              Concept Brand Demonstration — ATELIER NOIR is an original editorial showcase; prices
              and shopping interactions are illustrative only.
            </p>
          </div>

          {/* Departments */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <p className="mb-4 text-[12px] tracking-[0.12em] text-[#F7F5F0]/50 uppercase">
                Departments
              </p>
              <ul className="space-y-2.5 text-[14px] text-[#F7F5F0]/80">
                {[
                  { label: 'Shop All', route: 'shop' as PageRoute },
                  { label: 'New Arrivals', route: 'new-arrivals' as PageRoute },
                  { label: 'Womenswear', route: 'womenswear' as PageRoute },
                  { label: 'Menswear', route: 'menswear' as PageRoute },
                  { label: 'Accessories & Footwear', route: 'accessories' as PageRoute },
                ].map((link) => (
                  <li key={link.route}>
                    <button
                      type="button"
                      onClick={() => navigate(link.route)}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-[12px] tracking-[0.12em] text-[#F7F5F0]/50 uppercase">
                Collections
              </p>
              <ul className="space-y-2.5 text-[14px] text-[#F7F5F0]/80">
                {COLLECTIONS.map((col) => (
                  <li key={col.id}>
                    <button
                      type="button"
                      onClick={() =>
                        navigate('collections', { collectionId: col.id as CollectionId })
                      }
                      className="transition-colors hover:text-white"
                    >
                      {col.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-[12px] tracking-[0.12em] text-[#F7F5F0]/50 uppercase">
                Editorial & Client
              </p>
              <ul className="space-y-2.5 text-[14px] text-[#F7F5F0]/80">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('lookbook')}
                    className="transition-colors hover:text-white"
                  >
                    Lookbook
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('campaigns')}
                    className="transition-colors hover:text-white"
                  >
                    Campaigns
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('journal')}
                    className="transition-colors hover:text-white"
                  >
                    Journal
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('about')}
                    className="transition-colors hover:text-white"
                  >
                    About the House
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsWishlistOpen(true)}
                    className="transition-colors hover:text-white"
                  >
                    Saved Wishlist
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsBagOpen(true)}
                    className="transition-colors hover:text-white"
                  >
                    Shopping Bag
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-[#F7F5F0]/12 pt-8 text-[12px] text-[#F7F5F0]/55 sm:flex-row sm:items-center">
          <p>© 2026 ATELIER NOIR Concept Studio. Original Code under MIT License.</p>
          <p>Paris · Milan · Tokyo — Editorial Concept Showcase</p>
        </div>
      </div>
    </footer>
  );
};
