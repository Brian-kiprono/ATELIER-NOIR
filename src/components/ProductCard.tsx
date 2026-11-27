import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getOptimizedSources } from '../data/images';
import { Product } from '../types';
import { formatPrice } from '../utils/format';

interface ProductCardProps {
  product: Product;
  aspectClass?: string;
  showSecondaryOnHover?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  aspectClass = 'aspect-[3/4]',
  showSecondaryOnHover = true,
}) => {
  const { navigate, isWishlisted, toggleWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [primaryError, setPrimaryError] = useState(false);
  const saved = isWishlisted(product.id);

  const primaryImage = product.images[0];
  const secondaryImage =
    showSecondaryOnHover && product.images.length > 1 ? product.images[1] : null;
  const primarySources = getOptimizedSources(primaryImage.src);
  const secondarySources = secondaryImage ? getOptimizedSources(secondaryImage.src) : null;

  return (
    <article
      className="group flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative w-full overflow-hidden bg-[#EAE6DE] ${aspectClass}`}>
        <button
          type="button"
          onClick={() => navigate('product', { productId: product.id })}
          className="block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2"
          aria-label={`View ${product.name}`}
        >
          {primaryError ? (
            <div className="flex h-full w-full items-center justify-center bg-[#E8E4DC] p-6 text-center">
              <span className="font-editorial text-lg text-[#1A1A1A]">{product.name}</span>
            </div>
          ) : (
            <>
              <picture className="block h-full w-full">
                {primarySources && (
                  <source
                    type="image/webp"
                    srcSet={primarySources.webpSrcSet}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <img
                  src={primaryImage.src}
                  alt={primaryImage.alt}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setPrimaryError(true)}
                  className={`h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
                    secondaryImage && isHovered ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </picture>
              {secondaryImage && (
                <picture className="absolute inset-0 block h-full w-full">
                  {secondarySources && (
                    <source
                      type="image/webp"
                      srcSet={secondarySources.webpSrcSet}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <img
                    src={secondaryImage.src}
                    alt={secondaryImage.alt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className={`h-full w-full object-cover object-center transition-opacity duration-500 ease-out ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </picture>
              )}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center bg-[#F7F5F0]/90 text-[#1A1A1A] transition-colors duration-200 hover:bg-[#1A1A1A] hover:text-[#F7F5F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]"
        >
          <Heart className="h-4 w-4" strokeWidth={1.5} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="mt-3.5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-3 text-[12px] text-[#6B6863]">
          <span className="truncate">{product.subcategory}</span>
          {product.isNewArrival && <span className="shrink-0 text-[#3E2E26]">New Arrival</span>}
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('product', { productId: product.id })}
            className="text-left text-[15px] font-medium text-[#1A1A1A] transition-colors hover:text-[#3E2E26] focus-visible:outline-none focus-visible:underline"
          >
            {product.name}
          </button>
          <span className="shrink-0 text-[15px] tabular-nums text-[#1A1A1A]">
            {formatPrice(product.price)}
          </span>
        </div>

        {product.colors.length > 0 && (
          <div className="mt-1 flex items-center gap-1.5" aria-label="Available colors">
            {product.colors.map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="h-3 w-3 rounded-full border border-[#1A1A1A]/20"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
