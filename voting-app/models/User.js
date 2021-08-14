const { reject } = require('async')
const { resolve } = require('path')

const logger = require('../logger')
const bcrypt = require("bcryptjs")
const userCollection = require('../db').collection("users")
const adminCollection = require('../db').collection("admin")
const candidateCollection = require('../db').collection("candidate")
const { ObjectId } = require('bson')

logger.level = 'info'

let User = function (data) {
    this.data = data
    this.errors = []
}

//* Data Clean-up function for Admin
User.prototype.cleanUp_admin = function () {

    if (typeof (this.data.uname) != "string") { this.data.uname = "" }
    if (typeof (this.data.pass) != "string") { this.data.pass = "" }

    this.data = {
        uname: this.data.uname,
        pass: this.data.pass

    }
}

//* Data Clean-up function for User
User.prototype.cleanUp_registration = function () {

    if (typeof (this.data.vname) != "string") { this.data.vname = "" }
    if (typeof (this.data.adhar) != "number") { this.data.adhar = "" }

    this.data = {
        vname: this.data.vname,
        vnumber: this.data.vnumber,
        adhar: this.data.adhar

    }
}


//* Checking for Data validation
User.prototype.validate = function () {

    if (this.data.vname == "") { this.errors.push("You must provide a voter name") }
    if (this.data.vnumber == "") { this.errors.push("You must provide a voter number") }
    if (this.data.adhar.length > 0 && this.data.adhar.length < 12) { this.errors.push("Adhar number must be 12 numbers long") }

}


//* Function for admin response
User.prototype.admin = function () {

    return new Promise((resolve, reject) => {
        this.cleanUp_admin()

        adminCollection.findOne({ uname: this.data.uname }).then((attempeduser) => {

            if (attempeduser && bcrypt.compareSync(this.data.pass, attempeduser.pass)) {
                resolve("congrats")
                logger.log('info', "Entered in admin portal successfully")

            } else {
                logger.log('info', "invalid Username / Password combination.")
                reject("invalid Username / Password combination ")
            }

        }).catch(function () {

            reject("Please try again")
        })
    })
}


//* Function for User response
User.prototype.register = function () {

    return new Promise((resolve, reject) => {

        logger.log('info', this.data)
        this.cleanUp_registration()
        this.validate()
        if (!this.errors.length) {
            userCollection.findOne({ vname: this.data.vname }).then((attempeduser) => {

                if (attempeduser && bcrypt.compareSync(this.data.adhar, attempeduser.adhar)) {
                    resolve("congrats")
                    logger.log('info', "Entered in voting portal successfully")

                } else {
                    logger.log('info', "invalid Username / Password combination.")
                    reject("invalid Username / Password combination ")

                }
            }).catch(function () {

                reject("Please try again")
            })
        }
    })

}


//* Voting function
User.prototype.voting = function () {
    logger.log('info', this.data)
    if (this.data.radio == 'c1') {

        candidateCollection.findOne({ _id: new ObjectId("60ab9caa78ea9e76530d822b") }, function (err, user) {
            if (err) console.warn(err)
            logger.log('info', user)
            candidateCollection.updateOne({ _id: new ObjectId("60ab9caa78ea9e76530d822b") }, { $set: { value: ++user.value } }, function (err, res) {
                if (err) console.warn(err)
                logger.log('info', user.value)
            })

        })
    }

    if (this.data.radio == 'c2') {

        candidateCollection.findOne({ _id: new ObjectId("60b48cfc37d1fd3737ec9ded") }, function (err, user) {
            if (err) console.warn(err)
            logger.log('info', user)
            candidateCollection.updateOne({ _id: new ObjectId("60b48cfc37d1fd3737ec9ded") }, { $set: { value: ++user.value } }, function (err, res) {
                if (err) console.warn(err)
                logger.log('info', user.value)
            })

        })
    }

    if (this.data.radio == 'c3') {

        candidateCollection.findOne({ _id: new ObjectId("60b48d4a37d1fd3737ec9dee") }, function (err, user) {
            if (err) console.warn(err)
            logger.log('info', user)
            candidateCollection.updateOne({ _id: new ObjectId("60b48d4a37d1fd3737ec9dee") }, { $set: { value: ++user.value } }, function (err, res) {
                if (err) console.warn(err)
                logger.log('info', user.value)
            })

        })
    }

    if (this.data.radio == 'c4') {

        candidateCollection.findOne({ _id: new ObjectId("60b48d9d37d1fd3737ec9def") }, function (err, user) {
            if (err) console.warn(err)
            logger.log('info', user)
            candidateCollection.updateOne({ _id: new ObjectId("60b48d9d37d1fd3737ec9def") }, { $set: { value: ++user.value } }, function (err, res) {
                if (err) console.warn(err)
                logger.log('info', user.value)
            })

        })
    }

    if (this.data.radio == 'c5') {

        candidateCollection.findOne({ _id: new ObjectId("60b48dfd37d1fd3737ec9df0") }, function (err, user) {
            if (err) console.warn(err)
            logger.log('info', user)
            candidateCollection.updateOne({ _id: new ObjectId("60b48dfd37d1fd3737ec9df0") }, { $set: { value: ++user.value } }, function (err, res) {
                if (err) console.warn(err)
                logger.log('info', user.value)
            })

        })
    }

    if (this.data.radio == 'c6') {

        candidateCollection.findOne({ _id: new ObjectId("60b48e4337d1fd3737ec9df1") }, function (err, user) {
            if (err) console.warn(err)
            logger.log('info', user)
            candidateCollection.updateOne({ _id: new ObjectId("60b48e4337d1fd3737ec9df1") }, { $set: { value: ++user.value } }, function (err, res) {
                if (err) console.warn(err)
                logger.log('info', user.value)
            })

        })
    }

}
module.exports = User