import { combineReducers } from 'redux';
import loginReducer from  './login';
import blobsReducer from './blobs';


const reducers = combineReducers({
    login:loginReducer,
    blobs:blobsReducer
})


export default reducers;