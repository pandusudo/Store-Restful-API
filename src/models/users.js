const conn = require('../config/db')

module.exports = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      conn.query('select id, username from users', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  register: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('select username from users where username = ?', data.username, (err, result) => {
        if (result.length < 1) {
          conn.query('insert into users set username = ?, password = ?', [data.username, data.hash], (err, res) => {
            if (!err) {
              resolve(res)
            } else {
              reject(err)
            }
          })
        } else {
          reject(new Error('username is already use'))
        }
      })
    })
  },
  updateUser: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('select username from users where username = ?', data.username, (err, result) => {
        if (result.length < 1) {
          conn.query('update users set ? where id = ?', [data, id], (err, res) => {
            if (!err) {
              resolve(res)
            } else {
              reject(err)
            }
          })
        } else {
          reject(new Error('username is already use'))
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
