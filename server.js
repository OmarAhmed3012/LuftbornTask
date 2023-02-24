const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())

// Global Variable
app.locals.authUser = ''

// Database connection
const DB_URI = process.env.MONGO_ATLAST_URI
const DB_LOCAL = 'mongodb://127.0.0.1:27017/task-manager'
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error))

// Routes
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')

app.use(authRoutes)
app.use(taskRoutes)
