import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IVacation } from '../../models/IVacation';
import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import { Chart } from "react-google-charts";
import "./Statistics.css"
import { useNavigate } from 'react-router-dom';


export default function Statistics() {

    const followList = useSelector((state: AppState) => state.followListToStatistics);
    const userType: string = useSelector((state: AppState) => state.stateLogIn );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        AttractFollowersToStatistics();
        validStateUserToStatistics()
    }, [])

    function validStateUserToStatistics() {
        if(userType != 'admin'){
            alert("You are not admin")
            navigate('/');
            return
        }
    }

    async function AttractFollowersToStatistics() {
        try{
            const response = await axios.get("http://localhost:3001/follow");
            let listFollow = response.data
            dispatch({ type: ActionType.followListToStatistics, payload: listFollow })
        }
        catch{
            alert(` Connection failed, try again`)
        }
    }



    const data = [
        ["name", "Some liked it"],
    ];
    followList.map((follow: any) =>
    (
        data.push(
            [follow.vacationName, follow.sumOfFollow]
        )
    ))

    const options = {
        chart: {
            title: "Favorite vacations",
            subtitle: "Amount of followers on vacation",
        },
    };


    return (
        <div className='Statistics'>
            <h1>Statistics</h1>

            <Chart
                chartType="Bar"
                width="700px"
                height="400px"
                data={data}
                options={options}
            />

        </div>
    )
}
