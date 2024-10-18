'use client';

import { StrapiImage } from '@/app/components/StrapiImage';
import Link from 'next/link';

import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

export default function BlockRendererClient({ content }: { readonly content: BlocksContent }) {
  if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => <p className="text-neutral900 max-w-prose">{children}</p>,
        link: ({ children, url }) => <Link href={url}>{children}</Link>,
        image: ({ image }) => {
          return (
            <StrapiImage src={image.url} width={image.width} height={image.height} alt={image.alternativeText || ''} />
          );
        },
      }}
    />
  );
}
