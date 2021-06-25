import { useState } from 'react'
import EventDashBoard from "../../features/events/eventDashBoard/EventDashBoard";
import Nav from "../../features/events/nav/Nav";
import { Container } from "semantic-ui-react";

function App() {
  const [formShow, setFormShow] = useState(false);
  const onHandleEventForm = () => {
    setFormShow(() => !formShow)
  }
  return (
    <div>
      <Nav toggleForm={onHandleEventForm} />
      <Container className='main'>
        <EventDashBoard showForm={formShow} toggleForm={onHandleEventForm} />
      </Container>
    </div>
  );
}

export default App;
