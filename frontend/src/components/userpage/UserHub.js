import React from "react";
import {Link} from "react-router-dom";
import 'react-bootstrap';

function UserHub(){
    const userProfile = JSON.parse(localStorage.getItem('user'))
    return(
        <div className="App bg-secondary">
            <div className="card bg-secondary">
                <h5 className="card-title">{userProfile.name}</h5>
                <div className="card-body">
                    <p>Email: {userProfile.email}</p>
                </div>  
            </div>
            <Link to="/">
                <button className="btn btn-primary">Home</button>
            </Link>
        </div>        
    )
}

export default UserHub;