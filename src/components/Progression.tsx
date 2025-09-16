import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';

import api from '../api/axios';

import Breadcrumbs from './Breadcrumbs';
import SemaineSelect from './SemaineSelect';

import { getSemaineById } from '../utils/semaineUtils';
import { getParentPeriode } from '../utils/periodUtils';
import { prepareDomainesList } from '../utils/domaineUtils';
import { t } from '../utils/i18n';

import { ItemType } from '../types/item';
import { ProgressionType } from '../types/progression';
import NomPeriode from './NomPeriode';

export default function Progression() {
  const { matiereId, semaineId } = useParams<{ matiereId: string; semaineId?: string }>();

  const [data, setData] = useState<ProgressionType | null>(null);

  useEffect(() => {
    api.get('/programmations/wwdnw9553da0cdypjq2t9p3f')
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p className='text-center text-gray-500 mt-10'>{t('common.loading')}</p>;

  const crumbs = [{ label: t('common.dashboard'), href: '/' }];
  const periodes = data?.periodes ?? [];
  const matiere = data?.matieres.find(matiere => matiere.id === matiereId);

  if (matiere) {
    crumbs.push({ label: matiere?.name ?? t('common.matiere'), href: `/matiere/${matiere?.id}` });
  }
  crumbs.push({ label: t('common.progression'), href: '' });

  const domaines = prepareDomainesList(semaineId, matiere?.domaines, periodes);

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
        {domaines?.map((domaine) => (
          <div key={domaine.id} className='mb-8'>
            {domaine.items.length > 0 ? (
              <ul className='list-none space-y-2'>
                {domaine.items.map((item: ItemType) => {
                  const semaine = getSemaineById(periodes, item.periodeId);
                  const periode = getParentPeriode(periodes, semaine);
                  return (
                    <li
                      key={item.id}
                      className='prose max-w-none shadow-md p-5 rounded-md'
                    >
                      <NomPeriode periode={semaine} nomPeriodeParent={periode} />
                      <div className='mt-4'>{parse(item.value)}</div>
                    </li>
                  );
                })}
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
