
const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const order = new Schema ({
  
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    
})

module.exports = order