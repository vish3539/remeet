import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signOutFirebase } from '../../../app/firestore/firebaseService';

function SignedInMenu() {
    const dispatch = useDispatch()
    const history = useHistory()
    async function handleSignOut() {
        try {
            await signOutFirebase();
            history.push('/')
        } catch (error) {
            toast.error(error.message)
        }
    }
    const { currentUser } = useSelector(state => state.auth)
    return (
        <Menu.Item position='right'>
            <Image avatar spaced='right' src={currentUser.photoURL || '/assets/user.png'} />
            <Dropdown pointing='top left' text={currentUser.displayName}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
                    <Dropdown.Item text='My Profile' icon='user' />
                    <Dropdown.Item as={Link} to='/account' text='My Account' icon='settings' />
                    <Dropdown.Item onClick={handleSignOut} text='Sign Out' icon='power' />
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    )
}

export default SignedInMenu
