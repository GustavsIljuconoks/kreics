import type { StrapiMedia, StrapiMediaFormatKey } from '@/lib/definitions';

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith('data:')) return url;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  return `${getStrapiURL()}${url}`;
}

function normalizeRemoteUrl(url: string) {
  return url.startsWith('//') ? `https:${url}` : url;
}

function clampQuality(quality: number) {
  return Math.min(100, Math.max(1, Math.round(quality)));
}

function hasCloudinaryTransformation(pathSegment: string | undefined) {
  if (!pathSegment) return false;
  return !/^v\d+$/.test(pathSegment);
}

export function isCloudinaryUrl(url: string | null): boolean {
  if (!url) return false;

  try {
    return new URL(normalizeRemoteUrl(url)).hostname === 'res.cloudinary.com';
  } catch {
    return url.includes('res.cloudinary.com');
  }
}

interface CloudinaryTransformOptions {
  width?: number;
  quality?: number;
  transformations?: string[];
}

export function getCloudinaryTransformedUrl(url: string, options: CloudinaryTransformOptions = {}) {
  const normalizedUrl = normalizeRemoteUrl(url);

  if (!isCloudinaryUrl(normalizedUrl)) return normalizedUrl;

  try {
    const parsedUrl = new URL(normalizedUrl);
    const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
    const uploadIndex = pathSegments.indexOf('upload');

    if (uploadIndex === -1 || uploadIndex === pathSegments.length - 1) return normalizedUrl;

    const segmentAfterUpload = pathSegments[uploadIndex + 1];

    if (hasCloudinaryTransformation(segmentAfterUpload)) {
      return normalizedUrl;
    }

    const transformations = ['f_auto', 'dpr_auto', 'c_limit'];

    if (options.width && options.width > 0) {
      transformations.push(`w_${Math.round(options.width)}`);
    }

    if (options.quality) {
      transformations.push(`q_${clampQuality(options.quality)}`);
    }

    if (options.transformations?.length) {
      transformations.push(...options.transformations);
    }

    parsedUrl.pathname = `/${[
      ...pathSegments.slice(0, uploadIndex + 1),
      transformations.join(','),
      ...pathSegments.slice(uploadIndex + 1),
    ].join('/')}`;

    return parsedUrl.toString();
  } catch {
    return normalizedUrl;
  }
}

export function getBlurDataURL(url: string | null): string | undefined {
  if (!url) return undefined;

  if (isCloudinaryUrl(url)) {
    return getCloudinaryTransformedUrl(url, {
      width: 16,
      quality: 1,
      transformations: ['e_blur:1000'],
    });
  }

  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==';
}

export function getMediaDimensions(
  media: Pick<StrapiMedia, 'width' | 'height' | 'formats'> | null | undefined,
  preferredFormats: StrapiMediaFormatKey[] = [],
) {
  for (const formatName of preferredFormats) {
    const format = media?.formats?.[formatName];

    if (format?.width && format.height) {
      return { width: format.width, height: format.height };
    }
  }

  return {
    width: media?.width && media.width > 0 ? media.width : 1,
    height: media?.height && media.height > 0 ? media.height : 1,
  };
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function flattenAttributes(data: any): any {
  if (typeof data !== 'object' || data === null || data instanceof Date || typeof data === 'function') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item));
  }

  // Initialize an object with an index signature for the flattened structure
  const flattened: { [key: string]: any } = {};

  // Iterate over each key in the object
  for (const key in data) {
    // Skip inherited properties from the prototype chain
    if (!Object.hasOwnProperty.call(data, key)) continue;

    // If the key is 'attributes' or 'data', and its value is an object, merge their contents
    if ((key === 'attributes' || key === 'data') && typeof data[key] === 'object' && !Array.isArray(data[key])) {
      Object.assign(flattened, flattenAttributes(data[key]));
    } else {
      // For other keys, copy the value, applying flattenAttributes if it's an object
      flattened[key] = flattenAttributes(data[key]);
    }
  }

  return flattened;
}
