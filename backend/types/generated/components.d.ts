import type { Schema, Attribute } from '@strapi/strapi';

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
    description: Attribute.Text;
    media: Attribute.Media<'images' | 'videos', true> & Attribute.Required;
    thumbnail: Attribute.Media<'images'> & Attribute.Required;
    tag: Attribute.Relation<
      'components.gallery',
      'oneToOne',
      'api::media-tag.media-tag'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'layout.header': LayoutHeader;
      'components.link': ComponentsLink;
      'components.gallery': ComponentsGallery;
    }
  }
}
