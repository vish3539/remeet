import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './app/layout/App'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import './app/layout/styles.css'
import { Provider } from 'react-redux';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/layout/ScrollToTop';
import { loadEvents } from './features/events/eventAction';
import 'react-calendar/dist/Calendar.css';
//import reportWebVitals from './reportWebVitals';
const store = configureStore();
store.dispatch(loadEvents())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><ScrollToTop /><App /></BrowserRouter>
  </Provider>
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
