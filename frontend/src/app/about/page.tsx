import { StrapiImage } from '@/app/components/StrapiImage';
import { flattenAttributes } from '@/lib/utils';
import BlockRendererClient from '../BlockRenderClient';
import { BASE_URL } from '@/lib/definitions';

async function getStrapiData(path: string) {
  const res = await fetch(BASE_URL + path + '?populate=*', {
    next: { tags: ['strapi-about'] },
  });

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
      <div id="bio-section" className="mt-6 flex w-full flex-col items-start justify-center gap-8 md:flex-row">
        <div className="mx-auto md:mx-0 sm:w-fit shrink-0">
          <StrapiImage
            src={imageUrl}
            alt={thumbnail.alternativeText}
            width={imageWidth}
            height={imageHeight}
            className="!w-auto max-h-[40vh] max-w-full object-contain sm:max-h-[48vh]"
            preset="hero"
          />
        </div>

        <div className="md:max-w-prose text-justify md:flex-1">
          <BlockRendererClient content={description} />
        </div>
      </div>
    </div>
  );
}
