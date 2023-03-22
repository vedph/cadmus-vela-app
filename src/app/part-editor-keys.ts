import {
  BIBLIOGRAPHY_PART_TYPEID,
  CATEGORIES_PART_TYPEID,
  COMMENT_PART_TYPEID,
  DOC_REFERENCES_PART_TYPEID,
  EXTERNAL_IDS_PART_TYPEID,
  HISTORICAL_DATE_PART_TYPEID,
  INDEX_KEYWORDS_PART_TYPEID,
  METADATA_PART_TYPEID,
  NAMES_PART_TYPEID,
  NOTE_PART_TYPEID,
  TOKEN_TEXT_PART_TYPEID,
  COMMENT_FRAGMENT_TYPEID,
  CHRONOLOGY_FRAGMENT_TYPEID,
} from '@myrmidon/cadmus-part-general-ui';
import {
  APPARATUS_FRAGMENT_TYPEID,
  ORTHOGRAPHY_FRAGMENT_TYPEID,
} from '@myrmidon/cadmus-part-philology-ui';
import { PartEditorKeys } from '@myrmidon/cadmus-core';

import { ASSERTED_LOCATIONS_PART_TYPEID } from '@myrmidon/cadmus-part-geo-asserted-locations';
import { ASSERTED_TOPONYMS_PART_TYPEID } from '@myrmidon/cadmus-part-geo-asserted-toponyms';

import { EPI_SUPPORT_PART_TYPEID } from '@myrmidon/cadmus-part-epigraphy-support';
import { EPI_WRITING_PART_TYPEID } from '@myrmidon/cadmus-part-epigraphy-writing';
import { EPI_LIGATURES_FRAGMENT_TYPEID } from '@myrmidon/cadmus-fr-epigraphy-ligatures';

import { GRF_SUMMARY_PART_TYPEID } from 'projects/myrmidon/cadmus-part-graffiti-summary/src/public-api';
import { GRF_TECHNIQUE_PART_TYPEID } from 'projects/myrmidon/cadmus-part-graffiti-technique/src/public-api';

const GENERAL = 'general';
const PHILOLOGY = 'philology';
const GEOGRAPHY = 'geography';
const EPIGRAPHY = 'epigraphy';
const GRAFFITI = 'graffiti';

const TOKEN_TEXT_LAYER_PART_TYPEID = 'it.vedph.token-text-layer';

/**
 * The parts and fragments editor keys for this UI.
 * Each property is a part type ID, mapped to a value of type PartGroupKey,
 * having a part property with the part's editor key, and a fragments property
 * with the mappings between fragment type IDs and their editor keys.
 */
export const PART_EDITOR_KEYS: PartEditorKeys = {
  [BIBLIOGRAPHY_PART_TYPEID]: {
    part: GENERAL,
  },
  [CATEGORIES_PART_TYPEID]: {
    part: GENERAL,
  },
  [COMMENT_PART_TYPEID]: {
    part: GENERAL,
  },
  [DOC_REFERENCES_PART_TYPEID]: {
    part: GENERAL,
  },
  [EXTERNAL_IDS_PART_TYPEID]: {
    part: GENERAL,
  },
  [HISTORICAL_DATE_PART_TYPEID]: {
    part: GENERAL,
  },
  [INDEX_KEYWORDS_PART_TYPEID]: {
    part: GENERAL,
  },
  [METADATA_PART_TYPEID]: {
    part: GENERAL,
  },
  [NAMES_PART_TYPEID]: {
    part: GENERAL,
  },
  [NOTE_PART_TYPEID]: {
    part: GENERAL,
  },
  [TOKEN_TEXT_PART_TYPEID]: {
    part: GENERAL,
  },
  // geography
  [ASSERTED_LOCATIONS_PART_TYPEID]: {
    part: GEOGRAPHY,
  },
  [ASSERTED_TOPONYMS_PART_TYPEID]: {
    part: GEOGRAPHY,
  },
  // epigraphy
  [EPI_SUPPORT_PART_TYPEID]: {
    part: EPIGRAPHY,
  },
  [EPI_WRITING_PART_TYPEID]: {
    part: EPIGRAPHY,
  },
  // graffiti
  [GRF_SUMMARY_PART_TYPEID]: {
    part: GRAFFITI,
  },
  [GRF_TECHNIQUE_PART_TYPEID]: {
    part: GRAFFITI,
  },
  // layer parts
  [TOKEN_TEXT_LAYER_PART_TYPEID]: {
    part: GENERAL,
    fragments: {
      // general
      [CHRONOLOGY_FRAGMENT_TYPEID]: GENERAL,
      [COMMENT_FRAGMENT_TYPEID]: GENERAL,
      // philology
      [APPARATUS_FRAGMENT_TYPEID]: PHILOLOGY,
      [ORTHOGRAPHY_FRAGMENT_TYPEID]: PHILOLOGY,
      // epigraphy
      [EPI_LIGATURES_FRAGMENT_TYPEID]: EPIGRAPHY,
    },
  },
};
