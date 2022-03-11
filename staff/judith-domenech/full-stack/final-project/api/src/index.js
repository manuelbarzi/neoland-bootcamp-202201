require('dotenv').config()
const { mongoose: { connect, disconnect } } = require('data')
const express = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    updatePassword,
    deleteUser,
    createComment,
    listComments,
    retrieveComment,
    deleteComment,
    toggleFavorite,
    listFavorites,
    searchRackets,
    listRackets,
    retrieveRacket,
    searchYourRacket
   
} = require('./handlers')

const cors = require('cors')
const { env: { PORT, MONGODB_URL }} = process

connect(MONGODB_URL)
    .then(() => console.log('db connected'))
    .then(() => {
        const server = express()

        server.use(cors())

        const jsonBodyParser = express.json()

        const api = express.Router()

        api.post('/users', jsonBodyParser, registerUser)
        api.post('/users/auth', jsonBodyParser, authenticateUser)
        api.get('/users', retrieveUser)
        api.patch('/users', jsonBodyParser, updateUser)
        api.patch('/users/change-password', jsonBodyParser, updatePassword)
        api.delete('/users', jsonBodyParser, deleteUser)

        api.post('/racket?q=${query}', jsonBodyParser, searchRackets) ////??????????
        api.get('/rackets/:racketId', retrieveRacket)
        api.get('/rackets', listRackets)
        api.post('/rackets', jsonBodyParser, toggleFavorite)
        api.get('/rackets/favorites', listFavorites)
        api.post('/rackets/:racketId', jsonBodyParser, searchYourRacket)

        api.post('/comment', jsonBodyParser, createComment)
        api.get('/comment/:commentId', retrieveComment)
        api.get('/comment', listComments)
        api.delete('/comment/:commentId', jsonBodyParser, deleteComment)
             

        server.use('/api', api)

        server.listen(PORT, () => console.log('server started'))
    })
