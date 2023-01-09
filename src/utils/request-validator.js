const Joi = require('joi')

exports.validate = (validationObj) => (req, res, next) => {
  const keys = Object.keys(validationObj)

  for (const key of keys) {
    const { error } = validationObj[key].validate(req[key])


    if (error) return res.status(400).json({ message: error.details.map(e => e.message).join(',') })
  }

  next()
}