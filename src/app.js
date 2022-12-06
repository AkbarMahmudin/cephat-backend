const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const ClientError = require('./exceptions/ClientError')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const makananRouter = require('./routes/makanan')
const plansRouter = require('./routes/plans')

const app = express()

require('dotenv').config()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/makanan', makananRouter)
app.use('/plans', plansRouter)

// Error handling
app.use((error, req, res, next) => {
  let { statusCode = 500, status = 'fail', message } = error

  if (!(error instanceof ClientError)) {
    message = 'Internal server error'
  }

  return res.status(statusCode).json({
    status,
    message
  })
})

module.exports = app
