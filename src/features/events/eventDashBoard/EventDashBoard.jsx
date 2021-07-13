import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from './EventList'
import { useSelector, useDispatch } from 'react-redux';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters';
import { getEventsFromFirestore, dataFromSnapShot, listenToEventsFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToEvents } from '../eventAction';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../../app/async/asyncReducer';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';

function EventDashBoard() {
    const dispatch = useDispatch()
    const { events } = useSelector(state => state.event)
    const { loading } = useSelector(state => state.async);

    useFirestoreCollection({
        query: () => listenToEventsFromFirestore(events),
        data: events => dispatch(listenToEvents(events)),
        deps: [dispatch]
    })
    return (
        <Grid>
            <Grid.Column width={10}>
                {loading &&
                    <>
                        <EventListItemPlaceholder />
                        <EventListItemPlaceholder />
                    </>
                }
                <EventList sampleData={events} />
            </Grid.Column>

            <Grid.Column width={6}>
                <EventFilters />
            </Grid.Column>
        </Grid>
    )
}

export default EventDashBoard
