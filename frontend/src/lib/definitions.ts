export const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? '';

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
