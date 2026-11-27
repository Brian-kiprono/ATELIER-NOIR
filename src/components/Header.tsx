import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Heart, Search, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CollectionId, PageRoute } from '../types';
import { COLLECTIONS } from '../data/collections';

export const Header: React.FC = () => {
  const {
    route,
    navigate,
    bagCount,
    wishlist,
    isMenuOpen,
    setIsMenuOpen,
    setIsBagOpen,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [scrolled, setScrolled] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen, setIsMenuOpen]);

  const isHeroOverlay = route === 'home' && !scrolled && !isMenuOpen;

  const primaryLinks: { label: string; route: PageRoute }[] = [
    { label: 'Shop', route: 'shop' },
    { label: 'Collections', route: 'collections' },
    { label: 'Lookbook', route: 'lookbook' },
    { label: 'Campaigns', route: 'campaigns' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigate('shop', { search: localSearch });
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-colors duration-300 ${
          isHeroOverlay
            ? 'bg-gradient-to-b from-[#0E0E0E]/60 to-transparent text-[#F7F5F0]'
            : 'border-b border-[#1A1A1A]/10 bg-[#F7F5F0]/95 text-[#1A1A1A] backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-8 px-5 sm:px-8 lg:px-12">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigate('home')}
            className="font-editorial shrink-0 whitespace-nowrap text-[21px] font-medium tracking-[0.14em] uppercase focus-visible:outline-none focus-visible:underline"
          >
            ATELIER NOIR
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 text-[13px] font-medium tracking-[0.06em] md:flex"
          >
            {primaryLinks.map((link) => {
              const active = route === link.route;
              return (
                <button
                  key={link.route}
                  type="button"
                  onClick={() => navigate(link.route)}
                  className={`relative shrink-0 whitespace-nowrap py-1 transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:underline ${
                    active ? 'underline underline-offset-4' : ''
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              className="shrink-0 whitespace-nowrap py-1 transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:underline"
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
          </nav>

          {/* Zone 3: Single primary action */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Open navigation menu"
              className="flex min-h-[44px] items-center px-2 text-[13px] font-medium tracking-[0.06em] md:hidden"
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>

            <button
              type="button"
              onClick={() => setIsBagOpen(true)}
              className={`flex min-h-[40px] shrink-0 items-center gap-2 whitespace-nowrap px-4 py-2 text-[13px] font-medium tracking-[0.05em] transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                isHeroOverlay
                  ? 'bg-[#F7F5F0] text-[#1A1A1A] hover:bg-[#EFECE6] focus-visible:ring-[#F7F5F0]'
                  : 'bg-[#1A1A1A] text-[#F7F5F0] hover:bg-[#3E2E26] focus-visible:ring-[#1A1A1A]'
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span className="tabular-nums">Bag ({bagCount})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Expandable Full Brand Directory Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-[#F7F5F0] text-[#1A1A1A]"
            role="dialog"
            aria-modal="true"
            aria-label="Site directory and search"
          >
            <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
              <div className="flex h-16 items-center justify-between border-b border-[#1A1A1A]/10">
                <button
                  type="button"
                  onClick={() => navigate('home')}
                  className="font-editorial text-[21px] font-medium tracking-[0.14em] uppercase"
                >
                  ATELIER NOIR
                </button>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsWishlistOpen(true);
                    }}
                    className="flex min-h-[44px] items-center gap-2 px-3 text-[13px] font-medium text-[#1A1A1A] hover:text-[#3E2E26]"
                  >
                    <Heart className="h-4 w-4" strokeWidth={1.5} />
                    <span className="tabular-nums">Saved ({wishlist.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                    className="flex h-11 w-11 items-center justify-center border border-[#1A1A1A]/15 text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-[#F7F5F0]"
                  >
                    <X className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12 py-10 lg:grid-cols-12 lg:py-14">
                {/* Search + Primary Categories */}
                <div className="space-y-8 lg:col-span-5">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <label htmlFor="menu-search" className="sr-only">
                      Search garments and objects
                    </label>
                    <input
                      id="menu-search"
                      type="search"
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      placeholder="Search coats, tailoring, leather goods..."
                      className="w-full border-b border-[#1A1A1A]/25 bg-transparent py-3.5 pr-12 text-[15px] text-[#1A1A1A] placeholder:text-[#6B6863] focus:border-[#1A1A1A] focus:outline-none"
                    />
                    <button
                      type="submit"
                      aria-label="Search catalog"
                      className="absolute top-1/2 right-0 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-[#1A1A1A] hover:opacity-70"
                    >
                      <Search className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </form>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="mb-4 text-[12px] tracking-[0.12em] text-[#6B6863] uppercase">
                        Shop & Departments
                      </p>
                      <ul className="space-y-2.5">
                        {[
                          { label: 'Shop All', target: 'shop' as PageRoute },
                          { label: 'New Arrivals', target: 'new-arrivals' as PageRoute },
                          { label: 'Womenswear', target: 'womenswear' as PageRoute },
                          { label: 'Menswear', target: 'menswear' as PageRoute },
                          { label: 'Accessories & Footwear', target: 'accessories' as PageRoute },
                        ].map((item) => (
                          <li key={item.target}>
                            <button
                              type="button"
                              onClick={() => navigate(item.target)}
                              className={`font-editorial text-2xl transition-colors hover:text-[#3E2E26] ${
                                route === item.target ? 'underline underline-offset-4' : ''
                              }`}
                            >
                              {item.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="mb-4 text-[12px] tracking-[0.12em] text-[#6B6863] uppercase">
                        Editorial & House
                      </p>
                      <ul className="space-y-2.5">
                        {[
                          { label: 'Home', target: 'home' as PageRoute },
                          { label: 'Collections', target: 'collections' as PageRoute },
                          { label: 'Lookbook', target: 'lookbook' as PageRoute },
                          { label: 'Campaigns', target: 'campaigns' as PageRoute },
                          { label: 'Journal', target: 'journal' as PageRoute },
                          { label: 'About', target: 'about' as PageRoute },
                        ].map((item) => (
                          <li key={item.target}>
                            <button
                              type="button"
                              onClick={() => navigate(item.target)}
                              className={`font-editorial text-2xl transition-colors hover:text-[#3E2E26] ${
                                route === item.target ? 'underline underline-offset-4' : ''
                              }`}
                            >
                              {item.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Curated Collections Quick Links */}
                <div className="border-t border-[#1A1A1A]/10 pt-8 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                  <p className="mb-6 text-[12px] tracking-[0.12em] text-[#6B6863] uppercase">
                    Five Distinct Collections
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {COLLECTIONS.map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() =>
                          navigate('collections', { collectionId: col.id as CollectionId })
                        }
                        className="group flex items-center justify-between border border-[#1A1A1A]/10 p-4 text-left transition-colors hover:border-[#1A1A1A]/40 hover:bg-[#EFECE6]"
                      >
                        <div>
                          <div className="font-editorial text-xl text-[#1A1A1A]">{col.name}</div>
                          <div className="mt-0.5 text-[12px] text-[#6B6863]">{col.subtitle}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-[#6B6863] transition-transform group-hover:translate-x-1 group-hover:text-[#1A1A1A]" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
