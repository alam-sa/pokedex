import React from 'react'
import { useHistory } from 'react-router-dom'



const PokemonCard = ({pokemonsData}) => {
  
  const history = useHistory()
  const pokemonDetail = (name) => {
    history.push(`/${name}`)
    document.title =`${name} || Pokedex`
  }
  
  return (
    <>
    {pokemonsData.map(pokemon => {
          return (
          <div className="thumb-container" onClick={() => pokemonDetail(pokemon.name)}>
            <img src={pokemon.image} alt={pokemon.name} />
            <div className="detail-wrapper">
                <h3>{pokemon.name}</h3>
            </div>
        </div>
                )
              })
          }
  </>
  )
}

export default PokemonCard