import { combineReducers } from 'redux';
import { userReducer } from './user.reducer';
import { pageReducer } from './page.reducer';
import { cardReducer } from './card.reducer';

const globalReducer = combineReducers({
    userReducer,
    pageReducer,
    cardReducer
});

export default globalReducer;
