import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import ValidationBadge from './ValidationBadge';

function Register(){
    const [usernameReg, setUsernameReg] = useState('');
    const [userEmailReg, setUserEmailReg] = useState('');
    const [password, setPassword] = useState({
        inputPassword: "",
        confirmPassword: "",
    });

    const setInputPassword = (event) => {
        setPassword({...password, inputPassword: event.target.value})
    };

    const setConfirmPassword = (event) => {
        setPassword({...password, confirmPassword: event.target.value})
    };

    const [validLength, setValidLength] = useState(null);
    const [hasNumber, setHasNumber] = useState(null);
    const [upperCase, setUppercase] = useState(null);
    const [lowerCase, setLowercase] = useState(null);
    const [specialChar, setSpecialChar] = useState(null);
    const [match, setMatch] = useState(null);

    /* 
            useEffect(()=>{
        if(password.inputPassword.length === 0){
        } else {
        }
    }, [password.inputPassword]);
    */

    const onSubmit = (e) => {
        e.preventDefault();
        if(password.inputPassword === password.confirmPassword){
            registerUser();
            window.location.href = "/login";
        }
    }

    const registerUser = async () => {
        Axios.post('http://localhost:3001/users/register',
        {
            username: usernameReg,
            email: userEmailReg,
            password: password.confirmPassword,
        }).then((response)=>{
            console.log(response)
        })
    }

    return(
        <>
            <div className="App">
                <div className="card bg-secondary">
                    <h4 className="card-title">Register</h4>
                    <div className="card-body d-flex justify-content-center from-container">
                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input 
                                    type="text" className="form-control" 
                                    placeholder="Username"
                                    aria-label="Username" 
                                    onChange={(e) => {
                                        setUsernameReg(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input 
                                    type="text" className="form-control" 
                                    placeholder="Email"
                                    aria-label="Email" 
                                    onChange={(e) => {
                                        setUserEmailReg(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" 
                                    placeholder="Password"  
                                    aria-label="Password"
                                    onChange={setInputPassword}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" 
                                    placeholder="Confirm Password"  
                                    aria-label="Confirm Password"
                                    onChange={setConfirmPassword}
                                />
                            </div>
                            <div>
                                <ul className='list-group'>
                                    <li className='list-group-item'>
                                        1 Uppercase Letter
                                        <ValidationBadge status={upperCase} />
                                    </li>
                                    <li className='list-group-item'>
                                        1 Lowercase Letter
                                        <ValidationBadge status={lowerCase} />
                                    </li>
                                    <li className='list-group-item'>
                                        1 Special Character
                                        <ValidationBadge status={specialChar} />
                                    </li>
                                    <li className='list-group-item'>
                                        1 Number    
                                        <ValidationBadge status={hasNumber} />
                                    </li>
                                    <li className='list-group-item'>
                                        At least 12 characters
                                        <ValidationBadge status={validLength} />
                                    </li>
                                </ul>
                            </div>
                            <Link className="links" to="/login">
                                <p>Have an account? Click here to login.</p>
                            </Link>
                            <input className="btn btn-primary" type="submit" value="Register"/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;