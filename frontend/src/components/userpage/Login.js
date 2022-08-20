import React, {useState} from "react";
import { Link } from "react-router-dom";
import '../utils/Constants';
import Axios from 'axios';
import { AXIOS_CONFIGURATION } from "../utils/Constants";

function Login(){
    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        await Axios.post('http://localhost:3001/sessions', {
            email: email,
            password: password,
        }, AXIOS_CONFIGURATION).then((response) => {
            const test = document.cookie.indexOf('access_token');
            if(test){
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                window.location.href="/";
            }
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