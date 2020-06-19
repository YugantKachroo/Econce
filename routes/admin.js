const path = require('path');

const express = require('express');

const isAuth = require('../middleware/is-auth');

const {
  getAddProduct,
  getProducts,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', isAuth, getAddProduct);

router.get('/products', isAuth, getProducts);

router.post('/add-product', isAuth, postAddProduct);

router.get('/edit-product/:productId', isAuth, getEditProduct);

router.post('/edit-product', isAuth, postEditProduct);

router.post('/delete-product', isAuth, postDeleteProduct);

module.exports = router;
