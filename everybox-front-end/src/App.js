import React from 'react'
import "./App.css"

import CustomerDetails from './components/CustomerDetails'
import FoodTable from './components/FoodTable'

import { Container, Header, Divider } from 'semantic-ui-react'

function App() {
  return (
    <Container className="main">
      
      <Header>
        <h1>Eveeeeerybox</h1>
      </Header>

      <Divider hidden />

      <CustomerDetails />
      <FoodTable />
      
    </Container>
  )
}

export default App