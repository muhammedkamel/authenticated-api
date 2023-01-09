const express = require('express')
const BodyParser = require('body-parser')
const DB = require('./src/models/db')

const { welcome, auth } = require('./src/routes')

DB.connect()

const app = express()

app.use(BodyParser.json())

app.use('/', welcome)
app.use('/', auth)

const server = app.listen(3000, () => {
  console.log('up and running')
})

const shutdown = async () => {
  await server.close()
  await DB.disconnect()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)