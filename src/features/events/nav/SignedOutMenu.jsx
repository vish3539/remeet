import React from 'react'
import { Menu, Button } from "semantic-ui-react";
import { useDispatch } from 'react-redux';
import { openModal } from '../../../app/common/modals/modalReducer';

function SignedOutMenu({ setAuthenticated }) {
    const dispatch = useDispatch();
    return (
        <Menu.Item position="right">
            {/* modalType: LoginForm should be defined the same way its defined in ModalManager.js */}
            <Button onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))} basic inverted content="Login" />

            <Button
                basic
                inverted
                content="Register"
                style={{ marginLeft: "0.5em" }}
                onClick={() => dispatch(openModal({ modalType: 'RegisterForm' }))}
            />
        </Menu.Item>

    )
}

export default SignedOutMenu
