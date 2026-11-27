import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/format';
import { EditorialImage } from './EditorialImage';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToBag, navigate } =
    useStore();

  const savedProducts = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Saved Wishlist">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-[#0E0E0E]/45 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#F7F5F0] text-[#1A1A1A] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 px-6 py-5">
              <div>
                <h2 className="font-editorial text-2xl font-medium">Saved Pieces</h2>
                <p className="text-[12px] text-[#6B6863] tabular-nums">
                  {savedProducts.length} {savedProducts.length === 1 ? 'item' : 'items'} saved locally
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsWishlistOpen(false)}
                aria-label="Close wishlist"
                className="flex h-10 w-10 items-center justify-center border border-[#1A1A1A]/15 transition-colors hover:bg-[#1A1A1A] hover:text-[#F7F5F0]"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {savedProducts.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="font-editorial text-2xl text-[#1A1A1A]">No saved pieces yet</p>
                  <p className="mx-auto mt-2 max-w-xs text-[14px] text-[#6B6863]">
                    Select the heart icon on any garment or object to build your personal edit.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-[#1A1A1A]/10">
                  {savedProducts.map((product) => (
                    <li key={product.id} className="flex gap-4 py-5 first:pt-0">
                      <button
                        type="button"
                        onClick={() => {
                          setIsWishlistOpen(false);
                          navigate('product', { productId: product.id });
                        }}
                        className="h-28 w-22 shrink-0 overflow-hidden bg-[#EAE6DE]"
                      >
                        <EditorialImage
                          src={product.images[0].src}
                          alt={product.images[0].alt}
                          className="h-full w-full"
                        />
                      </button>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setIsWishlistOpen(false);
                                navigate('product', { productId: product.id });
                              }}
                              className="text-left text-[14px] font-medium hover:underline"
                            >
                              {product.name}
                            </button>
                            <span className="shrink-0 text-[14px] tabular-nums">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                          <p className="mt-1 text-[12px] text-[#6B6863]">{product.subcategory}</p>
                        </div>

                        <div className="mt-3 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setIsWishlistOpen(false);
                              addToBag({
                                productId: product.id,
                                colorName: product.colors[0].name,
                                colorHex: product.colors[0].hex,
                                size: product.sizes[0],
                                quantity: 1,
                              });
                            }}
                            className="bg-[#1A1A1A] px-3.5 py-2 text-[12px] font-medium text-[#F7F5F0] hover:bg-[#3E2E26]"
                          >
                            Move to Bag
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product.id)}
                            className="text-[12px] text-[#6B6863] underline-offset-4 hover:text-[#1A1A1A] hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
