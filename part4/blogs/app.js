const config = require('./utils/config.js')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')
const logger = require('./utils/logger.js')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware.js')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })

  app.use(cors())
  app.use(express.json())
  app.use(middleware.tokenExtractor)

  app.use('/api/blogs', blogsRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/login', loginRouter)

  if(process.env.NODE_ENV === 'test'){
    const testingRouter = require('./controllers/testing.js')
    app.use('/api/testing', testingRouter)
  }

  app.use(middleware.errorHandler)

  module.exports = app