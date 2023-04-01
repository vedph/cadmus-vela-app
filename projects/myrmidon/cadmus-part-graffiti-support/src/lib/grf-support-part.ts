import { Part } from '@myrmidon/cadmus-core';

/**
 * The GrfSupport part model.
 */
export interface GrfSupportPart extends Part {
  type: string;
  material: string;
  note?: string;
}

/**
 * The type ID used to identify the GrfSupportPart type.
 */
export const GRF_SUPPORT_PART_TYPEID = 'it.vedph.graffiti.support';

/**
 * JSON schema for the GrfSupport part.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const GRF_SUPPORT_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/graffiti/' + GRF_SUPPORT_PART_TYPEID + '.json',
  type: 'object',
  title: 'GrfSupportPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'type',
    'material',
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
    type: {
      type: 'string',
    },
    material: {
      type: 'string',
    },
    note: {
      type: 'string',
    },
  },
};
