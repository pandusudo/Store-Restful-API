const conn = require('../config/db')
const fs = require('fs')
const mv = require('mv')
// const uuid = require('uuid/v1')

module.exports = {
  getProducts: (name, page, limit, sortBy, sortType) => {
    const pageInt = parseInt(page, 10)
    const limitInt = parseInt(limit, 10)
    return new Promise((resolve, reject) => {
      conn.query('select products.*, categories.name_category from products join categories on products.id_category = categories.id where products.name like ? ORDER BY ' + sortBy + ' ' + sortType + ' LIMIT ?,?', [`%${name}%`, pageInt, limitInt], (err, result) => {
        if (result.length > 0) {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        } else {
          reject('No Products')
        }
      })
    })
  },
  getDailyIncome: () => {
    return new Promise((resolve, reject) => {
      conn.query('select DAYNAME(date_created) as DAY, date_created, MONTHNAME(date_created) as MONTH, SUM(price) as INCOME, SUM(amount) as AMOUNT from history GROUP BY DAY(date_created) ORDER BY date_created ASC', (err, result) => {
        if(!err){
          resolve(result)
        } else {
          reject('error')
        }
      })
    })
  },
  getWeeklyIncome: () => {
    return new Promise((resolve, reject) => {
      conn.query('select DAYNAME(date_created) as DAY, date_created, WEEK(date_created) as WEEK, MONTHNAME(date_created) as MONTH, SUM(price) as INCOME, SUM(amount) as AMOUNT from history GROUP BY WEEK(date_created), DAY(date_created) ORDER BY date_created ASC', (err, result) => {
        if(!err){
          resolve(result)
        } else {
          reject('error')
        }
      })
    })
  },
  getAnnualIncome: () => {
    return new Promise((resolve, reject) => {
      conn.query('select DAYNAME(date_created) as DAY, MONTHNAME(date_created) as MONTH, SUM(price) as INCOME, SUM(amount) as AMOUNT from history GROUP BY YEAR(date_created), MONTH(date_created) ORDER BY date_created ASC', (err, result) => {
        if(!err){
          resolve(result)
        } else {
          reject('error')
        }
      })
    })
  },
  getMonthlyIncome: () => {
    return new Promise((resolve, reject) => {
      conn.query('select DAYNAME(date_created) as DAY, MONTHNAME(date_created) as MONTH, SUM(price) as INCOME, SUM(amount) as AMOUNT from history GROUP BY MONTH(date_created), WEEK(date_created) ORDER BY date_created ASC', (err, result) => {
        if(!err){
          resolve(result)
        } else {
          reject('error')
        }
      })
    })
  },
  addProduct: (data, img) => {
    return new Promise((resolve, reject) => {
      const countInt = parseInt(data.count, 10)
      conn.query('select * from products where name = ?', data.name, (err, outp) => {
        if (outp.length > 0) {
          conn.query('update products set count = ? where id = ?', [outp[0].count + countInt, outp[0].id], (err, updateResult) => {
            if (!err) {
              resolve(updateResult)
            } else {
              reject(err)
            }
          })
        } else {
          conn.query('select * from categories where id = ?', data.id_category, (err, checkCategory) => {
            if (checkCategory.length > 0) {
              img.mv('uploads/' + data.image, (err) => {
                if (err) return res.status(500).send(err)
                console.log('upload success')
              })
              conn.query('insert into products set ?', data, (err, result) => {
                if (!err) {
                  resolve(result)
                } else {
                  reject(err)
                }
              })
            } else {
              reject("CATEGORY ID YOU SUBMIT DOESN'T EXIST!!")
            }
          })
        }
      })
    })
  },
  updateProduct: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('select * from products where name = ?', data.name, (err, checkName) => {
        if (checkName.length < 1) {
          conn.query('select * from categories where id = ? ', data.id_category, (err, checkCategory) => {
            if (checkCategory.length > 0) {
              if (data.image) {
                conn.query('select * from products where id = ?', id, (err, img) => {
                  fs.unlink('uploads/' + img[0].image, (err) => {
                    if (err) {
                      reject(err)
                    }
                  })
                })
              }
              conn.query('update products set ? where id = ?', [data, id], (err, result) => {
                if (!err) {
                  resolve(result)
                } else {
                  reject(err)
                }
              })
            } else {
              reject("CATEGORY ID YOU SUBMIT DOESN'T EXIST!!")
            }
          })
        } else {
          reject('NAME IS ALREADY EXIST, USE ANOTHER NAME!')
        }
      })
    })
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('select * from products where id = ?', id, (err, resultSelect) => {
        if (resultSelect.length > 0) {
          fs.unlink('uploads/' + resultSelect[0].image, (err) => {
            if (err) {
              reject(err)
            }
          })
          conn.query('delete from products where id = ?', id, (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(err)
            }
          })
        } else {
          reject('your id is wrong')
        }
      })
    })
  },
  reduceProduct: (id, count) => {
    return new Promise((resolve, reject) => {
      conn.query('select * from products where id = ?', id, (err, result) => {
        if (result.length >= 0) {
          const quantity = result[0].count - count
          if (quantity > 0) {
            conn.query('update products set count = ? where id = ?', [quantity, id], (err, update) => {
              if (!err) {
                resolve(result)
              } else {
                reject(err)
              }
            })
          } else {
            reject('too much!')
          }
        } else {
          reject('your id is wrong')
        }
      })
    })
  },
  getHistory: () => {
    return new Promise((resolve, reject) => {
      conn.query('select * from history', (err, result) => {
        if (!err){
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  addHistory: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('insert into history set ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}
