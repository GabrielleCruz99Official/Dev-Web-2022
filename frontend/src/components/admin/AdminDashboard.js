import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import '../utils/Constants';
import { ORDER_URL } from '../utils/Constants';

function AdminDashboard() {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        await Axios.get(ORDER_URL)
        .then((response) => {
            setOrders(response.data)
        });
    };
    
    useEffect(() => {
      getOrders();  
    }, []);

    return(
        <>
            <div>
                <h1>Home</h1>
                <table>
                    <thead>
                        <tr>
                            <th>OrderID</th>
                            <th>Product</th>
                            <th>User</th>
                            <th>User Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*
                            insert data here through backend
                        */}
                        {orders.length === 0 &&
                            <tr>
                                <td colSpan={5}>
                                    No data found. Please reload.
                                </td>
                            </tr>
                        }
                        {orders && orders.map((order, index) => {
                            return(
                                <tr key={index}>
                                    <td>{order.OrderID}</td>
                                    <td>{order.ProductName}</td>
                                    <td>{order.UserName}</td>
                                    <td>{order.Address}</td>
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

export default AdminDashboard;