import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useLocation } from 'react-router-dom'
import Card from '../components/PokemonLists'
import Navbar from '../components/Navbar'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '../components/Loader'

const GET_POKEMONS = gql`
  query GetPokemons ($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      weight {
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
        id
        name
      }
      maxHP
      image
    }
  }
`

const Home = () => {
  
  const location = useLocation();
  const [pokemonsData, setPokemonsData] = useState([])
  const [filterPokemonsData, setFilterPokemonData] = useState([])
  const [number, setNumber] = useState(12)
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables:{first: number},
  })

  const refetch = () => {
    setNumber(number + 12)
  }
  
  useEffect(() => {
    if (location.state) {
      setFilterPokemonData(location.state.filter)
      document.title ='Home || Pokedex'
    }
  }, [location.state])

  useEffect(() => {
    if (data) setPokemonsData(data.pokemons)
    document.title ='Home || Pokedex'
  }, [data])
  
  if (loading && !pokemonsData[0]) return <Loader />
  if (error) return <p>error: {error.message}</p>
  return (
    <>
      <Navbar pokemonsData={pokemonsData} />
      {
        location.state ? 
        <div className="all-container">
          <Card pokemonsData={filterPokemonsData} /> 
        </div>
        :
        <InfiniteScroll
          dataLength={pokemonsData.length}
          next={refetch}
          hasMore={true}
          loader={<Loader />}
        >
        <div className="all-container">
          
            <Card pokemonsData={pokemonsData} />
      </div>
        </InfiniteScroll>
      }
    </>
  )
}

export default Home