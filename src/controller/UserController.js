class UserController {
  #service
  #tokenManager

  constructor (service, tokenManager) {
    this.#service = service
    this.#tokenManager = tokenManager

    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
    this.createAuthentication = this.createAuthentication.bind(this)
  }

  async create (req, res, next) {
    try {
      const { body } = req
      await this.#service.create({
        ...body,
        tglLahir: body.tgl_lahir,
        beratBadan: body.berat_badan,
        tinggiBadan: body.tinggi_badan
      })

      return res.json({
        status: 'success',
        message: 'User created successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  async get (req, res, next) {
    try {
      const { userId } = req
      const user = await this.#service.get({ userId })

      return res.json({
        status: 'success',
        data: { user }
      })
    } catch (error) {
      next(error)
    }
  }

  async createAuthentication (req, res, next) {
    try {
      const { email, password } = req.body

      const userAuth = await this.#service.createAuthentication({ email, password })
      const accessToken = this.#tokenManager.generateAccessToken({ userId: userAuth.id })

      return res.json({
        status: 'success',
        data: {
          access_token: accessToken
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
