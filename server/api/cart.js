const router = require('express').Router()
const {Op} = require('sequelize')
const {Cart, Product} = require('../db/models')
module.exports = router

// GET /api/cart/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.userId}
    })

    // below conditional is added because cart is null for users I haven't seeded a cart for
    // we should probably initilize an empty cart for every user when the user is created when we get there
    // when that is done, this conditional can be removed (because cart will always exist for a logged in user)
    if (!cart) {
      res.json('no items in cart')
      return
    }

    const productsInCart = await Product.findAll({
      where: {
        id: {
          [Op.in]: cart.contents.map(item => item[0])
        }
      }
    })

    // add quantities to each single product before serving up:
    productsInCart.forEach(product => {
      const quantity = cart.contents.find(item => item[0] === product.id)[1]
      Object.assign(product.dataValues, {
        qty: quantity
      })
    })

    res.json(productsInCart)
  } catch (err) {
    next(err)
  }
})

// PUT /api/cart/:userId/:productId/inc
router.put('/:userId/:productId/inc', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.userId}
    })

    cart.contents.forEach(item => {
      let productId = item[0]

      // increment quantity for that product in cart
      if (productId === Number(req.params.productId)) item[1]++
    })

    cart.changed('contents', true)
    await cart.save()

    res.json(cart)
  } catch (error) {
    next(error)
  }
})

// PUT /api/cart/:userId/:productId/dec
router.put('/:userId/:productId/dec', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.userId}
    })

    cart.contents.forEach(item => {
      let productId = item[0]

      // decrement quantity for that product in cart (if positive qty exists)
      if (productId === Number(req.params.productId) && item[1] > 0) item[1]--
    })

    cart.changed('contents', true)
    await cart.save()

    res.json(cart)
  } catch (error) {
    next(error)
  }
})
