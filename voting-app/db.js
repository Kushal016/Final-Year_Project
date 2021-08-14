const mongodb = require('mongodb')
const logger = require('./logger')

const connectionString = "mongodb+srv://kushal:password12345@cluster0.3fatn.mongodb.net/test?retryWrites=true&w=majority"

mongodb.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    logger.log('info', `Connected to database`)
    module.exports = client.db()
    const app = require('./app')
    const PORT = 3000 || process.env.PORT
    app.listen(PORT)
    logger.log('info', `Server up and running on PORT :: 3000`)
})