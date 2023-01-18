import React, { Component, useState, useEffect } from 'react'
import './SpellDescription.css'
import { Spell } from './interfaces'
import imgAbjuration from "./images/Abjuration.jpg";
import imgConjuration from "./images/Conjuration.jpg";
import imgDivination from "./images/Divination.jpg";
import imgEnchantment from "./images/Enchantment.jpg";
import imgEvocation from "./images/Evocation.jpg";
import imgIllusion from "./images/Illusion.jpg";
import imgNecromancy from "./images/Necromancy.jpg";
import imgTransmutation from "./images/Transmutation.jpg";
import spellcast from "./images/Spellcast.jpg";
interface SpellDescriptionProps {
    currentSpell: string;
    addFavorite: (a: string) => void;
    checkFavorite: (a: string) => boolean;
}

interface SpellDescription {
    name: string;
    casters: string;
    castingTime: string;
    range: string;
    components: string;
    description: string;
    school: string;
}

interface DamageType {
    index: string;
    name: string;
    url: string;
}

interface DamageAtSlotLevel {
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
}

interface School {
    index: string;
    name: string;
    url: string;
}

interface Class {
    index: string;
    name: string;
    url: string;
}

interface SubClasses {
    index: string;
    name: string;
    url: string;
}
interface Data {
    index: string;
    name: string;
    desc: string[];
    higher_level: string[];
    range: string;
    components: string[];
    material: string;
    ritual: boolean;
    duration: string;
    concentration: boolean;
    casting_time: string;
    level: number;
    attack_type: string;
    damage: DamageType & DamageAtSlotLevel;
    school: School;
    classes: Class[];
    subclasses: SubClasses;
    url: string;



}
const SpellDescription = ({ currentSpell, checkFavorite, addFavorite}: SpellDescriptionProps) => {

    const [spell, setSpell] = useState<SpellDescription | null>(null)
    const [error, setError] = useState('')


    useEffect(() => {
        getSpellDescription()
        console.log(spell)
    }, [])

    const getSpellDescription = () => {
        console.log('hello')
        fetch(`https://www.dnd5eapi.co/api/spells/${currentSpell}`)
            .then(resp => {
                if (!resp.ok) {
                    setError('Something went wrong!')
                } else if (resp.ok) {
                    return resp.json()
                }
            })
            .then(data => spellDescriptionCleaner(data))
            .then(data => setSpell(data))
            .catch(error => console.log(error))
    }

    const spellDescriptionCleaner = (data: Data) => {
        let allCasters: string[] = []
        data.classes.forEach(caster => allCasters.push(caster.name))
        let allComponents: string[] = []
        data.components.forEach(component => allComponents.push(component))
        return {
            name: data.name,
            casters: allCasters.join(', '),
            castingTime: data.casting_time,
            range: data.range,
            components: allComponents.join(', '),
            description: data.desc[0],
            school: data.school.name
        };
    }

    const getUniqueImage = () => {
        let image;
        if(spell){
        const expr = spell.school
          switch (expr) {
            case 'Abjuration':
              image = imgAbjuration
          break;
            case 'Conjuration':
              image = imgConjuration
          break;
            case 'Divination':
              image = imgDivination
          break;
            case 'Enchantment':
              image = imgEnchantment
          break;
            case 'Evocation':
            image = imgEvocation
          break;
            case 'Illusion':
              image = imgIllusion
          break;
            case 'Necromancy':
              image = imgNecromancy
          break;
            case 'Transmutation':
              image = imgTransmutation
          break;
            default:
            image = spellcast
        }
        return image
    }
    }
  if(spell) {
      return (
          <section>
          <div className='description-box'>
            <h2 className='spell-name-desc'>{spell.name}</h2>
            <p className='casters'>Casters: {spell.casters}</p>
            <p className='components'>Components: {spell.components}</p>
            <p className='desc'>Description: {spell.description}</p>
            <p className='casting-time'>Casting Time: {spell.castingTime}</p>
            <p className='range'>Range: {spell.range}</p>
            <p className='school'>School: {spell.school}</p>
            {checkFavorite(spell.name) && <button className='favorite-btn' onClick={() => addFavorite(spell.name)}>Add to favorites</button>}
          </div>
          <div className='image-box'>
          <img className='school-img' src={getUniqueImage()}/>
        </div>
        </section>
      )
  } else {
    return (
        <p>Broken Spell</p>
    )
  }
}

//   getUniqueImage = () => {
//     let image;
//     const expr = this.state.spell.school
//       switch (expr) {
//         case 'Abjuration':
//           image = imgAbjuration
//       break;
//         case 'Conjuration':
//           image = imgConjuration
//       break;
//         case 'Divination':
//           image = imgDivination
//       break;
//         case 'Enchantment':
//           image = imgEnchantment
//       break;
//         case 'Evocation':
//         image = imgEvocation
//       break;
//         case 'Illusion':
//           image = imgIllusion
//       break;
//         case 'Necromancy':
//           image = imgNecromancy
//       break;
//         case 'Transmutation':
//           image = imgTransmutation
//       break;
//         default:
//         image = null
//     }
//     return image
// }
//   checkIfFavorite = () => {
//     this.props.checkFavorite(this.props.spell)
//   };

//   render() {
//     return (
    //   <section>
    //     <div className='description-box'>
    //       <h2 className='spell-name-desc'>{this.state.spell.name}</h2>
    //       <p className='casters'>Casters: {this.state.spell.casters}</p>
    //       <p className='components'>Components: {this.state.spell.components}</p>
    //       <p className='desc'>Description: {this.state.spell.description}</p>
    //       <p className='casting-time'>Casting Time: {this.state.spell.castingTime}</p>
    //       <p className='range'>Range: {this.state.spell.range}</p>
    //       <p className='school'>School: {this.state.spell.school}</p>
    //       {this.props.checkFavorite(this.props.spell) && <button className='favorite-btn' onClick={() => this.props.addFavorite(this.props.spell)}>Add to favorites</button>}
    //     </div>
    //     <div className='image-box'>
    //       <img className='school-img' src={this.getUniqueImage()}/>
    //     </div>
    //   </section>
//     )
//   }
// }
export default SpellDescription

