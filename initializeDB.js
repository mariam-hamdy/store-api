const connectDB = require('./database/connect')
const productJson = require('./products.json')
const Products = require('./database/models/products')
require('dotenv').config()

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Products.create(productJson)
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start()
