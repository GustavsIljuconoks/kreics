'use client';

import { EVENT } from '@/lib/definitions';
import { getStrapiEventData } from '@/lib/serverUtil';
import { StrapiImage } from '@/app/components/StrapiImage';
import { useEffect, useState } from 'react';

interface ProjectPageParams {
  params: {
    name: string;
  };
}

export default function Page({ params }: ProjectPageParams) {
  const { name } = params;
  const [events, setEvents] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      const events = await getStrapiEventData('/api/video', name);
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
              {event.thumbnail.mime.includes('video') ? (
                <video autoPlay muted loop src={event.thumbnail.url} height="auto" width="auto" />
              ) : (
                <StrapiImage
                  src={event.thumbnail.url}
                  alt={event.thumbnail.alternativeText}
                  width={1000}
                  height={1000}
                />
              )}
            </div>

            <div className="description mb-32 p-6 text-start lg:p-0">
              <h1 className="text-3xl font-bold mb-4 text-orange">{event.name}</h1>
              <p className="text-justify">{event.description}</p>
            </div>

            {event.media.data?.map((image: any, idx: number) => (
              <div key={idx}>
                <StrapiImage
                  src={image.url}
                  alt={image.alternativeText}
                  width={1000}
                  height={1000}
                  type={image.mime.includes('image') ? 'image' : 'video'}
                  className="my-4 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
