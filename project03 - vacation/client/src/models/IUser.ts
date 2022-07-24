import { ActionType } from "../redux/action-type";

export interface IUser {
  userName: string;
  userMail: string;
  userPassword: any;
  BirthDate: string;
  type?: string;
}