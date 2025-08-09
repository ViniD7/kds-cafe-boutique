import { useState, useEffect, useRef } from 'react';

interface UseLazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export const useLazyLoading = (options: UseLazyLoadingOptions = {}) => {
  const { threshold = 0.1, rootMargin = '50px', enabled = true } = options;
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, enabled]);

  const markAsLoaded = () => {
    setIsLoaded(true);
  };

  return {
    elementRef,
    isInView,
    isLoaded,
    markAsLoaded,
  };
};

export const useImageLazyLoading = (src: string, options?: UseLazyLoadingOptions) => {
  const { elementRef, isInView, isLoaded, markAsLoaded } = useLazyLoading(options);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isInView && !imageSrc && !imageError) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        markAsLoaded();
      };
      img.onerror = () => {
        setImageError(true);
      };
      img.src = src;
    }
  }, [isInView, src, imageSrc, imageError, markAsLoaded]);

  return {
    elementRef,
    imageSrc,
    imageError,
    isLoaded,
  };
}; 