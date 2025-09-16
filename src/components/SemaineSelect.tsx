import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { PeriodeType } from '../types/periode';
import { goToGroup } from '../utils/semaineSelectUtils';
import { t } from '../utils/i18n';

interface SemaineSelectPropsType {
    periodes: PeriodeType[];
    matiereId: string;
    semaineId: string;
}

/**
 * Navigation par périodes pour naviguer dans la progression 
 */
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

    return (
        <nav className='sticky top-0 z-20 bg-white flex items-center justify-between gap-2 p-2 shadow-sm'>
            {/* ← previous (hidden on mobile) */}
            <button
                aria-label={t('periode.prev')}
                title={t('periode.prev')}
                type='button'
                className='hidden sm:inline-flex px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50'
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

            {/* links center */}
            <div className='flex flex-wrap items-center justify-start sm:justify-center gap-2 flex-1'>
                {/* bouton "Toutes les périodes" */}
                <Link
                    to={`/matiere/${matiereId}`}
                    className={`px-3 py-2 rounded-lg border text-xs sm:text-sm transition-colors flex items-center gap-2 bg-gray-100
      ${currentGroupIndex === null ? 'border-blue-600 font-bold' : 'border-gray-300 font-medium'}
    `}
                >
                    📅 {t('periode.all')}
                </Link>

                {/* boutons périodes */}
                {grouped.map((group, i) => {
                    return (
                        <Link
                            key={i}
                            to={`/matiere/${matiereId}/semaine/${group.firstWeek.id}`}
                            className={`px-3 py-2 rounded-lg border text-xs sm:text-sm transition-colors flex items-center gap-2 bg-${group.color} ${currentGroupIndex === i ? 'border-blue-600 font-bold' : 'border-gray-300 font-medium'}`}
                        >
                            {group.label}
                        </Link>
                    );
                })}
            </div>


            {/* → next (hidden on mobile) */}
            <button
                aria-label={t('periode.next')}
                title={t('periode.next')}
                type='button'
                className='hidden sm:inline-flex px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50'
                disabled={currentGroupIndex !== null && currentGroupIndex >= grouped.length - 1}
                onClick={() =>
                    currentGroupIndex === null
                        ? goToGroup(0, grouped, matiereId, navigate, setCurrentGroupIndex) // from 'all'
                        : goToGroup(currentGroupIndex + 1, grouped, matiereId, navigate, setCurrentGroupIndex)
                }
            >
                →
            </button>
        </nav>

    );
}
