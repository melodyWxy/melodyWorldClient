
import loginTypes from '../actions/login';
import { call, put, takeEvery } from 'redux-saga/effects';
import { loginGlobal } from '../../servers/login';
import { message } from 'antd';

const defaultHeaderSrc = 'https://melodyworld.oss-cn-beijing.aliyuncs.com/headers/defaultheader0.1.jpeg?x-oss-process=style/_90_90'

export  function* login_effect ({ payload={} }){
    const { values, callback } = payload;
    const res = yield call(loginGlobal,values);
    const {isSuccess,data,msg} = res;
    if(!isSuccess){
        message.error(msg);
    }else{
        if(!data.user.headerImgUrl){
            data.user.headerImgUrl = defaultHeaderSrc;
        }
        yield put({
            type:loginTypes.login,
            payload:{
                user: data.user
            }
        })
        callback && callback(data);
        window.localStorage.setItem("loginCookie",data.cookie);
    }
}

export function* watchLogin() {
  yield takeEvery('USER_LOGIN', login_effect)
}
const initState = {
    isLogin : false,
    user:{}
}


function login(state = initState,{ type='', payload={} }){
    const {user={}} = payload;
    switch(type){
        case loginTypes.login:
            return { 
                ...state,
                isLogin:true,
                user
            }
        default: 
            return state
    }
}

export default login;