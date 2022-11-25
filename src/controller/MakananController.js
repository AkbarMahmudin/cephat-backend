class MakananController {
  #service

  constructor (service) {
    this.#service = service

    this.getAll = this.getAll.bind(this)
  }

  async getAll (req, res) {
    const makanan = await this.#service.getAll()

    return res.json({
      status: 'success',
      data: { makanan }
    })
  }
}

module.exports = MakananController
