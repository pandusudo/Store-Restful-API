const express = require('express')
const Route = express.Router()

// import all routes
const products = require('./routes/products')
const categories = require('./routes/categories')
const users = require('./routes/users')

// Routes
Route.use('/products', products)
Route.use('/categories', categories)
Route.use('/users', users)

module.exports = Route
