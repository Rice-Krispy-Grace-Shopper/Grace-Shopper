const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

const isAdminMiddleware = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const error = new Error('You are not an Admin!')
    error.status = 401
    next(error)
  } else {
    next()
  }
}

//get all products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({})
    if (allProducts) res.json(allProducts)
    else res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

//get single product by id
router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findOne({
      where: {id: req.params.id}
    })
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})
//delete single product -- admin only
router.delete(':id', isAdminMiddleware, async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.id}})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//update single product -- admin only
router.put(':id', isAdminMiddleware, async (req, res, next) => {
  try {
    const selectedProduct = await Product.findOne({
      where: {id: req.params.id}
    })
    if (selectedProduct) {
      const updated = await Product.update(req.body)
      res.json(updated)
    } else {
      res.status(404).send('Product not found')
    }
  } catch (error) {
    next(error)
  }
})

//add single produc --admin only
router.post('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})
