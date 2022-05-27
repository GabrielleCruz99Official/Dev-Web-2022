import React from 'react';

function DateTimeDisplay({ value, type, isDanger }) {
    return(
        <div className={isDanger ? 'timer danger' : 'timer'}>
            <p>{value}</p>
            <span>{type}</span>
        </div>
    );
};

export default DateTimeDisplay;