const categoriesModel = require('../models/categories')
const uuidv1 = require('uuid/v1')

module.exports = {
  getCategories: (req, res) => {
    categoriesModel.getCategories().then(result => {
      res.json({
        status: 200,
        data: result,
        message: 'success to get all categories'
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        message: 'error to get all categories'
      })
    })
  },
  addCategories: (req, res) => {
    var str = ''
    var id = uuidv1(null, str, 15)

    const { name_category } = req.body
    const data = { id, name_category }

    categoriesModel.addCategories(data).then(result => {
      res.json({
        status: 200,
        data: result,
        message: 'success to add category'
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        message: 'error to add category'
      })
    })
  },
  updateCategories: (req, res) => {
    const { name_category } = req.body
    const data = { name_category }
    const id = req.params.id

    categoriesModel.updateCategories(data, id).then(result => {
      res.json({
        status: 200,
        data: result,
        message: 'success to update '
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        message: 'error to update'
      })
    })
  },
  deleteCategories: (req, res) => {
    const id = req.params.id

    categoriesModel.deleteCategories(id).then(result => {
      res.json({
        status: 200,
        data: result,
        message: 'delete category success'
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        message: 'delete category console.error();'
      })
    })
  }
}
