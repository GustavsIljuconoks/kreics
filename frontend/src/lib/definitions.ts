export const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? '';
export const API_TOKEN = process.env.STRAPI_API_TOKEN;

export interface EVENT {
  name: string;
  description: string;
  thumbnail: {
    url: string;
    alternativeText: string;
    mime: string;
  };
  tags: string[];
  media: any;
}

export interface IFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
