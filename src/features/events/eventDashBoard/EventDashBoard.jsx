import React from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from './EventList'
import { useSelector } from 'react-redux';

function EventDashBoard() {
    //const [events, setEvents] = useState(sampleData);
    const { events } = useSelector(state => state.event)
    // function handleCreateEvent(event) {
    //     setData([...data, event])
    // }
    // function handleEventupdate(updatedEvent) {
    //     setData(data.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
    // }
    function handleDeleteEvent(eventID) {
        // setEvents(events.filter((evt) => evt.id !== eventID))
    }
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList sampleData={events} deleteEvent={handleDeleteEvent} />
            </Grid.Column>

            <Grid.Column width={6}>
                <h3>Event Filters</h3>
            </Grid.Column>
        </Grid>
    )
}

export default EventDashBoard
