import React, { useState } from 'react';

function Click(){
    const [count, setCount] = useState(0);

    function countUp(){
        setCount(count + 1);
    }

    function countDown(){
        setCount(count <= 0 ? 0: count - 1);
    }

    return(
        <div classname="App">
            <div className="App">
                <span>{count}</span>
            </div>
            <div className="App">
                <button onClick={countUp}>Up?</button>
                <button onClick={countDown}>Down?</button>
            </div>
        </div>
    )
}
export default Click;