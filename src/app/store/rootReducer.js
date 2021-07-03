import { combineReducers } from 'redux';
import eventReducer from '../../features/events/eventReducer';
import testReducer from '../../features/sandBox/testReducer';
import modalReducer from '../common/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';

const rootReducer = combineReducers({
    test: testReducer,
    event: eventReducer,
    modals: modalReducer,
    auth: authReducer
})

export default rootReducer;


