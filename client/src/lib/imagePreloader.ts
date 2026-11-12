/**
 * Image Preloading Utility
 * Optimizes image loading by preloading critical images
 */

interface PreloadedImage {
  src: string;
  loaded: boolean;
  error?: boolean;
}

class ImagePreloader {
  private cache: Map<string, PreloadedImage> = new Map();
  private maxCacheSize = 100;

  /**
   * Preload a single image
   */
  preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.cache.has(src)) {
        const cached = this.cache.get(src);
        if (cached?.loaded) {
          resolve();
        } else {
          reject(new Error(`Image previously failed to load: ${src}`));
        }
        return;
      }

      const img = new Image();
      img.onload = () => {
        this.cache.set(src, { src, loaded: true });
        this.pruneCache();
        resolve();
      };
      img.onerror = () => {
        // Don't cache failed images - they might be available later
        console.warn(`Failed to preload image: ${src}`);
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.crossOrigin = 'anonymous';
      img.src = src;
    });
  }

  /**
   * Preload multiple images with concurrency control
   */
  async preloadImages(sources: string[], concurrency = 5): Promise<void> {
    const execute = async (src: string) => {
      try {
        await this.preloadImage(src);
      } catch (error) {
        // Silently fail - images will load on demand
      }
    };

    // Process images in batches
    for (let i = 0; i < sources.length; i += concurrency) {
      const batch = sources.slice(i, i + concurrency);
      await Promise.all(batch.map(execute));
    }
  }

  /**
   * Check if image is already loaded
   */
  isLoaded(src: string): boolean {
    const cached = this.cache.get(src);
    return cached?.loaded === true;
  }

  /**
   * Get cached image status
   */
  getStatus(src: string): PreloadedImage | undefined {
    return this.cache.get(src);
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Prune cache to max size
   */
  private pruneCache(): void {
    if (this.cache.size > this.maxCacheSize) {
      const entries = Array.from(this.cache.entries());
      const toDelete = entries.slice(0, entries.length - this.maxCacheSize);
      toDelete.forEach(([key]) => this.cache.delete(key));
    }
  }
}

// Singleton instance
export const imagePreloader = new ImagePreloader();

/**
 * Hook for preloading images in components
 */
import { useEffect } from 'react';

export const usePreloadImages = (sources: string[], options?: { immediate?: boolean; concurrency?: number }) => {
  const { immediate = true, concurrency = 5 } = options || {};

  useEffect(() => {
    if (immediate && sources.length > 0) {
      imagePreloader.preloadImages(sources, concurrency).catch(console.warn);
    }
  }, [sources.join(','), immediate, concurrency]);
};
