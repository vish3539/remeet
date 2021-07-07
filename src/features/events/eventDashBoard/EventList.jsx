import React from 'react'
import EventListItem from './EventListItem'

function EventList({ sampleData }) {
    return (
        <div>
            {sampleData.map(event => (
                <EventListItem
                    event={event}
                    key={event.id}
                    title={event.title}
                    hostedBy={event.hostedBy}
                    description={event.description}
                    date={event.date}
                    venue={event.venue}
                    hostPhotoURL={event.hostPhotoURL}
                />
            ))}
        </div>
    )
}

export default EventList
