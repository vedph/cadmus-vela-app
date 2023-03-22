import { Part } from '@myrmidon/cadmus-core';
import { DecoratedCount } from '@myrmidon/cadmus-refs-decorated-counts';

/**
 * The GrfWriting part model.
 */
export interface GrfWritingPart extends Part {
  system: string;
  languages: string[];
  type: string;
  counts?: DecoratedCount[];
  features?: string[];
  hasPoetry?: boolean;
  metres?: string[];
}

/**
 * The type ID used to identify the GrfWritingPart type.
 */
export const GRF_WRITING_PART_TYPEID = 'it.vedph.graffiti.writing';

/**
 * JSON schema for the GrfWriting part.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const GRF_WRITING_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/graffiti/' + GRF_WRITING_PART_TYPEID + '.json',
  type: 'object',
  title: 'GrfWritingPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'system',
    'languages',
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
    system: {
      type: 'string',
    },
    languages: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    type: {
      type: 'string',
    },
    counts: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'value'],
        properties: {
          id: {
            type: 'string',
          },
          value: {
            type: 'string',
          },
          tag: {
            type: 'string',
          },
          note: {
            type: 'string',
          },
        },
      },
    },
    features: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    hasPoetry: {
      type: 'boolean',
    },
    metres: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};
