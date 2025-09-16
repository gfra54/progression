import { ItemType } from './item';

export interface DomaineType {
  id: string;
  name: string;
  color: string;
  items: ItemType[];
}
