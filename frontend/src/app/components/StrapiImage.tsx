'use client';

import Image, { type ImageLoaderProps } from 'next/image';
import { getBlurDataURL, getCloudinaryTransformedUrl, getStrapiMedia, isCloudinaryUrl } from '@/lib/utils';

type ImagePreset = 'hero' | 'card' | 'gallery' | 'lightbox' | 'content';

interface ImagePresetConfig {
  sizes: string;
  quality: number;
}

const IMAGE_PRESETS: Record<ImagePreset, ImagePresetConfig> = {
  hero: {
    sizes: '100vw',
    quality: 82,
  },
  card: {
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    quality: 72,
  },
  gallery: {
    sizes: '(max-width: 500px) 100vw, (max-width: 1024px) 50vw, 33vw',
    quality: 70,
  },
  lightbox: {
    sizes: '100vw',
    quality: 84,
  },
  content: {
    sizes: '100vw',
    quality: 78,
  },
};

interface StrapiImageProps {
  src: string;
  alt: string | undefined;
  height?: number;
  width?: number;
  type?: 'image' | 'video';
  className?: string;
  onClick?: () => void;
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  preset?: ImagePreset;
  unoptimized?: boolean;
}

export function StrapiImage({
  src,
  alt,
  height,
  width,
  type,
  className,
  onClick,
  blurDataURL,
  sizes,
  quality,
  priority,
  preset = 'content',
  unoptimized = false,
}: Readonly<StrapiImageProps>) {
  if (!src) return null;

  const imageUrl = getStrapiMedia(src);
  const presetConfig = IMAGE_PRESETS[preset];
  const imageWidth = width && width > 0 ? width : 1;
  const imageHeight = height && height > 0 ? height : 1;
  const imageFallback = `https://placehold.co/${imageWidth}x${imageHeight}`;
  const blur = blurDataURL || getBlurDataURL(imageUrl);
  const imageQuality = quality ?? presetConfig.quality;
  const imageSizes = sizes ?? presetConfig.sizes;
  const shouldUseCloudinaryLoader = Boolean(imageUrl && isCloudinaryUrl(imageUrl) && !unoptimized);

  const loader = shouldUseCloudinaryLoader
    ? ({ src: loaderSrc, width: loaderWidth, quality: loaderQuality }: ImageLoaderProps) =>
        getCloudinaryTransformedUrl(loaderSrc, {
          width: loaderWidth,
          quality: loaderQuality ?? imageQuality,
        })
    : undefined;

  if (type === 'video') {
    return <video controls src={imageUrl ?? imageFallback} height="auto" width="auto" className={className} />;
  }

  return (
    <Image
      src={imageUrl ?? imageFallback}
      alt={alt ?? 'image taken by kreics'}
      height={imageHeight}
      width={imageWidth}
      className={`w-full h-auto ${className ?? ''}`}
      onClick={onClick}
      loading={priority ? undefined : 'lazy'}
      placeholder={blur ? 'blur' : 'empty'}
      blurDataURL={blur}
      sizes={imageSizes}
      quality={imageQuality}
      priority={priority}
      unoptimized={unoptimized}
      loader={loader}
    />
  );
}
