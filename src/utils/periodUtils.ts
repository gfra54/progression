import { PeriodeType } from '../types/periode'; // adjust path if needed
import { t } from './i18n';

/**
 * Détermine le libellé de la période parent en parcourant la liste ordonnée des semaines.
 * La numérotation augmente à chaque reprise d'une "Semaine 1" dans les données fournies.
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
      return t('periode.label') + ' ' + periodeIndex;
    }
  }

  return 'Unknown Periode';
}
