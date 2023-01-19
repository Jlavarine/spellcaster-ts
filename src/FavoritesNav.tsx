import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./images/Spellcaster Logo.png";
import './DescriptionNav.css'
interface FavoritesNavProps {
    resetSearch: () => void
}
const FavoritesNav = ({resetSearch}: FavoritesNavProps) => {
  return(
    <nav className='desc-nav'>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <img src={logo} alt="SpellCaster logo" />
      </Link>
      <div className="btn-styling">
        <Link to='/'> <button className="home-btn" onClick={resetSearch}>Home</button> </Link>
      </div>
    </nav>
  );
};

export default FavoritesNav;
