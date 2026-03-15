import type { BlocksContent } from '@strapi/blocks-react-renderer';

export const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? '';
export const API_TOKEN = process.env.STRAPI_API_TOKEN;

export type StrapiMediaFormatKey = 'thumbnail' | 'small' | 'medium' | 'large';

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
  mime?: string;
}

export interface StrapiMedia {
  id?: number;
  documentId?: string;
  url: string;
  alternativeText?: string | null;
  mime?: string;
  name?: string;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: Partial<Record<StrapiMediaFormatKey, StrapiMediaFormat>>;
}

export interface StrapiMediaCollection {
  data?: StrapiMedia[];
}

export interface EVENT {
  name: string;
  slug?: string;
  description?: string | BlocksContent;
  thumbnail?: StrapiMedia;
  video?: StrapiMedia;
  media: StrapiMediaCollection;
  youtube_id?: string | null;
  youtube_link?: string | null;
}

export interface IFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
