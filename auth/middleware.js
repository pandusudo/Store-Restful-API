const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization

  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length)
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token not found'
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    })
  }
}

module.exports = {
  checkToken: checkToken
}
