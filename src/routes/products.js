const express = require('express')
const Route = express.Router()
const middleware = require('../../auth/middleware')
const cors = require('cors')

const productController = require('../controllers/products')

var allowedOrigin = ['http://localhost:5000', 'http://example.com']

var corsOptionsDelegate = (req, callback) => {
  var corsOptions
  if (!req.header('Origin')) return callback(null, true)
  if (allowedOrigin.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}

Route
  .get('/', cors(), productController.getProducts)
  .post('/', cors(corsOptionsDelegate), middleware.checkToken, productController.addProduct)
  .put('/:id', cors(corsOptionsDelegate), middleware.checkToken, productController.updateProduct)
  .delete('/:id', cors(corsOptionsDelegate), middleware.checkToken, productController.deleteProduct)
  .post('/reduce/:id', cors(corsOptionsDelegate), middleware.checkToken, productController.reduceProduct)

module.exports = Route
