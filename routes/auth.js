const express = require('express')

const authController = require('../controllers/authController')

const auth = express.Router()

auth.route('/login')
  .post(authController.logIn)

auth.route('/sign-up')
  .post(authController.signUp)


module.exports = auth
