import {combineReducers} from 'redux';
import messagesReducer from '../reducers/messagesReducer';

const rootReducer = combineReducers({
  messages: messagesReducer
})

export default rootReducer;