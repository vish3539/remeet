import React from 'react'
import { Grid } from 'semantic-ui-react'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedSideBar from './EventDetailedSideBar'
import { useSelector, useDispatch } from 'react-redux'
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService'
import { listenToEvents } from '../eventAction'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Redirect } from 'react-router-dom';

function EventsDetailedPage({ match }) {
    const event = useSelector(state => state.event.events.find(e => e.id === match.params.id));
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.async)
    useFirestoreDoc({
        query: () => listenToEventFromFirestore(match.params.id),
        data: (event) => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch],
    });
    if (loading || (!event && !error))
        return <LoadingComponent content='Loading event...' />;
    if (error) return <Redirect to='/error' />
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event} />
                <EventDetailedInfo event={event} />
                <EventDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSideBar attendies={event.attendees} />
            </Grid.Column>
        </Grid>
    )
}

export default EventsDetailedPage
