const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//Admin Only Routes
const isAdminMiddleware = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const error = new Error('You are not an Admin')
    error.status = 401
    next(error)
  } else {
    next()
  }
}
//Get all Users
router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//Get Single User
router.get('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    const userById = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(userById)
  } catch (error) {
    next(error)
  }
})

//Add New User
router.post('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

//Update User
router.put('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    const userById = await User.findByPk(req.params.id)
    const updatedUser = await userById.update(req.body)
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

//Delete User
router.delete('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    const userById = await User.findByPk(req.params.id)
    userById.destroy()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
