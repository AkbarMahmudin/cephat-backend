const Joi = require('joi')
  .extend(require('@joi/date'))

const InvariantError = require('../exceptions/InvariantError')

const postValidator = (req, res, next) => {
  try {
    const schema = Joi.object({
      nama: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(16).required(),
      // profile
      umur: Joi.number().required(),
      jenis_kelamin: Joi.string().valid('L', 'P').required(),
      level_aktivitas: Joi.string().required(),
      berat_badan: Joi.number().required(),
      tinggi_badan: Joi.number().required(),
      // nutrition profile
      kalori: Joi.number().required(),
      karbohidrat: Joi.number().required(),
      protein: Joi.number().required(),
      lemak: Joi.number().required()
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

const putValidator = (req, res, next) => {
  try {
    const schema = Joi.object({
      nama: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(8).max(16),
      // profile
      umur: Joi.number(),
      jenis_kelamin: Joi.string().valid('L', 'P'),
      level_aktivitas: Joi.string(),
      berat_badan: Joi.number(),
      tinggi_badan: Joi.number(),
      // nutrition profile
      kalori: Joi.number(),
      karbohidrat: Joi.number(),
      protein: Joi.number(),
      lemak: Joi.number()
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

module.exports = {
  postValidator, putValidator
}
