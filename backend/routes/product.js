const express = require('express');
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
} = require('../controllers/productController');

router.route('/products').get(getProducts);

router.route('/product/new').post(newProduct);

router.route('/product/:id').get(getSingleProduct);

module.exports = router;
