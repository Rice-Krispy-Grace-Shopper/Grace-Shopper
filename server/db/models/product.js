const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://previews.123rf.com/images/juliasart/juliasart1705/juliasart170500378/77767096-vector-illustration-cereal-bowl-with-milk-smoothie-isolated-on-white-background-.jpg'
  }
})

module.exports = Product
