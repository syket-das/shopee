const Product = require('../models/product');

// create new product  => /api/v1/product/new

exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,

    product,
  });
};

exports.getProducts = async(req, res, next) => {
  const products = await Product.find()
  res.status(200).json({
    success: true,
    products,
  });
};

// get single product => /api/v1/product/:id

exports.getSingleProduct = async(req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    success: true,
    product,
  });
}
