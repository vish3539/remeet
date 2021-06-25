import React from "react";
import { Segment, Header, Form, Button } from "semantic-ui-react";

function EventForm({ toggleForm }) {
    return (
        <Segment clearing>
            <Header content="Create new Event" />
            <Form>
                <Form.Field>
                    <input type="text" placeholder="Event Title" />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="Category" />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="Description" />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="City" />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="Venue" />
                </Form.Field>
                <Form.Field>
                    <input type="date" placeholder="Date" />
                </Form.Field>
                <Button type="submit" floated="right" positive content="submit" />
                <Button type="submit" floated="right" content="cancel" onClick={toggleForm} />
            </Form>
        </Segment>
    );
}

export default EventForm;