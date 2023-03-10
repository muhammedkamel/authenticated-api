const express = require('express')
const BodyParser = require('body-parser')
const authMiddleware = require('./src/middlewares/auth')
const DB = require('./src/models/db')

const { welcome, auth } = require('./src/routes')

DB.connect()

const app = express()

app.use(BodyParser.json())

app.use('/', auth);
app.use(express.static('public'));

app.use(authMiddleware)

app.use('/api', welcome)

const server = app.listen(3000, () => {
  console.log('up and running')
})



const shutdown = async () => {
  await server.close()
  await DB.disconnect()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
process
  .on('uncaughtException', (error) => {
    console.error(error)

    return shutdown()
  })
  .on('unhandledRejection', (error) => {
    console.error(error)

    return shutdown()
  })
