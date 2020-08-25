import React, { useState } from 'react'
import { Button, Checkbox, Form, Label, Divider, Segment } from 'semantic-ui-react'

// MARK: Form values
const familySize = [
    { key: 1, text: "1", value: "1"},
    { key: 2, text: "2", value: "2"},
    { key: 3, text: "3", value: "3"},
    { key: 4, text: "4", value: "4"}
]

// MARK: Styling
const radioStyle = {
    padding: "0 0 0 1rem",
}

export default function CustomerDetails() {
    const [ halal, setHalal ] = useState(false)
    const [ vegetarian, setVegetarian ] = useState(false)
    const [ vegan, setVegan ] = useState(false)

    return (
        <Segment>
        <Form>

            <Form.Group widths="equal">
                <Form.Input fluid label="First Name" placeholder="First Name..." />
                <Form.Input fluid label="Last Name" placeholder="Last Name..." />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input fluid label="Phone number" placeholder="Phone Number..." />
                <Form.Select
                    fluid
                    label="Family size"
                    options={familySize}
                    placeholder="Family size..."
                />
            </Form.Group>

            <Divider hidden />
            
            <Form.Group inline>
            <Label>Dietary requirements</Label>
                <Form.Radio 
                    label="Halal"
                    value="hl"
                    checked={halal === true}
                    onClick={() => {halal ? setHalal(false) : setHalal(true)}}
                    style={radioStyle}
                />
                <Form.Radio 
                    label="Vegetarian"
                    value="v"
                    checked={vegetarian === true}
                    onClick={() => {vegetarian ? setVegetarian(false) : setVegetarian(true)}}
                    style={radioStyle}
                />
                <Form.Radio 
                    label="Vegan"
                    value="vg"
                    checked={vegan === true}
                    onClick={() => {vegan ? setVegan(false) : setVegan(true)}}
                    style={radioStyle}
                />
            </Form.Group>

        </Form>
        </Segment>
    )
}