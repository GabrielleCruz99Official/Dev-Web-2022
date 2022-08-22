import Axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import '../utils/Constants';
import { USER_URL } from '../utils/Constants';

function AdminUserList() {
    const [users, setUsers] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getUsers = async () => {
        await Axios.get(USER_URL)
        .then((response) => {
            setUsers(response.data)
        });
    };

    const deleteUser = async (userId) => {
        if(window.confirm("Do you wish to delete the user?")){
            await Axios.delete(`${USER_URL}/${userId}`)
            .then((response) => {
                getUsers();
            });
        }
    }
    
    useEffect(() => {
      getUsers();  
    }, []);

    return(
        <>
            <div>
                <h1>users</h1>
                <Button variant="primary" onClick={getUsers}>Refresh</Button>
                <table className="text-center">
                    <thead>
                        <tr>
                            <th>UserID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*
                            insert data here through backend
                        */}
                        {users.length === 0 &&
                            <tr>
                                <td colSpan={5}>
                                    No data found. Please reload.
                                </td>
                            </tr>
                        }
                        {users && users.map((user, index) => {
                            return(
                                <tr key={index}>
                                    <td>{user.UserID}</td>
                                    <td>{user.UserName}</td>
                                    <td>{user.UserEmail}</td>
                                    <td>{user.Address}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => {deleteUser(user.UserID)}}>Delete</Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminUserList;