const router = require('express').Router()
const {Op} = require('sequelize')
const {Cart, Product} = require('../db/models')
module.exports = router

// POST /api/order
router.post('/', async (req, res, next) => {
  try {
    res.json('testing order route')
  } catch (error) {
    next(error)
  }
})
