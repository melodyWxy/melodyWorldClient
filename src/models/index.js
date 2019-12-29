import {createStore,applyMiddleware} from 'redux';
import reducer from './reducers';
import createSagaMiddleware from 'redux-saga'
import { watchLogin } from './reducers/login';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchLogin);


export default store;