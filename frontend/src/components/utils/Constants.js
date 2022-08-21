import React from 'react';

export const PRODUCT_URL = `http://localhost:3001/products`;

export const USER_URL = `http://localhost:3001/users`;

export const ADDRESS_URL = `http://localhost:3001/address`;

export const LOGIN_URL = `http://localhost:3001/sessions`;

export const ORDER_URL = `http://localhost:3001/orders`;

export const AXIOS_CONFIGURATION = {
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
};