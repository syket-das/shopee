const mongoose = require('mongoose');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler')

// create new product  => /api/v1/product/new

exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,

    product,
  });
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

// get single product => /api/v1/product/:id

exports.getSingleProduct = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler('Invalid ID', 400));
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
};

// update product  => /api/v1/product/:id

exports.updateProduct = async (req, res, next) => {
  console.log(req.body);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID',
    });
  }

  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};


// delete product  => /api/v1/product/:id

 exports.deleteProduct = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID',
    });
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
}
