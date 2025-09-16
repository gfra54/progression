/**
 * Décrit une période de calendrier avec ses dates de début et fin
 */
export interface PeriodeType {
  id: string;
  name: string;
  color: string;
  startDate: string;
  endDate: string;
  position: number;
}
