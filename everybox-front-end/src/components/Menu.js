import React, { useState } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'

function EveryboxMenu(props) {
    const [ activeItem, setActiveItem ] = useState("home")
    return (
        <Menu>
            <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={() => {setActiveItem("home")}}
            />
            <Menu.Menu position='right'>
                <Dropdown item text='Staff'>
                    <Dropdown.Menu>
                        <Menu.Item
                        name='orders'
                        active={activeItem === 'orders'}
                        onClick={() => {setActiveItem("orders")}}
                        />
                        <Menu.Item
                        name='inventory'
                        active={activeItem === 'inventory'}
                        onClick={() => {setActiveItem("inventory")}}
                        />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu>
    )
}

export default EveryboxMenu