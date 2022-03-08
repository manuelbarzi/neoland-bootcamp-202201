const { models: { User } } = require('data')
const { validators: { validateString } } = require('commons')

function listUsers(query) {
    validateString(query, 'query')

    return User.find({username:query})
        .then(users => {
            const docs = users.map(user=>{
                const doc = user._doc

                doc.id = doc._id.toString()
                delete doc._id
                delete doc.__v
                delete doc.email
                delete doc.password
                delete doc.schedules
                delete doc.friends
                delete doc.notifications
                delete doc.favs

                return doc
            })

            return docs
        })
}

module.exports = listUsers