'use client';

import { StrapiImage } from '@/app/components/StrapiImage';
import { flattenAttributes } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface IStrapiData {
  hero?: {
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
}

export default function Page() {
  const [strapiData, setStrapiData] = useState<IStrapiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}/api/contact-page?populate=hero`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const flattenedData = flattenAttributes(data);
        setStrapiData(flattenedData);
      } catch (err) {
        console.error('Error fetching contact page data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading contact page: {error}</p>;

  const { hero } = strapiData || {};

  return (
    <div className="mx-auto flex h-full min-h-0 items-center overflow-hidden">
      <div className="flex h-full w-full flex-col items-start justify-center gap-4 overflow-hidden">
        {hero && (
          <div className="flex w-full justify-center mb-8">
            <StrapiImage
              src={hero.url}
              alt={hero.alternativeText || 'Contact hero image'}
              width={hero.width || 800}
              height={hero.height || 600}
              className="mx-auto !h-auto  !w-auto max-w-full object-contain"
            />
          </div>
        )}

        <div className="flex w-full max-w-md flex-col items-start justify-center text-left">
          <p className="mb-2 text-[18px] font-bold">Booking</p>
          <p>Ingus Iļjučonoks</p>
          <a className="hover:underline" href="mailto:kreicsfilms@gmail.com">
            kreicsfilms@gmail.com
          </a>
          <a className="hover:underline" href="tel:+37127743710">
            +371 27743710
          </a>
        </div>
      </div>
    </div>
  );
}
