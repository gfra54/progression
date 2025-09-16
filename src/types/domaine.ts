import { ItemType } from './item';

/**
 * Décrit un domaine thématique et les items pédagogiques qu'il regroupe.
 */
export interface DomaineType {
  id: string;
  name: string;
  color: string;
  items: ItemType[];
}
