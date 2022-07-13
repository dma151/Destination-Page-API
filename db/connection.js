const mongoose = require('mongoose')

const uri = 'mongodb+srv://destinationuser:page1destination@cluster0.q5oz7.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri, { useUnifiedTopology: true }, () => {
	console.log('MongoDB Connected as Local Database');
})

module.exports = mongoose