import React, { useState, useEffect } from 'react'
import { Header, Checkbox, Table, Container, Button } from 'semantic-ui-react'
import axios from 'axios'

// Image styling
const imgSize = {
    width: "5vw"
}

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
    const addItem = (id) => {
        setSelected(prevState => [...prevState, id])
    }

    const removeItem = (id) => {
        setSelected(selected.filter((e) => (e !== id)))
    }

    const selectAll = (e) => {
        setSelected([])
        for(const item of data) {
            setSelected(prevState => [...prevState, item._id])
        }
    }

    const deselectAll = () => {
        setSelected([])
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
        <Button floated='right'>Reset</Button>
        <Button floated='right'>Submit</Button>
        </span>
    )
}