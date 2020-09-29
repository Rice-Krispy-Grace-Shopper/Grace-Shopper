const router = require('express').Router()
const {Op} = require('sequelize')
const {Cart, Product} = require('../db/models')
module.exports = router

// GET /api/cart/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    // retrieve user's cart -- an array of arrays containing pointer to productIds & qty in cart
    // shape of cart: [ [ productId, productQty], ... ]
    const cart = await Cart.findOne({
      where: {userId: req.params.userId}
    })

    // retrive a collection of products to server up -- based on cart's pointers to productIds
    const productsInCart = await Product.findAll({
      where: {
        id: {
          [Op.in]: cart.contents.map(item => item[0])
        }
      }
    })

    // add quantities to each single product on cart collection before serving up:
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

// PUT /api/cart/:userId -- SAVE GUEST CART
router.put('/:userId', async (req, res, next) => {
  try {
    // req.body shape --> [ [ 1, 4 ], [ 12, 2 ] ]
    const cart = await Cart.findOne({
      where: {userId: req.params.userId}
    })
    cart.contents = req.body
    cart.changed('contents', true)
    await cart.save()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// POST /api/cart/:userId/:productId/add -- add item to cart
router.post('/:userId/:productId/add', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.userId}
    })

    cart.contents.push([+req.params.productId, 0])
    cart.changed('contents', true)
    await cart.save()

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// PUT /api/cart/:userId/:productId/inc -- increment item qty in cart
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

    // double check first but don't think this is used, just sendStatus(204)
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

// PUT /api/cart/:userId/:productId/dec --  decrement item qty in cart
router.put('/:userId/:productId/dec', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.userId}
    })

    cart.contents.forEach(item => {
      let productId = item[0]

      // decrement quantity for that product in cart
      if (productId === Number(req.params.productId)) item[1]--
    })

    cart.changed('contents', true)
    await cart.save()

    // double check first but don't think this is used, just sendStatus(204)
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/cart/:userId/:productId/delete -- remove item from cart
router.delete('/:userId/:productId/delete', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.userId}
    })
    const itemIdx = cart.contents.findIndex(
      item => item[0] === +req.params.productId
    )

    // conditional is just a safety net in case findIndex returns -1, but it never should:
    if (itemIdx >= 0) cart.contents.splice(itemIdx, 1)
    cart.changed('contents', true)
    await cart.save()

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/cart/:userId/
router.delete('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.userId}
    })

    cart.contents = []
    cart.changed('contents', true)
    await cart.save()

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
