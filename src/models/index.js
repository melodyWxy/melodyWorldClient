import {createStore,applyMiddleware} from 'redux';
import reducer from './reducers';
import createSagaMiddleware from 'redux-saga';
// 打入所有监听
import { watchLogin } from './reducers/login';
import { watchBlobs } from './reducers/blobs';


const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchLogin);
sagaMiddleware.run(watchBlobs);


export default store;