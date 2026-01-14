import Image from 'next/image';
import { getStrapiMedia, getBlurDataURL } from '@/lib/utils';

interface StrapiImageProps {
  src: string;
  alt: string | undefined;
  height?: number;
  width?: number;
  type?: 'image' | 'video';
  className?: string;
  onClick?: () => void;
  blurDataURL?: string;
}

export function StrapiImage({
  src,
  alt,
  height,
  width,
  type,
  className,
  onClick,
  blurDataURL,
}: Readonly<StrapiImageProps>) {
  if (!src) return null;
  const imageUrl = getStrapiMedia(src);
  const imageFallback = `https://placehold.co/${width}x${height}`;
  const blur = blurDataURL || getBlurDataURL(imageUrl);

  if (type == 'video') {
    return <video controls src={imageUrl ?? imageFallback} height="auto" width="auto" className={className} />;
  } else {
    return (
      <Image
        src={imageUrl ?? imageFallback}
        alt={alt ?? 'image taken by kreics'}
        height={height ?? 0}
        width={width ?? 0}
        className={`w-full h-auto ${className ?? ''}`}
        onClick={onClick}
        loading="lazy"
        placeholder={blur ? 'blur' : 'empty'}
        blurDataURL={blur}
        sizes="100vw"
      />
    );
  }
}
