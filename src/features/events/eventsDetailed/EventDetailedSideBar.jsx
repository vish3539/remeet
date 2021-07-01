import React from 'react'
import { Segment, Item } from 'semantic-ui-react'

function EventDetailedSideBar({ attendies }) {
    return (
        <>
            <Segment
                textAlign="center"
                style={{ border: 'none' }}
                attached="top"
                secondary
                inverted
                color="teal"
            >
                {attendies.length}{attendies.length > 1 ? " Peoples Going" : "People Going"}
            </Segment>
            <Segment attached>
                <Item.Group relaxed divided>
                    {attendies.map(attender =>
                        <Item key={attender.id} style={{ position: 'relative' }}>
                            <Item.Image size="tiny" src={attender.photoURL || '/assets/user.png'} />
                            <Item.Content verticalAlign="middle">
                                <Item.Header as="h3">
                                    <span>{attender.name}</span>
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    )}

                </Item.Group>
            </Segment>
        </>
    )
}

export default EventDetailedSideBar
