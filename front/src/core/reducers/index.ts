import { combineReducers } from 'redux';
import { userReducer } from './user.reducer';
import { pageReducer } from './page.reducer';
import { cardReducer } from './card.reducer';
import { messageReducer } from './message.reducer';

const globalReducer = combineReducers({
    userReducer,
    pageReducer,
    cardReducer,
    messageReducer
});

export default globalReducer;
