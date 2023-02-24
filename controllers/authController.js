const User = require('../models/User')
const port = process.env.PORT
const { userSchema, authSchema } = require('../helpers/validationSchema')
require('dotenv').config()
const logger = require('../helpers/logger')

// Create User
const registerPost = async (req, res) => {
  const error_msg = []
  const params = req.body

  if (params.password != params.confirm_password) {
    error_msg.push('Password and Confirm Password do not match')
    return res.status(404).json({ errors: error_msg })
  }

  const { error } = userSchema.validate(params, { abortEarly: false })

  if (error) {
    error.details.map((err) => error_msg.push(err.message))
    return res.status(404).json({ errors: error_msg })
  }

  const emailExists = await User.findOne({ email: params.email })
  if (emailExists) {
    error_msg.push(`${params.email} is already taken`)
    logger.error(error_msg)
    return res.status(404).json({ errors: error_msg })
  }

  try {
    const user = new User(params)
    await user.save()
    const token = await user.generateAuthToken()

    const options = {
      httpOnly: true,
      maxAge: process.env.JWT_EXPIRES_IN * 1000,
    }

    // for production
    if (process.env.NODE_ENV == 'production') {
      options.secure = true
    }

    res.cookie('jwt', token, options) // set in milliseconds
    res.status(201).json({ user: user._id, token: token })
  } catch (err) {
    logger.error(err)
  }
}

// Sign in user credentials
const loginPost = async (req, res) => {
  const error_msg = []
  const params = req.body

  const { error } = authSchema.validate(params, { abortEarly: false })

  if (error) {
    error.details.map((err) => error_msg.push(err.message))
    logger.error(error)
    return res.status(404).json({ errors: error_msg })
  }

  try {
    const user = await User.findByCredentials(params.email, params.password)

    if (user == 401) {
      error_msg.push('Incorrect email or password.')
      return res.status(404).json({ errors: error_msg })
    }

    const token = await user.generateAuthToken()
    const options = {
      httpOnly: true,
      maxAge: process.env.JWT_EXPIRES_IN * 1000,
    } // set in milliseconds

    // for production
    if (process.env.NODE_ENV == 'production') {
      options.secure = true
    }

    res.cookie('jwt', token, options)
    logger.info(`user ${user.name} logged in`)
    res.status(200).json({ user: req.user, token })
  } catch (err) {
    logger.error(err)
  }
}

const logOut = (req, res) => {
  console.log(res.cookie)
  res.cookie('jwt', '', { expires: new Date() })
  logger.info('logged out')
  res.status(200).json({ message: 'logged out' })
}

module.exports = { registerPost, loginPost, logOut }
