import { flattenAttributes } from '@/lib/utils';
import { StrapiImage } from '@/app/components/StrapiImage';
import BlockRendererClient from '@/app/BlockRenderClient';
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
  const strapiData = await getStrapiData('/api/home');

  if (!strapiData) return <p>Loading or error...</p>;

  const { heading, description, heroImage, linkText } = strapiData;

  const imageUrl = heroImage.url;
  const imageWidth = heroImage.formats.medium?.width || heroImage.width;
  const imageHeight = heroImage.formats.medium?.height || heroImage.height;

  return (
    <div className="text-center">
      <h1 className="text-orange text-6xl lg:text-8xl font-bold mb-4">{heading}</h1>
      <h4 className="text-black-70 text-md lg:text-2xl font-bold mb-8">{description}</h4>
      <div id="photo-box" className="flex justify-center mb-6">
        <StrapiImage
          src={imageUrl}
          alt={heroImage.alternativeText}
          className="my-4 max-w-max md:max-w-full"
          width={imageWidth}
          height={imageHeight}
        />
      </div>

      <BlockRendererClient content={linkText} />
    </div>
  );
}
