import React, { useState, useEffect } from 'react'
import { Checkbox, Table, Button } from 'semantic-ui-react'
import everyboxAPI from '../utils/everyboxAPI'

// Image styling
const imgSize = {
    width: "5vw"
}

// MARK: Main function
export default function FoodTable(props) {
    const [ selected, setSelected ] = useState([])
    const [ data, setData ] = useState([{}])
    const [ submit, setSubmit ] = useState(false)

    // MARK: Load API data
    // GETs data from back-end
    useEffect(() => {
        getFood()
        getOrderNumber()
    }, [])

    // Async axios GET called by useEffect
    // Fills table with available food
    const getFood = async () => {
        try {
            const response = await everyboxAPI.get("foods")
            setData(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    // Define order number by
    // finding highest order number and iterate + 1
    const getOrderNumber = async () => {
        try {
            const apiGet = await everyboxAPI.get('http://localhost:8080/api/orders')
            const orders = apiGet.data
            let highestOrder = 1
            for(const order of orders) {
                if(highestOrder <= parseInt(order.orderNumber)) {
                    highestOrder = parseInt(order.orderNumber) + 1
                }
            }
            props.setOrder(prevState => ({...prevState, orderNumber: highestOrder}))
        } catch (err) {
            console.log("Error getting order number: ", err)
        }
    }

    // Populates table items
    let key = 0
    const tableItems = data.map((e) => 
        <Table.Row 
            id={e._id} 
            key={key = key + 1} 
            // Highlights green when item is found in order object
            className={selected.includes(e._id) ? "positive" : ""}
            // Disables according to diet options
            disabled={(props.diet === "hl" && e.halal !== true) || (props.diet === "vg" && e.vegetarian !== true)}
        >
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
        // Sets selected arr
        setSelected(prevState => [...prevState, itemId])
    }

    // Remove single item
    const removeItem = (itemId) => {
        // Sets selected array
        setSelected(selected.filter((e) => (e !== itemId)))
    }

    // Add all foods
    const selectAll = (e) => {
        // Resets selected array
        setSelected([])
        // This could perhaps be made more efficient by having diet stored
        // as a string in the DB
        if(props.diet === "hl") {
            for(const item of data) {
                if(item.halal == true) {
                    // Populates selected arr for halal only
                    setSelected(prevState => [...prevState, item._id])
                }
            }
        } else if (props.diet === "vg") {
            for(const item of data) {
                if(item.vegetarian == true) {
                    // Populates selected arr for veg only
                    setSelected(prevState => [...prevState, item._id])
                }
            }
        } else {
            for(const item of data) {
                // Adds all to selected arr
                setSelected(prevState => [...prevState, item._id])
            }
        }
    }

    // Remove all foods
    const deselectAll = () => {
        // Removes all from selected
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
    async function everyboxPOST() {
        if(!submit) {
            // Finalise ordeer object
            console.log("final order")
            console.log(props.order)

            // POST request using axios inside useEffect React hook
            const order = props.order
            await everyboxAPI.post('http://localhost:8080/api/orders', order)
            .then(response => {
                console.log('Authenticated: ', response);
            }).catch(error => {
                console.log('Error on Authentication: ', error);
            })
            setSubmit(true)
        }
    }

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
            <Button floated='right' color='green' onClick={() => {everyboxPOST()}}>Submit</Button>
        </span>
    )
}