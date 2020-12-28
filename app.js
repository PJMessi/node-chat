const express = require('express')
const { sequelize } = require('./models')
const router = require('./routes')
const corsMiddleware = require('./middlewares/cors.middleware')
const errorHandler = require('./middlewares/error.middleware')
require('dotenv').config()

const app = express()
app.use(express.json())

// configuring cors middleware.
app.use(corsMiddleware)

// configuring routes.
app.use(router)

// configuring error handler.
app.use(errorHandler)

// configuring servers.
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started at ${process.env.NODE_URL}:${PORT}`)
    sequelize.authenticate().then(() => {
        console.log('Connected to the database.')
    })
})