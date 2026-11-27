import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { CartItem, CollectionId, PageRoute, Product } from '../types';

interface StoreContextValue {
  route: PageRoute;
  selectedProductId: string | null;
  selectedCollectionId: CollectionId | null;
  selectedCampaignId: string | null;
  selectedArticleId: string | null;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  navigate: (
    route: PageRoute,
    options?: {
      productId?: string;
      collectionId?: CollectionId;
      campaignId?: string;
      articleId?: string;
      search?: string;
    }
  ) => void;
  bag: CartItem[];
  bagCount: number;
  bagSubtotal: number;
  addToBag: (item: CartItem) => void;
  updateBagQuantity: (productId: string, size: string, colorName: string, delta: number) => void;
  removeFromBag: (productId: string, size: string, colorName: string) => void;
  clearBag: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  recentlyViewed: Product[];
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const BAG_STORAGE_KEY = 'atelier_noir_bag_v1';
const WISHLIST_STORAGE_KEY = 'atelier_noir_wishlist_v1';
const RECENT_STORAGE_KEY = 'atelier_noir_recent_v1';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState<CollectionId | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [bag, setBag] = useState<CartItem[]>(() => readStorage<CartItem[]>(BAG_STORAGE_KEY, []));
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStorage<string[]>(WISHLIST_STORAGE_KEY, [])
  );
  const [recentIds, setRecentIds] = useState<string[]>(() =>
    readStorage<string[]>(RECENT_STORAGE_KEY, [])
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(bag));
    } catch {
      // Ignore storage quota errors
    }
  }, [bag]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recentIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [recentIds]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const navigate = useCallback(
    (
      nextRoute: PageRoute,
      options?: {
        productId?: string;
        collectionId?: CollectionId;
        campaignId?: string;
        articleId?: string;
        search?: string;
      }
    ) => {
      setRoute(nextRoute);
      setIsMenuOpen(false);

      if (nextRoute === 'product' && options?.productId) {
        setSelectedProductId(options.productId);
        setRecentIds((prev) => {
          const filtered = prev.filter((id) => id !== options.productId);
          return [options.productId!, ...filtered].slice(0, 6);
        });
      }

      if (nextRoute === 'collections') {
        setSelectedCollectionId(options?.collectionId ?? null);
      } else if (options?.collectionId) {
        setSelectedCollectionId(options.collectionId);
      } else if (nextRoute !== 'shop') {
        setSelectedCollectionId(null);
      }

      if (nextRoute === 'campaigns') {
        setSelectedCampaignId(options?.campaignId ?? null);
      }

      if (nextRoute === 'journal') {
        setSelectedArticleId(options?.articleId ?? null);
      }

      if (typeof options?.search === 'string') {
        setSearchQuery(options.search);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const addToBag = useCallback(
    (newItem: CartItem) => {
      setBag((prev) => {
        const idx = prev.findIndex(
          (i) =>
            i.productId === newItem.productId &&
            i.size === newItem.size &&
            i.colorName === newItem.colorName
        );
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = {
            ...updated[idx],
            quantity: updated[idx].quantity + newItem.quantity,
          };
          return updated;
        }
        return [...prev, newItem];
      });
      setIsBagOpen(true);
      showToast('Added to shopping bag');
    },
    [showToast]
  );

  const updateBagQuantity = useCallback(
    (productId: string, size: string, colorName: string, delta: number) => {
      setBag((prev) =>
        prev
          .map((item) => {
            if (
              item.productId === productId &&
              item.size === size &&
              item.colorName === colorName
            ) {
              return { ...item, quantity: item.quantity + delta };
            }
            return item;
          })
          .filter((item) => item.quantity > 0)
      );
    },
    []
  );

  const removeFromBag = useCallback((productId: string, size: string, colorName: string) => {
    setBag((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.size === size && item.colorName === colorName)
      )
    );
  }, []);

  const clearBag = useCallback(() => {
    setBag([]);
  }, []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const exists = prev.includes(productId);
        const next = exists ? prev.filter((id) => id !== productId) : [productId, ...prev];
        showToast(exists ? 'Removed from saved items' : 'Saved to wishlist');
        return next;
      });
    },
    [showToast]
  );

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const bagCount = bag.reduce((acc, item) => acc + item.quantity, 0);
  const bagSubtotal = bag.reduce((acc, item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    return acc + (product ? product.price * item.quantity : 0);
  }, 0);

  const recentlyViewed = recentIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <StoreContext.Provider
      value={{
        route,
        selectedProductId,
        selectedCollectionId,
        selectedCampaignId,
        selectedArticleId,
        searchQuery,
        setSearchQuery,
        navigate,
        bag,
        bagCount,
        bagSubtotal,
        addToBag,
        updateBagQuantity,
        removeFromBag,
        clearBag,
        wishlist,
        toggleWishlist,
        isWishlisted,
        recentlyViewed,
        isMenuOpen,
        setIsMenuOpen,
        isBagOpen,
        setIsBagOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        toast,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return ctx;
}
