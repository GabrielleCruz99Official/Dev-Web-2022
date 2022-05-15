import React, {useState} from "react";
import { Link } from "react-router-dom";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
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
                                    placeholder="Username"
                                    aria-label="Username" 
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" 
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