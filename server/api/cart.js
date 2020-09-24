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

    // below conditional is added because cart is null for users I haven't seeded a cart for
    // we should probably initilize an empty cart for every user when the user is created when we get there
    // when that is done, this conditional can be removed (because cart will always exist for a logged in user)
    if (!cart) {
      res.json('no items in cart')
      return
    }

    // retrive a collection of products to server up -- based on cart with pointers
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
