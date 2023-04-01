import { Part } from '@myrmidon/cadmus-core';
import { ProperName } from '@myrmidon/cadmus-refs-proper-name';

/**
 * The GrfLocalization part model.
 */
export interface GrfLocalizationPart extends Part {
  place: ProperName;
  objectType: string;
  function: string;
  note?: string;
  indoor?: boolean;
}

/**
 * The type ID used to identify the GrfLocalizationPart type.
 */
export const GRF_LOCALIZATION_PART_TYPEID = 'it.vedph.graffiti.localization';

/**
 * JSON schema for the GrfLocalization part.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const GRF_LOCALIZATION_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/graffiti/' +
    GRF_LOCALIZATION_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'GrfLocalizationPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'place',
    'objectType',
    'function',
  ],
  properties: {
    timeCreated: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$',
    },
    creatorId: {
      type: 'string',
    },
    timeModified: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$',
    },
    userId: {
      type: 'string',
    },
    id: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    itemId: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    typeId: {
      type: 'string',
      pattern: '^[a-z][-0-9a-z._]*$',
    },
    roleId: {
      type: ['string', 'null'],
      pattern: '^([a-z][-0-9a-z._]*)?$',
    },
    place: {
      type: 'object',
      required: ['language', 'pieces'],
      properties: {
        language: {
          type: 'string',
        },
        tag: {
          type: 'string',
        },
        pieces: {
          type: 'array',
          items: {
            type: 'object',
            required: ['type', 'value'],
            properties: {
              type: {
                type: 'string',
              },
              value: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    objectType: {
      type: 'string',
    },
    function: {
      type: 'string',
    },
    note: {
      type: 'string',
    },
    indoor: {
      type: 'boolean',
    },
  },
};
