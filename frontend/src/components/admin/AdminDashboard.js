import Axios from 'axios';
import { Button } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import { ORDER_URL } from '../utils/Constants';
import AdminOrderRow from './AdminOrderRow';
import moment from 'moment';

function AdminDashboard() {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        await Axios.get(ORDER_URL)
        .then((response) => {
            setOrders(response.data)
        });
    };

    const checkStatus = (status) => {
        return status === 0 ? 
        <div className="alert alert-danger">No</div>
        : <div className="alert alert-success">Yes</div>
    }

    const convertDate = (date) => {
        return moment(date).format('DD-MM-YYYY');
    };

    useEffect(() => {
      getOrders();  
    }, []);

    return(
        <>
            <div>
                <h1>Home</h1>
                <Button variant="primary" onClick={getOrders}>Refresh</Button>
                <table className="text-center">
                    <thead>
                        <tr>
                            <th>OrderID</th>
                            <th>Product</th>
                            <th>User</th>
                            <th>User Address</th>
                            <th>Order Date</th>
                            <th>Payment Status</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*
                            insert data here through backend
                        */}
                        {orders.length === 0 &&
                            <tr>
                                <td colSpan={8}>
                                    No data found. Please reload.
                                </td>
                            </tr>
                        }
                        {orders && orders.map((order,index) => {
                            return(
                                <>
                                    <tr key={index}>
                                        <td>{order.OrderID}</td>
                                        <td>{order.ProductName}</td>
                                        <td>{order.UserName}</td>
                                        <td>{order.Address}</td>
                                        <td>{convertDate(order.OrderDate)}</td>
                                        <td>{checkStatus(order.WasPaid)}</td>
                                        <td>{checkStatus(order.WasDelivered)}</td>
                                        <AdminOrderRow order={order} getOrders={getOrders}/>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminDashboard;