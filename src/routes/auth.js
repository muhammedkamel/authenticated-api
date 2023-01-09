const { Router } = require('express')
const validators = require('../validators')
const { validate } = require('../utils/request-validator')
const authController = require('../controllers/auth')

const router = new Router()

router.post('/signup', validate(validators.signup), authController.signup)

router.post('/login', validate(validators.login), authController.login)

module.exports = router