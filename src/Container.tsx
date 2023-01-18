import React from 'react'
import Spells from './Spells'
import { Spell } from './interfaces'
import './Container.css'

interface ContainerProps {
    spells: Spell[]
}
const Container = ({spells}: ContainerProps) => {
  let i = 0;
  const allSpells = spells.map(spell => {
    return (
      <Spells
        name={spell.name}
        id={i += 1}
        key={i}
        url={spell.url}
        index={spell.index}
      />
    )
  })
  return (
    <div className='spell-container'>
      {allSpells}
    </div>
  )
}
export default Container
