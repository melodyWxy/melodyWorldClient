
import blobsTypes from '../actions/blobs';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getBlobs } from '../../servers/blobs';
import { message } from 'antd';

export  function* blobs_effect ({ payload={} }){
    const { values, callback } = payload;
    const res = yield call(getBlobs,values);
    const {isSuccess, data={} } = res;
    console.log(res);
    if(!isSuccess){
        message.error('没有这个文档呢~');
    }else{
        yield put({
            type:blobsTypes.update,
            payload:{
                blobMd: data.md
            }
        })
        callback && callback(data);
    }
}

export function* watchBlobs() {
  yield takeEvery('UPDATE_BLOBMD',blobs_effect );
}
const initState = {
    blobMd:'' 
}


function blobs(state = initState,{ type='', payload={} }){
    const { blobMd = '' } = payload;
    switch(type){
        case blobsTypes.update:
            console.log(state,'更新前的store-state');
            return { 
                blobMd
            }
        default: 
            return state
    }
}

export default blobs;