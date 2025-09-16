import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PeriodeType } from '../types/periode';

interface SemaineSelectPropsType {
  periodes: PeriodeType[];
  matiereId: string;
  semaineId: string; 
}

export default function SemaineSelect({ periodes, matiereId, semaineId }: SemaineSelectPropsType) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Initialize currentIndex based on semaineId
  useEffect(() => {
    if (!semaineId) {
      setCurrentIndex(null); // Toutes les semaines
      return;
    }

    const idx = periodes.findIndex((p) => p.id === semaineId);
    if (idx !== -1) {
      setCurrentIndex(idx);
    } else {
      setCurrentIndex(null); // fallback
    }
  }, [semaineId, periodes]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === 'all') {
      setCurrentIndex(null);
      navigate(`/matiere/${matiereId}`);
      return;
    }

    const newIndex = periodes.findIndex((p) => p.id === value);
    if (newIndex !== -1) {
      setCurrentIndex(newIndex);
      navigate(`/matiere/${matiereId}/semaine/${periodes[newIndex].id}`);
    }
  };

  const goToIndex = (index: number) => {
    if (index >= 0 && index < periodes.length) {
      setCurrentIndex(index);
      navigate(`/matiere/${matiereId}/semaine/${periodes[index].id}`);
    }
  };

  // Group into periodes (Periode 1, Periode 2...)
  const grouped: { label: string; weeks: PeriodeType[] }[] = [];
  let currentGroup: PeriodeType[] = [];
  let periodeIndex = 1;

  periodes.forEach((p) => {
    if (p.name === 'Semaine 1') {
      if (currentGroup.length > 0) {
        grouped.push({ label: `Periode ${periodeIndex}`, weeks: currentGroup });
        periodeIndex++;
        currentGroup = [];
      }
    }
    currentGroup.push(p);
  });
  if (currentGroup.length > 0) {
    grouped.push({ label: `Periode ${periodeIndex}`, weeks: currentGroup });
  }

  return (
    <div className='flex items-center gap-2'>
      {/* Reculer d'une semaine */}
      <button
        type='button'
        className='px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50'
        disabled={currentIndex === null || currentIndex <= 0}
        onClick={() => currentIndex !== null && goToIndex(currentIndex - 1)}
      >
        ←
      </button>

      {/* Choisir une semaine (ou toutes) */}
      <select
        id='periodes'
        value={currentIndex === null ? 'all' : periodes[currentIndex]?.id}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        onChange={handleChange}
      >
        <option value='all'>Toutes les semaines</option>

        {grouped.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.weeks.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({new Date(p.startDate).toLocaleDateString()} →{' '}
                {new Date(p.endDate).toLocaleDateString()})
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {/* Avancer d'une semaine */}
      <button
        type='button'
        className='px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50'
        disabled={currentIndex === null || currentIndex >= periodes.length - 1}
        onClick={() => currentIndex !== null && goToIndex(currentIndex + 1)}
      >
        →
      </button>
    </div>
  );
}
