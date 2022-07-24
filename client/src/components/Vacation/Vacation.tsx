import "./vacation.css"
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from "../../redux/app-state";
import { ActionType } from "../../redux/action-type";
import { IVacation } from "../../models/IVacation";
import axios from "axios";
import {useNavigate } from "react-router-dom";

function Vacatoin(this: any, props: IVacation) {

  const stateUser = useSelector((state: AppState) => state.stateLogIn);
  const likeVacations = useSelector((state: AppState) => state.followArray);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteVacation = async (props: IVacation) => {
    try {
      await axios.delete("http://localhost:3001/vacations/" + props.id);
      const response = await axios.get<IVacation[]>("http://localhost:3001/vacations");
      let vacations = response.data;
      dispatch({ type: ActionType.GetAllVacations, payload: vacations });
    }
    catch {
      alert('There is a problem')
    }
  }

  const editVacation = async (props: IVacation) => {
      dispatch({ type: ActionType.editVacation, payload: props });
      navigate('/Edit-vacation');
  }

  const followVacation = async (props: IVacation) => {
    let token = localStorage.getItem('token')

    let followedVacation = {
      token: token,
      vacationId: props.id
    }
    let vacationName = props.name
    try {
      const response = await axios.post("http://localhost:3001/follow", followedVacation);
      dispatch({ type: ActionType.followVacation, payload: vacationName })
      navigate('/');
    }
    catch {
      alert('There is a problem with the parameters')
    }
  }

  let buttonUser = <span> </span>

  if (stateUser == 'user') {
    if (likeVacations.has(props.name)) {
      buttonUser = <span>
        <button className="like-vacation" onClick={() => followVacation(props)} >📌 </button>
      </span>
    }
    else {
      buttonUser = <span>
        <button className="follow-vacation" onClick={() => followVacation(props)} >📌 </button>
      </span>
    }
  }
  else if (stateUser == 'admin') {
    buttonUser = <span>
      <button className="delete-vacation" onClick={() => deleteVacation(props)} >❌</button>
      <button className="edit-vacation" onClick={() => editVacation(props)} >✏️ </button>
    </span>
  }
  else if (stateUser == 'guest') {
    buttonUser = <span className="guest"> You must log in to follow / pay for a specific vacation </span>
  }


  return (
    <div className="vacation">
      <img src={props.photoUrl} className='vacation-img'></img>
      {buttonUser}
      <div id="vacation-name"> {props.name}</div>
      <div >Price: {props.price}$ per night</div>
      <div>From: {props.fromDate}</div>
      <div>To: {props.toDate} </div>
    </div>
  );
}
export default Vacatoin;