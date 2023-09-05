import { BdayItem } from './bday-item';

export interface User {
  profilename: string;
  email: string;
  bdaylist: BdayItem[];
  id: string;
  image:string;
}
