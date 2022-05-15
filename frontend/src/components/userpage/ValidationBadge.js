import React, {useEffect, useState} from 'react';

function ValidationBadge(status) {
    const [badge, setBadge] = useState(status);

    useEffect(()=>{
        setBadge(status);
    }, [status]);
    
    return(
        <>
            {badge === true ? 
                <span className="text-end badge bg-success rounded-pill">ok</span>
                : <span className="text-end badge bg-danger rounded-pill">no</span>
            }
        </>
    )
}

export default ValidationBadge;