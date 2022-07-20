const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

// app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(cors({
    credentials: true
}));

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'M036GZxHYcizsMsZXURoJFGr9AFqjpdI',
  issuerBaseURL: 'https://dev-lpaja9jd.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// app.get('/details', (req, res) => {
//     res.render('/views/index.ejs')
// })

const destinationController = require('./controllers/destinationController')
app.use('/', destinationController)

app.listen(process.env.PORT || 3000)