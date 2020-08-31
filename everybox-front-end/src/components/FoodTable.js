import React, { useState, useEffect } from 'react'
import { Checkbox, Table, Button } from 'semantic-ui-react'
import everyboxAPI from '../utils/everyboxAPI'
import axios from 'axios'

// Image styling
const imgSize = {
    width: "5vw"
}

export default function FoodTable(props) {
    const [ selected, setSelected ] = useState([])
    const [ data, setData ] = useState([{}])
    const [ submit, setSubmit ] = useState(false)
    const [ auth, setAuth ] = useState({
        username: 'admin',
        password: 'everybox!'
    })

    // MARK: Load API data
    // GETs data from back-end
    useEffect(() => {
        getFood()
    }, [])

    // Logs selected item info when... selected
    useEffect(() => {
        // console.log(data)
    }, [selected])

    // Async axios GET called by useEffect
    // Fills table with available food
    const getFood = async () => {
        try {
            const response = await everyboxAPI.get("foods")
        // const { data } = await response
        setData(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    // Populates table items
    let key = 0
    const tableItems = data.map((e) => 
        <Table.Row 
            id={e._id} 
            key={key = key + 1} 
            className={selected.includes(e._id) ? "positive" : ""
        }>
            <Table.Cell collapsing>
                <Checkbox 
                    // Check box is active if selected contains item
                    checked={selected.includes(e._id)}
                    // If selected includes item then remove, else add
                    onClick={() => 
                        selected.includes(e._id) 
                        ? removeItem(e._id)
                        : addItem(e._id)
                    
                    }
                />
            </Table.Cell>
            <Table.Cell>{e.name}</Table.Cell>
            <Table.Cell>
                <img 
                style={imgSize}
                src={`${e.img}`} 
                alt="a"/>
            </Table.Cell>
            </Table.Row> 
    )

    // MARK: Basket Functions
    // Add single item
    const addItem = (itemId) => {
        setSelected(prevState => [...prevState, itemId])
    }

    // Remove single item
    const removeItem = (id) => {
        setSelected(selected.filter((e) => (e !== id)))
    }

    // Add all foods
    const selectAll = (e) => {
        setSelected([])
        for(const item of data) {
            setSelected(prevState => [...prevState, item._id])
        }
    }

    // Remove all foods
    const deselectAll = () => {
        setSelected([])
    }

    // Updates order object when items are selected
    useEffect(() => {
        // Points to object to copy
        const prevOrder = props.order
        const familySize = props.order.familySize
        // Creates empty array to populate
        let newOrder = []
        // Pushes current selected items to array
        for(const item of selected) {
            newOrder.push({ id: item, quantity: familySize })
        }
        console.log(newOrder)
        // Repopulates order object
        props.setOrder({...prevOrder, items: newOrder })
    
    }, [selected])

    // MARK: API Post request
    useEffect(() => {
        // Finalise ordeer object
        console.log("final order")
        console.log(props.order)

        // POST request using axios inside useEffect React hook
        const order = props.order
        axios.post('http://localhost:8080/api/orders', order, {
            auth: {
                username: "admin",
                password: "everybox!"
            }
        })
        .then(function(response) {
            console.log('Authenticated');
        }).catch(function(error) {
            console.log('Error on Authentication');
        })
    }, [submit])

    // MARK: HTML/JSX
    return (
        <span>

        <Table celled selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell collapsing>Selected</Table.HeaderCell>
                    <Table.HeaderCell>Item</Table.HeaderCell>
                    <Table.HeaderCell>Picture</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {tableItems}
            </Table.Body>
        </Table>

        <Button onClick={selectAll}>Select All</Button>
        <Button onClick={deselectAll}>Deselect All</Button>
        <Button floated='right' color='green' onClick={() => setSubmit(true)}>Submit</Button>
        </span>
    )
}