import { PeriodeType } from '../types/periode'; // adjust path if needed

/**
 * Retourne le nom de la période à partir de la semaine donnée
 */
export function getParentPeriode(periodes: PeriodeType[], target: PeriodeType): string {
  let periodeIndex = 1;

  for (const p of periodes) {
    if (p.name === 'Semaine 1' && p.id !== periodes[0].id) {
      periodeIndex++;
    }

    if (p.id === target.id) {
      return `Periode ${periodeIndex}`;
    }
  }

  return 'Unknown Periode';
}
