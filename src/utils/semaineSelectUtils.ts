import { NavigateFunction } from 'react-router-dom';
import { PeriodeType } from '../types/periode';

/**
 * Gestion de la navigation lorsque l'utilisateur sélectionne une période depuis le menu déroulant.
 */
export function handleChange(
  e: React.ChangeEvent<HTMLSelectElement>,
  matiereId: string,
  grouped: { firstWeek: PeriodeType }[],
  navigate: NavigateFunction,
  setCurrentGroupIndex: (i: number | null) => void
) {
  const value = e.target.value;

  if (value === 'all') {
    setCurrentGroupIndex(null);
    navigate(`/matiere/${matiereId}`);
    return;
  }

  const newIndex = grouped.findIndex((g) => g.firstWeek.id === value);
  if (newIndex !== -1) {
    setCurrentGroupIndex(newIndex);
    navigate(`/matiere/${matiereId}/semaine/${grouped[newIndex].firstWeek.id}`);
  }
}

/**
 * Déplace la navigation vers le groupe de semaines demandé et met à jour l'état courant.
 */
export function goToGroup(
  index: number,
  grouped: { firstWeek: PeriodeType }[],
  matiereId: string,
  navigate: NavigateFunction,
  setCurrentGroupIndex: (i: number) => void
) {
  if (index >= 0 && index < grouped.length) {
    setCurrentGroupIndex(index);
    navigate(`/matiere/${matiereId}/semaine/${grouped[index].firstWeek.id}`);
  }
}
