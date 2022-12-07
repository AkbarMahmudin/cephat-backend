const { getImageUrl } = require('../utils/image')

class ConsumeHistoryController {
  #service

  constructor (service) {
    this.#service = service

    this.createHistory = this.createHistory.bind(this)
    this.getAllHistory = this.getAllHistory.bind(this)
  }

  async createHistory (req, res, next) {
    try {
      const { userId } = req
      const {
        makanan_id: makananId,
        qty
      } = req.body

      await this.#service.createHistory({
        userId, makananId, qty
      })

      return res.status(201).json({
        status: 'success',
        message: 'Consume history created successfully'
      })
    } catch (err) {
      next(err)
    }
  }

  async getAllHistory (req, res, next) {
    try {
      const { userId } = req
      const { page = 1, limit = 10, s, start_date: startDate, end_date: endDate } = req.query
      const { metadata, histories } = await this.#service.getAllHistory(userId, {
        page, limit, s, startDate, endDate
      })
      const historiesMapped = histories
        ? histories.map((history) => {
          const { makanan } = history.dataValues
          return {
            ...history.dataValues,
            makanan: {
              ...makanan.dataValues,
              image: getImageUrl(makanan.image, req)
            }
          }
        })
        : []

      return res.json({
        status: 'success',
        data: {
          histories: historiesMapped,
          metadata
        }
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ConsumeHistoryController
