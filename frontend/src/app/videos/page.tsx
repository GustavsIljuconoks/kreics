import { flattenAttributes } from '@/lib/utils';
import { Thumbnail } from '@/app/components/Thumbnail';

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

async function getStrapiData(path: string) {
  const res = await fetch(baseUrl + path + '?populate[event][populate]=*');

  if (!res.ok) {
    console.error(`Error: ${res.status} - ${res.statusText}`);
    return null;
  }

  const data = await res.json();

  const flattenedData = flattenAttributes(data);
  return flattenedData;
}

export default async function Page() {
  const strapiData = await getStrapiData('/api/video');
  const { event } = strapiData;

  return (
    <div className="lg:w-5/6 text-center lg:ml-2">
      <section id="photo-showcase" className="w-full md:flex flex-wrap items-start">
        <h1 className="project-type text-[30vw] lg:text-[5vw]">videos</h1>

        <div className="image-collection-container md:-mt-[6.5rem] lg:grid-cols-2 lg:mt-0">
          {event?.map((event: any) => (
            <Thumbnail
              key={event.id}
              imageSrc={baseUrl + event.thumbnail.url}
              imageAlt={event.thumbnail.alternativeText}
              name={event.name}
              description={event.description}
              type={event.tag.type}
              thumbnailType={event.thumbnail.mime.includes('image') ? 'photo' : 'video'}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
