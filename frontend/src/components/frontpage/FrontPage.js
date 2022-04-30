import React from 'react';
import Countdown from './Countdown';

function FrontPage(){
    return(
        <div className="App">
            <h1>Sensoria</h1>
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">Explication du concept</h5>
                    <p className="card-body">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>
            <Countdown />
        </div>
    )
}

export default FrontPage;