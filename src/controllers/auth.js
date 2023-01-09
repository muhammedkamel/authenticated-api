const User = require('../models/user')
const { hash, compare } = require('../utils/bcrypt')

const signup = async ({ body }, res) => {
  const { name, email, password } = body

  const hashedPassword = await hash(password)

  const user = await User.create({ name, email, password: hashedPassword })

  return res.status(200).send(user)
}


const login = async ({ body }, res) => {
  const { email, password } = body

  const user = await User.findOne({ where: { email } })
  
  const isExists = await compare(password, user.password)

  if (!isExists) return res.status(404).send({ message: 'Wrong email or password' })

  return res.status(200).redirect('/welcome')
}


module.exports = {
  signup,
  login
}