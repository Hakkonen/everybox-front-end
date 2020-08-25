import React from 'react'
import "./App.css"
import CustomerDetails from './components/CustomerDetails'
import { Container, Header, Divider } from 'semantic-ui-react'

function App() {
  return (
    <Container className="main">

      <Header>
        Eveeeeerybox
      </Header>

      <Divider hidden />

      <CustomerDetails />
    </Container>
  )
}

export default App