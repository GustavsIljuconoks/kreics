'use client';

import { EVENT } from '@/lib/definitions';
import { StrapiImage } from '@/app/components/StrapiImage';
import { useEffect, useState } from 'react';
import qs from 'qs';
import { flattenAttributes } from '@/lib/utils';

interface ProjectPageParams {
  params: {
    name: string;
  };
}

export default function Page({ params }: ProjectPageParams) {
  const { name } = params;
  const [events, setEvents] = useState<EVENT[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const query = qs.stringify(
          {
            populate: {
              event: {
                populate: '*',
              },
            },
          },
          { encodeValuesOnly: true },
        );

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}/api/video?${query}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const flattenedData = flattenAttributes(data);

        if (flattenedData?.event) {
          const filteredEvents = flattenedData.event.filter(
            (event: { name: string }) => event.name === decodeURIComponent(name),
          );
          setEvents(filteredEvents);
        } else {
          setEvents(null);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [name]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!events || events.length === 0) return <div>No event found with name: {decodeURIComponent(name)}</div>;
  const event: EVENT = events[0];

  if (event) {
    return (
      <div id="content" className="w-full pb-16 xl:px-32">
        <div className="lg:flex flex-col items-center w-full">
          <div className="w-full lg:w-5/6 text-center">
            <div className="project-module w-full bg-black-10 mb-8">
              {event.video && <video controls src={event.video.url} height="auto" width="auto" />}
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
                  type={'image'}
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
