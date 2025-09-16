/**
 * Décrit une période de calendrier pédagogique avec ses métadonnées.
 */
export interface PeriodeType {
  id: string;
  name: string;
  color: string;
  startDate: string;
  endDate: string;
  position: number;
}
