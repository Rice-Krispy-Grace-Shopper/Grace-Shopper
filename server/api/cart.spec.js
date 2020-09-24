/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const User = db.model('user')
const Cart = db.model('cart')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart/:userId', () => {
    beforeEach(async () => {
      await User.create({email: 'cody@email.com'})
      await Product.create({name: 'cheerios'})
      const cody = await User.findByPk(1)
      await cody.createCart()
      const cart = await Cart.findOne({where: {userId: cody.id}})
      cart.contents = [[1, 10]]
      await cart.save()
    })

    it('GET /api/cart/:userId', async () => {
      const res = await request(app)
        .get('/api/cart/1')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].id).to.be.equal(1)
    })
  }) // end describe('/api/cart/:userId')
}) // end describe('Cart routes')
