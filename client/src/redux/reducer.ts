import { AppState } from "./app-state";
import { Action } from "./action";
import { ActionType } from "./action-type";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { IVacation } from "../models/IVacation";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let initialAppState = new AppState();

// This function is NOT called direcrtly by you
export function reduce(oldAppState: AppState = initialAppState, action: Action): AppState {


    const newAppState = { ...oldAppState };
    let vacations = newAppState.vacationsArray


    switch (action.type) {

        case ActionType.DeleteVacation:
            vacations.map((vacation: IVacation) => {
                if (oldAppState.followArray.has(vacation.name)) {
                    vacation.isLike = 1
                }
                else {
                    vacation.isLike = 0
                }
            })
            newAppState.vacationsArray = vacations;
            break
        case ActionType.GetAllVacations:
            vacations = action.payload
            vacations.sort((vacationA, vacationB) => {
                if (newAppState.followArray.has(vacationA.name)) {
                    return vacationA.isLike = -1
                }
                if (newAppState.followArray.has(vacationB.name)) {
                    return vacationA.isLike = 1
                }
                return 0
            })
            newAppState.vacationsArray = vacations;
            break;
        case ActionType.search:
            newAppState.searchVacations = action.payload.toLocaleLowerCase();
            break;
        case ActionType.followListToStatistics:
            newAppState.followListToStatistics = action.payload;
            break;
        case ActionType.followVacation:

            let vacationName = action.payload
            if (newAppState.followArray.has(vacationName)) {
                newAppState.followArray.delete(vacationName)
            }
            else {
                newAppState.followArray.add(vacationName)
            }
            vacations = [...newAppState.vacationsArray]
            vacations.sort((vacationA, vacationB) => {
                if (newAppState.followArray.has(vacationA.name)) {
                    return vacationA.isLike = -1
                }
                if (newAppState.followArray.has(vacationB.name)) {
                    return vacationA.isLike = 1
                }
                return 0
            })
            newAppState.vacationsArray = vacations;

            let newfollowArray = newAppState.followArray
            let likeToStorage = JSON.stringify(newfollowArray)
            localStorage.setItem('likeVacations', likeToStorage);

            break

        case ActionType.AddVacation:
            newAppState.vacationsArray = action.payload;
            break

        case ActionType.editVacation:
            newAppState.editVacation = action.payload;
            break

        case ActionType.logOut:
            localStorage.removeItem('token')
            localStorage.removeItem('likeVacations')
            // const guestSocket = io('http://localhost:3002/', {}).connect();
            newAppState.followArray.clear()
            axios.defaults.headers.common['Authorization'] = ``;

            newAppState.stateLogIn = 'guest';
            break

        case ActionType.LogIn:
            let userData = action.payload
            let likeFromStorage = userData.likeVacations
            let token = userData.token

            let decodedHeader: any = jwt_decode(token)
            axios.defaults.headers.common['Authorization'] = token;
            newAppState.stateLogIn = decodedHeader.userType;

            if (likeFromStorage) {
                likeFromStorage.map((vacation: any) => {
                    if (vacation.name != 0) {
                        oldAppState.followArray.add(vacation.name)
                    }
                })
                likeFromStorage = JSON.stringify(likeFromStorage)
                localStorage.setItem('likeVacations', likeFromStorage);
            }
            break

    }
    return newAppState;
}

