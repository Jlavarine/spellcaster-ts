import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import Nav from './Nav'
import Container from './Container'
import DescriptionNav from './DescriptionNav'
import FavoritesNav from './FavoritesNav'
import SpellDescription from './SpellDescription'
import Error from './Error'
import './App.css'
import { Spell } from './interfaces'

const App = () => {
  const [spells, setSpells] = useState<Spell[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [searchedSpells, setSearchedSpells] = useState<Spell[]>([])
  const [favoritedSpells, setFavoritedSpells] = useState<Spell[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/spells')
      .then(resp => {
        if (!resp.ok) {
          setError('Something went wrong!')
        } else if (resp.ok) {
          return resp.json()
        }
      })
      .then(data => setSpells(data.results))
      .catch(error => console.log(error))
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
    const filteredSpells = spells.filter(spell => spell.name.toLowerCase().includes(event.target.value.toLowerCase()) === true)
    setSearchedSpells(filteredSpells)
  }

  const checkForMatchingSpell = (url: string) => {

    let match: boolean[] = [];
    spells.forEach(spell => {
      if (spell.index.toLowerCase() === url) {
        match.push(true)
      } else {
        match.push(false)
      }
    })
    return match.every((element) => element === false)
  }

  const addFavorite = (favSpell: string) => {
    const favoriteSpell = spells.find(spell => spell.name === favSpell)
    if(favoriteSpell) {
      let copiedFavs: Spell[] = [favoriteSpell]
      favoritedSpells.forEach(spell => copiedFavs.push(spell))
      setFavoritedSpells(copiedFavs)
    }
  }

  const checkFavorite = (favSpell: string) => {
    console.log(favSpell)
    let value: boolean[] = [];
    favoritedSpells.forEach(element => {
      if (element.name === favSpell) {
        value.push(true);
      } else {
        value.push(false)
      }
    })
    return value.every(e => e === false)
  };

  const resetSearch = () => {
    setSearchValue('')
    setSearchedSpells([])
  }

  if(error) {
    return (
      <h2 className='load-error'>The spellbook is still being translated. Please refresh the page.</h2>
    )
  } else return(
    <main className='App'>
      <Switch>
        <Route exact path='/' render={() => {
          if(!searchValue && !searchedSpells.length) {
            return (
              <div>
                <Nav handleChange={handleChange} searchValue={searchValue} resetSearch={resetSearch}/>
                <Container spells={spells} />
              </div>
            )
          }else if (!searchedSpells.length){
            return (
              <div>
                <Nav handleChange={handleChange} searchValue={searchValue} resetSearch={resetSearch}/>
                <h2 className='no-spells-error'>Sorry! There are no spells that match your search.</h2>
              </div>
            )
          }else return (
            <div>
              <Nav handleChange={handleChange} searchValue={searchValue} resetSearch={resetSearch}/>
              <Container spells={searchedSpells} />
            </div>
          )
        }} />
        <Route exact path='/favorites' render={() => {
          if(!favoritedSpells.length) {
            return (
              <div>
                <FavoritesNav resetSearch={resetSearch}/>
                <p>You haven't favorited any spells yet.</p>
              </div>
            )
          } else {
            return (
              <div>
                <FavoritesNav resetSearch={resetSearch}/>
                <Container spells={favoritedSpells}/>
              </div>
            )
          }
        }} />
        <Route path='/:spell' render={({match}) => {
          if(!checkForMatchingSpell(match.params.spell)) {
            return (
              <div>
                <DescriptionNav  resetSearch={resetSearch}/>
                <SpellDescription currentSpell={match.params.spell} addFavorite={addFavorite} checkFavorite={checkFavorite}/>
              </div>
            )
          } else {
            return (
              <Error />
            )
          }
        }} />
      </Switch>
    </main>
  )
}
export default App
