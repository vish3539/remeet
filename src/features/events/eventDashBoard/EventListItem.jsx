import React from "react";
import { Link } from 'react-router-dom'
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import EventListAttendies from "./EventListAttendies";

function EventListItem({ deleteEvent, title, hostedBy, description, date, venue, hostPhotoURL, selectEvent, event }) {
    //console.log(event)
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src={hostPhotoURL} />
                        <Item.Content>
                            <Item.Header content={title} />
                            <Item.Description>{hostedBy}</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock" />
                    {date}
                    <Icon name="marker" />
                    {venue}
                </span>
            </Segment>
            <Segment secondary>
                <List horizontal>
                    <EventListAttendies />
                    <EventListAttendies />
                    <EventListAttendies />
                </List>
            </Segment>
            <Segment clearing>
                <div>{description}</div>
                <Button
                    as={Link} to={`/events/${event.id}`}
                    color="teal"
                    floated="right"
                    content="View" />
                <Button
                    onClick={() => deleteEvent(event.id)}
                    color="red"
                    floated="right"
                    content="Delete"
                />
            </Segment>
        </Segment.Group>
    );
}

export default EventListItem;