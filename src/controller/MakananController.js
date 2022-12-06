const { getImageUrl } = require('../utils/image')

class MakananController {
  #service

  constructor (service) {
    this.#service = service

    this.getAll = this.getAll.bind(this)
  }

  async getAll (req, res) {
    const { page = 1, limit = 10, s } = req.query
    const { metadata, makanan } = await this.#service.getAll({ page, limit, s })
    const makananMapped = [...makanan.map((m) => ({
      ...m.dataValues,
      image: getImageUrl(m.image, req)
    }))]

    return res.json({
      status: 'success',
      data: {
        makanan: makananMapped,
        metadata
      }
    })
  }
}

module.exports = MakananController
