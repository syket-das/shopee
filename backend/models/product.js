const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxlength: [100, 'Product name must be less than 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter product name'],
    maxlength: [5, 'Product price must be less than 5 characters'],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: [true, 'Please enter product image'],
      },
      url: {
        type: String,
        required: [true],
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please enter product category'],
    enum: {
      values: [
        'Electronics',
        'Cameras',
        'Laptops',
        'Books',
        'Furnitures',
        'Foods',
        'Accessories',
        'Clothes/Shoes',
        'Beauty/Health',
        'Outdoor',
        'Home',
      ],
      message: 'Please enter a valid category',
    },
  },
  seller: {
    type: String,
    required: [true, 'Please enter product seller'],
  },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    maxlength: [5, 'Product stock must be less than 5 characters'],
    default: 0,
  },
  NumOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
