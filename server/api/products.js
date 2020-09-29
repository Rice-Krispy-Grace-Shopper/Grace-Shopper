const router = require('express').Router()
const {Product} = require('../db/models')
const {User} = require('../db/models')

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

const isAdmin = (req, res, next) => {
  if (User.isAdmin === 'no') {
    const error = new Error('You are not an Admin!')
    res.status(401).send(error)
    return next(error)
  } else {
    next()
  }
}
// Post route for admin - Add products
router.post('/', isAdmin, async (req, res, next) => {
  console.log('THIS IS THE ROUTE', req.body)
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})
// Put route for admin - Edit products
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const item = await Product.findByPk(req.params.id)
    const updatedItem = await item.update(req.body)
    res.json(updatedItem)
  } catch (error) {
    next(error)
  }
})
// Delete route for admin - Remove products
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.id}})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
