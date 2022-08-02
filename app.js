const express = require('express')
const app = express()
const connectDB = require('./database/connect')
const productRoute = require('./routes/productsRoute')
require('express-async-errors')
require('dotenv').config()

app.use(express.json())

app.use('/api/v1/products', productRoute)

const port = 5000
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server is ON listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()