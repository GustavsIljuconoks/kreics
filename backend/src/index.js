'use strict';

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function ensureUniqueSlug(base, usedSlugs) {
  const normalizedBase = base || 'film';
  let slug = normalizedBase;
  let suffix = 2;

  while (usedSlugs.has(slug)) {
    slug = `${normalizedBase}-${suffix}`;
    suffix += 1;
  }

  usedSlugs.add(slug);
  return slug;
}

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    try {
      const videoPermissions = await strapi.db.query('plugin::users-permissions.permission').findMany({
        where: {
          action: {
            $startsWith: 'api::video.video.',
          },
        },
        populate: {
          role: true,
        },
      });

      const filmPermissions = await strapi.db.query('plugin::users-permissions.permission').findMany({
        where: {
          action: {
            $startsWith: 'api::film.film.',
          },
        },
        populate: {
          role: true,
        },
      });

      const existingFilmPermissionKeys = new Set(
        filmPermissions
          .map((permission) => {
            const roleId = permission?.role?.id;
            if (!roleId || !permission?.action) return null;
            return `${roleId}:${permission.action}`;
          })
          .filter(Boolean),
      );

      for (const permission of videoPermissions) {
        const roleId = permission?.role?.id;
        const action = permission?.action;

        if (!roleId || !action) {
          continue;
        }

        const filmAction = action.replace('api::video.video.', 'api::film.film.');
        const permissionKey = `${roleId}:${filmAction}`;

        if (existingFilmPermissionKeys.has(permissionKey)) {
          continue;
        }

        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: filmAction,
            role: roleId,
          },
        });

        existingFilmPermissionKeys.add(permissionKey);
      }

      const existingFilms = await strapi.entityService.findMany('api::film.film', {
        fields: ['id', 'slug'],
        publicationState: 'preview',
        limit: 1000,
      });

      if (Array.isArray(existingFilms) && existingFilms.length > 0) {
        return;
      }

      const videoData = await strapi.entityService.findMany('api::video.video', {
        publicationState: 'preview',
        populate: {
          event: {
            populate: '*',
          },
        },
      });

      const events = videoData?.event;
      if (!Array.isArray(events) || events.length === 0) {
        return;
      }

      const usedSlugs = new Set();

      for (const event of events) {
        const name = event?.name?.trim();
        const thumbnailId = event?.thumbnail?.id;

        if (!name || !thumbnailId) {
          continue;
        }

        const baseSlug = slugify(event?.slug || name) || 'film';
        const slug = ensureUniqueSlug(baseSlug, usedSlugs);
        const mediaIds = Array.isArray(event?.media)
          ? event.media.map((item) => item?.id).filter(Boolean)
          : [];

        await strapi.entityService.create('api::film.film', {
          data: {
            name,
            slug,
            media: mediaIds,
            thumbnail: thumbnailId,
            youtube_id: event?.youtube_id || null,
            youtube_link: event?.youtube_link || null,
            description: event?.description || null,
            publishedAt: new Date().toISOString(),
          },
        });
      }
    } catch (error) {
      strapi.log.warn(`Film migration skipped: ${error.message}`);
    }
  },
};
