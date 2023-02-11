const User = require('../models/user')
const { hash, compare } = require('../utils/bcrypt')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const generateToken = (user) => {
  const secret = fs.readFileSync(path.join('certs', 'private.pem'));
  const token = jwt.sign(
    {
      sub: user.id,
      name: user.name,
      email: user.email,
    },
    secret,
    {
      expiresIn: '5min',
      algorithm: 'RS256'
    }
  );

  return token;
}

const signup = async ({ body }, res) => {
  const { name, email, password } = body

  const hashedPassword = await hash(password)

  const user = await User.create({ name, email, password: hashedPassword })

  const token = generateToken(user);

  return res.status(200).send({ token })
}

const login = async ({ body }, res) => {
  const { email, password } = body

  const user = await User.findOne({ where: { email } })

  const isExists = await compare(password, user.password)

  if (!isExists) return res.status(404).send({ message: 'Wrong email or password' })

  const token = generateToken(user);

  return res.status(200).json({ token });
}

module.exports = {
  signup,
  login
}