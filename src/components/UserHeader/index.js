import React,{useRef} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Avatar} from 'antd';



 function UserHeader(props){
     console.log(props,5)
    const {isLogin,user={}} = props.login;
    //记录 未登录的UI
    const LGRef = useRef(
        <div >
            <Link to='/login'>    
                登录
            </Link>
                |
            <Link to='/register'>
                注册
            </Link>
        </div>
    )
    return isLogin? (
        <div >
            <Link to='/user'>
                <Avatar src={user.headerImgUrl} />
            </Link>
        </div>
    ) : LGRef.current
}
export default connect(({login})=>({
    login
}),()=>({}))(UserHeader)