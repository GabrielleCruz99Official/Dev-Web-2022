import React, {useEffect, useState} from 'react';
import Axios from 'axios';

function Basket(){
    const [items, setItems] = useState(null);
    
    const getItems = async () => {
        Axios.get("http://localhost:3001/basket")
        .then((response) => {
            setItems(response.data);
        });
    };

    return(
        <>
        </>
    );
}

export default Basket;