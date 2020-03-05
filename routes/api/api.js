import express from 'express'
import productsApp from './products/products';
const APP = express();

APP.use('/products', productsApp);

export default APP;