const { Op } = require('sequelize')
const { User, Makanan, ConsumeHistory } = require('../database/models')
const NotFoundError = require('../exceptions/NotFoundError')

class ConsumeHistoryService {
  #model

  constructor () {
    this.#model = ConsumeHistory

    this.createHistory = this.createHistory.bind(this)
    this.getAllHistory = this.getAllHistory.bind(this)
  }

  async createHistory ({
    userId, makananId, qty
  }) {
    const user = await User.findByPk(userId)
    const makanan = await Makanan.findByPk(makananId)

    if (!user) {
      throw new NotFoundError('User tidak ditemukan')
    }

    if (!makanan) {
      throw new NotFoundError('Makanan tidak ditemukan')
    }

    const newHistory = await this.#model.create({
      user_id: userId,
      makanan_id: makananId,
      qty,
      total_berat: makanan.berat * qty,
      total_kalori: makanan.kalori * qty,
      total_protein: makanan.protein * qty,
      total_karbohidrat: makanan.karbohidrat * qty,
      total_lemak: makanan.lemak * qty
    })

    return newHistory
  }

  async getAllHistory (userId, query) {
    const options = {
      where: {
        user_id: userId
      },
      attributes: {
        exclude: ['user_id', 'makanan_id', 'createdAt', 'updatedAt'],
        order: [['tgl_konsumsi', 'ASC']]
      }
    }

    // Ralation makanan
    const makanan = {
      model: Makanan,
      as: 'makanan',
      attributes: ['id', 'nama', 'image']
    }

    const { page = 1, limit = 10, s, startDate, endDate } = query

    // PAGINATION
    const skip = (parseInt(page) - 1) * parseInt(limit)

    if (page && limit) {
      options.offset = skip
      options.limit = parseInt(limit)
      options.subQuery = false
    }

    // SEARCH
    if (s) {
      makanan.where = {
        nama: {
          [Op.iLike]: `${s}%`
        }
      }
    }

    // FILTER DATE
    if (startDate && endDate) {
      options.where = {
        ...options.where,
        tgl_konsumsi: {
          [Op.between]: [startDate, endDate]
        }
      }
    }

    // add include makanan
    options.include = [makanan]
    const { count, rows: histories } = await this.#model.findAndCountAll(options)

    if (count < 1) {
      return []
    }

    return {
      histories,
      metadata: {
        total_data: count,
        total_page: Math.ceil(count / parseInt(limit)),
        data_per_page: parseInt(limit),
        current_page: parseInt(page)
      }
    }
  }
}

module.exports = ConsumeHistoryService
