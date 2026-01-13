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
    <div className="text-center mx-auto">
      <div className="description mb-12"></div>

      {hero && (
        <div className="mb-12">
          <StrapiImage
            src={hero.url}
            alt={hero.alternativeText || 'Contact hero image'}
            width={hero.width || 800}
            height={hero.height || 600}
            className="w-full h-auto mx-auto"
          />
        </div>
      )}

      <div className="info flex flex-col items-start">
        <p className="text-[18px] mb-6">
          <strong>Booking</strong>
        </p>

        <p>Ingus Iļjučonoks</p>
        <a href="mailto:kreicsfilms@gmail.com">kreicsfilms@gmail.com</a>
        <a href="tel:+37127743709">+371 27743710</a>
      </div>
    </div>
  );
}
