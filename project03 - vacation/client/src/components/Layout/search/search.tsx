import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IVacation } from '../../../models/IVacation';
import { ActionType } from '../../../redux/action-type';
import { AppState } from '../../../redux/app-state';
import './search.css'


export default function Search() {

    const [value, setValue] = useState("");
    const dispatch = useDispatch();

    const onSearchVacation = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        let searchVacation = event.target.value
        dispatch({ type: ActionType.search, payload: searchVacation })
    }

    const search = <input id="searchWords" value={value} className='search-input'
     onChange={((event) => onSearchVacation(event))} placeholder='search vacation'></input>

    return (
        <div className="Search">
            {search}
        </div>
    )
}
