import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { IUser } from '../../models/IUser';
import { ActionType } from '../../redux/action-type';
import './Log-in.css';


export default function LogIn() {

    const navigate = useNavigate();
    const [emailLogIn, setEmailLogIn] = useState('');
    const [passwordLogIn, setPasswordLogIn] = useState('');
    const dispatch = useDispatch();

    const onLogInClicked = () => {
        initUsers();
    }

    async function initUsers() {

        let user = {
            email: emailLogIn,
            password: passwordLogIn
        }

        try {
            isvalidData(user)
            const response = await axios.post("http://localhost:3001/users/login", user);
            let userLogin = response.data  
                      
            let token = 'Bearer ' + userLogin.token
            localStorage.setItem('token' , token);
            userLogin.token = token

            dispatch({ type: ActionType.LogIn , payload: userLogin })
            navigate('/');
        }
        catch {
            alert('There is a problem with the parameters')
        }
    }

    const isvalidData = (user:any): boolean => {
        if(user.email == ''){
            return false
        }
        if(user.password == ''){
            return false
        }
        return true
    }

    const onnavigateChange = (event: any) => {
        navigate('/' + event.target.value);
    }
    return (
        <div className='Log-in'>
            <form>
                <h1>Log-in</h1>

                <div className="container">
                    <label>
                        Email: <input type="text" className='user-input' value={emailLogIn} onChange={(e) => setEmailLogIn(e.target.value)} />
                    </label>
                    <br></br>
                    <br></br>
                    <label>
                        password: <input type="password" className='user-input' value={passwordLogIn} onChange={(e) => setPasswordLogIn(e.target.value)} />
                    </label>
                </div>
                <br></br>
            </form>

            <div className="center-sumbit">
                <button className='submit' value="Log-in" onClick={() => onLogInClicked()} >Log-in</button>
                <h6>Still not registered??</h6>
                <button className='submit' value="Register" onClick={(event) => onnavigateChange(event)}>Register</button>
            </div>
        </div>
    )
}
