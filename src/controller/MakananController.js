class MakananController {
  #service

  constructor (service) {
    this.#service = service

    this.getAll = this.getAll.bind(this)
  }

  async getAll (req, res) {
    const { page = 1, limit = 10, s } = req.query
    const makanan = await this.#service.getAll({ page, limit, s })

    return res.json({
      status: 'success',
      data: makanan
    })
  }
}

module.exports = MakananController
