const path = require('path');

const express = require('express');
const { body, check } = require('express-validator');

const {
  getAddProduct,
  getEditProduct,
  getProducts,
  postAddProduct,
  deleteProduct,
  postEditProduct,
} = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-product', isAuth, getAddProduct);

router.get('/products', isAuth, getProducts);

router.post(
  '/add-product',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('price').isFloat(),
    body('description').isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  postAddProduct
);

router.get('/edit-product/:productId', isAuth, getEditProduct);

router.post(
  '/edit-product',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('price').isFloat(),
    body('description').isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  postEditProduct
);

router.delete('/product/:productId', isAuth, deleteProduct);

module.exports = router;
