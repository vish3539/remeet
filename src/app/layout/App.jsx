import EventDashBoard from "../../features/events/eventDashBoard/EventDashBoard";
import Nav from "../../features/events/nav/Nav";
import { Container } from "semantic-ui-react";
import { Route, useLocation } from 'react-router-dom'
import HomePage from '../../features/home/HomePage';
import EventsDetailedPage from '../../features/events/eventsDetailed/EventsDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import SandBox from "../../features/sandBox/SandBox";
import ModalManager from "../common/modals/ModalManager";

function App() {
  const { key } = useLocation()
  return (
    <>
      <ModalManager />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <>
          <Nav />
          <Container className='main'>

            <Route exact path='/events' component={EventDashBoard} />
            <Route exact path='/sandbox' component={SandBox} />
            <Route exact path='/events/:id' component={EventsDetailedPage} />
            <Route path={['/createevent', '/manage/:id']} component={EventForm} key={key} />
          </Container>
        </>
      )} />

    </>
  );
}
export default App;
