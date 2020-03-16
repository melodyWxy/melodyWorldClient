import React from 'react';
import { connect } from 'react-redux'; 



function User(props){
    console.log(props,1);
    const {login = {}} = props;
    const {isLogin,user={}} = login;
    if(!isLogin){
        window.location.pathname = "/login";
        return ;
    }
    const {} = user;
    return (
        <div>
            user
        </div>
    )
}

export default connect(({login})=>({login}),)(User);
