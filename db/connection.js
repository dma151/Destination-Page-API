const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')

const uri = 'mongodb+srv://destinationuser:page1destination@cluster0.q5oz7.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true }, { useUnifiedTopology: true }, () => {
	console.log('MongoDB Connected as Local Database');
})

// let db = null;

// module.exports = {
//     connectToServer: (callback) => {
//         MongoClient.connect(uri, {useNewUrlParser: true}, function(err, client){
//             db = client.db('destination')
//             console.log('we connected')
//             return callback(err)
//         })
//     },
//     getDb: () => {
//         return db
//     }
// }