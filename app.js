const config = require('./utils/config.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const listRouter = require('./controllers/todoList.js')
const taskRouter = require('./controllers/subTasks.js')
const usersRouter = require('./controllers/users.js')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/todos', listRouter)
app.use('/api/subTasks', taskRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app