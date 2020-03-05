import express from 'express'
import storeApp from './store';
import adminApp from './admin';
import productsData from '../../../data/products';
const APP = express();
let sales = [];
APP.set('products', productsData);
APP.set('sales', sales);
APP.use('/store', storeApp);
APP.use('/admin', adminApp);

export default APP;