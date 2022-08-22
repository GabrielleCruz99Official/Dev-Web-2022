import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { PRODUCT_URL } from '../../utils/Constants';

function AdminProductModal(props){
    const product = props.product ? props.product : {};
    const existingProduct = props.doesExist;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formName, setFormName] = useState(() => {
        return product.ProductName ? product.ProductName : "";
    })

    const [formPrice, setFormPrice] = useState(() => {
        return product.ProductPrice ? product.ProductPrice : "";
    })

    const [formDesc, setFormDesc] = useState(() => {
        return product.ProductDesc ? product.ProductDesc : "";
    });

    const submitProduct = async (productId) => {
        switch(existingProduct){
            case true:
                await Axios.patch(`${PRODUCT_URL}/${productId}`, {
                    name: formName,
                    description: formDesc,
                    price: formPrice           
                }).then((response) => {
                    console.log(response.data)
                    handleClose();
                    props.getProducts();
                })
                break;
            default:
                await Axios.post(`${PRODUCT_URL}`, {
                    name: formName,
                    description: formDesc,
                    price: formPrice          
                }).then((response) => {
                    handleClose();
                    props.getProducts();
                })
        }
    }

    return(
        <>
            {!existingProduct && 
                <Button onClick={handleShow}>Add New Product</Button>
            }
            {existingProduct && 
                <Button onClick={handleShow}> Modify</Button>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {!existingProduct && 
                        <Modal.Title>Ajouter votre adresse</Modal.Title>
                    }
                    {existingProduct && 
                        <Modal.Title>Modify Product {product.ProductID}</Modal.Title>
                    }
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Form.Group controlId="formName">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" 
                                        placeholder="Type product name here:"
                                        defaultValue={formName}
                                        onChange={(e) => {setFormName(e.target.value)}}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" 
                                    rows={8}
                                    cols={50}
                                    placeholder="Type price up to two decimal places (e.g. 14.99)"
                                    defaultValue={formPrice}
                                    onChange={(e) => {
                                        setFormPrice(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="formDesc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="textarea" 
                            placeholder="Type your product description here..."
                            defaultValue={formDesc}
                            onChange={(e) => {setFormDesc(e.target.value)}}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={() => {submitProduct(product.productId)}}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default AdminProductModal;