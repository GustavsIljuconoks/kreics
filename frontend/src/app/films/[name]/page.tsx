'use client';

import { EVENT } from '@/lib/definitions';
import { StrapiImage } from '@/app/components/StrapiImage';
import { useEffect, useState } from 'react';
import qs from 'qs';
import { flattenAttributes } from '@/lib/utils';
import YouTubeEmbed from '@/app/components/YouTubeEmbed';

interface ProjectPageParams {
  params: {
    name: string;
  };
}

function extractYouTubeId(link?: string | null) {
  if (!link) return null;

  const trimmed = link.trim();
  if (!trimmed) return null;

  // If the link already looks like a YouTube ID, allow it.
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();

    if (host === 'youtu.be') {
      return url.pathname.replace('/', '').split(/[?&]/)[0] || null;
    }

    if (host.endsWith('youtube.com')) {
      const vParam = url.searchParams.get('v');
      if (vParam) return vParam;

      const pathMatch = url.pathname.match(/^\/(embed|shorts)\/([^/?#]+)/);
      if (pathMatch?.[2]) return pathMatch[2];
    }
  } catch {
    return null;
  }

  return null;
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

        const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}/api/video?${query}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const flattenedData = flattenAttributes(data);

        if (flattenedData?.event && Array.isArray(flattenedData.event)) {
          const filteredEvents = flattenedData.event.filter(
            (event: { name: string }) => event.name === decodeURIComponent(name),
          );
          setEvents(filteredEvents);
        } else {
          setEvents([]);
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
  const videoId = event?.youtube_id || extractYouTubeId(event?.youtube_link);

  if (event) {
    return (
      <div id="content" className="w-full pb-16">
        <div className="lg:flex flex-col items-center w-full">
          <div className="w-full text-center">
            <div className="project-module w-full bg-black-10 mb-8">
              {videoId ? <YouTubeEmbed videoId={videoId} title={event.name} /> : null}
            </div>

            <div className="description mb-32 p-6 text-start lg:p-0">
              <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
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
