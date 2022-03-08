const { models: { User } } = require('data')
const { validators: { validateId } } = require('commons')

function listFriends(userId) {
    validateId(userId, 'userId')
    return User.findById(userId)
        .then(user => {

            if(!user) throw new Error(`user with id ${userId} does not exist`)

            return user.friends
        })
}

module.exports = listFriends