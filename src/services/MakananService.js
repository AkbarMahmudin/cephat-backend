const { Makanan } = require('../database/models')

class MakananService {
  #model
  constructor () {
    this.#model = Makanan

    this.getAll = this.getAll.bind(this)
  }

  async getAll () {
    const makanan = await this.#model.findAll()

    return makanan
  }
}

module.exports = MakananService
