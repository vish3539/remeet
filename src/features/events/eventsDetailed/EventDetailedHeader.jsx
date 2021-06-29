import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Header, Segment, Button, Image } from 'semantic-ui-react'

const eventImageStyle = {
    filter: 'brightness(70%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

function EventDetailedHeader() {
    return (
        <Segment.Group>
            <Segment basic attached="top" style={{ padding: '0' }}>
                <Image style={eventImageStyle} src={`/assets/categoryImages/drinks.jpg`} fluid />

                <Segment style={eventImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content='Event Title'
                                    style={{ color: 'white' }}
                                />
                                <p>Event Date</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment attached="bottom">
                <Button>Cancel My Place</Button>
                <Button color="teal">JOIN THIS EVENT</Button>

                <Button as={Link} to={`/manage/`} color="orange" floated="right">
                    Manage Event
        </Button>
            </Segment>
        </Segment.Group>
    )
}

export default EventDetailedHeader