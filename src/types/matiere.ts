import { DomaineType } from './domaine';

/**
 * Une matière scolaire et les domaines qui la composent.
 */
export interface MatiereType {
  id: string;
  name: string;
  color: string;
  domaines: DomaineType[];
}
