import React, {useState} from 'react';
import Axios from 'axios';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { ADDRESS_URL } from '../utils/Constants';

function BasketAddressModal(props){
    const address = props.address ? props.address : {};
    const hasAddress = props.hasAddress;
    const userId = props.userId;
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formStreet, setFormStreet] = useState(() => {
        return address.Street ? address.Street : "";
    });

    const [formPostcode, setFormPostcode] = useState(() => {
        return address.Postcode ? address.Postcode : "";
    });

    const [formCity, setFormCity] = useState(() => {
        return address.City ? address.City : "";
    });

    const submitAddress = async (userId) => {
        switch(hasAddress){
            case true:
                await Axios.patch(`${ADDRESS_URL}/${userId}`, {
                    street: formStreet,
                    postcode: formPostcode,
                    city: formCity           
                }).then((response) => {
                    handleClose();
                    props.getAddress();
                })
                break;
            default:
                await Axios.post(`${ADDRESS_URL}/${userId}`, {
                    street: formStreet,
                    postcode: formPostcode,
                    city: formCity           
                }).then((response) => {
                    handleClose();
                    props.getAddress();
                })
        }
    }

    return (
        <>
            <div>
                {!hasAddress && 
                    <Button onClick={handleShow}>Ajouter votre adresse</Button>
                }
                {hasAddress && 
                    <Button onClick={handleShow}>Modifier votre adresse</Button>
                }
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        {!hasAddress && 
                            <Modal.Title>Ajouter votre adresse</Modal.Title>
                        }
                        {hasAddress && 
                            <Modal.Title>Modifier votre adresse</Modal.Title>
                        }
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <Form.Group controlId="formStreet">
                                <Form.Label>Street name and number</Form.Label>
                                <Form.Control type="text" 
                                    placeholder="Format: {Street name} {number}"
                                    defaultValue={formStreet}
                                    onChange={(e) => {setFormStreet(e.target.value)}}
                                />
                                <Form.Text className="text-muted">
                                    You may also write the number before the street name.
                                </Form.Text>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formPostcode">
                                        <Form.Label>Postcode</Form.Label>
                                        <Form.Control type="text" 
                                        placeholder="e.g. 1000"
                                        defaultValue={formPostcode}
                                        onChange={(e) => {setFormPostcode(e.target.value)}}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" 
                                        placeholder="e.g. Bruxelles"
                                        defaultValue={formCity}
                                        onChange={(e) => {setFormCity(e.target.value)}}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button onClick={() => {submitAddress(userId)}}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        </>
    )
}

export default BasketAddressModal;