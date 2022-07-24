import React, { useState } from 'react'
import { AppState } from '../../../redux/app-state';
import './button-bar.css';
import { ActionType } from '../../../redux/action-type';
import { IVacation } from '../../../models/IVacation';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function ButtonsBar() {
  const vacationsArray = useSelector((state: AppState) => state.vacationsArray);
  const stateUser = useSelector((state: AppState) => state.stateLogIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();




  const onNavigateChange = (event: any) => {
    if (event.target.value == 'menu') {
      return
    }
    else if (event.target.value == 'home') {
      event.target.value = ''
      let search = ''
      dispatch({ type: ActionType.search, payload: search })
      dispatch({ type: ActionType.GetAllVacations, payload: vacationsArray })
    }
    navigate('/' + event.target.value);
  }

  const onRandomVacation = () => {
    let randomIndex = Math.trunc((Math.random() * (vacationsArray.length - 1)))
    let vacationRandom: string = vacationsArray[randomIndex].name;
    dispatch({ type: ActionType.search, payload: vacationRandom })
  }


  const onButtonClicked = (event: any) => {
    if (event.target.value == 'home') {
      event.target.value = ''
      dispatch({ type: ActionType.GetAllVacations, payload: vacationsArray })
    }
    navigate('/' + event.target.value);
  }

  const onGetAllClicked = () => {
    let search = ``
    dispatch({ type: ActionType.search, payload: search })
    navigate('/');
  }
  

  const onLogOutClicked = () => {
    let user = ''
    dispatch({ type: ActionType.logOut, payload: user })
    navigate('/');
    onGetAllClicked()
  }


  let buttonbar = <span> </span>

  if (stateUser == 'user') {
    buttonbar = <span>
      <button id="log-out" className="bar-buttons" onClick={() => onLogOutClicked()}>log-out</button>
      <button id="random-vacation" className="bar-buttons" onClick={() => onRandomVacation()}>random</button>
      <button id="get-All" className="bar-buttons" onClick={() => onGetAllClicked()}>get All</button>

    </span>
  }
  else if (stateUser == 'admin') {
    buttonbar = <span>
      <button id="log-out" className="bar-buttons" onClick={() => onLogOutClicked()}>log-out</button>
      <select value="menu" onChange={(event) => onNavigateChange(event)} className="menu-list">
        <option value="menu">menu</option>
        <option value="add-vacation" >add vacation</option>
        <option value="statistics">statistics</option>
        <option value="home">home</option>
      </select>  </span>
  }
  else {
    buttonbar = <span>
      <button value="log-in" className="bar-buttons" onClick={(event) => onButtonClicked(event)}>log-in</button>
      <button value="register" className="bar-buttons" onClick={(event) => onButtonClicked(event)}>register</button>
      <button id="home" className="bar-buttons" onClick={(event) => onButtonClicked(event)}>home</button>
    </span>
  }


  return (
    <div className="ButtonsBar">
      {buttonbar}
    </div>
  );
};

