import Link from 'next/link';
import { StrapiImage } from './StrapiImage';

interface IThumbnail {
  imageSrc: string;
  imageAlt: string;
  name: string;
  description: string;
  type: string;
  thumbnailType: string;
}

export function Thumbnail(event: IThumbnail) {
  if (event.thumbnailType == 'video') {
    return (
      <Link href={`/films/${event.name}`}>
        <figure className="work">
          <figcaption>{event.name}</figcaption>
          <video autoPlay muted loop src={event.imageSrc} height="auto" width="auto" />
        </figure>
      </Link>
    );
  }

  if (event.thumbnailType == 'photo') {
    return (
      <Link href={`/films/${event.name}`}>
        <div className="project-cover">
          <div className="cover-container">
            <div className="cover-image-wrap w-full h-full relative">
              <div className="cover-image relative">
                <div className="cover-image-normal" key={event.imageAlt}>
                  <StrapiImage src={event.imageSrc} alt={event.imageAlt} width={1000} height={1000} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-left">{event.name}</p>
      </Link>
    );
  }
}
