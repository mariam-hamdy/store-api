const express = require('express')
const app = express()
require('express-async-errors')

app.use(express.json())



const port = 5000
const start = async() => {
    try {
        app.listen(port, () => {
            console.log(`server is ON listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()