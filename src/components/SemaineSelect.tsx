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
        setCurrentIndex(idx !== -1 ? idx : null);
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


    // Group into periodes (Periode 1, Periode 2...)
    const grouped: { label: string; start: Date; end: Date; firstWeek: PeriodeType, color: string }[] = [];
    let currentGroup: PeriodeType[] = [];
    let periodeIndex = 1;

    periodes.forEach((p) => {
        if (p.name === 'Semaine 1' && currentGroup.length > 0) {
            const first = currentGroup[0];
            const last = currentGroup[currentGroup.length - 1];
            grouped.push({
                label: `Periode ${periodeIndex}`,
                start: new Date(first.startDate),
                end: new Date(last.endDate),
                firstWeek: first,
                color: first.color
            });
            periodeIndex++;
            currentGroup = [];
        }
        currentGroup.push(p);
    });
    if (currentGroup.length > 0) {
        const first = currentGroup[0];
        const last = currentGroup[currentGroup.length - 1];
        grouped.push({
            label: `Periode ${periodeIndex}`,
            start: new Date(first.startDate),
            end: new Date(last.endDate),
            firstWeek: first,
            color: first.color
        });
    }

    return (
        <div className="flex items-center gap-2">


            {/* Choisir une période (ou toutes) */}
            <select
                id="periodes"
                value={currentIndex === null ? 'all' : periodes[currentIndex]?.id}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleChange}
            >
                <option value="all">Toutes les périodes</option>

                {grouped.map((group, i) => (
                    <option key={i} value={group.firstWeek.id} className={'bg-' + group.color}>
                        {group.label} (du {group.start.toLocaleDateString()} au {group.end.toLocaleDateString()})
                    </option>
                ))}
            </select>

        </div>
    );
}
