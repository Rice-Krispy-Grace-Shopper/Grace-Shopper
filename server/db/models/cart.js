const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  contents: {
    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER))
  }
})

module.exports = Cart
