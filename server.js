const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(cors({
    credentials: true
}));

const connection = require('./db/connection');
connection.connectToServer(function(err, client) {
    if (err) {
        console.log(err)
    }
})

const destinationController = require('./controllers/destinationController')
app.use('/', destinationController)

app.listen(process.env.PORT || 3000)