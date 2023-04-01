import { Part } from '@myrmidon/cadmus-core';

export interface GrfState {
  type: string;
  date: string;
  reporter: string;
  note?: string;
}

/**
 * The GrfStates part model.
 */
export interface GrfStatesPart extends Part {
  states: GrfState[];
}

/**
 * The type ID used to identify the GrfStatesPart type.
 */
export const GRF_STATES_PART_TYPEID = 'it.vedph.graffiti.states';

/**
 * JSON schema for the GrfStates part.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const GRF_STATES_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'www.vedph.it/cadmus/parts/graffiti/' + GRF_STATES_PART_TYPEID + '.json',
  type: 'object',
  title: 'GrfStatesPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'states',
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
    states: {
      type: 'array',
      items: {
        type: 'object',
        required: ['type', 'date', 'reporter'],
        properties: {
          type: {
            type: 'string',
          },
          date: {
            type: 'string',
            format: 'date',
          },
          reporter: {
            type: 'string',
          },
          note: {
            type: 'string',
          },
        },
      },
    },
  },
};
