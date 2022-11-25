const { User, Profile } = require('../database/models')
const bcrypt = require('bcrypt')

const ConflictError = require('../exceptions/ConflictError')
const NotFoundError = require('../exceptions/NotFoundError')
const AuthenticationError = require('../exceptions/AuthenticationError')

class UserService {
  #model
  #salt = 10

  constructor () {
    this.#model = User

    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
  }

  async create ({ nama, email, password, tglLahir, beratBadan, tinggiBadan }) {
    const user = await this.#model.count({ where: { email } })
    if (user !== 0) {
      throw new ConflictError('Email already exist')
    }

    const newUser = await this.#model.create({
      nama,
      email,
      password: bcrypt.hashSync(password, this.#salt),
      profiles: {
        tgl_lahir: tglLahir,
        berat_badan: beratBadan,
        tinggi_badan: tinggiBadan
      }
    }, {
      include: [{
        model: Profile,
        as: 'profiles'
      }]
    })

    return newUser
  }

  async get ({ userId }) {
    const user = await this.#model.findByPk(userId, {
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Profile,
        as: 'profiles',
        attributes: ['tgl_lahir', 'tinggi_badan', 'berat_badan']
      }]
    })

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return user
  }

  async createAuthentication ({ email, password }) {
    const user = await this.#model.findOne({
      where: { email }
    })
    if (!user) {
      throw new AuthenticationError('Incorrect credentials provided')
    }

    const matchPassword = bcrypt.compareSync(password, user.password)
    if (!matchPassword) {
      throw new AuthenticationError('Incorrect credentials provided')
    }

    delete user.dataValues.password

    return user
  }
}

module.exports = UserService
