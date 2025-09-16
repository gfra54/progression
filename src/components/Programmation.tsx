import { useEffect, useState } from 'react';
import api from '../api/axios';
import Breadcrumbs from './Breadcrumbs';
import SemaineSelect from './SemaineSelect';
import { ProgrammationType } from '../types/programmation';
import { useParams } from 'react-router-dom';

export default function Programmation() {
  const { semaineId } = useParams<{ matiereId: string; semaineId?: string }>();
  
  const [data, setData] = useState<ProgrammationType | null>(null);
    useEffect(() => {
        api.get('/programmations/wwdnw9553da0cdypjq2t9p3f')
            .then((res) => setData(res.data.data))
            .catch((err) => console.error(err));
    }, []);

    if (!data) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

    const crumbs = [];

    const matiere = data?.matieres[0];
    if (matiere) {
        crumbs.push({ label: matiere?.name ?? 'Matière', href: `/matiere/${matiere?.id}` });
    }
    // const semaine = data?.periodes[0];
    // if (semaine) {
    //     crumbs.push({ label: semaine?.name ?? 'Semaine', href: `/matiere/${matiere?.id}/semaine/${semaine.id}` });
    // }
    crumbs.push({ label: 'Progression' });


    return (
        <main className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
            <Breadcrumbs items={crumbs} />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{data.name}</h1>
            <p className="text-gray-600 mb-4">{data.shortDescription}</p>
            <p className="text-sm text-gray-500 mb-6">
                <span className="font-semibold">Date :</span> {new Date(data.date).toLocaleDateString()}
            </p>

            <section className='mb-6'>
                {<SemaineSelect periodes={data.periodes} matiereId={matiere.id} semaineId={semaineId??''}/>}

            </section>

        </main>
    );
}
