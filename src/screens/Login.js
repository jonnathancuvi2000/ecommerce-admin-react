import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';
import '../styles/Login.css'
import { Lock, Person } from "@material-ui/icons";
import { Link } from 'react-router-dom';

export default function Login() {
    // const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);



    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    }

    return (
        <div className="login-container">
            <div className='login-wrapper'>
                <h1 className='login-title'>Login</h1>
                <h1 className='login-subtitle'>Admin Pannel</h1>
                <form action="" className='login-form'>
                    <div className="login-input-div">
                        <Person className='icon-login' />
                        <input className='login-input' type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="login-input-div">
                        <Lock className='icon-login' />
                        <input className='login-input' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='login-btn' onClick={handleClick}>Login</button>
                    {error && <span className='Error-Login'>Someting went wrong ...</span>}
                    {/* <a  className="login-link">Do not rememeber your password?</a> */}
                    {/* <a href="" className="login-link">Create a new Account</a> */}
                    <Link to={'/register'} className="login-link">Create a new Account</Link>
                </form>
            </div>
        </div>

    )
}
