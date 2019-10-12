// import all required library
const express = require('express')
const app = express()
const logger = require('morgan')
const router = require('./src/index')
const uuid = require('uuid/v1')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

// use the library
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(fileUpload())

// port setting
const port = process.env.SERVER_PORT || 5000

// image
app.use(express.static(__dirname + '/uploads'));
app.options('/api/products',cors())
app.options('/api/products/dailyIncome',cors())
app.options('/api/products/:id',cors())
app.options('/api/categories',cors())

// parent route
app.use('/api', router)

// listening to port
app.listen(port, () => {
  console.log('listening to port ' + port)
})

// page not found handler
app.get('*', (req, res) => {
  console.log('404 not found')
})
