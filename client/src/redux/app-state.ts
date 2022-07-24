import { IVacation } from "../models/IVacation";
import { IUser } from "../models/IUser";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export class AppState {
    public stateLogIn = "guest";
    public vacationsArray: IVacation[] = [];
    public searchVacations: any = "";
    public followListToStatistics: object[] = [];
    public followArray = new Set();
    public editVacation: any;

}