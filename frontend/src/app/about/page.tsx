import { StrapiImage } from '@/app/components/StrapiImage';
import { flattenAttributes } from '@/lib/utils';
import BlockRendererClient from '../BlockRenderClient';

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
    <div className="lg:w-5/6 flex flex-col items-center">
      <div id="bio-section" className="flex flex-col items-center justify-center mt-6 max-w-[1024px]">
        <div className="mb-6">
          <StrapiImage src={imageUrl} alt={thumbnail.alternativeText} width={1024} height={100} />
        </div>

        <div className="prose mx-auto text-justify">
          <BlockRendererClient content={description} />
        </div>
      </div>
    </div>
  );
}
