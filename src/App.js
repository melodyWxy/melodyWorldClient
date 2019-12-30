import React, { Component,lazy,Suspense } from 'react';
import {connect} from 'react-redux';
import {Spin} from 'antd';
import styles from './App.module.css';

const RouterIndex = lazy(()=>import('./router'));
@connect(({login})=>({
  login
}),dispatch=>({
  dispatch
}))
class App extends Component{
  componentDidMount(){
    const {login,dispatch} = this.props;
    if(login&&!login.isLogin){
      const loginCookie = window.localStorage.getItem('loginCookie');
      if(loginCookie&&window.location.pathname!=='/login'){
            dispatch({
              type:"USER_LOGIN",
              payload:{
                values:{
                  cookie:loginCookie
                }
              }
            })
      }
    }
  }
  render(){
    console.log(this);
    return (
      <Suspense fallback={
        <div className={styles.app}>
          <Spin tip="welcome to Melody World..."  size="large"/>
        </div>
      }>
        <RouterIndex />
      </Suspense>
    )
  }
}

export default App;
