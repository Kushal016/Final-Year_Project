const express = require('express')
const session = require('express-session')
const cors = require('cors');
const flash = require('connect-flash')
const logger = require('./logger')
const path = require('path')


//*Express is loaded and ready to use using app.
const app = express()

//! This is about session Data format and validation
let sessionOptions = session({
    secret: "I love white chocolate",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }

})

//* all app.use() are used to render those dependencies
app.use(sessionOptions)
app.use(flash())

//* to notify node that where our static files are present.
app.use(express.static(path.join(__dirname, 'public')));


logger.log('info', "Logging in console")

//* importing or requiring router
const router = require('./router')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors());
//! Notifying node to look views folder for frontside templates
app.set('views', 'views')

//! Notifying node that our templates are in EJS
app.set('view engine', 'ejs')


//! Allowing Access-Control-Allow-Origin for this URL
app.use(cors({
    origin: 'http://127.0.0.1:5000/'
}));

// Starting to use router
app.use('/', router)

//* Exporting App
module.exports = app