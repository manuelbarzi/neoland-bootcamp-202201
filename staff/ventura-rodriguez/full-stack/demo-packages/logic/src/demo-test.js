const { mongoose: { connect, disconnect }, models: { User } } = require('data')
const registerUser = require('./registerUser')
const authenticateUser = require('./authenticateUser')

connect('mongodb://localhost:27017/demo-db')
    .then(() => Promise.all([
        // User.deleteMany()
    ]))

    // .then(() => registerUser('Pepito Grillo', 'pepito@grillo.com', '123123123'))
    // .then(() => console.log('user registered'))

    // .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    // .then(userId => consr id', userId))ole.log('use

    .catch(error => console.error(error.message))
    .then(() => disconnect())