import { PeriodeType } from '../types/periode'; // adjust path if needed

/**
 * Retourne le nom de la période à partir de la semaine donnée
 */
export function getParentPeriode(periodes: PeriodeType[], target: PeriodeType | string | undefined): string {
  if (!target) return '';
  let periodeIndex = 1;

  for (const p of periodes) {
    if (p.name === 'Semaine 1' && p.id !== periodes[0].id) {
      periodeIndex++;
    }

    const targetId = typeof target === 'string' ? target : target?.id;

    if (p.id === targetId) {
      return `Periode ${periodeIndex}`;
    }
  }

  return 'Unknown Periode';
}
