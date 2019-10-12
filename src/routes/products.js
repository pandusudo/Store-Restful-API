const express = require('express')
const Route = express.Router()
const middleware = require('../../auth/middleware')
const cors = require('cors')

const productController = require('../controllers/products')

var allowedOrigin = ['http://localhost:3333', 'http://localhost:3000']

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
  .get('/', cors(), middleware.checkToken, productController.getProducts)
  .get('/dailyIncome', cors(), productController.getDailyIncome)
  .get('/weeklyIncome', cors(), productController.getWeeklyIncome)
  .get('/annualIncome', cors(), productController.getAnnualIncome)
  .get('/monthlyIncome', cors(), productController.getMonthlyIncome)
  .post('/', cors(), productController.addProduct)
  .put('/:id', cors(), productController.updateProduct)
  .delete('/:id', productController.deleteProduct)
  .post('/reduce/:id', cors(), middleware.checkToken, productController.reduceProduct)
  .get('/history', cors(), middleware.checkToken, productController.getHistory)
  .post('/history', cors(), middleware.checkToken, productController.addHistory)

module.exports = Route
