const productModel = require('../models/products')
const uuidv1 = require('uuid/v1')
const mv = require('mv')

module.exports = {
  getProducts: (req, res) => {
    var { name, limit, page, sortBy, sortType } = req.query

    name = typeof name !== 'undefined' ? name : ''
    page = typeof page !== 'undefined' ? page : 0
    limit = typeof limit !== 'undefined' ? limit : 9999999999999999999
    sortBy = typeof sortBy !== 'undefined' ? sortBy : 'count'
    sortType = typeof sortType !== 'undefined' ? sortType : 'ASC'
    productModel.getProducts(name, page, limit, sortBy, sortType).then(result => {
      res.json({
        count: result.length,
        status: 200,
        data: result,
        message: 'success to get all products'
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        message: err
      })
    })
  },
  getDailyIncome: (req, res) => {
    productModel.getDailyIncome().then(result => {
      res.json({
        status: 200,
        data: result,
        message: "daily Income"
      })
    }).catch(err => {
      res.status(500).json({
        status: 500,
        message: "no daily income"
      })
    })
  },
  getWeeklyIncome: (req, res) => {
    productModel.getWeeklyIncome().then(result => {
      res.json({
        status: 200,
        data: result,
        message: "weekly Income"
      })
    }).catch(err => {
      res.status(500).json({
        status: 500,
        message: "no weekly income"
      })
    })
  },
  getAnnualIncome: (req, res) => {
    productModel.getAnnualIncome().then(result => {
      res.json({
        status: 200,
        data: result,
        message: "annual Income"
      })
    }).catch(err => {
      res.status(500).json({
        status: 500,
        message: "no annual income"
      })
    })
  },
  getMonthlyIncome: (req, res) => {
    productModel.getMonthlyIncome().then(result => {
      res.json({
        status: 200,
        data: result,
        message: "monthly Income"
      })
    }).catch(err => {
      res.status(500).json({
        status: 500,
        message: "no monthly income"
      })
    })
  },
  addProduct: (req, res) => {
    const date_updated = new Date()
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'no files were uploaded'
      })
    }

    const img = req.files.image
    const fileType = img.mimetype
    var type = ''

    if (fileType !== 'image/png' && fileType !== 'image/gif' && fileType !== 'image/jpeg') {
      return res.status(400).send('file is not in image format')
    }

    if (fileType === 'image/png') {
      type = 'png'
    }
    if (fileType === 'image/gif') {
      type = 'gif'
    }
    if (fileType === 'image/jpeg') {
      type = 'jpg'
    }

    var random_id = Math.floor(Math.random() * 10) + 4

    const image = 'img-' + Date.now() + '-' + random_id + '.' + type

    var str = ''
    var id = uuidv1(null, str, 15)
    const { name, description, price, date_updated, count, id_category } = req.body
    const data = { id, name, description, price, image, date_updated, count, id_category }

    productModel.addProduct(data, img).then(result => {
      res.json({
        status: 200,
        message: 'add product success',
        data: data
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        message: err
      })
    })
  },
  updateProduct: (req, res) => {
    const date_updated = new Date()
    const { name, description, price, count, id_category } = req.body
    var data

    // check if user update the image or not
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log('no file')
      data = { name, description, price, date_updated, count, id_category }
      console.log(data)
    } else {
      const img = req.files.image
      var fileType = img.mimetype
      var type = ''

      if (fileType !== 'image/png' && fileType !== 'image/gif' && fileType !== 'image/jpeg') {
        return res.status(400).send('file is not in image format')
      }

      if (fileType === 'image/png') {
        type = 'png'
      }
      if (fileType === 'image/gif') {
        type = 'gif'
      }
      if (fileType === 'image/jpeg') {
        type = 'jpg'
      }

      var random_id = Math.floor(Math.random() * 10) + 4

      const image = 'img-' + Date.now() + '-' + random_id + '.' + type

      img.mv('uploads/' + image, (err) => {
        if (err) return res.status(500).send(err)
        console.log('success upload file')
      })

      data = { name, description, price, image, date_updated, count, id_category }
    }

    // console.log(data)
    const id = req.params.id

    productModel.updateProduct(data, id).then(result => {
      res.json({
        status: 200,
        message: 'update product success',
        data: data,
        id: id
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        message: err
      })
    })
  },
  deleteProduct: (req, res) => {
    const id = req.params.id

    productModel.deleteProduct(id).then(result => {
      res.json({
        status: 200,
        message: 'delete product success'
      })
    }).catch(err => {
      res.status(500).json({
        status: 500,
        message: err
      })
    })
  },
  reduceProduct: (req, res) => {
    const id = req.params.id
    const { count } = req.body
    productModel.reduceProduct(id, count).then(result => {
      res.json({
        status: 200,
        message: 'success reduce product quantity by ' + count
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        message: err
      })
    })
  },
  getHistory: (req, res) => {
    productModel.getHistory().then(result => {
      res.json({
        status: 200,
        data: result,
        message: 'success to get all history'
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        message: err
      })
    })
  },
  addHistory: (req, res) => {
    var {product, price, amount} = req.body
    var data = {product, price, amount}
    productModel.addHistory(data).then(result => {
      res.json({
        status: 200,
        message: 'success to add data'
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
