import React, { useState, useEffect } from 'react'
import { Checkbox, Form, Label, Divider, Segment } from 'semantic-ui-react'

// MARK: Styling
const radioStyle = {
    padding: "0 0 0 1rem",
}

export default function CustomerDetails(props) {
    const [ diet, setDiet ] = useState("")

    // MARK: Fills order object with customer data onChange
    // TODO: Reduce repeating logic
    const handleFirstName = event => {
        const { value } = event.target
        const prevOrder = props.order
        props.setOrder({ ...prevOrder, firstname: value })
    }

    const handleLastName = event => {
        const { value } = event.target
        const prevOrder = props.order
        props.setOrder({ ...prevOrder, lastname: value })
    }

    const handlePhone = event => {
        const { value } = event.target
        const prevOrder = props.order
        props.setOrder({ ...prevOrder, phone: value })
    }

    // FIX VALUE
    const handleFamilySize = event => {
        const { value } = event.target
        const prevOrder = props.order
        props.setOrder({ ...prevOrder, familySize: value })
        console.log(event)
    }

    // MARK: Render form
    return (
        <Segment>
        <Form>

            <Form.Group widths="equal">
                <Form.Input 
                    fluid required 
                    label="First Name" 
                    placeholder="First Name..." 
                    onChange={handleFirstName}
                />
                <Form.Input 
                    fluid required 
                    label="Last Name" 
                    placeholder="Last Name..." 
                    onChange={handleLastName}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input 
                    fluid label="Phone number" 
                    placeholder="Phone Number..." 
                    onChange={handlePhone}
                />
                <Form.Input
                    fluid label="Family size"
                    placeholder="1"
                    onChange={handleFamilySize}
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