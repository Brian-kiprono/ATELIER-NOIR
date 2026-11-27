import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';
import { CollectionId, ProductCategory } from '../types';
import { ProductCard } from '../components/ProductCard';

type SortOption = 'curated' | 'price-asc' | 'price-desc' | 'newest';

interface ShopPageProps {
  initialFilter?: 'all' | 'new-arrivals' | 'womenswear' | 'menswear' | 'accessories';
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialFilter = 'all' }) => {
  const { searchQuery, setSearchQuery, selectedCollectionId, recentlyViewed } = useStore();

  const [categoryFilter, setCategoryFilter] = useState<string>(() => {
    if (initialFilter === 'womenswear') return ProductCategory.WOMENSWEAR;
    if (initialFilter === 'menswear') return ProductCategory.MENSWEAR;
    if (initialFilter === 'accessories') return 'accessories-group';
    return 'all';
  });

  const [onlyNewArrivals, setOnlyNewArrivals] = useState(initialFilter === 'new-arrivals');
  const [collectionFilter, setCollectionFilter] = useState<string>(selectedCollectionId ?? 'all');
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('curated');
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  // Sync if user switches top-level department routes
  React.useEffect(() => {
    if (initialFilter === 'womenswear') {
      setCategoryFilter(ProductCategory.WOMENSWEAR);
      setOnlyNewArrivals(false);
    } else if (initialFilter === 'menswear') {
      setCategoryFilter(ProductCategory.MENSWEAR);
      setOnlyNewArrivals(false);
    } else if (initialFilter === 'accessories') {
      setCategoryFilter('accessories-group');
      setOnlyNewArrivals(false);
    } else if (initialFilter === 'new-arrivals') {
      setCategoryFilter('all');
      setOnlyNewArrivals(true);
    } else {
      setCategoryFilter('all');
      setOnlyNewArrivals(false);
    }
  }, [initialFilter]);

  React.useEffect(() => {
    if (selectedCollectionId) {
      setCollectionFilter(selectedCollectionId);
      setFiltersExpanded(true);
    }
  }, [selectedCollectionId]);

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((p) => {
      if (onlyNewArrivals && !p.isNewArrival) return false;

      if (categoryFilter === 'accessories-group') {
        if (
          p.category !== ProductCategory.ACCESSORIES &&
          p.category !== ProductCategory.FOOTWEAR &&
          p.category !== ProductCategory.LIFESTYLE
        ) {
          return false;
        }
      } else if (categoryFilter !== 'all' && p.category !== categoryFilter) {
        return false;
      }

      if (collectionFilter !== 'all' && p.collectionId !== collectionFilter) return false;
      if (sizeFilter !== 'all' && !p.sizes.includes(sizeFilter)) return false;

      if (q) {
        const hay =
          `${p.name} ${p.subcategory} ${p.category} ${p.description} ${p.materials}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') return [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') {
      return [...list].sort((a, b) => Number(b.isNewArrival) - Number(a.isNewArrival));
    }
    return list;
  }, [categoryFilter, onlyNewArrivals, collectionFilter, sizeFilter, searchQuery, sortBy]);

  const resetAllFilters = () => {
    setCategoryFilter('all');
    setOnlyNewArrivals(false);
    setCollectionFilter('all');
    setSizeFilter('all');
    setSearchQuery('');
    setSortBy('curated');
  };

  const pageTitle = onlyNewArrivals
    ? 'New Arrivals'
    : categoryFilter === ProductCategory.WOMENSWEAR
      ? 'Womenswear'
      : categoryFilter === ProductCategory.MENSWEAR
        ? 'Menswear'
        : categoryFilter === 'accessories-group'
          ? 'Footwear, Accessories & Objects'
          : 'Complete Catalog';

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-28 pb-24 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="border-b border-[#1A1A1A]/10 pb-8">
        <p className="text-[12px] tracking-[0.14em] text-[#6B6863] uppercase">
          ATELIER NOIR · Concept Retail Index
        </p>
        <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 className="font-editorial text-4xl font-normal text-[#1A1A1A] sm:text-6xl">
            {pageTitle}
          </h1>
          <p className="max-w-md text-[14px] text-[#6B6863]">
            Concept demonstration catalog. Sample USD pricing reflects contemporary atelier cloth
            and small-batch finishing.
          </p>
        </div>
      </div>

      {/* Category Tabs & Search Toolbar */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Pieces' },
            { id: 'new', label: 'New Arrivals' },
            { id: ProductCategory.WOMENSWEAR, label: 'Womenswear' },
            { id: ProductCategory.MENSWEAR, label: 'Menswear' },
            { id: ProductCategory.FOOTWEAR, label: 'Footwear' },
            { id: ProductCategory.ACCESSORIES, label: 'Accessories' },
            { id: ProductCategory.LIFESTYLE, label: 'Lifestyle Goods' },
          ].map((tab) => {
            const active =
              (tab.id === 'new' && onlyNewArrivals) ||
              (tab.id !== 'new' && !onlyNewArrivals && categoryFilter === tab.id) ||
              (tab.id === ProductCategory.ACCESSORIES && categoryFilter === 'accessories-group');

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (tab.id === 'new') {
                    setOnlyNewArrivals(true);
                    setCategoryFilter('all');
                  } else {
                    setOnlyNewArrivals(false);
                    setCategoryFilter(tab.id);
                  }
                }}
                className={`min-h-[40px] whitespace-nowrap px-4 py-2 text-[13px] font-medium transition-colors ${
                  active
                    ? 'bg-[#1A1A1A] text-[#F7F5F0]'
                    : 'border border-[#1A1A1A]/15 text-[#1A1A1A] hover:border-[#1A1A1A]/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64 sm:flex-initial">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#6B6863]"
              strokeWidth={1.5}
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search silhouettes..."
              aria-label="Search products"
              className="h-10 w-full border border-[#1A1A1A]/20 bg-transparent pr-8 pl-9 text-[13px] text-[#1A1A1A] placeholder:text-[#6B6863] focus:border-[#1A1A1A] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 text-[#6B6863] hover:text-[#1A1A1A]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setFiltersExpanded(!filtersExpanded)}
            className="inline-flex h-10 items-center gap-2 border border-[#1A1A1A]/20 px-4 text-[13px] font-medium hover:border-[#1A1A1A]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span>Refine</span>
          </button>

          <label htmlFor="shop-sort" className="sr-only">
            Sort products
          </label>
          <select
            id="shop-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-10 border border-[#1A1A1A]/20 bg-[#F7F5F0] px-3 text-[13px] text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
          >
            <option value="curated">Sort: Curated</option>
            <option value="newest">Sort: Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Expandable Collection & Size Filter Drawer */}
      {filtersExpanded && (
        <div className="mt-4 grid grid-cols-1 gap-6 border border-[#1A1A1A]/12 bg-[#EFECE6] p-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="mb-2 text-[11px] tracking-[0.1em] text-[#6B6863] uppercase">Collection</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCollectionFilter('all')}
                className={`px-3 py-1.5 text-[12px] ${
                  collectionFilter === 'all'
                    ? 'bg-[#1A1A1A] text-[#F7F5F0]'
                    : 'border border-[#1A1A1A]/15 text-[#1A1A1A]'
                }`}
              >
                All
              </button>
              {COLLECTIONS.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setCollectionFilter(col.id as CollectionId)}
                  className={`px-3 py-1.5 text-[12px] ${
                    collectionFilter === col.id
                      ? 'bg-[#1A1A1A] text-[#F7F5F0]'
                      : 'border border-[#1A1A1A]/15 text-[#1A1A1A]'
                  }`}
                >
                  {col.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] tracking-[0.1em] text-[#6B6863] uppercase">Size</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSizeFilter('all')}
                className={`px-2.5 py-1 text-[12px] ${
                  sizeFilter === 'all'
                    ? 'bg-[#1A1A1A] text-[#F7F5F0]'
                    : 'border border-[#1A1A1A]/15 text-[#1A1A1A]'
                }`}
              >
                All
              </button>
              {allSizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSizeFilter(sz)}
                  className={`px-2.5 py-1 text-[12px] ${
                    sizeFilter === sz
                      ? 'bg-[#1A1A1A] text-[#F7F5F0]'
                      : 'border border-[#1A1A1A]/15 text-[#1A1A1A]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-start lg:justify-end">
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-[13px] font-medium text-[#1A1A1A] underline underline-offset-4 hover:text-[#3E2E26]"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mt-6 flex items-center justify-between text-[12px] text-[#6B6863]">
        <span className="tabular-nums">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
        </span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="mt-12 border border-[#1A1A1A]/12 bg-[#EFECE6] px-6 py-16 text-center">
          <h2 className="font-editorial text-3xl text-[#1A1A1A]">No matching pieces found</h2>
          <p className="mx-auto mt-2 max-w-md text-[14px] text-[#6B6863]">
            Adjust your department, collection, or search query to explore the full ATELIER NOIR
            universe.
          </p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="mt-6 bg-[#1A1A1A] px-6 py-3 text-[13px] font-medium text-[#F7F5F0] hover:bg-[#3E2E26]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="mt-24 border-t border-[#1A1A1A]/10 pt-14">
          <p className="text-[12px] tracking-[0.14em] text-[#6B6863] uppercase">
            Recently Viewed
          </p>
          <h2 className="font-editorial mt-1 text-3xl font-normal text-[#1A1A1A]">
            Continue Your Selection
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyViewed.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
