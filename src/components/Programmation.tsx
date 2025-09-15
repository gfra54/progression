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

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.shortDescription}</p>
      <p><strong>Date :</strong> {new Date(data.date).toLocaleDateString()}</p>

      <h2>Périodes</h2>
      <ul>
        {data.periodes.map((p) => (
          <li key={p.id} style={{ color: p.color }}>
            {p.name} ({new Date(p.startDate).toLocaleDateString()} → {new Date(p.endDate).toLocaleDateString()})
          </li>
        ))}
      </ul>

      <h2>Matières</h2>
      <ul>
        {data.matieres.map((m) => (
          <li key={m.id} style={{ color: m.color }}>
            {m.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
