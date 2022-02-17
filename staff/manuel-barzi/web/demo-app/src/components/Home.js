import './Home.css'
import Profile from './Profile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'
import Search from './Search'
import { useState } from 'react'
import { retrieveUser } from '../logic'
import { useEffect } from 'react'
import Favs from './Favs'
import Detail from './Detail'

function Home({ token, onLogout }) {
    const [view, setView] = useState('search')
    const [name, setName] = useState('name')
    const [vehicleId, setVehicleId] = useState()
    const [query, setQuery] = useState()
    const [previousView, setPreviousView] = useState()

    useEffect(() => {
        try {
            retrieveUser(token)
                .then(user => setName(user.name))
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const goToProfile = event => {
        event.preventDefault()

        showProfile()
    }

    const showProfile = () => setView('profile')

    const showUpdatePassword = () => setView('update-password')

    const showDeleteAccount = () => setView('delete-account')

    const goToSearch = event => {
        event.preventDefault()

        showSearch()
    }

    const showSearch = () => setView('search')

    const goToFavs = event => {
        event.preventDefault()

        showFavs()
    }

    const showFavs = () => setView('favs')

    const goToDetail = id => {
        setVehicleId(id)

        setPreviousView(view)
        
        showDetail()
    }

    const showDetail = () => setView('detail')

    const goBackFromDetail = () => setView(previousView)

    return <div className="home">
        <div className="home__header">
            <a className="home__home-link" href="" onClick={goToSearch}><img className="home__logo" src="images/demo-logo.png" alt="" /></a>
            <h1 className="home__user">{name}</h1>
            <a href="" onClick={goToFavs}>Favs</a>
            <a className="home__profile-link" href="" onClick={goToProfile}>Profile</a>
            <button className="home__logout-button" onClick={onLogout}>Logout</button>
        </div>

        {view === 'search' && <Search token={token} onItem={goToDetail} onQuery={setQuery} query={query} />}

        {view === 'profile' && <Profile token={token} onUpdatePassword={showUpdatePassword} onDeleteAccount={showDeleteAccount} />}

        {view === 'update-password' && <UpdatePassword token={token} onBack={showProfile} />}

        {view === 'delete-account' && <DeleteAccount token={token} onBack={showProfile} onDeletedAccount={onLogout} />}

        {view === 'favs' && <Favs token={token} onItem={goToDetail} />}

        {view === 'detail' && <Detail token={token} vehicleId={vehicleId} onBack={goBackFromDetail} />}
    </div>
}

export default Home