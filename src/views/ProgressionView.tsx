import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../api/axios';

import Breadcrumbs from '../components/Breadcrumbs';
import SemaineSelect from '../components/SemaineSelect';
import ItemCard from '../components/ItemCard';

import { prepareDomainesList } from '../utils/domaineUtils';
import { t } from '../utils/i18n';

import { ItemType } from '../types/item';
import { ProgressionType } from '../types/progression';
import { buildCrumbs } from '../utils/crumbUtils';

/**
 * Affiche une progression pédagogique et les domaines et items associés.
 */
export default function Progression() {
    const { matiereId, semaineId } = useParams<{ matiereId: string; semaineId?: string }>();

    const [data, setData] = useState<ProgressionType | null>(null);

    useEffect(() => {
        api.get('/programmations/wwdnw9553da0cdypjq2t9p3f')
            .then((res) => setData(res.data.data))
            .catch((err) => console.error(err));
    }, []);

    if (!data) return <p className='text-center text-gray-500 mt-10'>{t('common.loading')}</p>;

    const periodes = data?.periodes ?? [];
    const matiere = data?.matieres.find((m) => m.id === matiereId);

    const crumbs = buildCrumbs(data, matiereId, semaineId);

    const filteredDomaines = prepareDomainesList(semaineId, matiere?.domaines, periodes);

    return (
        <main className='max-w-4xl mx-auto p-6'>
            <Breadcrumbs items={crumbs} />
            <h1 className='text-2xl font-bold text-gray-800 mb-2'>{data.name}</h1>
            <p className='text-gray-600 mb-4'>{data.shortDescription}</p>
            <p className='text-sm text-gray-500 mb-6'>
                <span className='font-semibold'>{t('common.date')} :</span>{' '}
                <time dateTime={new Date(data.date).toISOString().split('T')[0]}>
                    {new Date(data.date).toLocaleDateString()}
                </time>
            </p>

            <SemaineSelect periodes={data.periodes} matiereId={matiere?.id ?? ''} semaineId={semaineId ?? ''} />

            <section>
                {filteredDomaines?.map((domaine) => (
                    <div key={domaine.id} className='mb-8'>
                        {domaine.items.length > 0 ? (
                            <ul className='list-none space-y-2'>
                                {domaine.items.map((item: ItemType) => (
                                    <ItemCard key={item.id} item={item} periodes={periodes} />
                                ))}
                            </ul>
                        ) : (
                            <p className='text-gray-400 italic'>{t('common.noContent')}</p>
                        )}
                    </div>
                ))}
            </section>
        </main>
    );
}
