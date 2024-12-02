const express = require('express')
const app = express()
const moviesrouter = require('./Routes/MoviesRoutes')

const morgan = require('morgan')
// This is the Change




// this is a custom MiddleWares
const cusMw = (req , res, next)=>{
    console.log('middle Ware is Executed')
    req.requestedAt = new Date().toISOString();
    next()
}

app.use(express.json())
app.use(morgan('dev'))
app.use(cusMw)

app.use('/api/v1/movies' , moviesrouter)


module.exports = app