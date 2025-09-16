import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';

import api from '../api/axios';

import Breadcrumbs from './Breadcrumbs';
import SemaineSelect from './SemaineSelect';

import { getSemaineById } from '../utils/semaineUtils';
import { getParentPeriode } from '../utils/periodUtils';
import { prepareDomainesList } from '../utils/domaineUtils';

import { ItemType } from '../types/item';
import { ProgressionType } from '../types/progression';

export default function Progression() {
    const { matiereId, semaineId } = useParams<{ matiereId: string; semaineId?: string }>();

    const [data, setData] = useState<ProgressionType | null>(null);

    useEffect(() => {
        api.get('/programmations/wwdnw9553da0cdypjq2t9p3f')
            .then((res) => setData(res.data.data))
            .catch((err) => console.error(err));
    }, []);

    if (!data) return <p className="text-center text-gray-500 mt-10">Chargement en cours...</p>;

    const crumbs = [{ label: 'Dashboard', href: '/' }];
    const periodes = data?.periodes ?? [];
    const matiere = data?.matieres.find(matiere => matiere.id === matiereId);

    if (matiere) {
        crumbs.push({ label: matiere?.name ?? 'Matière', href: `/matiere/${matiere?.id}` });
    }
    crumbs.push({ label: 'Progression', href: '' });

    const domaines = prepareDomainesList(semaineId, matiere?.domaines, periodes);


    return (
        <main className="max-w-4xl mx-auto p-6">
            <Breadcrumbs items={crumbs} />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{data.name}</h1>
            <p className="text-gray-600 mb-4">{data.shortDescription}</p>
            <p className="text-sm text-gray-500 mb-6">
                <span className="font-semibold">Date :</span> {new Date(data.date).toLocaleDateString()}
            </p>

            <SemaineSelect periodes={data.periodes} matiereId={matiere?.id ?? ''} semaineId={semaineId ?? ''}/>

            <section>
                {domaines?.map((domaine) => (
                    <div key={domaine.id} className="mb-8">
                        {domaine.items.length > 0 ? (
                            <ul className="list-none space-y-2">
                                {domaine.items.map((item: ItemType) => {
                                    const semaine = getSemaineById(periodes, item.periodeId);
                                    const periode = getParentPeriode(periodes, semaine);
                                    return (
                                        <li
                                            key={item.id}
                                            className={'prose max-w-none shadow-md p-5 rounded-md'}>
                                            <span className={'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10 bg-' + semaine?.color}>{periode} - {semaine?.name}</span>
                                            <div className="mt-4">{parse(item.value)}</div>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p className="text-gray-400 italic">Aucun contenu pour cette semaine.</p>
                        )}
                    </div>
                ))}
            </section>
        </main>
    );
}
