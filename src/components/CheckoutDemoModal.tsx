import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/format';

export const CheckoutDemoModal: React.FC = () => {
  const { bag, bagSubtotal, isCheckoutOpen, setIsCheckoutOpen, clearBag, showToast } = useStore();
  const [recipientName, setRecipientName] = useState('');
  const [city, setCity] = useState('');
  const [deliveryPreference, setDeliveryPreference] = useState<'standard' | 'studio'>('standard');
  const [previewGenerated, setPreviewGenerated] = useState(false);

  const handleClose = () => {
    setPreviewGenerated(false);
    setIsCheckoutOpen(false);
  };

  const handlePreviewSummary = (e: React.FormEvent) => {
    e.preventDefault();
    setPreviewGenerated(true);
    showToast('Concept demonstration summary prepared');
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Checkout Demonstration"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#0E0E0E]/60 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22 }}
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#F7F5F0] p-6 text-[#1A1A1A] shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between border-b border-[#1A1A1A]/10 pb-5">
              <div>
                <p className="text-[11px] tracking-[0.14em] text-[#6B6863] uppercase">
                  ATELIER NOIR · Concept Demonstration
                </p>
                <h2 className="font-editorial mt-1 text-3xl font-medium">
                  Checkout Interface Preview
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close checkout demonstration"
                className="flex h-10 w-10 items-center justify-center border border-[#1A1A1A]/15 hover:bg-[#1A1A1A] hover:text-[#F7F5F0]"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-5 flex items-start gap-3 border border-[#1A1A1A]/15 bg-[#EFECE6] p-4 text-[13px] text-[#1A1A1A]">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#3E2E26]" strokeWidth={1.75} />
              <p>
                <strong>Non-Commercial Demonstration:</strong> ATELIER NOIR is a fictional concept
                showcase. This interface does not process payments, collect payment card data, or
                place real commercial orders.
              </p>
            </div>

            {!previewGenerated ? (
              <form onSubmit={handlePreviewSummary} className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="demo-name"
                      className="mb-1.5 block text-[12px] tracking-[0.06em] text-[#6B6863] uppercase"
                    >
                      Demonstration Name
                    </label>
                    <input
                      id="demo-name"
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Camille Laurent"
                      className="w-full border border-[#1A1A1A]/20 bg-transparent px-3.5 py-2.5 text-[14px] focus:border-[#1A1A1A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="demo-city"
                      className="mb-1.5 block text-[12px] tracking-[0.06em] text-[#6B6863] uppercase"
                    >
                      Destination City
                    </label>
                    <input
                      id="demo-city"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Paris / London / Tokyo"
                      className="w-full border border-[#1A1A1A]/20 bg-transparent px-3.5 py-2.5 text-[14px] focus:border-[#1A1A1A] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <span className="mb-2 block text-[12px] tracking-[0.06em] text-[#6B6863] uppercase">
                    Presentation Format
                  </span>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryPreference('standard')}
                      className={`border p-3.5 text-left text-[13px] transition-colors ${
                        deliveryPreference === 'standard'
                          ? 'border-[#1A1A1A] bg-[#EFECE6]'
                          : 'border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
                      }`}
                    >
                      <div className="font-medium">Courier Garment Box</div>
                      <div className="mt-0.5 text-[12px] text-[#6B6863]">
                        Complimentary concept packaging
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryPreference('studio')}
                      className={`border p-3.5 text-left text-[13px] transition-colors ${
                        deliveryPreference === 'studio'
                          ? 'border-[#1A1A1A] bg-[#EFECE6]'
                          : 'border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
                      }`}
                    >
                      <div className="font-medium">Showroom Appointment</div>
                      <div className="mt-0.5 text-[12px] text-[#6B6863]">
                        Private fitting demonstration
                      </div>
                    </button>
                  </div>
                </div>

                <div className="border-t border-[#1A1A1A]/10 pt-5">
                  <p className="mb-3 text-[12px] tracking-[0.08em] text-[#6B6863] uppercase">
                    Bag Summary
                  </p>
                  <ul className="space-y-2 text-[14px]">
                    {bag.map((item) => {
                      const product = PRODUCTS.find((p) => p.id === item.productId);
                      if (!product) return null;
                      return (
                        <li
                          key={`${item.productId}-${item.size}-${item.colorName}`}
                          className="flex justify-between gap-4"
                        >
                          <span className="text-[#1A1A1A]">
                            {product.name} ({item.size}, {item.colorName}) × {item.quantity}
                          </span>
                          <span className="tabular-nums text-[#1A1A1A]">
                            {formatPrice(product.price * item.quantity)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-4 flex items-baseline justify-between border-t border-[#1A1A1A]/10 pt-3">
                    <span className="font-medium">Estimated Demonstration Total</span>
                    <span className="text-lg font-medium tabular-nums">
                      {formatPrice(bagSubtotal)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="border border-[#1A1A1A]/20 px-5 py-3 text-[13px] font-medium hover:border-[#1A1A1A]"
                  >
                    Return to Bag
                  </button>
                  <button
                    type="submit"
                    className="bg-[#1A1A1A] px-6 py-3 text-[13px] font-medium tracking-[0.05em] text-[#F7F5F0] hover:bg-[#3E2E26]"
                  >
                    Preview Summary
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-6 space-y-5">
                <div className="border border-[#1A1A1A]/15 bg-[#EFECE6] p-5">
                  <p className="text-[12px] tracking-[0.1em] text-[#6B6863] uppercase">
                    Demonstration Summary Complete
                  </p>
                  <h3 className="font-editorial mt-1 text-2xl">
                    Selection Reviewed for {recipientName}
                  </h3>
                  <p className="mt-2 text-[14px] text-[#6B6863]">
                    Destination: {city} · Format:{' '}
                    {deliveryPreference === 'standard'
                      ? 'Courier Garment Box'
                      : 'Showroom Appointment'}
                  </p>
                  <p className="mt-3 text-[13px] text-[#1A1A1A]">
                    No order was submitted and no payment was processed. You may reset your local
                    demonstration bag or continue exploring the brand universe.
                  </p>
                </div>

                <div className="flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      clearBag();
                      handleClose();
                    }}
                    className="border border-[#1A1A1A]/25 px-5 py-3 text-[13px] font-medium hover:bg-[#EFECE6]"
                  >
                    Clear Demo Bag
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-[#1A1A1A] px-6 py-3 text-[13px] font-medium text-[#F7F5F0] hover:bg-[#3E2E26]"
                  >
                    Continue Exploring
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
