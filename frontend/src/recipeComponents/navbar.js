import React, { useContext, useState } from 'react';


// ReactStrap
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

// Routing
import {Outlet, Link} from "react-router-dom";


//Auth
import AuthContext from '../context/AuthContext';

//Styling
import './navbar.css'



export default function NavBar(props){
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const {user, logoutUser} = useContext(AuthContext);

    return (
        <div>
            <Navbar dark expand='md' id='navbar'>
                <NavbarBrand href="/"> MyCookBook </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className='me-auto' navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/RecipeCreate">
                                Recipe Create
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/RecipeList">
                                Recipe List
                            </NavLink>
                        </NavItem>
                        
                        
                        {user ? (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} onClick={logoutUser}>
                                        Logout
                                    </NavLink>
                                </NavItem>
                            </> 
                            ) : (
                                <>
                                <NavItem>
                                    <NavLink tag={Link} to="/Login">
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/Register">
                                        Register
                                    </NavLink>
                                </NavItem>
                                </>
                            )
                        }
                        
                    </Nav>
                </Collapse>
            </Navbar>

            <div id="detail">
                <Outlet />
            </div>
        </div>
    )
}
