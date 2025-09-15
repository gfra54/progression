import { useEffect, useState } from 'react';
import api from '../api/axios';

interface Programmation {
  id: number;
  attributes: {
    title: string;
    description: string;
  };
}

export default function Programmation() {
  const [data, setData] = useState<Programmation | null>(null);

  useEffect(() => {
    api.get('/programmations/wwdnw9553da0cdypjq2t9p3f')
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Programmation</h1>
      {data ? (
        <>
          <h2>{data.attributes.title}</h2>
          <p>{data.attributes.description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
