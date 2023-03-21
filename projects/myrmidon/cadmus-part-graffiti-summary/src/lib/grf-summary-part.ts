import { Part } from '@myrmidon/cadmus-core';
import { PhysicalSize } from '@myrmidon/cadmus-mat-physical-size';
import { HistoricalDate } from '@myrmidon/cadmus-refs-historical-date';
import { ProperName } from '@myrmidon/cadmus-refs-proper-name';

export interface GrfSupportState {
  type: string;
  date: Date;
  reporter: string;
  note?: string;
}

/**
 * The GrfSummary part model.
 */
export interface GrfSummaryPart extends Part {
  place: ProperName;
  supportType: string;
  objectType?: string;
  originalFn?: string;
  currentFn: string;
  indoor?: boolean;
  material: string;
  description: string;
  size: PhysicalSize;
  date: HistoricalDate;
  features?: string[];
  figDescription?: string;
  frameDescription?: string;
  lastSeen: Date;
  states?: GrfSupportState[];
}

/**
 * The type ID used to identify the GrfSummaryPart type.
 */
export const GRF_SUMMARY_PART_TYPEID = 'it.vedph.graffiti.summary';

/**
 * JSON schema for the GrfSummary part.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const GRF_SUMMARY_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/graffiti/' + GRF_SUMMARY_PART_TYPEID + '.json',
  type: 'object',
  title: 'GrfSummaryPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'place',
    'supportType',
    'currentFn',
    'material',
    'description',
    'size',
    'date',
    'lastSeen',
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
    supportType: {
      type: 'string',
    },
    objectType: {
      type: 'string',
    },
    originalFn: {
      type: 'string',
    },
    currentFn: {
      type: 'string',
    },
    indoor: {
      type: 'boolean',
    },
    material: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    size: {
      type: 'object',
      required: [],
      properties: {
        tag: {
          type: 'string',
        },
        w: {
          type: 'object',
          required: ['value', 'unit'],
          properties: {
            tag: {
              type: 'string',
            },
            value: {
              type: 'integer',
            },
            unit: {
              type: 'string',
            },
          },
        },
        h: {
          type: 'object',
          required: ['value', 'unit'],
          properties: {
            tag: {
              type: 'string',
            },
            value: {
              type: 'integer',
            },
            unit: {
              type: 'string',
            },
          },
        },
        d: {
          type: 'object',
          required: ['value', 'unit'],
          properties: {
            tag: {
              type: 'string',
            },
            value: {
              type: 'integer',
            },
            unit: {
              type: 'string',
            },
          },
        },
        note: {
          type: 'string',
        },
      },
    },
    date: {
      type: 'object',
      required: ['a'],
      properties: {
        a: {
          type: 'object',
          required: ['value'],
          properties: {
            value: {
              type: 'integer',
            },
            isCentury: {
              type: 'boolean',
            },
            isSpan: {
              type: 'boolean',
            },
            isApproximate: {
              type: 'boolean',
            },
            isDubious: {
              type: 'boolean',
            },
            day: {
              type: 'integer',
            },
            month: {
              type: 'integer',
            },
            hint: {
              type: ['string', 'null'],
            },
          },
        },
        b: {
          type: 'object',
          required: ['value'],
          properties: {
            value: {
              type: 'integer',
            },
            isCentury: {
              type: 'boolean',
            },
            isSpan: {
              type: 'boolean',
            },
            isApproximate: {
              type: 'boolean',
            },
            isDubious: {
              type: 'boolean',
            },
            day: {
              type: 'integer',
            },
            month: {
              type: 'integer',
            },
            hint: {
              type: ['string', 'null'],
            },
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
    figDescription: {
      type: 'string',
    },
    frameDescription: {
      type: 'string',
    },
    lastSeen: {
      type: 'string',
      format: 'date',
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
