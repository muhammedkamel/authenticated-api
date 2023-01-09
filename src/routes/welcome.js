const { Router } = require('express')

const router = new Router()

router.get('/welcome', (req, res) => {
  res.send({ message: 'Hello World!' })
})

module.exports = router