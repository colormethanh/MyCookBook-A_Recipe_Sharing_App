import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import {Outlet, Link} from "react-router-dom";



export default function NavBar(props){
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar light expand='md'>
                <NavbarBrand href="#"> MyCookBook </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className='me-auto' navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/RecipeDetail">
                                Recipe Detail
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/RecipeCreate">
                                Recipe Create
                            </NavLink>
                        </NavItem> 
                    </Nav>
                </Collapse>
            </Navbar>

            <div id="detail">
                <Outlet />
            </div>
        </div>
    )
}
