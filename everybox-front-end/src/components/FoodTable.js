import React, { useState, useEffect } from 'react'
import { Checkbox, Table } from 'semantic-ui-react'
import axios from 'axios'

// TODO: Select all button

export default function FoodTable() {
    const [ selected, setSelected ] = useState([])
    const [ data, setData ] = useState([{}])

    // MARK: Load API data
    // GETs data from back-end
    useEffect(() => {
        getFood()
    }, [])

    // Logs selected item info when... selected
    useEffect(() => {
        console.log(data)
    }, [selected])

    // Async axios GET called by useEffect
    const getFood = async () => {
        const response = await axios.get("http://localhost:8080/api/foods/")
        // const { data } = await response
        setData(response.data)
    }

    // Populates table items
    let key = 0
    const tableItems = data.map((e) => 
        <Table.Row id={e._id} key={key = key + 1} className={selected.includes(e._id) ? "positive" : ""}>
            <Table.Cell collapsing>
                <Checkbox 
                    checked={selected.includes(e._id)}
                    onClick={() => 
                        selected.includes(e._id) 
                        ? changeColour(e._id)
                        : setSelected(prevState => [...prevState, e._id])
                    }
                />
            </Table.Cell>
            <Table.Cell>{e.name}</Table.Cell>
            <Table.Cell>{e.available}</Table.Cell>
            </Table.Row> 
    )

    // MARK: UI Functions
    const changeColour = (id) => {
        setSelected(selected.filter((e) => (e !== id)))
    }

    // MARK: HTML/JSX
    return (
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
    )
}