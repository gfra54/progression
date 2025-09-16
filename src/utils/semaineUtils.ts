import { PeriodeType } from '../types/periode';

const semaineCache = new WeakMap<PeriodeType[], Map<string, PeriodeType>>();

export function getSemaineById(periodes: PeriodeType[], semaineId?: string): PeriodeType | undefined {
  if (!semaineId) return undefined;

  let map = semaineCache.get(periodes);

  if (!map) {
    map = new Map();
    for (const p of periodes) {
      map.set(p.id, p);
    }
    semaineCache.set(periodes, map);
  }

  return map.get(semaineId);
}

