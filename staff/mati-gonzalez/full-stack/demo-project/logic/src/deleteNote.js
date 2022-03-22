const { models: { Note } } = require('data')
const { validators: { validateId } } = require('commons')


function deleteNote(userId, noteId) {
    validateId(userId, 'user id')
    validateId(noteId, 'note id')

    return Note.deleteOne({ _id: noteId, user: userId })
        .then(result => {
            if (result.deletedCount === 0) throw new Error(`note with id ${noteId} and user id ${userId} does not exist`)
        })
}

module.exports = deleteNote

// //TODO
// const { models: {Note }} =require( 'data');
// const { validators: { validateId}}= require('commons' );
// const { virtuals } = require('data/src/schemas/creditCard');

// function deleteNote(id, noteId) {
//     validateId(id)
//     validateId(noteId)

//     return Note.deleteOne({_id: noteId, user: id})
// }

// module.exports = deleteNote