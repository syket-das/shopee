const Product = require('../models/product');
const dotenv = require('dotenv');

const connectDatabse = require('../config/database');

const products = require('../data/products.json');

// setting env file
dotenv.config({ path: 'backend/config/config.env' });

 connectDatabse();

const seedProducts = async () => {
    try {
    await Product.deleteMany();
    console.log('Products Deleted');
    await Product.insertMany(products);
    console.log('Products Seeded Successfully');

    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

seedProducts();
