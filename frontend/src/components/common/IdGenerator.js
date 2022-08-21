import React from 'react';

function IdGenerator(){
    const MIN_ID_VALUE = 10000000;
    const MAX_ID_VALUE = 99999999;
    const id = Math.floor(Math.random() * (MAX_ID_VALUE - MIN_ID_VALUE) + MIN_ID_VALUE);
    return id;
}

export default IdGenerator;