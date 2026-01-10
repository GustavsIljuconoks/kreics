import { StrapiImage } from '@/app/components/StrapiImage';
import { flattenAttributes } from '@/lib/utils';
import BlockRendererClient from '../BlockRenderClient';
import { BASE_URL } from '@/lib/definitions';

async function getStrapiData(path: string) {
  const res = await fetch(BASE_URL + path + '?populate=*');

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
  if (!strapiData) return <p>Loading or error...</p>;
  const { description, thumbnail } = strapiData;

  const imageUrl = thumbnail.url;
  const imageWidth = thumbnail.formats.large?.width || thumbnail.width;
  const imageHeight = thumbnail.formats.large?.height || thumbnail.height;

  return (
    <div className="flex flex-col items-center">
      <div id="bio-section" className="flex flex-col items-center justify-center mt-6 max-w-[1024px]">
        <div className="mb-6">
          <StrapiImage src={imageUrl} alt={thumbnail.alternativeText} width={imageWidth} height={imageHeight} />
        </div>

        <div className="text-left w-full">
          <BlockRendererClient content={description} />
        </div>
      </div>
    </div>
  );
}
