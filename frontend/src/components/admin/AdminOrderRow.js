import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import { ORDER_URL } from '../utils/Constants';

function AdminOrderRow(props){
    const order = props.order;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        setPaidSwitch(data.WasPaid);
        setDeliveredSwitch(data.WasDelivered);
        setShow(true);
    }
    
    const [paidStatus, setPaidStatus] = useState(0);
    const [deliveredStatus, setDeliveredStatus] = useState(0);

    const [paidSwitch, setPaidSwitch] = useState(false);
    const [deliveredSwitch, setDeliveredSwitch] = useState(false);

    const submit = async (orderId) => {
        await Axios.patch(`${ORDER_URL}/${orderId}`, {
            wasPaid: paidStatus,
            wasDelivered: deliveredStatus
        }).then((response) => {
            handleClose();
            props.getOrders();
        });
    }

    const togglePaid = (e) => {
        setPaidStatus(e.target.checked ? 1 : 0)   
    }

    const toggleDelivered = (e) => {
        setDeliveredStatus(e.target.checked ? 1 : 0)
    }
    
    const deleteOrder = async (orderId) => {
        console.log(orderId);
        if(window.confirm("Do you wish to delete the order?")){
            await Axios.delete(`${ORDER_URL}/${orderId}`)
            .then((response) => {
                console.log(response.data)
                props.getOrders();
            });
        }
    }
    
    
    return(
        <>
            <td>
                <Button className="nextButton" onClick={() => {handleShow(order)}}>Change Status</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modify {order.UserName}'s Order</Modal.Title>
                    </Modal.Header>
                    
                    <Form>
                        <Modal.Body>
                            <Form.Check
                                type="switch"
                                id="paidSwitch"
                                label="Order has been paid"
                                defaultChecked={paidSwitch}
                                onChange={togglePaid}
                            />
                            <Form.Check
                                type="switch"
                                id="deliveredSwitch"
                                label="Order has been delivered"
                                defaultChecked={deliveredSwitch}
                                onChange={toggleDelivered}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => {submit(order.OrderID)}}>
                                Save Changes
                            </Button>
                        </Modal.Footer>        
                    </Form>
                </Modal>
                
                <Button variant="danger" onClick={() => {deleteOrder(order.OrderID)}}>Delete</Button>
            </td>
        </>
    );
}

export default AdminOrderRow;