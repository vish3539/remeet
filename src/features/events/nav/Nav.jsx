import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

function Nav({ toggleForm }) {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img
                        src="/assets/logo.png"
                        alt="logo"
                        style={{ marginRight: "0.8em" }}
                    />
                    Re-meet
        </Menu.Item>
                <Menu.Item name="Events" />
                <Menu.Item>
                    <Button onClick={toggleForm} positive inverted content="Create Event" />
                </Menu.Item>
                <Menu.Item position="right">
                    <Button basic inverted content="Login" />
                    <Button
                        basic
                        inverted
                        content="Register"
                        style={{ marginLeft: "0.5em" }}
                    />
                </Menu.Item>
                <Menu.Item></Menu.Item>
            </Container>
        </Menu>
    );
}

export default Nav;