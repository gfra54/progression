import { PeriodeType } from './periode';
import { MatiereType } from './matiere';

/**
 * Structure principale décrivant une progression complète (avec périodes, matières, etc.)
 */
export interface ProgressionType {
  id: number;
  name: string;
  shortDescription: string;
  date: string;
  periodes: PeriodeType[];
  matieres: MatiereType[];
}
