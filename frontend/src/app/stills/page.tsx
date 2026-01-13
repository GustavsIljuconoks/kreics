import { flattenAttributes } from '@/lib/utils';
import { PhotoGallery } from '@/app/components/PhotoGallery';
import { BASE_URL } from '@/lib/definitions';
import qs from 'qs';

const query = qs.stringify(
  {
    populate: {
      media: true,
    },
  },
  {
    encodeValuesOnly: true,
  },
);

async function getStrapiData() {
  try {
    const res = await fetch(`${BASE_URL}/api/photo?${query}`, {
      next: { tags: ['strapi-photos'] },
    });

    if (!res.ok) {
      console.error(`Error: ${res.status} - ${res.statusText}`);
      return null;
    }

    const data = await res.json();

    const flattenedData = flattenAttributes(data);

    // Extract media files from the photo single type
    const allPhotos: any[] = [];
    if (flattenedData?.media?.data) {
      // flattenedData.media.data is the array of actual media items
      allPhotos.push(...flattenedData.media.data);
    }

    return allPhotos;
  } catch (error) {
    console.error('Error fetching Strapi data:', error);
    return [];
  }
}

export default async function Page() {
  const photos = await getStrapiData();
  if (!photos) return <p>Loading or error...</p>;

  return (
    <div className="w-full">
      <div className="container mx-auto py-8">
        {photos && photos.length > 0 ? (
          <PhotoGallery photos={photos} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No photos found</p>
          </div>
        )}
      </div>
    </div>
  );
}
