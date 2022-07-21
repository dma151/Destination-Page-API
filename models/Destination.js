const mongoose = require('../db/connection')

const destinationSchema = new mongoose.Schema({
    creator : { type: mongoose.Schema.ObjectId, ref: 'users'},
    name: { type: String, required: true },
    location: { type: String, required: true },
    url: { type: String, required: true },
    description: String
})

module.exports = mongoose.model('Destination', destinationSchema)