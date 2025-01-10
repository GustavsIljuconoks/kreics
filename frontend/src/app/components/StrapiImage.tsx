import Image from 'next/image';
import { getStrapiMedia } from '@/lib/utils';

interface StrapiImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  type?: 'image' | 'video';
  className?: string;
  onClick?: () => void;
}

export function StrapiImage({ src, alt, height, width, type, className, onClick }: Readonly<StrapiImageProps>) {
  if (!src) return null;
  const imageUrl = getStrapiMedia(src);
  const imageFallback = `https://placehold.co/${width}x${height}`;

  if (type == 'video') {
    return <video controls src={imageUrl ?? imageFallback} height="auto" width="auto" className={className} />;
  } else {
    return (
      <Image
        src={imageUrl ?? imageFallback}
        alt={alt ?? 'image taken by kreics'}
        height={height}
        width={width}
        className={className}
        onClick={onClick}
        loading="eager"
      />
    );
  }
}
