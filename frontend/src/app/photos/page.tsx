import { flattenAttributes } from '@/lib/utils';
import { Thumbnail } from '@/app/components/Thumbnail';

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const qs = require('qs');
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
  const res = await fetch(`${baseUrl}${path}?${query}`);

  if (!res.ok) {
    console.error(`Error: ${res.status} - ${res.statusText}`);
    return null;
  }

  const data = await res.json();

  const flattenedData = flattenAttributes(data);
  return flattenedData;
}

export default async function Page() {
  const strapiData = await getStrapiData('/api/photo');
  const { event } = strapiData;

  return (
    <div className="lg:w-5/6 text-center lg:ml-2">
      <section id="photo-showcase" className="w-full md:flex flex-wrap items-start">
        <h1 className="project-type text-[30vw] lg:text-[5vw]">photos</h1>

        <div className="image-collection-container md:-mt-[6.5rem] lg:grid-cols-2 lg:mt-0">
          {event?.map((event: any) => (
            <Thumbnail
              key={event.id}
              imageSrc={baseUrl + event.thumbnail.url}
              imageAlt={event.thumbnail.alternativeText}
              name={event.name}
              description={event.description}
              type={event.tag.type}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
