import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from './EventList'
import EventForm from '../eventForm/EventForm'
import { sampleData } from "../../../app/api/sampleData";

function EventDashBoard({ showForm, toggleForm }) {
    const [data, setData] = useState(sampleData);
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList sampleData={data} />
            </Grid.Column>

            <Grid.Column width={6}>
                {showForm && <EventForm toggleForm={toggleForm} />}
            </Grid.Column>
        </Grid>
    )
}

export default EventDashBoard
