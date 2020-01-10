
import React,{Component,lazy,Suspense} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { Layout , Menu, Spin, } from 'antd';
import {topMenuConfig,siderMenuConfig} from './menu.config';
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
const TopMenuItems = topMenuConfig.map(item=>(
    <Menu.Item key={item.key}><Link to={item.to}>{item.title}</Link></Menu.Item>
))


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
        }
    }

    componentDidMount(){
        this.updateStore('UPDATE_BLOBMD',{
            blobName:'home-home.md'
        })
    }

    updateStore = (type, values) => {
        this.props.dispatch({
            type,
            payload: {
                values
            }
        })
    }

    handleTopMenuChange = item => {
        this.setState({
            path:item.key,
            siderKey:'/'
        })

    }

    handleSiderMenuChange = item => {
        this.setState({
            siderKey:item.key
        })
    }
    renderSiderMenuItems = ()=>{
        const { path } = this.state;
        return siderMenuConfig.map(item=>(
            <Menu.Item key={item.key}><Link to={ path==='/'?item.to:path+item.to }>{item.title}</Link></Menu.Item>
        ))
    }
    render(){
        const { path,siderKey } = this.state;
        const siderMenuItems = this.renderSiderMenuItems();
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
                                        LOGO
                                    </div>
                                    <div  className={styles.topMenuItems}>
                                        <Menu
                                            theme="dark"
                                            mode="horizontal"
                                            selectedKeys={[path]}
                                            style={{ lineHeight: '64px' }}
                                            onSelect= {this.handleTopMenuChange}
                                        >
                                            {TopMenuItems}
                                        </Menu>
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
                                        <Menu
                                            theme="dark"
                                            mode="inline"
                                            style={{paddingTop:"10px"}}
                                            selectedKeys={[siderKey]}
                                            onSelect={this.handleSiderMenuChange}
                                        >
                                            {siderMenuItems}
                                        </Menu>
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
                                <Footer style={{ textAlign: 'center' }}>Melody World ©2019 Created by melodyWxy</Footer>
                            </Layout>
                    </Route>
                </Switch>


            </Router>
        );
    }
}

export default  RouterIndex;