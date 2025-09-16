import { DomaineType } from './domaine';

/**
 * Modélise une matière scolaire et les domaines qui la composent.
 */
export interface MatiereType {
  id: string;
  name: string;
  color: string;
  domaines: DomaineType[];
}
