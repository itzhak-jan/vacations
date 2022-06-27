import './Register.css';
import PasswordStrengthBar from 'react-password-strength-bar';
import React, { ChangeEvent, useState } from "react";
import { IUser } from '../../models/IUser';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';
import { ActionType } from '../../redux/action-type';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //A function that checks the strength of the password
    const [password, setPassword] = useState('');

    //Taking the parameters for creating a user
    const [mail, setMail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const onRepeatPassword = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value != password) {
            event.target.style.backgroundColor = 'pink'
        }
        else {
            event.target.style.backgroundColor = 'white'
        }
    }

    const onRegisterClicked = async (): Promise<void> => {

        if (!isCheckingFields() || !isMailReal()) {
            return
        }
        let user: IUser = {
            userMail: mail,
            userName: firstName,
            userPassword: newPassword,
            BirthDate: day + '/' + month + '/' + birthYear
        }
        await axios.post<IUser[]>("http://localhost:3001/users", user);
        navigate('/log-in');

    }

    const isCheckingFields = (): boolean => {

        let errorMessage = ''

        if (mail == '') {
            errorMessage += "Your mail is empty \n"
        }
        if (firstName == '') {
            errorMessage += "Your name-input is empty \n"
        }
        if (newPassword.length < 6) {
            errorMessage += "Your password is too short, try again \n"
        }
        if (repeatPassword != newPassword) {
            errorMessage += "Your passwords do not match, please try again \n"
        }

        if (day == '' || month == '' || birthYear == '') {
            errorMessage += "Your birth-date is empty \n"
        }
        if (errorMessage != '') {
            alert(errorMessage)
            return false
        }
        return true
    }

    const isMailReal = (): boolean => {

        let errorMessage = ''

        if (mail.includes('@gmail.')) {
            return true
        }
        if (mail.includes('@yahoo.')) {
            return true
        }
        if (mail.includes('@outlook.')) {
            return true
        }

        errorMessage += "Your mail is not real \n you need gmail/yahoo/outlook"
        alert(errorMessage)
        return false
    }



    return (
        <div className='Register'>
            <h1>Register</h1>

            <form>
                <div className="container">
                    <label>
                        your mail: <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} />
                    </label> <br /> <br />
                    <label>
                        Full name: <input type="mail" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </label> <br /> <br />
                    <label>
                        password: <input type="password" value={newPassword}
                            onChange={e => [setPassword(e.target.value), setNewPassword(e.target.value)]} className='register-input' />
                    </label> <br /> <br />
                    <label>
                        repeat-password: <input type="password" value={repeatPassword}
                            onChange={event => [onRepeatPassword(event), setRepeatPassword(event.target.value)]} />
                    </label> <br /> <br />
                </div>
                <PasswordStrengthBar password={password} /> <br />
                <label>
                    Birth date: <select id="day" className='birth-date' value={day} onChange={(e) => setDay(e.target.value)}>
                        <option value="day">day</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </select>
                    <select id="month" className='birth-date' value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option value="month">month</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <select id="Year" className='birth-date' value={birthYear} onChange={(e) => setBirthYear(e.target.value)} >
                        <option value="Year">Year</option>
                        <option value="2001">2001</option>
                        <option value="2002">2002</option>
                        <option value="2003">2003</option>
                        <option value="2004">2004</option>
                        <option value="2005">2005</option>
                        <option value="2006">2006</option>
                        <option value="2007">2007</option>
                        <option value="2008">2008</option>
                        <option value="2009">2009</option>
                        <option value="2010">2010</option>
                    </select>
                </label> <br /> <br />

            </form>
            <input type="submit" value="Register" onClick={() => onRegisterClicked()} className='register-button' />
        </div>

    )

}


