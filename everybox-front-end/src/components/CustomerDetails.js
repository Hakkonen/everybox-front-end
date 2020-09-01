import React, { useState, useEffect } from 'react'
import { Form, Label, Divider, Segment, Button } from 'semantic-ui-react'

// MARK: Styling
const radioStyle = {
    padding: "0 0 0 1rem",
}

export default function CustomerDetails(props) {
    const [ formValidation, setFormValidation ] = useState(true)

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
        console.log(event.target.error)
        const prevOrder = props.order
        if(/^\d+$/.test(value)) {
            props.setOrder({ ...prevOrder, phone: value })
        }
    }

    const handleFamilySize = event => {
        const { value } = event.target
        const prevOrder = props.order
        if(/^\d+$/.test(value) && value < 14) {
            props.setOrder({ ...prevOrder, familySize: value })
        }
    }

    useEffect(() => {
        if(props.order.firstname 
            && props.order.lastname 
            && /^\d+$/.test(props.order.phone) == true) {
            setFormValidation(false)
        } else {
            setFormValidation(true)
        }
    }, [props.order.firstname, props.order.lastname, props.order.phone])

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
                    checked={props.diet === "hl"}
                    onClick={() => {props.diet !== "hl" ? props.setDiet("hl") : props.setDiet("")}}
                    style={radioStyle}
                />
                <Form.Radio 
                    label="Vegetarian"
                    value="vg"
                    checked={props.diet === "vg"}
                    onClick={() => {props.diet !== "vg" ? props.setDiet("vg") : props.setDiet("")}}
                    style={radioStyle}
                />
            </Form.Group>
            <Button 
                    primary 
                    disabled={formValidation}
                    onClick={() => {props.setFormUnlock(true)}}
                >Continue</Button>
        </Form>
        </Segment>
        
    )
}