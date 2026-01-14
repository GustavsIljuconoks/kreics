import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    url: Attribute.String;
    isExternal: Attribute.Boolean;
    text: Attribute.String;
  };
}

export interface ComponentsGallery extends Schema.Component {
  collectionName: 'components_components_galleries';
  info: {
    displayName: 'Gallery';
    icon: 'picture';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    media: Attribute.Media<'images' | 'videos', true>;
    thumbnail: Attribute.Media<'images' | 'videos'> & Attribute.Required;
    youtube_id: Attribute.String;
    youtube_link: Attribute.String;
    description: Attribute.Blocks;
  };
}

export interface LayoutHeader extends Schema.Component {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
    description: '';
  };
  attributes: {
    sectionText: Attribute.Component<'components.link', true>;
    logo: Attribute.Component<'components.link'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.link': ComponentsLink;
      'components.gallery': ComponentsGallery;
      'layout.header': LayoutHeader;
    }
  }
}
