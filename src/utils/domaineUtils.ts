import { DomaineType } from '../types/domaine';
import { ItemType } from '../types/item';
import { PeriodeType } from '../types/periode';
import { getParentPeriode } from './periodUtils';

export function prepareDomainesList(semaineId: string | undefined, domaines: Array<DomaineType> | undefined, periodes: Array<PeriodeType>) {

    if (!semaineId) return [];
    if (!domaines) return [];

    return domaines?.map((domaine: DomaineType) => {
        let filteredItems;
        if (semaineId) {
            const currentPeriode = getParentPeriode(periodes, semaineId);
            filteredItems = domaine.items.filter((item: ItemType) => {
                const periode = getParentPeriode(periodes, item.periodeId);
                return currentPeriode === periode;
            });
        } else {
            filteredItems = domaine.items;
        }

        const sortedItems = [...filteredItems].sort((a, b) => {
            const pa = periodes.find((p: PeriodeType) => p.id === a.periodeId);
            const pb = periodes.find((p: PeriodeType) => p.id === b.periodeId);

            if (!pa || !pb) return 0;
            return new Date(pa.startDate).getTime() - new Date(pb.startDate).getTime();
        });

        return { ...domaine, items: sortedItems };
    });
}