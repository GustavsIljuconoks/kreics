'use client';

import { EVENT } from '@/lib/definitions';
import Image, { type ImageLoaderProps } from 'next/image';
import { useEffect, useState } from 'react';
import qs from 'qs';
import {
  flattenAttributes,
  getBlurDataURL,
  getCloudinaryTransformedUrl,
  getMediaDimensions,
  getStrapiMedia,
  isCloudinaryUrl,
} from '@/lib/utils';
import YouTubeEmbed from '@/app/components/YouTubeEmbed';
import BlockRendererClient from '@/app/BlockRenderClient';

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
  const { name: slugParam } = params;
  const routeSlug = decodeURIComponent(slugParam);
  const [events, setEvents] = useState<EVENT[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const query = qs.stringify(
          {
            filters: {
              slug: {
                $eq: routeSlug,
              },
            },
            populate: '*',
          },
          { encodeValuesOnly: true },
        );

        const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}/api/films?${query}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const flattenedData = flattenAttributes(data);

        if (flattenedData?.data && Array.isArray(flattenedData.data)) {
          setEvents(flattenedData.data);
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
  }, [routeSlug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!events || events.length === 0) return <div>No event found with slug: {routeSlug}</div>;
  const event: EVENT = events[0];
  const videoId = event?.youtube_id || extractYouTubeId(event?.youtube_link);

  if (event) {
    return (
      <div id="content" className="w-full pb-16">
        <div className="flex flex-col items-center w-full">
          <div className="w-full">
            <div className="project-module mx-auto mb-12 w-full max-w-4xl">
              {videoId ? <YouTubeEmbed videoId={videoId} title={event.name} /> : null}
            </div>

            <div className="mx-auto mb-16 w-full text-start">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{event.name}</h1>
              {event.description ? (
                <BlockRendererClient
                  content={typeof event.description === 'string' ? JSON.parse(event.description) : event.description}
                />
              ) : null}
            </div>

            <div className="mx-auto w-full">
              {event.media.data?.map((image, idx) => {
                const dimensions = getMediaDimensions(image, ['large', 'medium', 'small']);
                const imageUrl = getStrapiMedia(image.url);
                const blurDataURL = getBlurDataURL(imageUrl);
                const shouldUseCloudinaryLoader = Boolean(imageUrl && isCloudinaryUrl(imageUrl));
                const loader = shouldUseCloudinaryLoader
                  ? ({ src, width, quality }: ImageLoaderProps) =>
                      getCloudinaryTransformedUrl(src, {
                        width,
                        quality: quality ?? 100,
                      })
                  : undefined;
                const fallbackUrl = `https://placehold.co/${dimensions.width}x${dimensions.height}`;

                return (
                  <Image
                    key={idx}
                    src={imageUrl ?? fallbackUrl}
                    alt={image.alternativeText || image.name || event.name}
                    width={dimensions.width}
                    height={dimensions.height}
                    className="my-4 h-auto w-full"
                    loading="lazy"
                    placeholder={blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={blurDataURL}
                    sizes="100vw"
                    quality={100}
                    loader={loader}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
