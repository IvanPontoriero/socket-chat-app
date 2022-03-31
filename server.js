const dotenv = require('dotenv').config()
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const path = require('path')
const socketio = require('socket.io')

const route = require('./src/routes/routes')
const formatMessage = require('./src/utils/messages.util')

const { SCHEMA, USER, PASSWORD, HOSTNAME, DATABASE, OPTIONS } = process.env
const PORT = process.env.PORT || 8080

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const botName = 'MongusMachine'

//MONGO CONNECTION
const MONGODB_URI = `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
        console.log('🍃 MONGODB CONNECTED 🍃')

        // Middlewares
        app.use(express.json())
        app.use(express.static(path.join(__dirname, 'public')))
        app.use(express.urlencoded({ extended: true }))
        app.use('/', route)

        // Set template engine
        app.set('views', path.join(__dirname, 'src/views/'))
        app.set('view engine', 'pug')

        // Run when client connects
        io.on('connection', socket => {
            socket.emit('message', formatMessage(botName, 'Welcome to Mongolia chat! 🐱‍🏍'))

            socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat')) // se emite a todos excepto al usuario que está conectado

            // Runs when client disconnects
            socket.on('disconnect', () => {
                io.emit('message', formatMessage(botName, 'A user has left the chat'))
            })

            // Listen for chatMessage
            socket.on('chatMessage', msg => {
                io.emit('message', formatMessage('USER', msg))
            })
        })
    })
    .catch(err => console.log(`An error has ocurred: ${err}`))
