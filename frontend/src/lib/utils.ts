export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith('data:')) return url;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  return `${getStrapiURL()}${url}`;
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
