import React, {useState} from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

function Login(){
    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/users/login', {
            email: email,
            password: password,
        }).then((response) => {
            if(response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data));
            window.location.href="/";
        })
    }
    
    return(
        <>
            <div className="App">
                <div className="card bg-secondary">
                    <h4 className="card-title">Login</h4>
                    <div className="card-body d-flex justify-content-center from-container">
                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input 
                                    type="text" className="form-control" 
                                    placeholder="Email"
                                    aria-label="Email" 
                                    onChange={(e) => {
                                        setUserEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" 
                                    placeholder="Password"
                                    aria-label="Password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <Link className="links" to="/register">
                                <p>New client? Click here to register.</p>
                            </Link>
                            <input className="btn btn-primary" type="submit" value="Login"/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;