import { IndexLookupDefinitions } from '@myrmidon/cadmus-core';
import { METADATA_PART_TYPEID } from '@myrmidon/cadmus-part-general-ui';

export const INDEX_LOOKUP_DEFINITIONS: IndexLookupDefinitions = {
  // human-friendly ID for sites
  site: {
    typeId: METADATA_PART_TYPEID,
    name: 'hid',
  },
};
