import { useEffect, useState } from 'react';
import api from '../api/axios';

interface PeriodeType {
  id: string;
  name: string;
  color: string;
  startDate: string;
  endDate: string;
  position: number;
}

interface MatiereType {
  id: string;
  name: string;
  color: string;
}

interface ProgrammationType {
  id: number;
  name: string;
  shortDescription: string;
  date: string;
  periodes: PeriodeType[];
  matieres: MatiereType[];
}

export default function Programmation() {
  const [data, setData] = useState<ProgrammationType | null>(null);

  useEffect(() => {
    api.get('/programmations/wwdnw9553da0cdypjq2t9p3f')
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{data.name}</h1>
      <p className="text-gray-600 mb-4">{data.shortDescription}</p>
      <p className="text-sm text-gray-500 mb-6">
        <span className="font-semibold">Date :</span> {new Date(data.date).toLocaleDateString()}
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Périodes</h2>
        <ul className="space-y-2">
          {data.periodes.map((p) => (
            <li
              key={p.id}
              className={'p-3 border rounded-lg flex justify-between bg-' + p.color}
            >
              <span className="font-medium">{p.name}</span>
              <span className="text-sm">
                {new Date(p.startDate).toLocaleDateString()} → {new Date(p.endDate).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Matières</h2>
        <ul className="flex flex-wrap gap-2">
          {data.matieres.map((m) => (
            <li
              key={m.id}
              className="px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: m.color }}
            >
              {m.name}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
