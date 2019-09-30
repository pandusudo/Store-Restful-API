// import all required library
const express = require('express')
const app = express()
const logger = require('morgan')
const router = require('./src/index')
const uuid = require('uuid/v1')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
require('dotenv/config')

// use the library
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(fileUpload())

// port setting
const port = process.env.SERVER_PORT || 5000

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
