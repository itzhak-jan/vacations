import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IVacation } from '../../models/IVacation';
import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import './edit-vacation.css';

export default function EditVacation() {

    const props: IVacation = useSelector((state: AppState) => state.editVacation);
    const userType: string = useSelector((state: AppState) => state.stateLogIn );


    const navigate = useNavigate();

    const [vacationName, setVacationName] = useState('');
    const [vacationPrice, setVacationPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [vacationPhoto, setVacationPhoto] = useState('');

    useEffect(() => {
        if (!props) {
            alert("You are not taking any vacation")
            navigate('/');
        }

        validEditPage()
    }, [])

    function validEditPage() {
        if(userType != "admin"){
            alert("You are not admin")
            navigate('/');
        }
    }

    const onEditVacationClicked = async (): Promise<void> => {

        let vacation = {
            id: props.id,
            name: vacationName,
            price: parseInt(vacationPrice),
            fromDate: startDate,
            toDate: endDate,
            photoUrl: vacationPhoto
        }

        isValidVacation(vacation)

        await axios.put("http://localhost:3001/vacations", vacation);
        navigate('/');
    }

    const isValidVacation = (vacation: IVacation) => {

        if (!vacation.name) {
            vacation.name = props.name
        }
        if (!vacation.price) {
            vacation.price = props.price
        }
        if (!vacation.fromDate) {
            vacation.fromDate = props.fromDate
        }
        if (!vacation.toDate) {
            vacation.toDate = props.toDate
        }
        if (!vacation.photoUrl) {
            vacation.photoUrl = props.photoUrl
        }
    }

    return (
        <div className='Edit-vacation'>
            <h1>Edit-vacation - {props.name}</h1>

            <form>
                <div className="Edit-container">

                    <label>
                        new-name: <input type="text" value={vacationName} onChange={(e) => setVacationName(e.target.value)} />
                        <h6 className='old'> (old - {props.name})</h6>
                    </label> <br /> <br />
                    <label>
                        new-price: <input type="number" value={vacationPrice} onChange={(e) => setVacationPrice(e.target.value)} />
                        <h6 className='old'>  (old - {props.price})</h6>
                    </label> <br /> <br />
                    <label>
                        start-date: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <h6 className='old'>  (old - {props.fromDate})</h6>
                    </label> <br /> <br />
                    <label>
                        new-end-date: <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <h6 className='old'> (old - {props.toDate})</h6>
                    </label> <br /> <br />
                    <label>
                        new-photo: <input type="text" value={vacationPhoto} onChange={(e) => setVacationPhoto(e.target.value)} />
                        <img className='img-old' src={props.photoUrl}/>
                    </label> <br /> <br />
                </div>

            </form>
            <input type="submit" value="Edit-vacation" onClick={() => onEditVacationClicked()} className='Edit-vacation-button' />
        </div>
    )
}