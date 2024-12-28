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
      <Link href={`/${event.type}/${event.name}`}>
        <figure className="work">
          <figcaption>{event.name}</figcaption>
          <video autoPlay muted loop src={event.imageSrc} height="auto" width="auto" />
        </figure>
      </Link>
    );
  }

  if (event.thumbnailType == 'photo') {
    return (
      <Link href={`/${event.type}/${event.name}`}>
        <div className="project-cover">
          <div className="cover-container">
            <div className="cover-image-wrap w-full h-full relative">
              <div className="cover-image relative">
                <div className="cover-image-normal" key={event.imageAlt}>
                  <StrapiImage src={event.imageSrc} alt={event.imageAlt} width={1000} height={1000} />
                </div>
              </div>
            </div>

            <div className="details-wrap">
              <div className="details">
                <div className="details-inner w-full p-[0%]">
                  <div className="title-preserver-whitespace text-black-70" key={event.name}>
                    <p>{event.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
