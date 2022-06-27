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
      const socket = io('http://localhost:3002/', { query: { "token": token } }).connect(); // Client Socket Object.
      initSocketListeners(socket)
    }
  }, [])



  function initSocketListeners(socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
    socket.on("delete-vacation", (vacation: any) => {
      let vacations = JSON.parse(vacation);
      dispatch({ type: ActionType.GetAllVacations, payload: vacations });
      alert(`Sorry for the inconvenience but one of the vacations has just been canceled .... hope you still find a suitable vacation!`)
    });

    socket.on("add-vacation", (vacation: any) => {
      let vacations = JSON.parse(vacation);
      dispatch({ type: ActionType.GetAllVacations, payload: vacations });
      alert(`Sorry for the inconvenience, but we've added a special vacation especially for you - hope it fits!`)
    });

    socket.on("edit-vacation", (vacation: any) => {
      let vacations = JSON.parse(vacation);
      dispatch({ type: ActionType.GetAllVacations, payload: vacations });
      alert(`Sorry for the inconvenience, but one of the vacations has just changed - hopefully it's more suitable for you now!`)
    });
  }



  return (
    <div className="Header">

      <h1>Vacations Site</h1>

    </div>
  );
};
