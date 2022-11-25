const jwt = require('jsonwebtoken')
const InvariantError = require('../exceptions/InvariantError')

class TokenManager {
  #accessTokenKey
  #refreshTokenKey

  constructor () {
    this.#accessTokenKey = process.env.ACCESS_TOKEN_KEY

    this.generateAccessToken = this.generateAccessToken.bind(this)
    this.verifyAccessToken = this.verifyAccessToken.bind(this)
  }

  generateAccessToken (payload) {
    return jwt.sign({ data: payload }, this.#accessTokenKey, { expiresIn: '5d' })
  }

  async verifyAccessToken (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, this.#accessTokenKey)

      return decoded
    } catch (err) {
      throw new InvariantError(err.message)
    }
  }
}

module.exports = TokenManager
