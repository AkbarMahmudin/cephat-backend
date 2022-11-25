const Joi = require('joi')
  .extend(require('@joi/date'))

const InvariantError = require('../exceptions/InvariantError')

module.exports = (req, res, next) => {
  try {
    const schema = Joi.object({
      nama: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(16).required(),
      tgl_lahir: Joi.date().format('YYYY-MM-DD').required(),
      berat_badan: Joi.number().required(),
      tinggi_badan: Joi.number().required()
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }

    next()
  } catch (error) {
    next(error)
  }
}
