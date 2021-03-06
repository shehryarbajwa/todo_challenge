const config = require('./utils/config.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const tokenMiddleware = require('./utils/tokenMiddleware')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connection to MongoDB:', error.message)
  })


const todoRouter = require('./controllers/todoList.controller')
const taskRouter = require('./controllers/subTasks.controller')
const usersRouter = require('./controllers/users.controller')
const loginRouter = require('./controllers/login.controller')


app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use(tokenMiddleware)

app.use('/api/login', loginRouter)
app.use('/api/todos', todoRouter)
app.use('/api/subtodos', taskRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app