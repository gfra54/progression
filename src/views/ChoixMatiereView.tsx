import { t } from '../utils/i18n';

interface Matiere {
  id: string;
  key: string; // référence vers la clé i18n
  color: string;
}

const matieres: Matiere[] = [
  { id: 'a8d4ddaf-7981-4b83-98c7-506e71c04903', key: 'histoireGeo', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' },
  { id: 'a8d4ddaf-7981-4b83-98c7-506e71c04903', key: 'francais', color: 'bg-blue-100 hover:bg-blue-200 text-blue-800' },
  { id: 'a8d4ddaf-7981-4b83-98c7-506e71c04903', key: 'maths', color: 'bg-green-100 hover:bg-green-200 text-green-800' },
  { id: 'a8d4ddaf-7981-4b83-98c7-506e71c04903', key: 'sciences', color: 'bg-purple-100 hover:bg-purple-200 text-purple-800' },
  { id: 'a8d4ddaf-7981-4b83-98c7-506e71c04903', key: 'anglais', color: 'bg-pink-100 hover:bg-pink-200 text-pink-800' },
  { id: 'a8d4ddaf-7981-4b83-98c7-506e71c04903', key: 'arts', color: 'bg-red-100 hover:bg-red-200 text-red-800' },
  { id: 'a8d4ddaf-7981-4b83-98c7-506e71c04903', key: 'musique', color: 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800' },
  { id: 'a8d4ddaf-7981-4b83-98c7-506e71c04903', key: 'eps', color: 'bg-teal-100 hover:bg-teal-200 text-teal-800' },
];

/**
 * Ecran de sélection la matière dont on souhaite consulter la progression. (Fausses données)
 */
export default function ChoixMatiere() {
  return (
    <main className='max-w-5xl mx-auto p-6'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
        {t('choixMatiere.title')}
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {matieres.map((matiere) => (
          <a
            href={`/matiere/${matiere.id}`}
            key={matiere.id}
            className={`grid place-items-center rounded-2xl shadow-md p-8 text-xl font-semibold transition-colors duration-200 ${matiere.color}`}
          >
            {t(`choixMatiere.subjects.${matiere.key}`)}
          </a>
        ))}
      </div>

      <p className='mt-5 text-sm italic'>
        {t('choixMatiere.note')}
      </p>
    </main>
  );
}
