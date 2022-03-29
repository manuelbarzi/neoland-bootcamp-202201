import './Home.sass'
import { ListSearchRackets, Search } from '../components'

export function Home({ onSearch, goToDetails, validateToken }) {

    return <div className='home'>
        
        <div className='home__search'>
            <Search onSearch={onSearch}/>
            <ListSearchRackets goToDetails={goToDetails} validateToken={validateToken}/>
        </div>
        
    </div>


}
