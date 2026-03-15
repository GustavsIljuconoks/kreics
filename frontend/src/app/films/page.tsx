import { flattenAttributes } from '@/lib/utils';
import { Thumbnail } from '@/app/components/Thumbnail';
import type { StrapiMedia } from '@/lib/definitions';
import { BASE_URL } from '@/lib/definitions';

import qs from 'qs';

const query = qs.stringify(
  {
    populate: '*',
  },
  {
    encodeValuesOnly: true,
  },
);

async function getStrapiData(path: string) {
  try {
    const res = await fetch(`${BASE_URL}${path}?${query}`, {
      next: { tags: ['strapi-films'] },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error('Error fetching Strapi data:', error);
    return { data: [] };
  }
}

interface FilmListItem {
  id: number;
  name: string;
  slug?: string;
  thumbnail?: StrapiMedia;
}

export default async function Page() {
  const strapiData = await getStrapiData('/api/films');
  if (!strapiData) return <p>Loading or error...</p>;
  const films = (strapiData?.data || []) as FilmListItem[];

  return (
    <div className="text-center lg:ml-2">
      <section id="photo-showcase" className="w-full">
        <div className="image-collection-container grid w-full grid-cols-1 gap-4 !mt-0 sm:grid-cols-2 lg:grid-cols-3">
          {films.map((film) => (
            <div key={film.id} className="h-full">
              <Thumbnail
                imageSrc={film.thumbnail?.url || ''}
                imageAlt={film.thumbnail?.alternativeText || ''}
                imageWidth={film.thumbnail?.width}
                imageHeight={film.thumbnail?.height}
                name={film.name || ''}
                slug={film.slug || ''}
                thumbnailType={film.thumbnail?.mime?.includes('image') ? 'photo' : 'video'}
                className="h-64"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
