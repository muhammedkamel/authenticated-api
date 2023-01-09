const bcrypt = require('bcrypt')
const saltRounds = 10

const hash = async (str, salt = saltRounds) => {
  return bcrypt.hash(str, salt)
}

const compare = async (str, hashedStr) => {
  return bcrypt.compare(str, hashedStr)
}

module.exports = {
  hash,
  compare
}