import './CreateComment.sass'
import { createComment, retrieveRacket } from '../logic'
import { useEffect, useState } from 'react'
import { Input, Button } from '.'

export function CreateComment({ onCreated, racketId }) {
    const [model, setModel] = useState('')
    const [text, setText] = useState(null)

    useEffect(async () => {
        try {

            const racket = await retrieveRacket(racketId)
            const { model } = racket
            setModel(model)
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const addComment = async event => {
        event.preventDefault()

        try {
            const { target: { text: { value: text } } } = event

            await createComment(sessionStorage.token, racketId, text)

            setText(null)

            onCreated()
        } catch (error) {
            alert(error.message)
        }
    }

    return <>
        <form className='create-comment__form' onSubmit={addComment}>
            <Input type='text' name="model" defaultValue={model} label disabled />
            <Input className='create-comment__input' type='text' name='text' placeholder='Comentario' defaultValue={text} />
            <Button  className='create-comment__button' type='submit'> Crear </ Button>
        </form>
    </>
}

