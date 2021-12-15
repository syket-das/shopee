const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());

// Import all the routes
const products = require('./routes/product');

app.use('/api/v1', products);

app.use(( req,res, next) => {
    const error = new Error('Not found')
    res.status(404)
    next(error)

})

// middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
