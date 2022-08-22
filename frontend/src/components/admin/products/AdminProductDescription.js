import {Button, Modal} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';

function AdminProductDescription(props) {
    const product = props.product;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <td>
                <Button className="productDesc" variant="info" onClick={handleShow}>
                    Show Product Description
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{product.ProductName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{product.ProductDesc}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </td>
        </>
    )
}

export default AdminProductDescription;