const conn = require('../config/db')

module.exports = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      conn.query('select id, username from users', (err, result) => {
        if (result.length > 0) {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        } else {
          reject('No Users')
        }
      })
    })
  },
  register: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('select username from users where username = ?', data.username, (err, result) => {
        if (result.length < 1) {
          conn.query('insert into users set username = ?, password = ?, id = ?', [data.username, data.hash, data.id], (err, res) => {
            if (!err) {
              resolve(res)
            } else {
              reject(err)
            }
          })
        } else {
          reject('username is already use')
        }
      })
    })
  },
  updateUser: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('select username from users where username = ? && id != ?', [data.username, id], (err, result) => {
        if (result.length < 1) {
          conn.query('update users set ? where id = ?', [data, id], (err, res) => {
            if (!err) {
              resolve(res)
            } else {
              reject(err)
            }
          })
        } else {
          reject('username is already use')
        }
      })
    })
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('select * from users where id = ?', id, (err, result) => {
        if (result.length > 0) {
          conn.query('delete from users where id = ?', id, (err, res) => {
            if (!err) {
              resolve(res)
            } else {
              reject(err)
            }
          })
        } else {
          reject('id not found')
        }
      })
    })
  }
}
