# Repository Guide

## Overview

This repository contains a portfolio site split into two independent apps:

- `frontend`: Next.js 14 App Router site that renders the public website.
- `backend`: Strapi v4 CMS that stores page content, film entries, photos, and global navigation data.

There is no root workspace package file. Treat `frontend` and `backend` as separate Node projects.

## High-Level Structure

- `frontend/src/app`: App Router pages and route handlers.
- `frontend/src/app/components`: reusable UI components used by pages.
- `frontend/src/data`: lightweight data loaders for shared content.
- `frontend/src/lib`: Strapi helpers, type definitions, and email helper code.
- `frontend/src/ui`: site chrome (`nav-bar`, `footer`).
- `backend/src/api`: Strapi content-types, controllers, routes, and services.
- `backend/src/components`: Strapi component schemas used by single types.
- `backend/config`: database, upload provider, middleware, server, and admin config.
- `backend/public/uploads`: local uploaded media committed into the repo.
- `backend/.tmp/data.db`: local SQLite database for development.
- `backend/types/generated`: generated Strapi typings.

## Stack

- Frontend: Next.js `14.2.4`, React `18`, TypeScript, Tailwind CSS.
- Backend: Strapi `4.25.5`.
- Storage:
  - Local dev default is SQLite via `backend/.tmp/data.db`.
  - Backend is also configured for Postgres and MySQL through env vars.
- Media:
  - Strapi upload provider is Cloudinary.
  - Next image config also permits local Strapi uploads on `localhost:1337` / `127.0.0.1:1337`.

## Local Development

Run each app separately.

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

Backend:

```powershell
cd backend
npm install
npm run develop
```

Ports:

- Frontend: `3000`
- Backend: `1337`

## Frontend Architecture

Routes:

- `/` loads Strapi single type `home`.
- `/about` loads Strapi single type `about-page`.
- `/films` loads Strapi collection type `film`.
- `/films/[name]` fetches one film by `slug`.
- `/stills` loads Strapi single type `photo`.
- `/contact` loads Strapi single type `contact-page`.
- `/api/revalidate` revalidates Next cache tags when given a valid secret.

Rendering split:

- `layout.tsx` is a server component and loads global header data for all pages.
- `/`, `/about`, `/films`, and `/stills` are server-rendered and fetch Strapi directly.
- `/films/[name]` and `/contact` are client components that fetch Strapi in `useEffect`.

Shared frontend patterns:

- Strapi REST responses are normalized with `flattenAttributes`.
- Rich text blocks are rendered with `@strapi/blocks-react-renderer`.
- `StrapiImage` centralizes media URL normalization and blur placeholders.
- Film links use the persisted Strapi `slug`, with `slugify(name)` as fallback.
- Cache tags currently used:
  - `strapi-home`
  - `strapi-about`
  - `strapi-films`
  - `strapi-photos`

## Backend Architecture

Most Strapi APIs use generated core controllers/routes/services with schema-driven behavior.

Content types in active use:

- `home` single type
- `about-page` single type
- `contact-page` single type
- `global` single type
- `photo` single type
- `film` collection type

Legacy / transitional content:

- `video` still exists as a single type with repeatable `components.gallery` entries.
- `backend/src/index.js` bootstraps a migration path:
  - copies public role permissions from `video` endpoints to `film` endpoints
  - seeds the `film` collection from `video.event` if no films exist yet

Implication:

- Do not remove `video` or the bootstrap logic casually. It is part of the current migration path from the older schema to `film`.

## Current Content Model

`global`

- `header`
  - `logo` component (`url`, `isExternal`, `text`)
  - `sectionText[]` component list (`url`, `isExternal`, `text`)

`home`

- `heading`
- `description`
- `heroImage`
- `linkText` (Strapi blocks)

`about-page`

- `description` (Strapi blocks)
- `thumbnail`

`contact-page`

- `hero`

`photo`

- `media[]`

`film`

- `name`
- `slug` (`uid` from `name`)
- `media[]`
- `thumbnail`
- `youtube_id`
- `youtube_link`
- `description` (Strapi blocks)

Legacy component `components.gallery` roughly mirrors the film shape and is used under `video.event`.

## Editing Guidance For Future Agents

- Check `git status` before editing. The worktree may already contain user changes.
- Prefer editing schema-aware code carefully: a frontend change may require matching Strapi content changes.
- If changing cache behavior, keep `/api/revalidate` tags aligned with page fetch tags.
- If changing film routing, preserve slug behavior and review the bootstrap migration in `backend/src/index.js`.
- If changing media handling, review all of:
  - Next image remote patterns
  - `getStrapiMedia`
  - Strapi upload provider config
- Do not trust the app READMEs for project behavior; trust the code and Strapi schemas.
