'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const Cart = require('../server/db/models/cart')
const Product = require('../server/db/models/product')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', isAdmin: true}),
    User.create({email: 'murphy@email.com', password: '123', isAdmin: true}),
    User.create({email: 'john@email.com', password: '123'}),
    User.create({email: 'frank@email.com', password: '123'}),
    User.create({email: 'jeff@email.com', password: '123'}),
    User.create({email: 'henry@email.com', password: '123'}),
    User.create({email: 'george@email.com', password: '123'}),
    Product.create({name: 'fruity pebbles', price: 1051}),
    Product.create({name: 'cookie crunch', price: 725}),
    Product.create({name: 'rice krispies', price: 295}),
    Product.create({name: 'cheerios', price: 329}),
    Product.create({name: 'frosted mini-wheats', price: 400}),
    Product.create({name: 'frosted flakes', price: 299}),
    Product.create({name: 'cocoa puffs', price: 299})
  ])

  // for seeding cart data:

  // find murphy, create him a cart and fill it:
  const murphy = await User.findOne({
    where: {
      email: 'murphy@email.com'
    }
  })
  await murphy.createCart()
  const murphyCart = await Cart.findOne({
    where: {
      userId: murphy.id
    }
  })

  murphyCart.contents = [[1, 1], [2, 1], [3, 4]]

  await murphyCart.save()

  // find john, create him a cart and fill it:
  const john = await User.findOne({
    where: {
      email: 'john@email.com'
    }
  })
  await john.createCart()
  const johnCart = await Cart.findOne({
    where: {
      userId: john.id
    }
  })

  johnCart.contents = [[1, 2], [4, 2], [7, 1]]

  await johnCart.save()

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
