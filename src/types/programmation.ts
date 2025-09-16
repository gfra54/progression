import { PeriodeType } from './periode';
import { MatiereType } from './matiere';

export interface ProgrammationType {
  id: number;
  name: string;
  shortDescription: string;
  date: string;
  periodes: PeriodeType[];
  matieres: MatiereType[];
}
