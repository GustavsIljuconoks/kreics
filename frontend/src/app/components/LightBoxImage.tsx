'use client';

import Image, { type ImageLoaderProps } from 'next/image';
import { useEffect, useState } from 'react';
import { getBlurDataURL, getCloudinaryTransformedUrl, isCloudinaryUrl } from '@/lib/utils';
import {
  isImageFitCover,
  isImageSlide,
  type RenderSlideProps,
  type Slide,
  type SlideImage,
  useLightboxProps,
  useLightboxState,
} from 'yet-another-react-lightbox';

function isLightBoxImage(slide: Slide): slide is SlideImage & { width: number; height: number } {
  return isImageSlide(slide) && typeof slide.width === 'number' && typeof slide.height === 'number';
}

export default function LightBoxImage({ slide, offset, rect }: RenderSlideProps) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();
  const [isLoaded, setIsLoaded] = useState(false);

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isLightBoxImage(slide)) return undefined;

  useEffect(() => {
    setIsLoaded(false);
  }, [slide.src]);

  const width = !cover ? Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width)) : rect.width;
  const height = !cover ? Math.round(Math.min(rect.height, (rect.width / slide.width) * slide.height)) : rect.height;
  const shouldUseCloudinaryLoader = isCloudinaryUrl(slide.src);
  const blurDataURL = getBlurDataURL(slide.src);
  const loader = shouldUseCloudinaryLoader
    ? ({ src, width: loaderWidth, quality }: ImageLoaderProps) =>
        getCloudinaryTransformedUrl(src, {
          width: loaderWidth,
          quality: quality ?? 100,
        })
    : undefined;

  return (
    <div style={{ position: 'relative', width, height }}>
      {!isLoaded ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        </div>
      ) : null}
      <Image
        fill
        alt=""
        src={slide.src}
        loading={offset === 0 ? 'eager' : 'lazy'}
        draggable={false}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        style={{
          objectFit: cover ? 'cover' : 'contain',
          cursor: click ? 'pointer' : undefined,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 250ms ease',
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        quality={100}
        loader={loader}
        onLoad={() => setIsLoaded(true)}
        onClick={offset === 0 ? () => click?.({ index: currentIndex }) : undefined}
      />
    </div>
  );
}
