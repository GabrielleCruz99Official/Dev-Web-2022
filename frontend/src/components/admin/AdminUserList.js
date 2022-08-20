import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import '../utils/Constants';
import { USER_URL } from '../utils/Constants';

function AdminUserList() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        await Axios.get(USER_URL)
        .then((response) => {
            setUsers(response.data)
        });
    };
    
    useEffect(() => {
      getUsers();  
    }, []);

    return(
        <>
            <div>
                <h1>Home</h1>
                <table>
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
                                        <button>Modify</button>
                                        <button>Delete</button>
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