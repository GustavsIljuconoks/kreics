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
    const res = await fetch(`${BASE_URL}${path}?${query}`);

    if (!res.ok) {
      console.error(`Error: ${res.status} - ${res.statusText}`);
      return null;
    }

    const data = await res.json();

    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.error('Error fetching Strapi data:', error);
    return { event: [] };
  }
}

export default async function Page() {
  const strapiData = await getStrapiData('/api/photo');
  if (!strapiData) return <p>Loading or error...</p>;

  const { event } = strapiData;

  return (
    <div className="lg:w-5/6 text-center lg:ml-2">
      <section id="photo-showcase" className="w-full md:flex flex-wrap items-start">
        <h1 className="project-type ml-[-30px] lg:ml-0 text-[32vw] lg:text-[5vw] -tracking-[0.09em]">photos</h1>

        <div className="image-collection-container md:-mt-[6.5rem] lg:grid-cols-2 lg:mt-0">
          {event?.map((event: any) => (
            <Thumbnail
              key={event.id}
              imageSrc={event.thumbnail.url}
              imageAlt={event.thumbnail.alternativeText}
              name={event.name}
              description={event.description}
              type={event.tag.type}
              thumbnailType={event.thumbnail?.mime?.includes('image') ? 'photo' : 'video'}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
