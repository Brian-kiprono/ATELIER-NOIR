import React, { useState } from 'react';
import { getOptimizedSources } from '../data/images';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fallbackTitle?: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const sources = getOptimizedSources(src);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-[#E8E4DC] text-[#6B6863] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="space-y-1.5">
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#6B6863]">ATELIER NOIR</div>
          {fallbackTitle && (
            <div className="font-editorial text-lg text-[#1A1A1A]">{fallbackTitle}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#EAE6DE] ${className}`}>
      <picture className="block h-full w-full">
        {sources && (
          <source type="image/webp" srcSet={sources.webpSrcSet} sizes={sizes} />
        )}
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover object-center transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </picture>
    </div>
  );
};
