import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './DescriptionNav.css'
interface FavoritesNavProps {
    resetSearch: () => void
}
const FavoritesNav = ({resetSearch}: FavoritesNavProps) => {
  return(
    <nav className='desc-nav'>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <h1 className="page-title">Spellcaster</h1>
      </Link>
      <div className="btn-styling">
        <Link to='/'> <button className="home-btn" onClick={resetSearch}>Home</button> </Link>
      </div>
    </nav>
  );
};

export default FavoritesNav;

FavoritesNav.propTypes = {
  resetSearch: PropTypes.func
};
