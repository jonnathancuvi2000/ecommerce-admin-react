import React, { useState } from 'react'
import '../styles/Register.css'
import { Lock, Person, VerifiedUser, Email, PersonOutline } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../redux/apiCalls';


export default function Register() {
    const [userInfo, setUserInfo] = useState(null)
    const [errorPassword, setErrorPassword] = useState(true)
    const dispath = useDispatch()
    const navigate = useNavigate()


    // const { isFetching, error } = useSelector((state) => state.user);
    const handleClick = (e) => {

        e.preventDefault();
        if (userInfo.password === userInfo.confiPassword) {
            setErrorPassword(true);
            delete userInfo.confiPassword // delete de 
            // we send teh data to the data base 
            register(dispath, userInfo);
        } else {
            setErrorPassword(false);
        }
    }

    const handleChange = (e) => {
        const value = e.target.value
        setUserInfo({
            ...userInfo,
            [e.target.name]: value,
            'isAdmin': true,
        })
    }

    console.log(userInfo)

    return (
        <div className="register-container">
            <div className='register-wrapper'>
                <h1 className='register-title'>Register</h1>
                <h1 className='register-subtitle'>Admin Pannel</h1>
                <form action="" className='register-form'>
                    <div className="data-user">
                        <div className="register-input-div">
                            <Person className='icon-register' />
                            <input className='register-input' type="text" placeholder='Name' name='name' onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="register-input-div">
                            <Person className='icon-register' />
                            <input className='register-input' type="text" placeholder='Last Name' name='lastname' onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div className="data-user">
                        <div className="register-input-div">
                            <PersonOutline className='icon-register' />
                            <input className='register-input' type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="register-input-div">
                            <Email className='icon-register' />
                            <input className='register-input' type="text" placeholder='Email' name='email' onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div className="data-user">
                        <div className="register-input-div">
                            <Lock className='icon-register' />
                            <input className='register-input' type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="register-input-div">
                            <VerifiedUser className='icon-register' />
                            <input className='register-input' type="password" placeholder='Confirm Password' name='confiPassword' onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <button className='register-btn' onClick={handleClick}>Register</button>
                    {!errorPassword &&
                        <span className="Error-Register">
                            Something has gone wrong, pleace check the passwors is the same
                        </span>
                    }
                    <Link to={'/login'} className="register-link">Login</Link>
                </form>
            </div>
        </div>
    )
}
