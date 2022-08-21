import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {USER_URL} from '../utils/Constants'

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

    const pwCheck = {
        'upper' : /[A-Z]/,
        'lower' : /[a-z]/,
        'special' : /[!@#$%^&]/,
        'number' : /[0-9]/,
    };

    const [validLength, setValidLength] = useState(null);
    const [hasNumber, setHasNumber] = useState(null);
    const [upperCase, setUppercase] = useState(null);
    const [lowerCase, setLowercase] = useState(null);
    const [specialChar, setSpecialChar] = useState(null);
    const [match, setMatch] = useState(null);

    const [isRedirected, setIsRedirected] = useState(() => {
        const prompt = JSON.parse(localStorage.getItem('isRedirected'));
        return prompt ? true : false;
    })

    useEffect(() => {
        if (pwCheck.upper.test(password.inputPassword)){
            setUppercase(true);
        } else {
            setUppercase(false);
        }

        if (pwCheck.lower.test(password.inputPassword)){
            setLowercase(true);
        } else {
            setLowercase(false);
        }

        if (pwCheck.special.test(password.inputPassword)){
            setSpecialChar(true);
        } else {
            setSpecialChar(false);
        }

        if (pwCheck.number.test(password.inputPassword)){
            setHasNumber(true);
        } else {
            setHasNumber(false);
        }

        if (password.inputPassword.length >= 12){
            setValidLength(true);
        } else {
            setValidLength(false);
        }
    }, [password.inputPassword])

    useEffect(() => {
        if(password.confirmPassword === password.inputPassword) {
            setMatch(true);
        }else{
            setMatch(false);
        }
    }, [password.confirmPassword])

    const registerUser = async () => {
        if(match && password.confirmPassword){
            await Axios.post(`${USER_URL}`,
                {
                    username: usernameReg,
                    email: userEmailReg,
                    password: password.confirmPassword,
                }).then((response)=>{
                    console.log(response)
                    window.location.href="/login";
            });
        } else {
            console.log("Passwords don't match!")
        }
        
    }

    return(
        <>
            <div className="App">
                <div className="card bg-secondary">
                    <h4 className="card-title">Register</h4>
                    <div className="card-body d-flex justify-content-center from-container">
                        <form>
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
                                        {upperCase ? 
                                            <span className="text-end badge bg-success rounded-pill">ok</span>
                                            : <span className="text-end badge bg-danger rounded-pill">no</span>
                                        }
                                    </li>
                                    <li className='list-group-item'>
                                        1 Lowercase Letter
                                        {lowerCase ? 
                                            <span className="text-end badge bg-success rounded-pill">ok</span>
                                            : <span className="text-end badge bg-danger rounded-pill">no</span>
                                        }                                
                                    </li>
                                    <li className='list-group-item'>
                                        1 Special Character
                                        {specialChar ? 
                                            <span className="text-end badge bg-success rounded-pill">ok</span>
                                            : <span className="text-end badge bg-danger rounded-pill">no</span>
                                        }                                    
                                    </li>
                                    <li className='list-group-item'>
                                        1 Number    
                                        {hasNumber ? 
                                            <span className="text-end badge bg-success rounded-pill">ok</span>
                                            : <span className="text-end badge bg-danger rounded-pill">no</span>
                                        }                                    
                                    </li>
                                    <li className='list-group-item'>
                                        At least 12 characters
                                        {validLength ? 
                                            <span className="text-end badge bg-success rounded-pill">ok</span>
                                            : <span className="text-end badge bg-danger rounded-pill">no</span>
                                        }                                    
                                    </li>
                                    <li className='list-group-item'>
                                        PasswordsMatch
                                        {match && match.length > 0 ? 
                                            <span className="text-end badge bg-success rounded-pill">ok</span>
                                            : <span className="text-end badge bg-danger rounded-pill">no</span>
                                        }                                    
                                    </li>
                                </ul>
                            </div>
                            <Link className="links" to="/login">
                                <p>Have an account? Click here to login.</p>
                            </Link>
                            <input className="btn btn-primary" type="button" value="Register" onClick={registerUser}/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;