import React, { useState } from 'react';

export function Click(){
    const [count, setCount] = useState(0);

    function countUp(){
        setCount(count + 1);
    }

    function countDown(){
        setCount(count <= 0 ? 0: count - 1);
    }

    return(
        <>
            <div>
                <span>{count}</span>
            </div>
            <div>
                <button onClick={countUp}>Up?</button>
                <button onClick={countDown}>Down?</button>
            </div>
        </>
    )
}