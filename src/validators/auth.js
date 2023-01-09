const Joi = require('joi')

const signup = {
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required()
  })
}

const login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required()
  })
}


module.exports = {
  signup,
  login
}