import React from "react";
import { Link } from 'react-router-dom'
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import EventListAttendies from "./EventListAttendies";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../eventAction";
import { format } from 'date-fns'

function EventListItem({ event }) {

    const dispatch = useDispatch()
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src={event.hostPhotoURL} />
                        <Item.Content>
                            <Item.Header content={event.title} />
                            <Item.Description>{event.hostedBy}</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock" />
                    {/* MMM-Longer version of the month , d - date as number, yyyy as 4 numbered year */}
                    {format(event.date, 'MMMM d, yyyy h:mm a')}

                    <Icon name="marker" />
                    {event.venue}
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
                <div>{event.description}</div>
                <Button
                    as={Link} to={`/events/${event.id}`}
                    color="teal"
                    floated="right"
                    content="View" />
                <Button
                    onClick={() => dispatch(deleteEvent(event.id))}
                    color="red"
                    floated="right"
                    content="Delete"
                />
            </Segment>
        </Segment.Group>
    );
}

export default EventListItem;