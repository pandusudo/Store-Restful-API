const conn = require('../config/db')

module.exports = {
  getCategories: () => {
    return new Promise((resolve, reject) => {
      conn.query('select * from categories', (err, result) => {
        if (result.length < 1) {
          reject("No categories")
        }else {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        }
      })
    })
  },
  addCategories: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('insert into categories set ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  updateCategories: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('select * from categories where id = ?', id, (err, resultSelect) => {
        if (resultSelect.length > 0) {
          conn.query('update categories set ? where id = ?', [data, id], (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(err)
            }
          })
        } else {
          reject('ID NOT FOUND!')
        }
      })
    })
  },
  deleteCategories: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('select * from categories where id = ?', id, (err, resultSelect) => {
        if (resultSelect.length > 0) {
          conn.query('delete from categories where id = ?', id, (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(err)
            }
          })
        } else {
          reject('ID NOT FOUND')
        }
      })
    })
  }
}
