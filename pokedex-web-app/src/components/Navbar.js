import React from 'react'
import { Navbar, NavDropdown, Nav, Image } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import logo from '../img/Pokédex.png'

const NavigationBar = ({pokemonsData}) => {
const history = useHistory()
const params = useParams()
const Redirect = () => {
 history.push('/')
}

const test = (type) => {
  let temp = []
  pokemonsData.map(pokemon => {
    if (pokemon.types.includes(type)) {
      temp.push(pokemon)
    }
  })
  history.push({
    pathname: '/',
    search: `?filter=${type}`,  
    state: {  
      filter: temp, 
    },
  });
}
  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top" className="d-flex justify-content-between">
        <Nav className="mr-auto">
          <Nav.Link onClick={Redirect}>
            <Image
              src={logo}
              alt="logo"
              className="img-fluid"
              style={{maxWidth: 120, marginLeft: 15}}
            />
            </Nav.Link>
        </Nav>
        {
          params.pokemon ? <></> :
          <NavDropdown  title="Filter">
                <NavDropdown.Item onClick={() => test('Normal')}>Normal</NavDropdown.Item>
                <NavDropdown.Item onClick={() => test('Fire')}>Fire</NavDropdown.Item>
                <NavDropdown.Item onClick={() => test('Fighting')}>Fighting</NavDropdown.Item>
                <NavDropdown.Item onClick={() => test('Flying')}>Flying</NavDropdown.Item>
                <NavDropdown.Item onClick={() => test('Grass')}>Grass</NavDropdown.Item>
                <NavDropdown.Item onClick={() => test('Poison')}>Poison</NavDropdown.Item>
                <NavDropdown.Item onClick={() => test('Electric')}>Electric</NavDropdown.Item>
                <NavDropdown.Item onClick={() => test('Psychic')}>Psychic</NavDropdown.Item>
                <NavDropdown.Item onClick={() => test('Rock')}>Rock</NavDropdown.Item>
                <NavDropdown.Item onClick={() => test('Ice')}>Ice</NavDropdown.Item>
                <NavDropdown.Item onClick={() => test('Bug')}>Bug</NavDropdown.Item>
                <NavDropdown.Item onClick={() => test('Dragon')}>Dragon</NavDropdown.Item>
                <NavDropdown.Item onClick={() => test('Ghost')}>Ghost</NavDropdown.Item>
                <NavDropdown.Item onClick={() => test('Steel')}>Steel</NavDropdown.Item>
                <NavDropdown.Item onClick={() => test('Fairy')}>Dark</NavDropdown.Item>
            </NavDropdown>
        }
      </Navbar>
    </>
  )
}

export default NavigationBar