import qs from "qs";
import { flattenAttributes } from "@/lib/utils";

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

async function fetchData(url: string) {
  const authToken = null;
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getGlobalData() {
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    populate: [
      "header.logo",
      "header.sectionText",
    ],
  });

  return await fetchData(url.href);
}