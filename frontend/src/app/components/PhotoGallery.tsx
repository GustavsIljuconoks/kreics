'use client';

import type { StrapiMedia } from '@/lib/definitions';
import { getMediaDimensions } from '@/lib/utils';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import type { SlideImage } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { StrapiImage } from './StrapiImage';
import Masonry from 'react-masonry-css';
import ScrollButton from './ScrollButton';
import LightBoxImage from './LightBoxImage';

interface PhotoGalleryProps {
  photos: StrapiMedia[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagePhotos = photos.filter((photo) => photo.mime?.includes('image'));
  const slides: SlideImage[] = imagePhotos.map((image) => {
    const dimensions = getMediaDimensions(image, ['large', 'medium', 'small']);

    return {
      src: image.url,
      alt: image.alternativeText || image.name || 'Photo',
      width: dimensions.width,
      height: dimensions.height,
    };
  });

  return (
    <div id="content" className="w-full pb-16">
      <div className="lg:flex flex-col items-center w-full">
        <div className="w-full text-center">
          <Masonry breakpointCols={{ default: 3, 500: 1, 1024: 2 }} className="flex gap-2">
            {imagePhotos.map((image, idx) => {
              const dimensions = getMediaDimensions(image, ['medium', 'small', 'thumbnail']);

              return (
                <div key={image.id || idx}>
                  <StrapiImage
                    onClick={() => {
                      setCurrentIndex(idx);
                      setOpen(true);
                    }}
                    src={image.url}
                    alt={image.alternativeText || image.name || 'Photo'}
                    width={dimensions.width}
                    height={dimensions.height}
                    className="mb-2 hover:opacity-70 cursor-pointer"
                    preset="gallery"
                  />
                </div>
              );
            })}
          </Masonry>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={currentIndex}
            slides={slides}
            render={{ slide: LightBoxImage }}
          />

          <ScrollButton />
        </div>
      </div>
    </div>
  );
}
