import { t } from './i18n';
import { ProgressionType } from '../types/progression';

export interface CrumbType {
  label: string;
  href?: string;
}

export function buildCrumbs(data: ProgressionType, matiereId?: string, semaineId?: string): CrumbType[] {
  const crumbs: CrumbType[] = [{ label: t('common.dashboard'), href: '/' }];

  const matiere = data?.matieres.find((m) => m.id === matiereId);
  const domaine = matiere?.domaines[0];

  if (matiere) {
    crumbs.push({ label: matiere?.name ?? t('common.matiere'), href: `/matiere/${matiere?.id}` });
  }

  if (domaine) {
    crumbs.push({ label: domaine.name ?? t('common.domaine'), href: `/matiere/${matiere?.id}` });
  }

  crumbs.push({ label: t('common.progression'), href: '' });

  return crumbs;
}
