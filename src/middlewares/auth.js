const jwksRsa = require('jwks-rsa')
const { expressjwt: jwt } = require('express-jwt')

const HOST = process.env.JWKS_HOST
const ISSUER = process.env.ISSUER

module.exports = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    jwksUri: `${HOST}/.well-known/jwks.json`,
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 600000,
    timeout: 30000,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
  }),

  // Validate the audience and the issuer.
  audience: `urn:${HOST}`,
  issuer: ISSUER,
  algorithms: ['RS256']
})