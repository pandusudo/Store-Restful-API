const categoriesModel = require('../models/categories')
const uuidv1 = require('uuid/v1')
const redis = require('redis')
const client = redis.createClient(6379)
const categoriesRedisKey = 'user: category'

module.exports = {
  getCategories: (req, res) => {
    return client.get(categoriesRedisKey, (err, categories) => {
      if (categories) {
        const result = JSON.parse(categories)
        return res.json({
          count: result.length,
          status: 200,
          data: result,
          message: 'success to get all categories'
        })
      } else {
        categoriesModel.getCategories().then(result => {
          client.setex(categoriesRedisKey, 3600, JSON.stringify(result))
          res.json({
            count: result.length,
            status: 200,
            data: result,
            message: 'success to get all categories'
          })
        }).catch(err => {
          // console.log(err)
          res.status(500).json({
            status: 500,
            message: err
          })
        })
      }
    })
  },
  addCategories: (req, res) => {
    var str = ''
    var id = uuidv1(null, str, 15)

    const { name_category } = req.body
    const data = { id, name_category }

    categoriesModel.addCategories(data).then(result => {
      client.del(categoriesRedisKey, function (err, reply) {
        console.log(reply)
      })
      res.json({
        status: 200,
        data: result,
        message: 'success to add category'
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        message: err
      })
    })
  },
  updateCategories: (req, res) => {
    const { name_category } = req.body
    const data = { name_category }
    const id = req.params.id

    categoriesModel.updateCategories(data, id).then(result => {
      client.del(categoriesRedisKey, function (err, reply) {
        console.log(reply)
      })
      res.json({
        status: 200,
        data: result,
        message: 'success to update '
      })
    }).catch(err => {
      res.status(500).json({
        status: 500,
        message: err
      })
    })
  },
  deleteCategories: (req, res) => {
    const id = req.params.id

    categoriesModel.deleteCategories(id).then(result => {
      client.del(categoriesRedisKey, function (err, reply) {
        console.log(reply)
      })
      res.json({
        status: 200,
        data: result,
        message: 'delete category success'
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        message: err
      })
    })
  }
}
