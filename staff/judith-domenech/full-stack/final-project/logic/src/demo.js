const { mongoose: { connect, disconnect }, models: { User, Racket } } = require('data')
const {
    registerUser,
    authenticateUser,
    updateUser,
    deleteUser,
    retrieveUser,
    updateUserPassword,
    retrieveComment,
    createComment,
    deleteComment,
    listFavorites,
    toggleFavorite,
    listComments,
    retrieveRacket,
    searchRackets

} = require('./index')

let comment
let racket

connect('mongodb://localhost:27017/racketMatch-db')

    .then(() => Promise.all([
        User.deleteOne({ email: 'pepitogrillo@gmail.com' })
    ]))

    .then(() => registerUser('Pepito Grillo', 'pepitogrillo@gmail.com', '123123123'))
    .then(() => console.log('user register'))

    .then(() => authenticateUser('pepitogrillo@gmail.com', '123123123'))
    .then((userId) => console.log('userId', userId))

    .then(() => authenticateUser('pepitogrillo@gmail.com', '123123123'))
    .then((userId) => {
        return updateUser(userId, 'Pepitaa Grilla', 'pepitogrillo@gmail.com')
            .then(() => console.log('user updated'))
    })

    .then(() => authenticateUser('pepitogrillo@gmail.com', '123123123'))
    .then((userId) => {
        return updateUserPassword(userId, '123123123', '234234234')
            .then(() => console.log('user password'))
    })

    .then(() => authenticateUser('pepitogrillo@gmail.com', '234234234'))
    .then(userId => {
        return toggleFavorite (userId,'62288bf8d1170a4f727e5837')
        .then(() => console.log('favorite toggled'))
    }) 

    .then(() => authenticateUser('pepitogrillo@gmail.com', '234234234'))
    .then(userId => {
        return toggleFavorite (userId,'62288bf8d1170a4f727e5836')
        .then(() => console.log('favorite toggled'))
    }) 
    
    .then(() => authenticateUser('pepitogrillo@gmail.com', '234234234'))
    .then(userId => {
        return listFavorites(userId)
            .then(favorites => console.log(favorites))
    })

    .then(() => authenticateUser('pepitogrillo@gmail.com', '234234234'))
    .then(userId => {
        return createComment(userId, '62288bf8d1170a4f727e5837', 'Preciosa pala')
            .then(commentId => {
                comment = commentId
                console.log('created comment', comment)
            })
    })

    .then(() => authenticateUser('ora@culo.com', '123123123'))
    .then(userId => {
        return createComment(userId, '62288bf8d1170a4f727e5837', 'se me rompio con mirarla')
            .then(commentId => {
                comment = commentId
                console.log('created comment', comment)
            })
    })

    .then(() =>  searchRackets('Alpha'))
    .then(results => console.log(results))
    


/* 
    .then(() => {
        return retrieveComment(comment)
            .then(_comment => console.log(_comment))
    })
 */

/*     .then(() => listComments('62288bf8d1170a4f727e5837'))
    .then((list) => console.log(list))


   .then(() => authenticateUser('pepitogrillo@gmail.com', '234234234'))
    .then((userId) => {
        return deleteComment(userId, comment)
            .then(() => console.log('deleted comment'))
    })  */

    /* .then(() => authenticateUser('ora@culo.com', '123123123'))
    .then((userId) => {
        return deleteUser(userId, '123123123' )
            .then(() => console.log('user deleted'))
    }) */

    .catch(error => console.error(error.message))
    .then(() => disconnect())