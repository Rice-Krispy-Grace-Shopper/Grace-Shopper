const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

// GET /api/order/:userId -- GET ALL OF A USERS ORDERS
router.get('/:userId', async (req, res, next) => {
  try {
    const ordersData = await Order.findAll({
      where: {userId: req.params.userId},
      attributes: ['id', 'contents', 'createdAt']
    })

    // transform order data into a useful object
    const orders = ordersData.map(order => ({
      id: order.id,
      contents: order.contents.map(item => ({
        productId: item[0],
        qty: item[1],
        price: item[2]
      })),
      orderDate: order.createdAt
    }))

    // orders:
    // [
    //   {
    //     "id": 4,
    //     "contents": [
    //         {
    //           "productId": 1,
    //           "qty": 2,
    //           "price": 615
    //         },
    //         {
    //           "productId": 6,
    //           "qty": 4,
    //           "price": 432
    //         }
    //       ],
    //     "orderDate": 2020-09-01-00-00-00...
    //   },
    //   ...
    // ]

    res.json(orders)
  } catch (error) {
    next(error)
  }
})

// POST /api/order/:userId -- SUBMIT AN ORDER
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
