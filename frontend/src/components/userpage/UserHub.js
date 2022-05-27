import React from "react";
import {Link} from "react-router-dom";

function UserHub(){
    const userProfile = JSON.parse(localStorage.getItem('user'))
    return(
        <div className="App bg-secondary">
            <div className="card bg-secondary">
                <h5 className="card-title">{userProfile.user.name}</h5>
                <div className="card-body">
                    <p>Email: {userProfile.user.email}</p>
                    <p>Access Token: {userProfile.token}</p>
                </div>  
            </div>
            <Link to="/">
                <button className="btn btn-primary">Home</button>
            </Link>
        </div>        
    )
}

export default UserHub;