import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { PeriodeType } from '../types/periode';
import { handleChange, goToGroup } from '../utils/semaineSelectUtils';
import { t } from '../utils/i18n';

interface SemaineSelectPropsType {
  periodes: PeriodeType[];
  matiereId: string;
  semaineId: string;
}

export default function SemaineSelect({ periodes, matiereId, semaineId }: SemaineSelectPropsType) {
  const navigate = useNavigate();

  /** Regroupons les semaines en périodes */
  const grouped = useMemo(() => {
    const result: { label: string; start: Date; end: Date; firstWeek: PeriodeType; color: string }[] = [];
    let currentGroup: PeriodeType[] = [];
    let periodeIndex = 1;

    periodes.forEach((p) => {
      if (p.name === 'Semaine 1' && currentGroup.length > 0) {
        const first = currentGroup[0];
        const last = currentGroup[currentGroup.length - 1];
        result.push({
          label: `${t('periode.label')} ${periodeIndex}`,
          start: new Date(first.startDate),
          end: new Date(last.endDate),
          firstWeek: first,
          color: first.color,
        });
        periodeIndex++;
        currentGroup = [];
      }
      currentGroup.push(p);
    });

    if (currentGroup.length > 0) {
      const first = currentGroup[0];
      const last = currentGroup[currentGroup.length - 1];
      result.push({
        label: `${t('periode.label')} ${periodeIndex}`,
        start: new Date(first.startDate),
        end: new Date(last.endDate),
        firstWeek: first,
        color: first.color,
      });
    }

    return result;
  }, [periodes]);

  const [currentGroupIndex, setCurrentGroupIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!semaineId) {
      setCurrentGroupIndex(null);
      return;
    }
    const idx = grouped.findIndex((g) => {
      const target = periodes.find((p) => p.id === semaineId);
      if (!target) return false;
      const start = new Date(target.startDate);
      const end = new Date(target.endDate);

      return g.firstWeek.id === semaineId || (g.start <= start && g.end >= end);
    });

    setCurrentGroupIndex(idx !== -1 ? idx : null);
  }, [semaineId, grouped, periodes]);

  // determine current color
  const currentColor = currentGroupIndex !== null ? grouped[currentGroupIndex]?.color : 'gray-50';

  return (
    <nav>
      <div className='sticky top-0 z-20 bg-white flex items-center gap-2 p-2 shadow-sm'>
        <button
          aria-label={t('periode.prev')}
          title={t('periode.prev')}
          type='button'
          className='px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50'
          disabled={currentGroupIndex === null && true}
          onClick={() => {
            if (currentGroupIndex === 0) {
              setCurrentGroupIndex(null);
              navigate(`/matiere/${matiereId}`);
            } else if (currentGroupIndex !== null) {
              goToGroup(currentGroupIndex - 1, grouped, matiereId, navigate, setCurrentGroupIndex);
            }
          }}
        >
          ←
        </button>
        <label className='sr-only' htmlFor='periodes'>
          {t('periode.select')}
        </label>
        <select
          title={t('periode.select')}
          id='periodes'
          value={currentGroupIndex === null ? 'all' : grouped[currentGroupIndex]?.firstWeek.id}
          className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
            focus:border-blue-500 p-2.5 w-full bg-${currentColor}`}
          onChange={(e) => handleChange(e, matiereId, grouped, navigate, setCurrentGroupIndex)}
        >
          <option value='all' className='bg-white'>
            {t('periode.all')}
          </option>
          {grouped.map((group, i) => (
            <option key={i} value={group.firstWeek.id} className={'bg-' + group.color}>
              {group.label} ({t('periode.from')} {group.start.toLocaleDateString()} {t('periode.to')}{' '}
              {group.end.toLocaleDateString()})
            </option>
          ))}
        </select>
        <button
          aria-label={t('periode.next')}
          title={t('periode.next')}
          type='button'
          className='px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50'
          disabled={currentGroupIndex !== null && currentGroupIndex >= grouped.length - 1}
          onClick={() =>
            currentGroupIndex === null
              ? goToGroup(0, grouped, matiereId, navigate, setCurrentGroupIndex) // from 'all'
              : goToGroup(currentGroupIndex + 1, grouped, matiereId, navigate, setCurrentGroupIndex)
          }
        >
          →
        </button>
      </div>
    </nav>
  );
}
