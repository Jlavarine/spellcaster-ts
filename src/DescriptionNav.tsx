import React from 'react';
import { Link } from 'react-router-dom';
import './DescriptionNav.css'
interface DescriptionNavProps {
    resetSearch: () => void
}
const DescriptionNav = ({resetSearch}: DescriptionNavProps) => {
  return(
    <nav className='desc-nav'>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <h1 className="page-title">Spellcaster</h1>
      </Link>
      <div className="btn-styling">
        <Link to='/'> <button className="home-btn" onClick={resetSearch}>Home</button> </Link>
        <Link to='/favorites'><button className="favorites-btn" onClick={resetSearch}>Favorites</button></Link>
      </div>
    </nav>
  )
}

export default DescriptionNav;