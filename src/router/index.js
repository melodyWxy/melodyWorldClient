
import React,{Component,lazy,Suspense} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import { Layout, Spin, message } from 'antd';
import TopMenu from './../components/Menu/TopMenu';
import SiderMenu from './../components/Menu/SiderMenu';
import Logo from './../components/Logo';
import { xPost } from './../utils/xFetch';
import {topMenuConfig} from './menu.config';
import styles from './index.module.css';


//pages
const Home = lazy(()=>import('../pages/Home'));
const Blobs = lazy(()=>import('../pages/Blobs'));
const ClassVideo = lazy(()=>import('../pages/ClassVideo'))
const User = lazy(()=>import('../pages/User')) ;
const Login = lazy(()=>import('../pages/Login'));
const Register = lazy(()=>import('../pages/Register'));
const UploadAdmin = lazy(()=>import('../pages/UploadAdmin'));

//components
const UserHeader= lazy(()=>import('../components/UserHeader'));


const { Header, Content, Footer, Sider } = Layout;


@connect(()=>({}),dispatch=>({
    dispatch
}))
class RouterIndex extends Component{ 
    constructor(props){
        super(props);
        const  { pathname } = window.location;
        const  pnList  = pathname.split('/');
        // 一级路由
        let path = pnList[1]?'/'+pnList[1]:'/'; 
        // 二级路由
        let siderKey = pnList[2]?'/'+pnList[2]:'/';
        if(path==='/'||path==='/blobs'||path==='/class_video'){
            siderKey = path ;
            path = '/';
        }
        this.state = {
            // topMenu控制的一级路由
            path,
            // siderMenu控制的二级路由
            siderKey,
            siderMenuItems:[] 
        }
    }

    componentDidMount(){

        //更新左边menu
        const {path,siderKey} = this.state;
        const selectItem = topMenuConfig.find(item=>item.to===path);
        if(!selectItem){
            return ;
        }
        const department = selectItem.value;

        this.updateSiderMenu(department);
        this.getMDBysiderKey(siderKey);
    }

    // 更新左边menu
    updateSiderMenu = (department) => {
        xPost('/blob/getAllTitle',{
            department
        })    
            .then(res=>{
                const {code,msg='',data=[]} = res||{};
                if(code!==200){
                    return message.error(msg);
                }
                this.setState({
                    siderMenuItems:data
                })
            })

    }

    handleTopMenuChange = item => {
        this.setState({
            path:item.key,
            siderKey:'/'
        })
        const selectItem = topMenuConfig.find(one=>one.to===item.key);
        if(!selectItem){
            return ;
        }
        const department = selectItem.value;
        this.updateSiderMenu(department);
        this.getMDBysiderKey(item.key);
    }

    handleSiderMenuChange = item => {
        this.setState({
            siderKey: item.key
        })
        this.getMDBysiderKey(item.key);
    }

    getMDBysiderKey =  (siderKey='')  => {
        const isBlobs = siderKey.indexOf('blobs')!==-1; 
        const isClassVideo = siderKey.indexOf('class_video')!==-1;
        const isHome = !isBlobs && !isClassVideo; 
        const {dispatch} = this.props;
        let key;
        if(isBlobs){
            key = siderKey.replace('/blobs/','');
            dispatch({
                type:"UPDATE_BLOBMD",
                payload: {
                    values:{
                        key
                    }
                }
            })
        }
        if(isClassVideo){
            key = siderKey.replace('/class_video/','');
        }
        if(isHome){
            key = siderKey === '/'?  'home-home': siderKey.replace('/','')+'-home' ;
            dispatch({
                type:"UPDATE_HOMEMD",
                payload: {
                    values:{
                        key
                    }
                }
            })
        }
    }

    render(){
        const { path,siderKey,siderMenuItems } = this.state;
        return (
            <Router >
                <Switch>
                    <Route path='/register'>
                        <Suspense fallback={<Spin />}>
                            <Register />
                        </Suspense>
                    </Route>
                    <Route path="/login">
                        <Suspense fallback={<Spin />}>
                            <Login />
                        </Suspense>
                    </Route>
                    <Route path="/uploadAdmin">
                        <Suspense fallback={<Spin />}>
                            <UploadAdmin />
                        </Suspense>
                    </Route>
                    <Route path="/">
                        <Layout className={styles.layout}>
                            <Header className={styles.header} >
                                    <div className={styles.logobox}>
                                        <Logo />
                                    </div>
                                    <div  className={styles.topMenuItems}>
                                        <TopMenu 
                                            path={path}
                                            handleTopMenuChange={this.handleTopMenuChange}
                                        />
                                    </div>
                                    <UserHeader />
                            </Header>
                                <Layout>
                                    <Sider 
                                        theme="dark" 
                                        collapsible={true}  
                                        className={styles.sider}
                                        width={150}
                                        collapsedWidth={0}
                                    >
                                      <SiderMenu 
                                        handleSiderMenuChange={this.handleSiderMenuChange}
                                        path={path}
                                        siderKey={siderKey}
                                        siderMenuItems = {siderMenuItems}
                                      />
                                    </Sider>
                                    <Content style={{ padding: '20px 30px 0 40px' }}>
                                        <div style={{ background: '#fff', padding: 24, height:'100%',borderRadius:'10px',overflow:'hidden' }}>
                                            <Switch>
                                                <Route path="/user">
                                                    <Suspense fallback={<Spin />}>
                                                        <User />
                                                    </Suspense>
                                                </Route>
                                                <Route path="/blobs">
                                                    <Suspense fallback={<Spin />}>
                                                        <Blobs />
                                                    </Suspense>
                                                </Route>
                                                <Route path="/class_video">
                                                    <Suspense fallback={<Spin />}>
                                                        <ClassVideo />
                                                    </Suspense>
                                                </Route>
                                                <Route path="/*/blobs">
                                                    <Suspense fallback={<Spin />}>
                                                        <Blobs />
                                                    </Suspense>
                                                </Route>
                                                <Route path="/*/class_video">
                                                    <Suspense fallback={<Spin />}>
                                                        <ClassVideo />
                                                    </Suspense>
                                                </Route>
                                                <Route path="/*/">
                                                    <Suspense fallback={<Spin />}>
                                                        <Home />
                                                    </Suspense>
                                                </Route>
  
                                            </Switch>
                                        </div>
                                    </Content>
                                </Layout>
                                <Footer style={{ textAlign: 'center' }}>
                                    <div>
                                        MW ©2020 Created by melodyWxy
                                    </div>
                                    <div>
                                        <a href='http://www.beian.miit.gov.cn/' target='_blank' >浙ICP备20001308号</a>
                                    </div>
                                </Footer>
                            </Layout>
                    </Route>
                </Switch>

            </Router>
        );
    }
}

export default  RouterIndex;