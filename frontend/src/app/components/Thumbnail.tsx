import Link from 'next/link';
import { StrapiImage } from './StrapiImage';

interface IThumbnail {
  imageSrc: string;
  imageAlt: string;
  name: string;
  description: string;
  type: string;
  thumbnailType: string;
  className?: string;
}

export function Thumbnail(event: IThumbnail) {
  if (event.thumbnailType == 'video') {
    return (
      <Link href={`/films/${event.name}`} className="block h-full">
        <figure className="work flex h-full flex-col">
          <div className="w-full flex-1 overflow-hidden">
            <video autoPlay muted loop src={event.imageSrc} className="h-full w-full object-cover" />
          </div>
          <figcaption className="text-left mt-2">{event.name}</figcaption>
        </figure>
      </Link>
    );
  }

  if (event.thumbnailType == 'photo') {
    return (
      <Link href={`/films/${event.name}`} className="flex h-full flex-col">
        <div className="project-cover flex-1">
          <div className="cover-container h-full">
            <div className="cover-image-wrap w-full h-full relative">
              <div className="cover-image relative h-full">
                <div className="cover-image-normal h-full" key={event.imageAlt}>
                  <StrapiImage
                    src={event.imageSrc}
                    alt={event.imageAlt}
                    width={1000}
                    height={1000}
                    className={`h-full w-full object-cover ${event.className ?? ''}`}
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
