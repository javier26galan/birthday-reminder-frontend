import { BdayItem } from "./bday-item";

export interface User {
  name: string;
  bdayList: BdayItem[];
  id:string;
}
