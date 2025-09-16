import { DomaineType } from './domaine';

export interface MatiereType {
  id: string;
  name: string;
  color: string;
  domaines: DomaineType[];
}
