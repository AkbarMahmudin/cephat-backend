const { Op } = require('sequelize')
const { Makanan } = require('../database/models')

class MakananService {
  #model
  constructor () {
    this.#model = Makanan

    this.getAll = this.getAll.bind(this)
  }

  async getAll (query) {
    const options = {
      attributes: {
        exlude: ['createdAt', 'updatedAt'],
        order: [['nama', 'ASC']]
      }
    }

    // PAGINATION
    const { page = 1, limit = 10, s } = query
    const skip = (parseInt(page) - 1) * parseInt(limit)

    if (page && limit) {
      options.offset = skip
      options.limit = parseInt(limit)
      options.subQuery = false
    }

    if (s) {
      options.where = {
        nama: {
          [Op.iLike]: `${s}%`
        }
      }
    }

    const { count, rows: makanan } = await this.#model.findAndCountAll(options)

    return {
      makanan,
      metadata: {
        total_data: count,
        total_page: Math.ceil(count / parseInt(limit)),
        data_per_page: parseInt(limit),
        current_page: parseInt(page)
      }
    }
  }
}

module.exports = MakananService
