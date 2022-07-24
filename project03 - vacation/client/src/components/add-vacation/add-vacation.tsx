import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../redux/app-state';
import './add-vacation.css';


export default function AddVacation() {

    const vacationsArray = useSelector((state: AppState) => state.vacationsArray);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [vacationName, setVacationName] = useState('');
    const [vacationPrice, setVacationPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [vacationPhoto, setVacationPhoto] = useState('');
    const userType: string = useSelector((state: AppState) => state.stateLogIn );

    useEffect(() => {
        if(userType != "admin"){
            alert("You are not admin")
            navigate('/');
        }
    }, [])



    const onAddVacationClicked = async (): Promise<void> => {

        if (!isValidVacation()) {
            return
        }
        let vacation = {
            name: vacationName,
            price: parseInt(vacationPrice),
            fromDate: startDate,
            toDate: endDate ,
            photoUrl: vacationPhoto
        }
        await axios.post("http://localhost:3001/vacations/add", vacation);
        // dispatch({ type: ActionType.AddVacation, payload: vacationsArray })
        navigate('/');
    }

    function isValidVacation(): boolean {

        let errorMessage = ''

        if (vacationName == '') {
            errorMessage += "Your vacation-name is empty \n"
        }

        if (vacationPrice == '') {
            errorMessage += "Your price is empty \n"
        }

        if (startDate == '') {
            errorMessage += "Your start-date is empty \n"
        }
        if (endDate == '') {
            errorMessage += "Your end-date is empty \n"
        }

        if (vacationPhoto == '') {
            errorMessage += "Your vacation-photo is empty \n"
        }
        if (errorMessage != '') {
            alert(errorMessage)
            return false
        }
        return true
    }

    return (
        <div className='add-vacation'>
            <h1>add-vacation</h1>

            <form>
                <div className="container">

                    <label>
                        vacation name: <input type="text" value={vacationName} onChange={(e) => setVacationName(e.target.value)} />
                    </label> <br /> <br />
                    <label>
                        vacation price: <input type="number" value={vacationPrice} onChange={(e) => setVacationPrice(e.target.value)} />
                    </label> <br /> <br />
                    <label>
                        vacation start-date: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </label> <br /> <br />
                    <label>
                        vacation end-date: <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </label> <br /> <br />
                    <label>
                        vacation photo: <input type="text" value={vacationPhoto} onChange={(e) => setVacationPhoto(e.target.value)} />
                    </label> <br /> <br />
                </div>

            </form>
            <input type="submit" value="add-vacation" onClick={() => onAddVacationClicked()} className='add-vacation-button' />
        </div>
    )
}
