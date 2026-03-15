import Link from 'next/link';
import { StrapiImage } from './StrapiImage';
import { slugify } from '@/lib/utils';

interface IThumbnail {
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  name: string;
  slug?: string;
  thumbnailType: string;
  className?: string;
}

export function Thumbnail(event: IThumbnail) {
  const mediaClassName = event.className ?? 'h-64';
  const eventSlug = event.slug || slugify(event.name);
  const eventHref = `/films/${eventSlug}`;

  if (event.thumbnailType == 'video') {
    return (
      <Link href={eventHref} className="block h-full">
        <figure className="work flex h-full flex-col">
          <div className={`w-full overflow-hidden ${mediaClassName}`}>
            <video autoPlay muted loop src={event.imageSrc} className="h-full w-full object-cover" />
          </div>
          <figcaption className="text-left mt-2">{event.name}</figcaption>
        </figure>
      </Link>
    );
  }

  if (event.thumbnailType == 'photo') {
    return (
      <Link href={eventHref} className="flex h-full flex-col">
        <div className={`project-cover overflow-hidden ${mediaClassName}`}>
          <div className="cover-container h-full">
            <div className="cover-image-wrap w-full h-full relative">
              <div className="cover-image relative h-full">
                <div className="cover-image-normal h-full" key={event.imageAlt}>
                  <StrapiImage
                    src={event.imageSrc}
                    alt={event.imageAlt}
                    width={event.imageWidth}
                    height={event.imageHeight}
                    className="h-full w-full object-cover"
                    preset="card"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-left mt-2">{event.name}</p>
      </Link>
    );
  }
}
