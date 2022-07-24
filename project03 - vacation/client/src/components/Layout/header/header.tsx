import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../../redux/action-type";
import React, { ChangeEvent, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { AppState } from "../../../redux/app-state";


export default function Header() {

  // const socket = useSelector((state: AppState) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem('token')
    let followArray = localStorage.getItem('likeVacations') as string

    if (token) {
      followArray = JSON.parse(followArray)
      let userData = {
        token: token,
        likeVacations: followArray
      }
      dispatch({ type: ActionType.LogIn, payload: userData })
    }
  }, [])

  return (
    <div className="Header">

      <h1>Vacations Site</h1>

    </div>
  );
};
