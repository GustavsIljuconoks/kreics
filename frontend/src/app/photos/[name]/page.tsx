'use client';

import { EVENT } from '@/lib/definitions';
import { StrapiImage } from '../../components/StrapiImage';
import Masonry from 'react-masonry-css';
import ScrollButton from '@/app/components/ScrollButton';
import { useEffect, useState } from 'react';
import { getStrapiEventData } from '@/lib/serverUtil';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import LightBoxImage from '@/app/components/LightBoxImage';

interface ProjectPageParams {
  params: {
    name: string;
  };
}

export default function Page({ params }: ProjectPageParams) {
  const { name } = params;
  const [events, setEvents] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchEvents() {
      const events = await getStrapiEventData('/api/photo', name);
      setEvents(events);
    }

    fetchEvents();
  }, []);

  if (!events) return <div>Loading...</div>;
  const event: EVENT = events[0];

  if (event) {
    return (
      <div id="content" className="w-full pb-16 xl:px-32">
        <div className="lg:flex flex-col items-center w-full">
          <div className="w-full lg:w-5/6 text-center">
            <div className="project-module w-full bg-black-10 mb-8">
              <StrapiImage
                className="my-4 max-w-max md:max-w-full"
                src={event.thumbnail.url}
                alt={event.thumbnail.alternativeText}
              />
            </div>

            <div className="description mb-32 p-6 text-start lg:p-0">
              <h1 className="text-3xl font-bold mb-4 text-orange">{event.name}</h1>
              <p className="text-justify">{event.description}</p>
            </div>

            <Masonry breakpointCols={{ default: 3, 1024: 1, 1600: 2 }} className="flex gap-2">
              {event.media.data?.map((image: any, idx: number) => (
                <div key={idx}>
                  <StrapiImage
                    onClick={() => {
                      setCurrentIndex(idx);
                      setOpen(true);
                    }}
                    src={image.url}
                    alt={image.alternativeText}
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
              slides={event.media.data.map((image: any) => ({
                src: image.url,
                alt: image.alternativeText,
              }))}
              render={{ slide: LightBoxImage }}
            />

            <ScrollButton />
          </div>
        </div>
      </div>
    );
  }
}
