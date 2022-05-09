import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function Register(){
    const [usernameReg, setUsernameReg] = useState('');
    const [userEmailReg, setUserEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    
    const registerUser = async (e) => {
        e.preventDefault();
    }

    return(
        <>
            <div className="App">
                <div className="card bg-secondary">
                    <h4 className="card-title">Login</h4>
                    <div className="card-body d-flex justify-content-center from-container">
                        <form onSubmit={registerUser}>
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
                                <input type="text" className="form-control" 
                                    placeholder="Password"  
                                    aria-label="Password"
                                    onChange={(e) => {
                                        setPasswordReg(e.target.value);
                                    }}
                                />
                            </div>
                            <Link className="links" to="/login">
                                <p>Have an account? Click here to login.</p>
                            </Link>
                            <input className="btn btn-primary" type="submit" value="Login"/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;