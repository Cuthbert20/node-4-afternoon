const express = require('express')
require("dotenv").config()
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require("./controllers/cartController")
const searchController = require('./controllers/searchController')

//lets create an express application
const app = express()

//Now lets Destructure SERVER_PORT and SESSION_SECRET from process.env
let { SERVER_PORT, SESSION_SECRET } = process.env

//toplevel middle where that runs before every endpoint, if we want it have it only run on one endpoint we would put it after the url in the endpoint
app.use(express.json())
//sessioin is a built in function with express-session that takes in an obj as its params.
//normal it has the following keys value pairs 
//secret: SESSION_SECRET, resave: boolean, saveUninitialized: boolean
//it can also take in a cookie where you can set max time.
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.get('/api/swag', swagCtrl.read)
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)

app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)

app.get('/api/search', searchController.search)



app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is now up to bat`))


