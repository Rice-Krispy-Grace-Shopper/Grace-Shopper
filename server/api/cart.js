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
          [Op.in]: cart.contents
        }
      }
    })

    res.json(productsInCart)
  } catch (err) {
    next(err)
  }
})
