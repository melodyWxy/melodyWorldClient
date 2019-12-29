import { combineReducers } from 'redux';
import loginReducer from  './login';

const reducers = combineReducers({
    login:loginReducer
})


export default reducers;