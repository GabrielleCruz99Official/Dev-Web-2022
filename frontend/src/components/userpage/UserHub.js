import React, {useState, useEffect} from "react";
import Axios from 'axios';
import {Link} from "react-router-dom";
import {Card} from 'react-bootstrap';
import {ADDRESS_URL} from '../utils/Constants'
import AddressModal from "../utils/AddressModal";

function UserHub(){
    const userProfile = JSON.parse(localStorage.getItem('user'))
    const [address, setAddress] = useState({});

    const getAddress = async () => {
        const userId = userProfile.id;
        await Axios.get(`${ADDRESS_URL}/${userId}`)
        .then((response) => {
            //setHasAddress(response.data ? true : false);
            setAddress(response.data);
        })
    };

    useEffect(() => {
        getAddress();
    }, []);

    return(
        <>
            <div>
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>Basic Info</Card.Title>
                        <Card.Text>
                            Hello, {userProfile.name}! This is your profile,
                            where you can enjoy certain features as a client
                            of Sensoria.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>User Email</Card.Title>
                        <Card.Text>
                            Your email is {userProfile.email}. Don't worry, 
                            you'll have the option to change it in the future. 
                            We're working on it!
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>User Address</Card.Title>
                        <Card.Text>
                            Your address is {address.Street}, {address.Postcode} {address.City}.
                            You can change it below!
                            <br/>
                            <br/>
                            <AddressModal
                                address={address}
                                hasAddress={true}
                                userId={userProfile.id}
                                getAddress={getAddress}
                            />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </>      
    )
}

export default UserHub;