const express = require('express')
const Route = express.Router()
const middleware = require('../../auth/middleware')
const cors = require('cors')

const userController = require('../controllers/users')

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
  .get('/', cors(corsOptionsDelegate), middleware.checkToken, userController.getAllUsers)
  .post('/login', cors(), userController.login)
  .post('/register', cors(), userController.register)
  .put('/:id', cors(corsOptionsDelegate), middleware.checkToken, userController.updateUser)
  .delete('/:id', cors(corsOptionsDelegate), middleware.checkToken, userController.deleteUser)

module.exports = Route
