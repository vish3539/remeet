import React from 'react'
import { Grid } from 'semantic-ui-react'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedSideBar from './EventDetailedSideBar'
import { useSelector } from 'react-redux'

function EventsDetailedPage({ match }) {
    const event = useSelector(state => state.event.events.find(e => e.id === match.params.id));
    console.log(event)
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
