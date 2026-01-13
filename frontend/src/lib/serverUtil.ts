import qs from 'qs';
import { BASE_URL, API_TOKEN } from './definitions';
import { flattenAttributes } from './utils';

export async function getStrapiEventData(path: string, eventName: string, tag?: string) {
  const query = qs.stringify(
    {
      populate: {
        event: {
          populate: '*',
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(`${BASE_URL}${path}?${query}`, {
    ...(tag ? { next: { tags: [tag] } } : {}),
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!res.ok) {
    console.error(`Error: ${res.status} - ${res.statusText}`);
    return null;
  }

  const data = await res.json();
  const flattenedData = flattenAttributes(data);

  const filteredEvents = flattenedData.event.filter(
    (event: { name: string }) => event.name === decodeURIComponent(eventName),
  );

  return filteredEvents;
}

export async function getStrapiData(path: string, tag?: string) {
  const res = await fetch(BASE_URL + path + '?populate=*', {
    ...(tag ? { next: { tags: [tag] } } : {}),
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!res.ok) {
    console.error(`Error: ${res.status} - ${res.statusText}`);
    return null;
  }

  const data = await res.json();
  const flattenedData = flattenAttributes(data);
  return flattenedData || {};
}
