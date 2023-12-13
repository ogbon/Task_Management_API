const isAuthenticated = async (req, res, next) => {
    try {
      const user = decodeJWTToken(req.headers.authorization)

      if (user) {
        req.decoded = user

        next()
      } else {
        res.status(401).send({data: null, message: 'Please login to your account.', success: false})
      }
    } catch (err) { res.status(401).send({data: null, message: 'Please login to your account.', success: false}) }
}


module.exports = isAuthenticated
