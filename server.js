const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const app = express()
const routes = require('./routes/api')

const PORT = process.env.PORT || 8000


mongoose.connect('mongodb://localhost/mydatabase', {
   useNewUrlParser: true,
   useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
   console.log("mongoose connected")
})


// handles data that comes in json format
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// 

app.use(morgan('tiny'))
app.use('/', routes)

app.listen(PORT, console.log(`listening at ${PORT}`))