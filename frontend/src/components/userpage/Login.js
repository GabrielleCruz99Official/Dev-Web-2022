import React from "react";

function Login(){
    const onSubmit = (data) => {
        console.log(data)
        return false;
    }
    
    return(
        <>
            <div className="App">
                <div className="card">
                    <h4 className="card-title">Login</h4>
                    <div className="card-body d-flex justify-content-center from-container">
                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Username"
                                    aria-label="Username" />
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Password"
                                    aria-label="Password" />
                            </div>
                            <input className="btn btn-primary" type="submit" value="Login"/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;