import express from 'express'
import productsUtils from '../../../modules/products';
const APP = express();

let products = [];
let sales = [];
APP.use(
    (req,res,next) => {
        products = APP.get('products');
        sales = APP.get('sales');
        next();
    }
);

APP.get('/', (req, res) =>{
    let filters = req.query;
    if(filters.id) {
        products = productsUtils.filter(products, 'id', filters.id);
    }
    products = products.filter(product => product.qty > 0);
    res.send(products);
});

APP.put('/:id', (req, res) => {
    let product = productsUtils.find(products, 'id', req.params.id);
    let response = {};
    let statusCode = 200;
    if(!product || product.qty == 0) {
        response = {
            result: 'Not found',
            data: null
        };
        statusCode = 404;
    } else if(product.qty < req.body.qty) {
        response = {
            result: 'No stock enough',
            data: null
        };
        statusCode = 404;
    } else {
        product.qty = product.qty - req.body.qty;
        let sale = {
            ...product,
            qty: req.body.qty
        }
        sales.push(sale);
        response = {
            result: 'Ok',
            data: sale
        };
    }
    res.status(statusCode);
    res.send(response);
    
})

export default APP;