import React from "react";
import { Nav, Navbar, NavItem, NavLink, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { useState } from "react";

export default function VolcanoNavBar() {

    const [isLogin, setIsLogin] = useState(localStorage.getItem('token') !== null);

    const Logout = () => {
        localStorage.removeItem("token")
        setIsLogin(!isLogin)
    };

    return (
        <div>
            <Navbar color="light" expand="md" light>
                <NavbarBrand href="/"> Volcanoes of the world </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="/VolcanoList">
                                Volcano List
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Register">
                                Register
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav>

                        {isLogin ?
                            <NavItem onClick={Logout}>Logout</NavItem> :
                            <NavLink href="/Login">Login</NavLink>
                        }

                    </Nav>
                </Collapse>
            </Navbar>
        </div>);
}

