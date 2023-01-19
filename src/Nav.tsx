import React from 'react'
import { Link } from 'react-router-dom';
import logo from "./images/Spellcaster Logo.png";
import './Nav.css'

interface NavProps {
    searchValue: string;
    handleChange: (a: React.ChangeEvent<HTMLInputElement>) => void;
    resetSearch: () => void

}
const Nav = ({searchValue, handleChange, resetSearch}: NavProps) => {
  return (
    <nav>
      <div className='nav'>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <img src={logo} alt="SpellCaster logo" />
      </Link>
        <form>
          <input
          className='spell-search'
          type='text'
          name='name'
          placeholder='Search for a spell...'
          value={searchValue}
          onChange={(event) => {
            handleChange(event)
          }}
          />
        </form>
        <Link to='/favorites'><button className="favorites-btn" onClick={resetSearch}>Favorites</button></Link>
      </div>
    </nav>
  )
}
export default Nav
