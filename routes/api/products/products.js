import express from 'express'
import storeApp from './store';
import adminApp from './admin';
import productsData from '../../../data/products';
const APP = express();

APP.set('products', productsData);
APP.use('/store', storeApp);
APP.use('/admin', adminApp);

export default APP;