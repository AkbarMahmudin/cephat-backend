const Joi = require('joi')
const InvariantError = require('../exceptions/InvariantError')
const TokenManager = require('../token/TokenManager')

module.exports = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization
    // Validasi header
    const schema = Joi.object({ authorization: Joi.string().required() })
    const validationResult = schema.validate({ authorization: bearerHeader })

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }

    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    const tokenManager = new TokenManager()
    const { data } = await tokenManager.verifyAccessToken(bearerToken)
    req.userId = data.userId

    next()
  } catch (err) {
    next(err)
  }
}
