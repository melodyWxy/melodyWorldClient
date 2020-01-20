
import blobsTypes from '../actions/blobs';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getBlobs, uploadBlobs} from '../../servers/blobs';
import { message } from 'antd';

function* blobs_effect ({ payload={} }){
    const { values, callback } = payload;
    const res = yield call(getBlobs,values);
    const {isSuccess, data={} } = res;
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

function* blobs_Upload ({ payload={} }){
    const { values, callback } = payload;
    const res = yield call(uploadBlobs,values);
    console.log(res);
    if(!res.isSuccess){
        return message.error(res.msg);
    }
    //todo
    
}

function* home_effect( {payload={}} ){
    const { values, callback } = payload;
    const res = yield call(getBlobs,values);
    const {isSuccess, data={} } = res;
    if(!isSuccess){
        message.error('没有这个文档呢~');
    }else{
        yield put({
            type:blobsTypes.update,
            payload:{
                homeMd: data.md
            }
        })
        callback && callback(data);
    }
}


export function* watchBlobs() {
  yield takeEvery('UPDATE_BLOBMD',blobs_effect );
  yield takeEvery('UPLOAD_BLOBS',blobs_Upload);
}
const initState = {
    blobMd:'' ,
    homeMd:'' ,
    videoSrc:'' ,
}


function blobs(state = initState,{ type='', payload={} }){
    const { blobMd = '' } = payload;
    switch(type){
        case blobsTypes.update:
            return { 
                blobMd
            }
        default: 
            return state
    }
}

export default blobs;