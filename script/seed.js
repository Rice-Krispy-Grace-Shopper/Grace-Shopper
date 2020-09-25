'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const Cart = require('../server/db/models/cart')
const Product = require('../server/db/models/product')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  let users = []
  for (let i = 0; i < 100; i++) {
    const name = faker.name.firstName()
    let newUser = {
      email: faker.internet.email(name),
      password: faker.internet.password()
    }

    users.push(newUser)
  }

  let products = []
  for (let j = 0; j < 100; j++) {
    let cereal = {
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.random.number({max: 1000})
    }
    products.push(cereal)
  }

  products.forEach(cereal => {
    Product.create(cereal)
  })

  users.forEach(async (user, idx) => {
    let person = await User.create(user)
    await person.createCart()
    const userCart = await Cart.findOne({
      where: {
        userId: idx + 1
      }
    })
    userCart.contents = [
      [Math.floor(Math.random() * 100 + 1), 1],
      [Math.floor(Math.random() * 100 + 1), 1],
      [Math.floor(Math.random() * 100 + 1), 1]
    ]
    userCart.changed('contents', true)
    await userCart.save()
  })

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
    // await db.close()
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
