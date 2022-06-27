import { ActionType } from "../redux/action-type";

export interface IVacation {
  price: number;
  id: number
  name: string;
  fromDate: string;
  toDate: string;
  photoUrl: string;
  isLike?:number;
}