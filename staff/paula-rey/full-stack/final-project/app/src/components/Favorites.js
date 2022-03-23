import './Favorites.sass'
import { listFavoritesLocations } from '../logic'
import { useEffect } from 'react'


export function Favorites() {

    useEffect(async() => {
        try {
            await listFavoritesLocations(sessionStorage.token)
        } catch (error) {
            alert(error.message)
        }
    }, [])

    return <>
        <h3>Aqui irá la lista de favoritos</h3>
    
    </>

}


