import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from './EventList'
import { sampleData } from "../../../app/api/sampleData";

function EventDashBoard() {
    const [data, setData] = useState(sampleData);

    // function handleCreateEvent(event) {
    //     setData([...data, event])
    // }
    // function handleEventupdate(updatedEvent) {
    //     setData(data.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
    // }
    function handleDeleteEvent(eventID) {
        setData(data.filter((evt) => evt.id !== eventID))
    }
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList sampleData={data} deleteEvent={handleDeleteEvent} />
            </Grid.Column>

            <Grid.Column width={6}>
                <h3>Event Filters</h3>
            </Grid.Column>
        </Grid>
    )
}

export default EventDashBoard
