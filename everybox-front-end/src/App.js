import React, { useState } from 'react'
import "./App.css"

import CustomerDetails from './components/CustomerDetails'
import FoodTable from './components/FoodTable'
import EveryboxMenu from './components/Menu'

import { Container, Header, Divider } from 'semantic-ui-react'

function App() {
  // Form unlock allows the food table to appear once 
  // customer details are filled in
  const [ formUnlock, setFormUnlock ] = useState(false)
  // Diet passes customer requirements to food table 
  const [ diet, setDiet ] = useState("")
  // Order is the final order object that will be sent
  // to the DB API
  const [ order, setOrder ] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    familySize: 1,
    items: [{
        
    }],
    orderNumber: "",
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

      <CustomerDetails 
        order={order} setOrder={setOrder} 
        diet={diet} setDiet={setDiet} 
        setFormUnlock={setFormUnlock} 
      />

      {
        formUnlock 
        ? <FoodTable order={order} setOrder={setOrder} diet={diet} setDiet={setDiet} />
        : null
      }

      <Divider hidden />
    </Container>
  )
}

export default App