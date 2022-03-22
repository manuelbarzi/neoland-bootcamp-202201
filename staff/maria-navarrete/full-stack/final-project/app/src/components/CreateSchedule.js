import './CreateSchedule.sass'
import { useState, useEffect } from 'react'
import { Input, Select, Button } from '.'
import { data } from 'commons'
import { retrieveAction, createSchedule } from '../logic'
const { repeatOptions } = data

export const CreateSchedule = ({ actionId, onCreated }) => {

    const [description, setDescription] = useState('')
    const [requiredTime, setRequiredTime] = useState('')
    const [requiredBudget, setRequiredBudget] = useState('')

    useEffect(async () => {
        try {
            const action = await retrieveAction(sessionStorage.token, actionId)
            const { description, requiredTime, requiredBudget } = action
            setDescription(description)
            setRequiredTime(requiredTime)
            setRequiredBudget(requiredBudget)
        } catch (error) {
            alert(error.message)
        }
    }, [])


    const createNewSchedule = async event => {
        try {
            const { target: { date: { value: _date }, repeat: { value: repeat } } } = event
            const date = new Date(_date)
            await createSchedule(sessionStorage.token, actionId, date, repeat)
            onCreated && onCreated()
        } catch (error) {
            alert(error.message)
        }
    }

    const onSubmit = event => {
        event.preventDefault()
        createNewSchedule(event)
    }

    return <>
        <h2>Agendar Acción</h2>
        <form onSubmit={onSubmit}>
            <Input type='text' name='description' defaultValue={description} disabled label='Descripción' />
            <Input type='text' name='requiredTime' defaultValue={requiredTime} disabled label='Tiempo Requerido' />
            <Input type='text' name='requiredBudget' defaultValue={requiredBudget} disabled label='Dinero Requerido' />
            <Input type='date' name='date' placeholder='Fecha' label='Fecha' required />
            <Select name='repeat' id='repeat' options={repeatOptions} required label='Repetición' />
            <Button type='submit'> Agendar </Button>
        </form>
    </>
}
