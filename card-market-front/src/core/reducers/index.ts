import { combineReducers } from 'redux';
import { userReducer } from './user.reducer';
import { pageReducer } from './page.reducer';

const globalReducer = combineReducers({
    userReducer,
    pageReducer
});

export default globalReducer;
