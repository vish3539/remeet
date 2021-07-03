import React from "react";
import { Link } from 'react-router-dom';
import cuid from 'cuid'
import { Segment, Header, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { updateEvent, createEvent } from "../eventAction";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MydateInput";

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

    const validationSchema = Yup.object({
        title: Yup.string().required(),
        category: Yup.string().required("Mention Category"),
        description: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        date: Yup.string().required()
    })

    return (
        <Segment clearing>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    selectedEvent ? dispatch(updateEvent({ ...selectedEvent, ...values })) :
                        dispatch(createEvent({ ...values, id: cuid(), hostedBy: "vish", attendees: [], hostPhotoURL: "/assets/user.png" }))
                    history.push('/events')
                }}
            >
                {({ isSubmitting, dirty, isValid }) => (
                    <Form className='ui form'>
                        <Header sub color='teal' content="Event Details" />
                        <MyTextInput name='title' placeholder='Event Title' />
                        <MySelectInput options={categoryData} name='category' placeholder='Category' />
                        <MyTextArea name='description' placeholder='Description' />
                        <Header sub color='teal' content="Event Location Details" />
                        <MyTextInput name='city' placeholder='City' />
                        <MyTextInput name='venue' placeholder='Venue' />
                        <MyDateInput
                            name='date'
                            placeholderText='Date'
                            timeFormat='HH:mm'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm a' />
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type="submit"
                            floated="right"
                            positive
                            content="submit" />
                        <Button
                            as={Link}
                            disabled={isSubmitting}
                            to='/events'
                            type="submit"
                            floated="right"
                            content="cancel"
                            onClick={clearSelectedEventForm} />
                    </Form>
                )}

            </Formik>
        </Segment>
    );
}

export default EventForm;