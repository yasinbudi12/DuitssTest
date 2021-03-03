const env = process.env.NODE_ENV || 'development'
switch (env) {
    case 'test':
        console.log('env test masuk')
        require('dotenv').config({
            path: process.cwd() + '/.env.test'
        })
        break;

    default:
        require('dotenv').config({
            path: process.cwd() + '/.env'
        })
        break;
}const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/index')
const url = process.env.URL;
const mongoose = require('mongoose')
console.log(env)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
const port = process.env.PORT;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    app.use(cors());
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(router)
    app.listen(port, () => {
        console.log(`Connected on port ${port}`)
    })
    // we're connected!
});