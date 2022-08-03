const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'the name must be provided']
    },
    rating: {
        type:Number,
        default: 4.5
    },
    price: {
        type:Number,
        required: [true, 'the price must be provided']
    },
    featured: {
        type:Boolean,
        default: false
    },
    company: {
        type:String,
        enum: {
            values: ['marcos', 'liddy', 'ikea', 'caressa'],
            message: '{VALUE} is not supported'
        },
        required: [true, 'company must be provided']
    },
    createdAt: {
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Product', productSchema)