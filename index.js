const express = require('express')
const app = express()
const logger = require('morgan')
const router = require('./src/index')
const uuid = require('uuid/v1')
const fileUpload = require('express-fileupload')
require('dotenv/config')

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(fileUpload())

const port = process.env.SERVER_PORT || 5000

app.use('/api', router)

app.listen(port, () => {
  console.log('listening to port ' + port)
})

app.get('*', (req, res) => {
  console.log('404 not found')
})
