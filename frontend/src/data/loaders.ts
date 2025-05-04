import qs from 'qs';
import { flattenAttributes } from '@/lib/utils';
import { BASE_URL } from '@/lib/definitions';

async function fetchData(url: string) {
  const authToken = null;
  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getGlobalData() {
  const url = new URL(BASE_URL + '/api/global');

  url.search = qs.stringify({
    populate: ['header.logo', 'header.sectionText'],
  });

  return await fetchData(url.href);
}
