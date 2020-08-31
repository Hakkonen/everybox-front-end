import React, { useState } from 'react'
import "./App.css"

import CustomerDetails from './components/CustomerDetails'
import FoodTable from './components/FoodTable'

import { Button, Container, Header, Divider, Menu } from 'semantic-ui-react'
import EveryboxMenu from './components/Menu'

function App() {
  const [ page, setPage ] = useState("")
  const [ order, setOrder ] = useState({
    firstname: "",
    lastname: "",
    email: null,
    phone: "",
    familySize: 1,
    orderDate: null,
    items: [{
        
    }],
    orderNumber: 2,
    isComplete: false
  })

  return (
    
    <Container className="main">

      <Header>
        <h1>
          Everybox
        </h1>
      </Header>

      <EveryboxMenu />
      
      <Divider hidden />

      <Header>
        Order Form
      </Header>

      <CustomerDetails order={order} setOrder={setOrder} />

      <FoodTable order={order} setOrder={setOrder} />

      <Divider hidden />
    </Container>
  )
}

export default App