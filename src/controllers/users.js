const userModel = require('../models/users')
const uuidv1 = require('uuid/v1')
const conn = require('../config/db')
const jwt = require('jsonwebtoken')

module.exports = {
  login: (req, res) => {
    var { username, password } = req.body

    if (username && password) {
      conn.query('select * from users where username = ? && password = ?', [username, password], (err, result) => {
        if (result.length < 1) {
          return res.json({
            success: false,
            message: 'Username and password not found'
          })
        }
        const token = jwt.sign({ username: username }, process.env.SECRET_KEY, { expiresIn: '24h' })
        res.json({
          success: true,
          message: 'authentication success!',
          token: token
        })
      })
    } else {
      res.json({
        success: false,
        message: 'please insert username or password'
      })
    }
  },
  getAllUsers: (req, res) => {
    userModel.getAllUsers().then(result => {
      res.json({
        status: 200,
        message: 'success to get all users',
        data: result
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        message: 'error to get all users'
      })
    })
  },
  register: (req, res) => {
    var str = ''
    var id = uuidv1(null, str, 15)
    var { username, password } = req.body
    var data = { id, username, password }

    userModel.register(data).then(result => {
      res.json({
        status: 200,
        message: 'registration success'
      })
    }).catch(err => {
      res.status(500).json({
        status: 500,
        message: 'registration failed'
      })
    })
  },
  updateUser: (req, res) => {
    var { username, password } = req.body
    var data = { username, password }
    var id = req.params.id

    userModel.updateUser(data, id).then(result => {
      res.json({
        status: 200,
        message: 'update success'
      })
    }).catch(err => {
      res.status(500).json({
        status: 500,
        message: 'update error'
      })
    })
  },
  deleteUser: (req, res) => {
    var id = req.params.id

    userModel.deleteUser(id).then(result => {
      res.json({
        status: 200,
        message: 'delete success'
      })
    }).catch(err => {
      res.status(500).json({
        status: 500,
        message: 'delete error'
      })
    })
  }
}
