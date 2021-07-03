import React, { useState } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, useHistory } from 'react-router-dom'
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";
import { useSelector } from "react-redux";

function Nav({ toggleForm }) {

    const { authenticated } = useSelector(state => state.auth)

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    <img
                        src="/assets/logo.png"
                        alt="logo"
                        style={{ marginRight: "0.8em" }}
                    />
                    Re-meet
        </Menu.Item>
                <Menu.Item as={NavLink} exact to='/events' name="Events" />
                <Menu.Item as={NavLink} exact to='/sandbox' name="Sandbox" />

                {authenticated &&
                    <Menu.Item>
                        <Button as={NavLink} to='/createevent' onClick={toggleForm} positive inverted content="Create Event" />
                    </Menu.Item>}
                {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
            </Container>
        </Menu>
    );
}

export default Nav;