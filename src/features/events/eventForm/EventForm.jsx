import React, { useState } from "react";
import { Link } from 'react-router-dom';
import cuid from 'cuid'
import { Segment, Header, Button, Confirm } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { updateEvent, createEvent, listenToEvents } from "../eventAction";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MydateInput";
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToEventFromFirestore, updateEventInFireStore, addEventToFirestore, cancelEventToggle } from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Redirect } from 'react-router-dom';
import { toast } from "react-toastify";

function EventForm({ match, clearSelectedEventForm, history }) {
    const dispatch = useDispatch();
    const [loadingCancel, setLoadingCancel] = useState();
    const [confirmOpen, setConfirmOpen] = useState(false)
    const { loading, error } = useSelector(state => state.async)

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

    async function handleCancelToggle(event) {
        setConfirmOpen(false);
        setLoadingCancel(true);
        try {
            await cancelEventToggle(event);
            setLoadingCancel(false);
        } catch (error) {
            console.log(error)
        }
    }
    useFirestoreDoc({
        shouldExecute: !!match.params.id, // casts into boolean
        query: () => listenToEventFromFirestore(match.params.id),
        data: (event) => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch],
    });

    if (loading)
        return <LoadingComponent content='Loading event...' />;
    if (error) return <Redirect to='/error' />

    return (
        <Segment clearing>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        selectedEvent ? await updateEventInFireStore(values) :
                            addEventToFirestore(values)
                        history.push('/events')

                    } catch (error) {
                        toast.error(error.message);
                        setSubmitting(false);
                    }

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
                        {selectedEvent &&
                            <Button
                                loading={loadingCancel}
                                type="button"
                                floated="left"
                                color={selectedEvent.isCancelled ? "green" : "red"}
                                content={selectedEvent.isCancelled ? 'Reactivate Event' : 'Cancel Event'}
                                onClick={() => setConfirmOpen(true)}
                            />}
                    </Form>
                )}

            </Formik>
            <Confirm
                content={selectedEvent.isCancelled ? 'This will reactivate the event, are you sure?' :
                    "This will cancel the event, are you sure ?"}
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => handleCancelToggle(selectedEvent)}
            />
        </Segment>
    );
}

export default EventForm;