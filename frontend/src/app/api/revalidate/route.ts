import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

const DEFAULT_TAGS = ['strapi-home', 'strapi-about', 'strapi-films', 'strapi-photos'];

type RevalidatePayload = {
  secret?: string;
  tags?: string[];
};

function resolveSecret(req: Request, payload: RevalidatePayload) {
  const headerSecret = req.headers.get('x-revalidate-secret');
  if (headerSecret) return headerSecret;

  const url = new URL(req.url);
  const querySecret = url.searchParams.get('secret');
  if (querySecret) return querySecret;

  return payload.secret;
}

export async function POST(req: Request) {
  let payload: RevalidatePayload = {};

  try {
    payload = await req.json();
  } catch {
    // Strapi webhooks can send an empty or non-JSON body.
  }

  const secret = resolveSecret(req, payload);

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const tags = Array.isArray(payload.tags) && payload.tags.length > 0 ? payload.tags : DEFAULT_TAGS;

  for (const tag of tags) {
    revalidateTag(tag);
  }

  return NextResponse.json({ ok: true, revalidated: tags });
}
