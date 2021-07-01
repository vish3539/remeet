import React, { useState } from "react";
import { Link } from 'react-router-dom';
import cuid from 'cuid'
import { Segment, Header, Form, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { updateEvent, createEvent } from "../eventAction";

function EventForm({ match, clearSelectedEventForm, history }) {
    const dispatch = useDispatch()
    const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id));

    const initialValues = selectedEvent ? selectedEvent : {
        title: "",
        category: "",
        description: "",
        city: "",
        venue: "",
        date: ""
    }
    const [values, setValues] = useState(initialValues);

    function handleFormSubmit(e) {
        e.preventDefault();
        console.log(values);
        selectedEvent ? dispatch(updateEvent({ ...selectedEvent, ...values })) :
            dispatch(createEvent({ ...values, id: cuid(), hostedBy: "vish", attendees: [], hostPhotoURL: "/assets/user.png" }))
        history.push('/events')
    }
    function handleInputChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }
    return (
        <Segment clearing>
            <Header content={selectedEvent ? "Edit the event" : "Create new Event"} />
            <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                    <input type="text" placeholder="Event Title" name='title' value={values.title} onChange={handleInputChange} />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="Category" name='category' value={values.category} onChange={handleInputChange} />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="Description" name='description' value={values.description} onChange={handleInputChange} />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="City" name='city' value={values.city} onChange={handleInputChange} />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="Venue" name='venue' value={values.venue} onChange={handleInputChange} />
                </Form.Field>
                <Form.Field>
                    <input type="date" placeholder="Date" name='date' value={values.date} onChange={handleInputChange} />
                </Form.Field>
                <Button onClick={handleFormSubmit} type="submit" floated="right" positive content="submit" />
                <Button as={Link} to='/events' type="submit" floated="right" content="cancel" onClick={clearSelectedEventForm} />
            </Form>
        </Segment>
    );
}

export default EventForm;