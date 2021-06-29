import React, { useState } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, useHistory } from 'react-router-dom'
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";

function Nav({ toggleForm }) {
    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(false);
    function handleSignOut() {
        setAuthenticated(false);
        history.push('/')
    }
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
                <Menu.Item name="Events" />
                {authenticated &&
                    <Menu.Item>
                        <Button as={NavLink} to='/createevent' onClick={toggleForm} positive inverted content="Create Event" />
                    </Menu.Item>}
                {authenticated ? <SignedInMenu signOut={handleSignOut} /> : <SignedOutMenu setAuthenticated={setAuthenticated} />}
            </Container>
        </Menu>
    );
}

export default Nav;