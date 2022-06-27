import "./vacationContainer.css"

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from "../../redux/app-state";
import { IVacation } from "../../models/IVacation";
import { ChangeEvent, useEffect, useState } from "react";
import Vacatoin from "../Vacation/Vacation";
import { ActionType } from "../../redux/action-type";
import axios from "axios";

function VacatoinContainer() {

    const vacationsArray = useSelector((state: AppState) => state.vacationsArray);
    const searchVacations = useSelector((state: AppState) => state.searchVacations);
    const likeVacations = useSelector((state: AppState) => state.followArray);
    const vacations = [...vacationsArray]

    const dispatch = useDispatch();

    useEffect(() => {
        initVacations();
    }, [])

    async function initVacations() {
        try {
            const response = await axios.get<IVacation[]>("http://localhost:3001/vacations");
            let vacations = response.data;
            dispatch({ type: ActionType.GetAllVacations, payload: vacations });
        }

        catch {
            alert(` Connection failed, try again`)
        }
    }

    return (
        <div className="vacation-container">
            <br></br>

            <div className="vacation-cards">

                {vacations.filter(vacation => {
                    if (searchVacations == '' || searchVacations == undefined) {
                        return true;
                    }
                    return vacation.name.toLocaleLowerCase().includes(searchVacations)

                }).map(vacation => <Vacatoin
                    key={vacation.name}
                    id={vacation.id}
                    name={vacation.name}
                    price={vacation.price}
                    fromDate={vacation.fromDate}
                    toDate={vacation.toDate}
                    photoUrl={vacation.photoUrl}
                    isLike={vacation.isLike} />
                )}
            </div>
        </div>
    );
}

export default VacatoinContainer;

