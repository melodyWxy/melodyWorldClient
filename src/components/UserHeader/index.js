import React,{useRef} from 'react';
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import {Avatar} from 'antd';
import styles from './index.module.css';


 function UserHeader(props){
    const {isLogin,user={}} = props.login;
    const LinkTo = (targetPath)=>{
        //记录当前的path参数
        const nowPath = window.location.href.replace(window.location.origin,'');
        const callbackPath = nowPath==='/'?'': `?callback=${nowPath}`;
        props.history&&props.history.push(`${targetPath}${callbackPath}`)
    }
    //记录 未登录的UI
    const LGRef = useRef(
        <div style={{color:"#B4CDCD"}}>
            <a className={styles.span} onClick={()=>LinkTo('/login')}>    
                登录
            </a>
                |
            <a className={styles.span} onClick={()=>LinkTo('/register')}>
                注册
            </a>
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
}),()=>({}))(withRouter(UserHeader))