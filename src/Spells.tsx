import React from 'react'
import { Link } from 'react-router-dom';
import './Spells.css'
import magic from "./images/Spellcast.jpg";

interface SpellsProps {
    name: string;
    id: number;
    key: number;
    url: string;
    index: string;
}
const Spells = ({name, index, id}: SpellsProps) => {
  return (
      <div className={`spell ${id}`}>
        <h2 className='spell-name'>{name}</h2>
        <Link to={`/${index}`} style={{ textDecoration: 'none' }}>
        {id % 2 == 0 ? <img className='spell-image'src="https://i.pinimg.com/originals/0f/ec/ce/0feccede3b7b4b18868110d1621bcd88.jpg" alt='An old spell book with runes and drawings flipping open.'/> : <img className='spell-image'src={`${magic}`} alt="hand creating whirling yellow magic."/>}        </Link>
      </div>
  )
}
export default Spells
