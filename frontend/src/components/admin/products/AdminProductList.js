import Axios from 'axios';
import { Button } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import { PRODUCT_URL } from '../../utils/Constants';
import AdminProductDescription from './AdminProductDescription';
import AdminProductModal from './AdminProductModal';

function AdminProductsList() {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        await Axios.get(PRODUCT_URL)
        .then((response) => {
            setProducts(response.data)
        });
    };

    const deleteProduct = async (productId) => {
        if(window.confirm("Do you wish to delete this product?")){
            await Axios.delete(`${PRODUCT_URL}/${productId}`)
            .then((response) => {
                getProducts();
            });
        }
    }

    useEffect(() => {
      getProducts();  
    }, []);

    return(
        <>
            <div>
                <h1>Home</h1>
                <div>
                    <Button className="align-left" variant="primary" onClick={getProducts}>Refresh</Button>
                    <AdminProductModal doesExist={false} getProducts={getProducts}/>
                </div>
                <table className="text-center">
                    <thead>
                        <tr>
                            <th>ProductID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price (in €)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*
                            insert data here through backend
                        */}
                        {products.length === 0 &&
                            <tr>
                                <td colSpan={5}>
                                    No data found. Please reload.
                                </td>
                            </tr>
                        }
                        {products && products.map((product, index) => {
                            return(
                                <>
                                    <tr key={index}>
                                        <td>{product.ProductID}</td>
                                        <td>{product.ProductName}</td>
                                        <AdminProductDescription product={product}/>
                                        <td>{product.ProductPrice}</td>
                                        <td>
                                            <AdminProductModal 
                                                product={product}  
                                                doesExist={true}
                                                getProducts={getProducts}
                                            />
                                            <Button variant="danger" 
                                                onClick={() => {deleteProduct(product.ProductID)}}
                                            >
                                                Delete
                                            </Button>
                                        </td>
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

export default AdminProductsList;