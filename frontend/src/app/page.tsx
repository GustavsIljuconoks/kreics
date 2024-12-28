import { flattenAttributes } from '@/lib/utils';
import { StrapiImage } from '@/app/components/StrapiImage';
import BlockRendererClient from '@/app/BlockRenderClient';

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
  const strapiData = await getStrapiData('/api/home');
  const { heading, description, heroImage, linkText } = strapiData;
  const imageUrl = baseUrl + heroImage.url;

  return (
    <div className="lg:w-5/6 text-center mt-16">
      <h1 className="text-orange text-6xl lg:text-8xl font-bold mb-4">{heading}</h1>
      <h4 className="text-black-70 text-md lg:text-2xl font-bold mb-8">{description}</h4>
      <div id="photo-box" className="flex justify-center mb-6">
        <StrapiImage src={imageUrl} alt={heroImage.alternativeText} className="my-4" width={1000} height={100} />
      </div>
      <BlockRendererClient content={linkText} />
    </div>
  );
}
