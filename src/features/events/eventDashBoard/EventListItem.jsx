import React from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import EventListAttendies from "./EventListAttendies";

function EventListItem({ title, hostedBy, description, date, venue, hostPhotoURL }) {
    console.log(date)
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
                <Button color="teal" floated="right" content="View" />
            </Segment>
        </Segment.Group>
    );
}

export default EventListItem;