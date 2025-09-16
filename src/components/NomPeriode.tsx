import { PeriodeType } from '../types/periode';

interface NomPeriodePropsType {
  periode: PeriodeType | undefined;
  nomPeriodeParent: string | undefined;
}

/**
 * Affiche le nom de la période et de sa semaine parente avec les dates correspondantes.
 */
export default function NomPeriode({ periode, nomPeriodeParent }: NomPeriodePropsType) {
  return (
    <span className={'items-center rounded-md px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10 bg-' + periode?.color}><span>{nomPeriodeParent}</span> / <strong>{periode?.name}</strong> du <time dateTime={new Date(periode?.startDate ?? '').toISOString().split('T')[0]}>
      {new Date(periode?.startDate ?? '').toLocaleDateString()}
    </time> au <time dateTime={new Date(periode?.endDate ?? '').toISOString().split('T')[0]}>
        {new Date(periode?.endDate ?? '').toLocaleDateString()}
      </time>
    </span>

  );
}
