'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { StrapiImage } from './StrapiImage';
import Masonry from 'react-masonry-css';
import ScrollButton from './ScrollButton';
import LightBoxImage from './LightBoxImage';

interface Photo {
  id: string;
  url: string;
  alternativeText?: string;
  mime: string;
  name?: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter only image files
  const imagePhotos = photos.filter((photo) => photo.mime?.includes('image'));

  return (
    <div id="content" className="w-full pb-16">
      <div className="lg:flex flex-col items-center w-full">
        <div className="w-full text-center">
          <Masonry breakpointCols={{ default: 3, 1024: 1, 1600: 2 }} className="flex gap-2">
            {imagePhotos.map((image: any, idx: number) => (
              <div key={image.id || idx}>
                <StrapiImage
                  onClick={() => {
                    setCurrentIndex(idx);
                    setOpen(true);
                  }}
                  src={image.url}
                  alt={image.alternativeText || image.name || 'Photo'}
                  width={1000}
                  height={1000}
                  className="my-4 hover:opacity-70 cursor-pointer"
                />
              </div>
            ))}
          </Masonry>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={currentIndex}
            slides={imagePhotos.map((image: any) => ({
              src: image.url,
              alt: image.alternativeText || image.name || 'Photo',
            }))}
            render={{ slide: LightBoxImage }}
          />

          <ScrollButton />
        </div>
      </div>
    </div>
  );
}
