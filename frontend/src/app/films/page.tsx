import { flattenAttributes } from '@/lib/utils';
import { Thumbnail } from '@/app/components/Thumbnail';
import { BASE_URL } from '@/lib/definitions';

import qs from 'qs';

const query = qs.stringify(
  {
    populate: {
      event: {
        populate: '*',
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
);

async function getStrapiData(path: string) {
  try {
    const res = await fetch(`${BASE_URL}${path}?${query}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error('Error fetching Strapi data:', error);
    return { event: [] };
  }
}

export default async function Page() {
  const strapiData = await getStrapiData('/api/video');
  if (!strapiData) return <p>Loading or error...</p>;
  const { event = [] } = strapiData || {};

  return (
    <div className="text-center lg:ml-2">
      <section id="photo-showcase" className="w-full md:flex flex-wrap items-start">
        <div className="image-collection-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:-mt-[6.5rem] lg:mt-0 w-full">
          {event?.map((event: any) => (
            <div key={event.id} className="h-80 flex flex-col">
              <Thumbnail
                imageSrc={event.thumbnail?.url || ''}
                imageAlt={event.thumbnail?.alternativeText || ''}
                name={event.name || ''}
                description={event.description || ''}
                type={event.tag?.type || ''}
                thumbnailType={event.thumbnail?.mime?.includes('image') ? 'photo' : 'video'}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
