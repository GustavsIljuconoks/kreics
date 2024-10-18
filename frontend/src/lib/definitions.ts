export const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export interface EVENT {
  name: string;
  description: string;
  thumbnail: {
    url: string;
    alternativeText: string;
  };
  tags: string[];
  media: any;
}
