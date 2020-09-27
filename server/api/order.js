const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

// POST /api/order/:userId
router.post('/:userId', async (req, res, next) => {
  try {
    // req.body shape --> [ [ 1, 4, 299 ], [ 12, 2, 1999 ] ]
    const order = await Order.create({
      contents: req.body,
      userId: req.params.userId
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})
