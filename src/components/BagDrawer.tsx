import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/format';
import { EditorialImage } from './EditorialImage';

export const BagDrawer: React.FC = () => {
  const {
    bag,
    bagCount,
    bagSubtotal,
    isBagOpen,
    setIsBagOpen,
    updateBagQuantity,
    removeFromBag,
    addToBag,
    navigate,
    setIsCheckoutOpen,
  } = useStore();

  const recommended = PRODUCTS.filter(
    (p) => !bag.some((item) => item.productId === p.id)
  ).slice(0, 2);

  return (
    <AnimatePresence>
      {isBagOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping Bag">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsBagOpen(false)}
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
                <h2 className="font-editorial text-2xl font-medium">Shopping Bag</h2>
                <p className="text-[12px] text-[#6B6863] tabular-nums">
                  {bagCount} {bagCount === 1 ? 'piece' : 'pieces'} · Concept Demonstration
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsBagOpen(false)}
                aria-label="Close shopping bag"
                className="flex h-10 w-10 items-center justify-center border border-[#1A1A1A]/15 transition-colors hover:bg-[#1A1A1A] hover:text-[#F7F5F0]"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {bag.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="font-editorial text-2xl text-[#1A1A1A]">Your bag is empty</p>
                  <p className="mx-auto mt-2 max-w-xs text-[14px] text-[#6B6863]">
                    Explore tailored coats, knitwear, and calfskin objects curated across five collections.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsBagOpen(false);
                      navigate('shop');
                    }}
                    className="mt-6 bg-[#1A1A1A] px-6 py-3 text-[13px] font-medium tracking-[0.06em] text-[#F7F5F0] transition-colors hover:bg-[#3E2E26]"
                  >
                    Explore the Collection
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-[#1A1A1A]/10">
                  {bag.map((item) => {
                    const product = PRODUCTS.find((p) => p.id === item.productId);
                    if (!product) return null;
                    return (
                      <li
                        key={`${item.productId}-${item.size}-${item.colorName}`}
                        className="flex gap-4 py-5 first:pt-0"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setIsBagOpen(false);
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
                                  setIsBagOpen(false);
                                  navigate('product', { productId: product.id });
                                }}
                                className="text-left text-[14px] font-medium text-[#1A1A1A] hover:underline"
                              >
                                {product.name}
                              </button>
                              <span className="shrink-0 text-[14px] tabular-nums">
                                {formatPrice(product.price * item.quantity)}
                              </span>
                            </div>
                            <p className="mt-1 text-[12px] text-[#6B6863]">
                              {item.colorName} · Size {item.size}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center border border-[#1A1A1A]/20">
                              <button
                                type="button"
                                onClick={() =>
                                  updateBagQuantity(item.productId, item.size, item.colorName, -1)
                                }
                                aria-label="Decrease quantity"
                                className="flex h-8 w-8 items-center justify-center text-[#1A1A1A] hover:bg-[#EFECE6]"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-[13px] tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateBagQuantity(item.productId, item.size, item.colorName, 1)
                                }
                                aria-label="Increase quantity"
                                className="flex h-8 w-8 items-center justify-center text-[#1A1A1A] hover:bg-[#EFECE6]"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeFromBag(item.productId, item.size, item.colorName)
                              }
                              aria-label={`Remove ${product.name}`}
                              className="flex h-8 w-8 items-center justify-center text-[#6B6863] transition-colors hover:text-[#1A1A1A]"
                            >
                              <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Curated Recommendations */}
              {recommended.length > 0 && (
                <div className="mt-8 border-t border-[#1A1A1A]/10 pt-6">
                  <p className="mb-4 text-[12px] tracking-[0.1em] text-[#6B6863] uppercase">
                    Paired Objects & Essentials
                  </p>
                  <div className="space-y-3">
                    {recommended.map((rec) => (
                      <div
                        key={rec.id}
                        className="flex items-center justify-between gap-3 border border-[#1A1A1A]/10 p-2.5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-14 w-12 shrink-0 overflow-hidden bg-[#EAE6DE]">
                            <EditorialImage
                              src={rec.images[0].src}
                              alt={rec.images[0].alt}
                              className="h-full w-full"
                            />
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-[#1A1A1A]">{rec.name}</div>
                            <div className="text-[12px] tabular-nums text-[#6B6863]">
                              {formatPrice(rec.price)}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            addToBag({
                              productId: rec.id,
                              colorName: rec.colors[0].name,
                              colorHex: rec.colors[0].hex,
                              size: rec.sizes[0],
                              quantity: 1,
                            })
                          }
                          className="shrink-0 border border-[#1A1A1A]/25 px-3 py-1.5 text-[12px] font-medium text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-[#F7F5F0]"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {bag.length > 0 && (
              <div className="border-t border-[#1A1A1A]/10 bg-[#EFECE6] px-6 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] text-[#6B6863]">Estimated Subtotal</span>
                  <span className="text-[18px] font-medium tabular-nums text-[#1A1A1A]">
                    {formatPrice(bagSubtotal)}
                  </span>
                </div>
                <p className="mt-1.5 text-[12px] text-[#6B6863]">
                  Concept demonstration only. Bag items are stored locally in your browser.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsBagOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="mt-4 w-full bg-[#1A1A1A] py-3.5 text-[13px] font-medium tracking-[0.06em] text-[#F7F5F0] transition-colors hover:bg-[#3E2E26]"
                >
                  Open Checkout Demonstration
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
