import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Table } from 'react-bootstrap'
import Card from '../components/PokemonLists'

const GET_POKEMON = gql`
  query GetPokemon ($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      weaknesses
      fleeRate
      maxCP
      evolutions {
        name
        image
      }
      maxHP
      image
    }
  }
`
const COLOR = {
  fire: '#FD7D24',
  water: '#4592C4',
  grass: '#9BCC50',
  electric: '#EED535',
  dragon: '#4A446A',
  dark: '#707070',
  psychic: '#F366B9',
  ice: '#51C4E7',
  flying: '#649BD4',
  bug: '#729F3F',
  fairy: '#FDB9E9',
  ground: '#704326',
  normal: '#A4ACAF',
  rock: '#A38C21',
  fighting: '#D56723',
  poison: '#B97FC9',
  ghost: '#7B62A3',
  steel: '#84B7B8',
}; 

const DetailPage = () => {
  const { pokemon } = useParams() 
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables:{name: pokemon},
  })
  const getColor = (type) => {
    return COLOR[type] || COLOR.normal;
  }; 
  if (loading) return <p>loading...</p>
  if (error) return <p>error: {error.message}</p>

  console.log(data);
  return (
    <>
    <Navbar />
    <div className="pokemon-image-container">
      <h1 className="text-center">
        {data.pokemon.name}
      </h1>
      <img
        src={data.pokemon.image}
        alt="pokemon"
        className="img-fluid pokemon-image-detail d-block mx-auto"
      />
      <div className="pokemon-box-details">
        <ul className="list-group list-group-horizontal justify-content-center">
          {data.pokemon.types.length > 0 &&
            data.pokemon.types.map((t, idx) => (
              <li
                key={idx}
                className="list-group-item d-flex pokemon-list-details text-light"
                style={{background: getColor(t.toLowerCase())}}
              >
                {t}
              </li>
            ))}
        </ul>
        <div>
          <Table>
          <thead>
            <tr>
              <th scope="col">Weight Range</th>
              <th scope="col">Height range</th>
              <th scope="col">Classification</th>
              <th scope="col">Types</th>
              <th scope="col">Fast attacks</th>
              <th scope="col">Special attacks</th>
              <th scope="col">Resistances</th>
              <th scope="col">Weaknesses</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.pokemon.weight.minimum + ' - ' + data.pokemon.weight.maximum}</td>
              <td>{data.pokemon.height.minimum + ' - ' + data.pokemon.height.maximum}</td>
              <td>{data.pokemon.classification}</td>
              <td>{data.pokemon.types.join(', ')}</td>
              <td>
                {
                  data.pokemon.attacks.fast.map(data => {
                    return <li>{data.name}({data.type}) `</li>
                  })
                }
                </td>
              <td>
              {
                  data.pokemon.attacks.special.map(data => {
                    return <li>{data.name}({data.type}) `</li>
                  })
                }
              </td>
              <td>{data.pokemon.resistant.join(', ')}</td>
              <td>{data.pokemon.weaknesses.join(', ')}</td>
            </tr>
          </tbody>
        </Table>
        </div>
        
      </div>
    </div>
        {
          data.pokemon.evolutions !== null ? 
          <>
            <h3 className="text-center">Evolutions</h3>
          <div className="all-container">
            <Card pokemonsData={data.pokemon.evolutions}/>
          </div>
          </>
        : <></>
        }
    </>
  )
}

export default DetailPage