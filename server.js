const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    credentials: true
}));

const destinationController = require('./controllers/destinationController')
app.use('/', destinationController)

app.listen(3000, () => {
    console.log('we live')
})