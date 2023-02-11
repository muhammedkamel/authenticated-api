const jwksRsa = require('jwks-rsa')
const { expressjwt: jwt } = require('express-jwt')

const HOST = process.env.JWKS_HOST
const PORT = process.env.PORT;

module.exports = jwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: `${HOST}:${PORT}/.well-known/jwks.json`,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    cacheMaxAge: 600000,
    timeout: 30000,
  }),
  algorithms: ['RS256']
})