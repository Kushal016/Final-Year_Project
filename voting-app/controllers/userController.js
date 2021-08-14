const User = require('../models/User')
const logger = require('../logger')



//* Function for Admin Login
exports.admin = function (req, res) {
    let user = new User(req.body)
    user.admin().then(function (result) {
        req.session.user = { uname: user.data.uname }
        req.session.save(function () {
            res.redirect("/result")
        })
    }).catch(function (e) {
        res.render('login-instruction-error')

    })

}


//* Function for User registration
exports.register = function (req, res) {
    let user = new User(req.body)
    user.register().then(function (result) {
        req.session.user = { uname: user.data.uname }
        req.session.save(function () {
            res.render('voting-page')
        })
    }).catch(function (e) {
        console.log(e)
        res.render('login-instruction-error')
    })

}


//* Function for Logout request
exports.logout = function (req, res) {
    req.session.destroy(function () {
        logger.log('info', `Successfully logged out from the user.`)
        res.redirect('/')
    })

}


//* Function for voting request
exports.voting = function (req, res) {
    let user = new User(req.body)
    user.voting()
    res.render('home-dashboard')

}


//* Function for Registration-Page request
exports.registration_page = function (req, res) {
    res.render('home-login', { errors: req.flash('errors'), regErrors: req.flash('regErrors') })

}


//* Function for Home Page
exports.home = function (req, res) {
    if (req.session.user) {
        res.render('home-dashboard')
    } else {
        res.render('login-instructions', { errors: req.flash('errors'), regErrors: req.flash('regErrors') })

    }

}


//* Function for Result Page
exports.result = function (req, res) {
    if (req.session.user) {
        res.render('result1')
    }
    else {
        res.render('home-login', { errors: req.flash('errors'), regErrors: req.flash('regErrors') })
    }

}