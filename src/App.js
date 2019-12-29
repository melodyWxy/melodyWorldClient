import React, { Component } from 'react';
import {connect} from 'react-redux';
import RouterIndex from './router';



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
      <RouterIndex />
    )
  }
}

export default App;
