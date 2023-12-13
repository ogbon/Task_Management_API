const jwt = require('jsonwebtoken')

require('dotenv').config()

const secret = process.env.SECRET

const generateJWTToken = data => jwt.sign(data, secret, {expiresIn: '2h'})

const decodeJWTToken = token => token && jwt.verify(token.split(' ')[1], secret)

module.exports = {
  generateJWTToken,
  decodeJWTToken
}
