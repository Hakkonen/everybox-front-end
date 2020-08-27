import React, { useState } from 'react'
import "./App.css"

import CustomerDetails from './components/CustomerDetails'
import FoodTable from './components/FoodTable'

import { Container, Header, Divider } from 'semantic-ui-react'

function App() {
  const [ order, setOrder ] = useState({
    firstname: "",
    lastname: "",
    email: null,
    phone: "",
    familySize: 1,
    orderDate: null,
    items: [{
        
    }],
    orderNumber: 2
  })

  return (
    <Container className="main">
      
      <Header>
        <h1>Eveeeeerybox</h1>
      </Header>

      <Divider hidden />

      <CustomerDetails order={order} setOrder={setOrder} />
      <FoodTable order={order} setOrder={setOrder} />

      <Divider hidden />
    </Container>
  )
}

export default App