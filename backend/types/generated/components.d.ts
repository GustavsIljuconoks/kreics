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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'layout.header': LayoutHeader;
      'components.link': ComponentsLink;
    }
  }
}
