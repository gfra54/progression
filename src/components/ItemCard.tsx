import parse from 'html-react-parser';
import { ItemType } from '../types/item';
import { PeriodeType } from '../types/periode';
import { getSemaineById } from '../utils/semaineUtils';
import { getParentPeriode } from '../utils/periodUtils';
import NomPeriode from './NomPeriode';

interface ItemCardProps {
  item: ItemType;
  periodes: PeriodeType[];
}

export default function ItemCard({ item, periodes }: ItemCardProps) {
  const semaine = getSemaineById(periodes, item.periodeId);
  const periode = getParentPeriode(periodes, semaine);

  return (
    <li className='prose max-w-none shadow-md p-5 rounded-md'>
      <NomPeriode periode={semaine} nomPeriodeParent={periode} />
      <div className='mt-4'>{parse(item.value)}</div>
    </li>
  );
}
