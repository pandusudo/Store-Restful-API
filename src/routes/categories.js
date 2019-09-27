const express = require('express')
const Route = express.Router()
const middleware = require('../../auth/middleware')
const cors = require('cors')

const categoriesController = require('../controllers/categories')

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
  .get('/', cors(corsOptionsDelegate), categoriesController.getCategories)
  .post('/', cors(corsOptionsDelegate), middleware.checkToken, categoriesController.addCategories)
  .put('/:id', cors(corsOptionsDelegate), middleware.checkToken, categoriesController.updateCategories)
  .delete('/:id', cors(corsOptionsDelegate), middleware.checkToken, categoriesController.deleteCategories)

module.exports = Route
