import { Part } from '@myrmidon/cadmus-core';

/**
 * The GrfFigurativePart model.
 */
export interface GrfFigurativePart extends Part {
  frameType: string;
  type: string;
  features?: string[];
  note?: string;
}

/**
 * The type ID used to identify the GrfFigurativePart type.
 */
export const GRF_FIGURATIVE_PART_TYPEID = 'it.vedph.graffiti.figurative';

/**
 * JSON schema for the GrfFigurative part.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const GRF_FIGURATIVE_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/graffiti/' +
    GRF_FIGURATIVE_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'GrfFigurativePart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'frameType',
    'type',
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
    frameType: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    features: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    note: {
      type: 'string',
    },
  },
};
