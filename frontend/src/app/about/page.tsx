import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { StrapiImage } from '@/app/components/StrapiImage';
import { flattenAttributes } from '@/lib/utils';

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

async function getStrapiData(path: string) {
  const res = await fetch(baseUrl + path + '?populate=*');

  if (!res.ok) {
    console.error(`Error: ${res.status} - ${res.statusText}`);
    return null;
  }

  const data = await res.json();
  const flattenedData = flattenAttributes(data);
  return flattenedData;
}

export default async function Page() {
  const strapiData = await getStrapiData('/api/about-page');
  const { description, thumbnail } = strapiData;
  const imageUrl = baseUrl + thumbnail.url;

  return (
    <div className="lg:w-5/6 text-left">
      <div className="text-start text-md lg:text-xl px-10">
        <div id="bio-section" className="mt-6">
          <div className="flex justify-start mb-6">
            <StrapiImage src={imageUrl} alt={thumbnail.alternativeText} className="my-4" width={1000} height={100} />
          </div>
          <BlocksRenderer content={description} />
        </div>
      </div>
    </div>
  );
}
