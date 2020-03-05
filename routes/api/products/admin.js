import express from 'express';
import productsUtils from '../../../modules/products';
import {v4 as uuidv4} from 'uuid'
const APP = express();
let products = [];
APP.use(
    (req,res,next) => {
        products = APP.get('products');
        next();
    }
);
APP.get('/', (req, res) => {
    let filters = req.query;
    if(filters.id) {
        products = productsUtils.filter(products, 'id', filters.id);
    }
    res.send(products);
});

APP.get('/:id', (req, res) => {
    let product = productsUtils.find(products, 'id', req.params.id);
    let response = {};
    let statusCode = 201;
    response = {
        result: 'Ok',
        data: product
    };
    if(!product) {
        response = {
            result: 'Error',
            data: null
        };
        statusCode = 404;
    }
    res.status(statusCode);
    res.send(response);
});

APP.post('/', (req, res) => {
    let product = {
        ...req.body,
        price: Number(req.body.price),
        qty: Number(req.body.qty),
        id: uuidv4()
    };
    products.push(product);
    res.send(product);
});

APP.put('/:id', (req, res) => {
    let product = productsUtils.find(products, 'id', req.params.id);
    let response = {};
    let statusCode = 200;
    if(!product) {
        response = {
            result: 'Error',
            data: null
        };
        statusCode = 404;
    } else {
        Object.assign(product, req.body);
        response = {
            result: 'Ok',
            data: product
        };
        statusCode = 200;
    }
    res.status(statusCode);
    res.send(response);
});

APP.delete('/:id', (req,res) => {
    products = productsUtils.deleteItemByKey(products, 'id', req.params.id);
    APP.set('products', products);
    res.status(200);
    res.send({result: 'Ok'});
});

export default APP;