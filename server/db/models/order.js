const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  contents: {
    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER)),
    defaultValue: []
  }
})

module.exports = Order
