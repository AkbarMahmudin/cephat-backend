const { User, Profile, NutritionProfile } = require('../database/models')
const bcrypt = require('bcrypt')

const ConflictError = require('../exceptions/ConflictError')
const NotFoundError = require('../exceptions/NotFoundError')
const AuthenticationError = require('../exceptions/AuthenticationError')

class UserService {
  #model
  #salt = 10

  constructor () {
    this.#model = User

    this.get = this.get.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
  }

  async create ({
    nama, email, password, umur, jenisKelamin, levelAktivitas, beratBadan, tinggiBadan, kalori, protein, lemak, karbohidrat
  }) {
    const user = await this.#model.count({ where: { email } })
    if (user !== 0) {
      throw new ConflictError('Email already exist')
    }

    const newUser = await this.#model.create({
      nama,
      email,
      password: bcrypt.hashSync(password, this.#salt),
      profiles: {
        umur,
        jenis_kelamin: jenisKelamin,
        level_aktivitas: levelAktivitas,
        berat_badan: beratBadan,
        tinggi_badan: tinggiBadan
      },
      nutrition_profiles: {
        kalori,
        protein: JSON.stringify(protein),
        lemak: JSON.stringify(lemak),
        karbohidrat: JSON.stringify(karbohidrat)
      }
    }, {
      include: [
        {
          model: Profile,
          as: 'profiles'
        },
        {
          model: NutritionProfile,
          as: 'nutrition_profiles'
        }
      ]
    })

    return newUser
  }

  async get ({ userId }) {
    const user = await this.#model.findByPk(userId, {
      attributes: {
        exclude: ['password']
      },
      include: [
        {
          model: Profile,
          as: 'profiles',
          attributes: ['umur', 'jenis_kelamin', 'level_aktivitas', 'tinggi_badan', 'berat_badan']
        },
        {
          model: NutritionProfile,
          as: 'nutrition_profiles',
          attributes: {
            exclude: ['id', 'user_id', 'createdAt', 'updatedAt']
          }
        }
      ]
    })

    if (!user) {
      throw new NotFoundError('User not found')
    }

    const { nutrition_profiles: nutritionProfiles } = user.dataValues
    nutritionProfiles.protein = JSON.parse(nutritionProfiles.protein)
    nutritionProfiles.karbohidrat = JSON.parse(nutritionProfiles.karbohidrat)
    nutritionProfiles.lemak = JSON.parse(nutritionProfiles.lemak)

    return user
  }

  async update (userId, {
    nama, email, password, umur, jenis_kelamin: jenisKelamin, level_aktivitas: levelAktivitas, berat_badan: beratBadan, tinggi_badan: tinggiBadan, kalori, protein, lemak, karbohidrat
  }) {
    const user = await this.#model.findByPk(userId, {
      include: [{
        model: Profile,
        as: 'profiles'
      }]
    })
    if (!user) {
      throw new NotFoundError('User not found')
    }

    // email already exist
    if (email) {
      const usersEmail = await this.#model.findAll({
        where: { email }
      })
      if (usersEmail && email !== user.email) {
        throw new ConflictError('Email is already exist')
      }
    }

    const dataUser = {
      ...(nama) && ({ nama }),
      ...(email) && ({ email }),
      ...(password) && ({ password: bcrypt.hashSync(password, this.#salt) })
    }

    // user profile UPDATE
    const profiles = {
      ...(umur) && ({ umur }),
      ...(jenisKelamin) && ({ jenis_kelamin: jenisKelamin }),
      ...(levelAktivitas) && ({ level_aktivitas: levelAktivitas }),
      ...(beratBadan) && ({ berat_badan: beratBadan }),
      ...(tinggiBadan) && ({ tinggi_badan: tinggiBadan })
    }

    if (profiles) {
      await Profile.update(profiles, { where: { user_id: userId } })
    }

    // user nutrition profile UPDATE
    const nutritionProfiles = {
      ...(kalori) && ({ kalori }),
      ...(protein) && ({ protein: JSON.stringify(protein) }),
      ...(lemak) && ({ lemak: JSON.stringify(lemak) }),
      ...(karbohidrat) && ({ karbohidrat: JSON.stringify(karbohidrat) })
    }

    if (nutritionProfiles) {
      await NutritionProfile.update(nutritionProfiles, { where: { user_id: userId } })
    }

    // user UPDATE
    await user.update(dataUser)

    return true
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
