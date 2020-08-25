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
    const [ diet, setDiet ] = useState("")

    return (
        <Segment>
        <Form>

            <Form.Group widths="equal">
                <Form.Input fluid required label="First Name" placeholder="First Name..." />
                <Form.Input fluid required label="Last Name" placeholder="Last Name..." />
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
                    checked={diet === "hl"}
                    onClick={() => {!diet ? setDiet("hl") : setDiet("")}}
                    style={radioStyle}
                />
                <Form.Radio 
                    label="Vegetarian"
                    value="vg"
                    checked={diet === "vg"}
                    onClick={() => {!diet ? setDiet("vg") : setDiet("")}}
                    style={radioStyle}
                />
            </Form.Group>

        </Form>
        </Segment>
    )
}